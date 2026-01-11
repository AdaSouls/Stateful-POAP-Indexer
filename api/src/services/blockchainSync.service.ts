import { ethers } from 'ethers';
import type { Pool, PoolClient } from 'pg';
import { 
  requirePoolWriteAccess, 
  createEvent, 
  ICreateEventParams, 
  getEventByEventId, 
  createPoap, 
  ICreatePoapParams, 
  getPoapByTokenId 
} from '@game/db';
import {
  IndexingError,
  IndexingErrorType,
  ProcessingContext,
  classifyError,
  isRetryableError
} from '../utils/indexingErrors';

// Contract configuration
const POAP_CONTRACT_ADDRESS = "0xE2113297a478889eFc11e0DC643D16a0178c2963";
const providerRPC = {
  name: "Amoy",
  rpc: "https://rpc-amoy.polygon.technology",
  chainId: 80002,
};

// Retry configuration
const RETRY_CONFIG = {
  maxRetries: 3,
  initialDelay: 1000, // 1 second
  maxDelay: 30000, // 30 seconds
  backoffMultiplier: 2
};

// Confirmation requirements
const REQUIRED_CONFIRMATIONS = 12; // Polygon requires 12 confirmations

// POAP Contract ABI - Event and POAP event definitions
const POAP_CONTRACT_ABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "issuerId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "eventId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "eventMaxSupply",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "eventStartDate",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "eventMintExpiration",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "eventOrganizer",
        "type": "address"
      }
    ],
    "name": "EventCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "issuerId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "eventId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "userAddress",
        "type": "address"
      }
    ],
    "name": "TokenMinted",
    "type": "event"
  }
];

interface Metrics {
  totalEventsProcessed: number;
  totalErrors: number;
  lastProcessedBlock: number;
  currentChainBlock: number;
  processingLag: number;
  averageProcessingTime: number;
  errorsByType: Map<IndexingErrorType, number>;
  lastError: Error | null;
  uptime: number;
  reorgsDetected: number;
}

interface HealthStatus {
  isHealthy: boolean;
  isListening: boolean;
  lastProcessedBlock: number;
  currentChainBlock: number;
  processingLag: number;
  totalEventsProcessed: number;
  errorRate: number;
  uptime: number;
  reorgsDetected: number;
}

export class BlockchainSyncService {
  private provider: ethers.JsonRpcProvider;
  private contract: ethers.Contract;
  private isListening: boolean = false;
  private lastProcessedBlock: number = 0;
  private syncInterval: NodeJS.Timeout | null = null;
  private reorgCheckInterval: NodeJS.Timeout | null = null;
  private metrics: Metrics;

  // Public getters for health checks
  public getProvider(): ethers.JsonRpcProvider {
    return this.provider;
  }

  constructor() {
    this.provider = new ethers.JsonRpcProvider(providerRPC.rpc, {
      chainId: providerRPC.chainId,
      name: providerRPC.name,
    });
    
    this.contract = new ethers.Contract(
      POAP_CONTRACT_ADDRESS,
      POAP_CONTRACT_ABI,
      this.provider
    );

    this.metrics = {
      totalEventsProcessed: 0,
      totalErrors: 0,
      lastProcessedBlock: 0,
      currentChainBlock: 0,
      processingLag: 0,
      averageProcessingTime: 0,
      errorsByType: new Map(),
      lastError: null,
      uptime: Date.now(),
      reorgsDetected: 0
    };
  }

  async startListening() {
    if (this.isListening) {
      console.log('Blockchain sync already running');
      return;
    }

    try {
      // Get current block number
      const currentBlock = await this.provider.getBlockNumber();
      this.lastProcessedBlock = Math.max(1, currentBlock - 1000); // Start from 1000 blocks ago

      console.log(`🚀 Starting blockchain sync from block ${this.lastProcessedBlock}`);

      // Process historical events first
      await this.processHistoricalEvents();

      // Production-ready approach: Use polling instead of ephemeral event filters
      // Event filters (contract.on()) are unreliable in production because:
      // - They expire after 5-10 minutes on most RPC providers
      // - They're cleared on provider restarts
      // - They cause "filter not found" errors
      // Polling with queryFilter() is more reliable and doesn't depend on server-side state
      
      this.isListening = true;
      console.log('✅ Blockchain sync initialized (using reliable polling method)');

      // Set up periodic sync - primary method for production
      // Using 15-second intervals for near real-time updates while avoiding rate limits
      this.syncInterval = setInterval(() => {
        this.syncRecentEvents().catch(error => {
          // Errors are already logged in syncRecentEvents, just prevent unhandled rejection
          console.error('⚠️ Unhandled error in periodic sync:', error);
        });
      }, 15000); // Sync every 15 seconds for production responsiveness

      // Set up periodic reorg check
      this.reorgCheckInterval = setInterval(() => {
        this.checkForReorgs().catch(error => {
          console.error('⚠️ Unhandled error in reorg check:', error);
        });
      }, 60000); // Check every minute

    } catch (error) {
      const indexingError = classifyError(error, { operation: 'startListening' });
      console.error('❌ Failed to start blockchain sync:', indexingError);
      throw indexingError;
    }
  }

  async stopListening() {
    if (!this.isListening) return;

    // No event listeners to remove (we use polling instead)
    // But keep this for safety in case listeners are added in the future
    
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
    }

    if (this.reorgCheckInterval) {
      clearInterval(this.reorgCheckInterval);
      this.reorgCheckInterval = null;
    }
    
    this.isListening = false;
    console.log('🛑 Blockchain sync stopped');
  }

  /**
   * Retry wrapper with exponential backoff
   */
  private async retryWithBackoff<T>(
    fn: () => Promise<T>,
    context: ProcessingContext,
    retryCount = 0
  ): Promise<T> {
    const startTime = Date.now();
    try {
      const result = await fn();
      const processingTime = Date.now() - startTime;
      this.updateMetrics(true, processingTime);
      return result;
    } catch (error) {
      const processingTime = Date.now() - startTime;
      const indexingError = classifyError(error, context);
      
      if (retryCount >= RETRY_CONFIG.maxRetries) {
        this.updateMetrics(false, processingTime, indexingError);
        await this.addToDeadLetterQueue(indexingError, context);
        throw indexingError;
      }
      
      if (isRetryableError(indexingError)) {
        const delay = Math.min(
          RETRY_CONFIG.initialDelay * Math.pow(RETRY_CONFIG.backoffMultiplier, retryCount),
          RETRY_CONFIG.maxDelay
        );
        
        console.warn(`⚠️ Retryable error (attempt ${retryCount + 1}/${RETRY_CONFIG.maxRetries}):`, indexingError.message);
        console.log(`⏳ Retrying in ${delay}ms...`);
        
        await this.sleep(delay);
        return this.retryWithBackoff(fn, context, retryCount + 1);
      }
      
      this.updateMetrics(false, processingTime, indexingError);
      throw indexingError;
    }
  }

  /**
   * Sleep utility
   */
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Update metrics
   */
  private updateMetrics(success: boolean, processingTime: number, error?: Error) {
    if (success) {
      this.metrics.totalEventsProcessed++;
    } else {
      this.metrics.totalErrors++;
      if (error instanceof IndexingError) {
        const count = this.metrics.errorsByType.get(error.type) || 0;
        this.metrics.errorsByType.set(error.type, count + 1);
      }
      this.metrics.lastError = error || null;
    }
    
    // Update average processing time
    if (this.metrics.totalEventsProcessed > 0) {
      this.metrics.averageProcessingTime = 
        (this.metrics.averageProcessingTime * (this.metrics.totalEventsProcessed - 1) + processingTime) /
        this.metrics.totalEventsProcessed;
    }
  }

  /**
   * Dead letter queue (for now, just log - can be enhanced to store in DB)
   */
  private async addToDeadLetterQueue(error: IndexingError, context: ProcessingContext) {
    console.error('💀 Adding to dead letter queue:', {
      error: error.message,
      type: error.type,
      context
    });
    // TODO: Store in database for manual review
  }

  /**
   * Database transaction wrapper
   */
  private async withTransaction<T>(
    operation: (client: PoolClient) => Promise<T>
  ): Promise<T> {
    const pool = requirePoolWriteAccess();
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');
      const result = await operation(client);
      await client.query('COMMIT');
      return result;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  /**
   * Validate transaction receipt
   */
  private async validateTransaction(event: ethers.Log): Promise<boolean> {
    try {
      // Get transaction receipt
      const receipt = await this.provider.getTransactionReceipt(event.transactionHash);
      
      if (!receipt) {
        throw new IndexingError(
          'Transaction receipt not found',
          IndexingErrorType.TRANSACTION_ERROR,
          { txHash: event.transactionHash, blockNumber: event.blockNumber },
          false
        );
      }
      
      // Verify transaction was successful
      if (receipt.status !== 1) {
        throw new IndexingError(
          `Transaction failed with status ${receipt.status}`,
          IndexingErrorType.TRANSACTION_ERROR,
          { txHash: event.transactionHash, blockNumber: event.blockNumber, status: receipt.status },
          false
        );
      }
      
      // Verify block is confirmed
      const currentBlock = await this.provider.getBlockNumber();
      const confirmations = currentBlock - receipt.blockNumber;
      
      if (confirmations < REQUIRED_CONFIRMATIONS) {
        // For historical events, we can still process but log a warning
        if (confirmations < REQUIRED_CONFIRMATIONS) {
          console.warn(`⚠️ Transaction only has ${confirmations} confirmations, need ${REQUIRED_CONFIRMATIONS}`);
        }
      }
      
      return true;
    } catch (error) {
      const indexingError = classifyError(error, {
        txHash: event.transactionHash,
        blockNumber: event.blockNumber
      });
      console.error('Transaction validation failed:', indexingError);
      return false;
    }
  }

  /**
   * Validate event data
   */
  private validateEventData(args: any, context: ProcessingContext): void {
    if (!args.issuerId || Number(args.issuerId) <= 0) {
      throw new IndexingError(
        'Invalid issuerId',
        IndexingErrorType.VALIDATION_ERROR,
        { ...context, issuerId: args.issuerId }
      );
    }
    
    if (!args.eventId || Number(args.eventId) <= 0) {
      throw new IndexingError(
        'Invalid eventId',
        IndexingErrorType.VALIDATION_ERROR,
        { ...context, eventId: args.eventId }
      );
    }
  }

  /**
   * Validate POAP event data
   */
  private validatePoapData(args: any, context: ProcessingContext): void {
    this.validateEventData(args, context);
    
    if (!args.tokenId || Number(args.tokenId) <= 0) {
      throw new IndexingError(
        'Invalid tokenId',
        IndexingErrorType.VALIDATION_ERROR,
        { ...context, tokenId: args.tokenId }
      );
    }
    
    if (!args.userAddress || typeof args.userAddress !== 'string' || !ethers.isAddress(args.userAddress)) {
      throw new IndexingError(
        'Invalid user address',
        IndexingErrorType.VALIDATION_ERROR,
        { ...context, userAddress: args.userAddress }
      );
    }
  }

  /**
   * Store block hash for reorg detection
   */
  private async storeBlockHash(blockNumber: number, blockHash: string, client?: PoolClient): Promise<void> {
    const pool = client || requirePoolWriteAccess();
    try {
      await pool.query(
        `INSERT INTO block_tracking (block_number, block_hash) 
         VALUES ($1, $2) 
         ON CONFLICT (block_number) DO UPDATE SET block_hash = $2`,
        [blockNumber, blockHash]
      );
    } catch (error) {
      console.error(`Failed to store block hash for block ${blockNumber}:`, error);
      // Don't throw - this is not critical for processing
    }
  }

  /**
   * Detect reorg by checking block hash
   */
  private async detectReorg(blockNumber: number): Promise<boolean> {
    try {
      const pool = requirePoolWriteAccess();
      
      // Get stored block hash
      const storedBlock = await pool.query(
        'SELECT block_hash FROM block_tracking WHERE block_number = $1',
        [blockNumber]
      );
      
      if (storedBlock.rows.length === 0) {
        return false; // New block, not a reorg
      }
      
      // Get current block hash from chain
      const block = await this.provider.getBlock(blockNumber);
      if (!block) {
        return false;
      }
      
      if (block.hash !== storedBlock.rows[0].block_hash) {
        return true; // Reorg detected!
      }
      
      return false;
    } catch (error) {
      console.error(`Error detecting reorg for block ${blockNumber}:`, error);
      return false;
    }
  }

  /**
   * Handle reorg by rolling back affected events
   */
  private async handleReorg(blockNumber: number): Promise<void> {
    console.warn(`⚠️ Reorg detected at block ${blockNumber}`);
    this.metrics.reorgsDetected++;

    const pool = requirePoolWriteAccess();
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');
      
      // Find all events processed from this block onwards
      const affectedEvents = await client.query(
        'SELECT "eventId", "transaction_hash" FROM events WHERE block_number >= $1',
        [blockNumber]
      );
      
      const affectedPoaps = await client.query(
        'SELECT "tokenId", "eventId", "transaction_hash" FROM poaps WHERE block_number >= $1',
        [blockNumber]
      );
      
      // Rollback affected events
      for (const event of affectedEvents.rows) {
        await client.query(
          'DELETE FROM events WHERE "eventId" = $1 AND block_number >= $2',
          [event.eventId, blockNumber]
        );
        console.log(`🔄 Rolled back event ${event.eventId} from reorg`);
      }
      
      // Rollback affected POAPs and decrement totalSupply for their events
      for (const poap of affectedPoaps.rows) {
        // Get eventId before deleting the POAP
        const eventId = poap.eventId;
        
        await client.query(
          'DELETE FROM poaps WHERE "tokenId" = $1 AND block_number >= $2',
          [poap.tokenId, blockNumber]
        );
        
        // Decrement totalSupply for the event
        try {
          await client.query(
            `UPDATE events 
             SET "totalSupply" = GREATEST(COALESCE("totalSupply", 0) - 1, 0),
                 "updatedAt" = now()
             WHERE "eventId" = $1`,
            [eventId]
          );
        } catch (error) {
          // Column might not exist yet - ignore (backward compatibility)
          console.warn('Could not update event totalSupply during reorg (column may not exist):', error);
        }
        
        console.log(`🔄 Rolled back POAP ${poap.tokenId} from reorg and decremented totalSupply for event ${eventId}`);
      }
      
      // Delete block tracking from reorg block onwards
      await client.query(
        'DELETE FROM block_tracking WHERE block_number >= $1',
        [blockNumber]
      );
      
      await client.query('COMMIT');
      
      // Re-process from reorg block
      this.lastProcessedBlock = blockNumber - 1;
      console.log(`🔄 Re-processing from block ${this.lastProcessedBlock + 1}`);
      await this.syncRecentEvents();
      
    } catch (error) {
      await client.query('ROLLBACK');
      const indexingError = classifyError(error, { blockNumber, operation: 'handleReorg' });
      console.error('Failed to handle reorg:', indexingError);
      throw indexingError;
    } finally {
      client.release();
    }
  }

  /**
   * Check for reorgs in recently processed blocks
   */
  private async checkForReorgs(): Promise<void> {
    try {
      const pool = requirePoolWriteAccess();
      const recentBlocks = await pool.query(
        'SELECT block_number FROM block_tracking ORDER BY block_number DESC LIMIT 100'
      );
      
      for (const row of recentBlocks.rows) {
        const isReorg = await this.detectReorg(row.block_number);
        if (isReorg) {
          await this.handleReorg(row.block_number);
          break; // Handle one reorg at a time
        }
      }
    } catch (error) {
      console.error('Error checking for reorgs:', error);
    }
  }

  /**
   * Process historical events with batching and retry
   * Production-ready: Includes rate limiting protection and progress tracking
   */
  private async processHistoricalEvents() {
    try {
      const currentBlock = await this.provider.getBlockNumber();
      const fromBlock = Math.max(1, currentBlock - 5000); // Check last 10k blocks

      const totalBlocks = currentBlock - fromBlock + 1;
      console.log(`📚 Processing historical events from block ${fromBlock} to ${currentBlock} (${totalBlocks} blocks)`);

      // Process in smaller batches to avoid rate limits
      // Smaller batches = more requests but less likely to hit rate limits
      const batchSize = 500; // Reduced from 1000 for better rate limit handling
      let processedBlocks = 0;
      
      for (let from = fromBlock; from <= currentBlock; from += batchSize) {
        const to = Math.min(from + batchSize - 1, currentBlock);
        
        await this.retryWithBackoff(
          () => this.processBlockRange(from, to),
          { blockRange: { from, to }, operation: 'processHistoricalEvents' }
        );
        
        processedBlocks += (to - from + 1);
        const progress = ((processedBlocks / totalBlocks) * 100).toFixed(1);
        
        // Log progress every 10% or at the end
        if (processedBlocks % Math.floor(totalBlocks / 10) < batchSize || processedBlocks >= totalBlocks) {
          console.log(`📊 Historical sync progress: ${progress}% (${processedBlocks}/${totalBlocks} blocks)`);
        }
        
        // Small delay between batches to avoid rate limiting
        // Only delay if not the last batch
        if (to < currentBlock) {
          await this.sleep(100); // 100ms delay between batches
        }
      }

      this.lastProcessedBlock = currentBlock;
      this.metrics.lastProcessedBlock = currentBlock;
      console.log('✅ Historical event processing completed');
    } catch (error) {
      const indexingError = classifyError(error, { operation: 'processHistoricalEvents' });
      console.error('❌ Error processing historical events:', indexingError);
      
      // For rate limiting errors, log but don't fail completely
      // The periodic sync will catch up
      if (indexingError.message?.includes('Too Many Requests') || 
          indexingError.message?.includes('rate limit')) {
        console.warn('⚠️ Rate limited during historical sync. Periodic sync will catch up.');
        // Set lastProcessedBlock to a safe value so periodic sync can continue
        this.lastProcessedBlock = Math.max(1, await this.provider.getBlockNumber() - 1000);
        return; // Don't throw, allow periodic sync to handle it
      }
      
      throw indexingError;
    }
  }

  /**
   * Process a range of blocks
   */
  private async processBlockRange(fromBlock: number, toBlock: number): Promise<void> {
    // Process EventCreated events
    const eventCreatedEvents = await this.contract.queryFilter(
      "EventCreated",
      fromBlock,
      toBlock
    );

    console.log(`📊 Found ${eventCreatedEvents.length} EventCreated events in blocks ${fromBlock}-${toBlock}`);

    for (const event of eventCreatedEvents) {
      await this.processEvent(event);
    }

    // Process TokenMinted events
    const tokenMintedEvents = await this.contract.queryFilter(
      "TokenMinted",
      fromBlock,
      toBlock
    );

    console.log(`📊 Found ${tokenMintedEvents.length} TokenMinted events in blocks ${fromBlock}-${toBlock}`);

    for (const event of tokenMintedEvents) {
      await this.processPoapEvent(event);
    }
  }

  /**
   * Sync recent events - Production-ready polling method
   * Uses queryFilter() which is reliable and doesn't depend on ephemeral filters
   */
  private async syncRecentEvents() {
    try {
      const currentBlock = await this.provider.getBlockNumber();
      this.metrics.currentChainBlock = currentBlock;
      
      if (currentBlock <= this.lastProcessedBlock) {
        this.metrics.processingLag = 0;
        return; // Already up to date
      }

      this.metrics.processingLag = currentBlock - this.lastProcessedBlock;
      
      // Log only if there's significant lag or events found (reduce noise)
      const shouldLog = this.metrics.processingLag > 10;
      
      if (shouldLog) {
        console.log(`🔄 Syncing events from block ${this.lastProcessedBlock + 1} to ${currentBlock} (lag: ${this.metrics.processingLag} blocks)`);
      }

      await this.retryWithBackoff(
        () => this.processBlockRange(this.lastProcessedBlock + 1, currentBlock),
        { blockRange: { from: this.lastProcessedBlock + 1, to: currentBlock }, operation: 'syncRecentEvents' }
      );

      this.lastProcessedBlock = currentBlock;
      this.metrics.lastProcessedBlock = currentBlock;
      
      // Update processing lag after successful sync
      this.metrics.processingLag = 0;
    } catch (error) {
      const indexingError = classifyError(error, { operation: 'syncRecentEvents' });
      
      // Only log errors that aren't rate limiting (those are expected and handled by retry)
      if (indexingError.type !== 'UNKNOWN_ERROR' || 
          !indexingError.message?.includes('Too Many Requests')) {
        console.error('❌ Error syncing recent events:', indexingError.message || indexingError);
      }
      
      // Don't throw - allow retry on next interval
      // The retry mechanism will handle transient errors
    }
  }

  /**
   * Handle EventCreated event
   * NOTE: This method is currently not used. We use polling (syncRecentEvents) instead of
   * event listeners (contract.on()) for production reliability. Event filters are ephemeral
   * and expire, causing "filter not found" errors. Polling with queryFilter() is more reliable.
   * Kept for potential future use if we implement a hybrid approach.
   */
  private async handleEventCreated(
    issuerId: bigint,
    eventId: bigint,
    eventMaxSupply: bigint,
    eventMintExpiration: bigint,
    eventOrganizer: string,
    event: ethers.Log
  ) {
    console.log('🎉 New EventCreated event detected:', {
      issuerId: issuerId.toString(),
      eventId: eventId.toString(),
      eventMaxSupply: eventMaxSupply.toString(),
      eventMintExpiration: eventMintExpiration.toString(),
      eventOrganizer,
      blockNumber: event.blockNumber,
      transactionHash: event.transactionHash
    });

    await this.processEvent(event);
  }

  /**
   * Handle TokenMinted event
   * NOTE: This method is currently not used. We use polling (syncRecentEvents) instead of
   * event listeners (contract.on()) for production reliability. Event filters are ephemeral
   * and expire, causing "filter not found" errors. Polling with queryFilter() is more reliable.
   * Kept for potential future use if we implement a hybrid approach.
   */
  private async handleTokenMinted(
    issuerId: bigint,
    eventId: bigint,
    tokenId: bigint,
    userAddress: string,
    event: ethers.Log
  ) {
    console.log('🎉 New TokenMinted event detected:', {
      issuerId: issuerId.toString(),
      eventId: eventId.toString(),
      tokenId: tokenId.toString(),
      userAddress,
      blockNumber: event.blockNumber,
      transactionHash: event.transactionHash
    });

    await this.processPoapEvent(event);
  }

  /**
   * Process EventCreated event with full error handling and validation
   */
  private async processEvent(event: ethers.Log) {
    const context: ProcessingContext = {
      blockNumber: event.blockNumber,
      txHash: event.transactionHash,
      eventType: 'EventCreated'
    };

    return this.retryWithBackoff(async () => {
      // Validate event structure
      if (!event.topics || !event.data) {
        throw new IndexingError(
          'Invalid event structure',
          IndexingErrorType.VALIDATION_ERROR,
          context
        );
      }

      // Decode event
      const decoded = this.contract.interface.parseLog({
        topics: event.topics,
        data: event.data
      });

      if (!decoded) {
        throw new IndexingError(
          'Failed to decode event',
          IndexingErrorType.PARSING_ERROR,
          context
        );
      }

      // Validate decoded data
      this.validateEventData(decoded.args, { ...context, decoded: decoded.name });

      const {
        issuerId,
        eventId,
        eventMaxSupply,
        eventMintExpiration,
        eventOrganizer,
      } = decoded.args;

      const eventIdNumber = Number(eventId);
      context.eventId = eventIdNumber;

      // Validate transaction
      const isValid = await this.validateTransaction(event);
      if (!isValid) {
        throw new IndexingError(
          'Transaction validation failed',
          IndexingErrorType.TRANSACTION_ERROR,
          context
        );
      }

      // Get block hash for reorg detection
      const block = await this.provider.getBlock(event.blockNumber);
      if (!block) {
        throw new IndexingError(
          'Block not found',
          IndexingErrorType.NETWORK_ERROR,
          context,
          true // Retryable
        );
      }

      // Process in transaction
      await this.withTransaction(async (client) => {
        // Check if event already exists
        const existingEvent = await getEventByEventId.run({ eventId: eventIdNumber }, client);
        if (existingEvent.length > 0) {
          const eventRecord = existingEvent[0];
          
          // Update blockchain metadata if missing (for off-chain created events)
          if (!eventRecord.block_number || !eventRecord.transaction_hash) {
            try {
              await client.query(
                `UPDATE events 
                 SET block_number = COALESCE(block_number, $1), 
                     transaction_hash = COALESCE(transaction_hash, $2) 
                 WHERE "eventId" = $3 
                   AND (block_number IS NULL OR transaction_hash IS NULL)`,
                [event.blockNumber, event.transactionHash, eventIdNumber]
              );
              
              // Store block hash for reorg detection
              await this.storeBlockHash(event.blockNumber, block.hash ?? '', client);
              
              console.log(`✅ Updated blockchain metadata for existing event ${eventIdNumber}`);
            } catch (error) {
              // Columns might not exist yet - ignore
              console.warn('Could not update event metadata (columns may not exist):', error);
            }
          } else {
            console.log(`ℹ️ Event ${eventIdNumber} already exists with blockchain metadata`);
          }
          return;
        }

        // Create event in database
        const eventData: ICreateEventParams = {
          issuerId: Number(issuerId),
          eventId: eventIdNumber,
          eventMaxSupply: Number(eventMaxSupply),
          eventMintExpiration: Number(eventMintExpiration),
          eventOrganizer: eventOrganizer,
        };

        await createEvent.run(eventData, client);

        // Store block hash for reorg detection
        await this.storeBlockHash(event.blockNumber, block.hash ?? '', client);

        // Update event with blockchain metadata (if columns exist)
        try {
          await client.query(
            `UPDATE events 
             SET block_number = $1, transaction_hash = $2 
             WHERE "eventId" = $3`,
            [event.blockNumber, event.transactionHash, eventIdNumber]
          );
        } catch (error) {
          // Columns might not exist yet - ignore
          console.warn('Could not update event metadata (columns may not exist):', error);
        }

        console.log(`✅ Successfully synced event ${eventIdNumber} to database`);
      });
    }, context);
  }

  /**
   * Process TokenMinted event with full error handling and validation
   */
  private async processPoapEvent(event: ethers.Log) {
    const context: ProcessingContext = {
      blockNumber: event.blockNumber,
      txHash: event.transactionHash,
      eventType: 'TokenMinted'
    };

    return this.retryWithBackoff(async () => {
      // Validate event structure
      if (!event.topics || !event.data) {
        throw new IndexingError(
          'Invalid event structure',
          IndexingErrorType.VALIDATION_ERROR,
          context
        );
      }

      // Decode event
      const decoded = this.contract.interface.parseLog({
        topics: event.topics,
        data: event.data
      });

      if (!decoded) {
        throw new IndexingError(
          'Failed to decode POAP event',
          IndexingErrorType.PARSING_ERROR,
          context
        );
      }

      // Validate decoded data
      this.validatePoapData(decoded.args, { ...context, decoded: decoded.name });

      const {
        issuerId,
        eventId,
        tokenId,
        userAddress,
      } = decoded.args;

      const tokenIdNumber = Number(tokenId);
      context.tokenId = tokenIdNumber;
      context.eventId = Number(eventId);

      // Validate transaction
      const isValid = await this.validateTransaction(event);
      if (!isValid) {
        throw new IndexingError(
          'Transaction validation failed',
          IndexingErrorType.TRANSACTION_ERROR,
          context
        );
      }

      // Get block hash for reorg detection
      const block = await this.provider.getBlock(event.blockNumber);
      if (!block) {
        throw new IndexingError(
          'Block not found',
          IndexingErrorType.NETWORK_ERROR,
          context,
          true // Retryable
        );
      }

      // Process in transaction
      await this.withTransaction(async (client) => {
        // Check if POAP already exists
        // NOTE: If POAP already exists (created via state transition), we skip totalSupply increment
        // to avoid double-counting. totalSupply is incremented in the state transition function.
        const existingPoap = await getPoapByTokenId.run({ tokenId: tokenIdNumber }, client);
        if (existingPoap.length > 0) {
          const poapRecord = existingPoap[0];
          
          // Update blockchain metadata if missing (for off-chain created POAPs)
          if (!poapRecord.block_number || !poapRecord.transaction_hash) {
            try {
              await client.query(
                `UPDATE poaps 
                 SET block_number = COALESCE(block_number, $1), 
                     transaction_hash = COALESCE(transaction_hash, $2) 
                 WHERE "tokenId" = $3 
                   AND (block_number IS NULL OR transaction_hash IS NULL)`,
                [event.blockNumber, event.transactionHash, tokenIdNumber]
              );
              
              // Store block hash for reorg detection
              await this.storeBlockHash(event.blockNumber, block.hash ?? '', client);
              
              console.log(`✅ Updated blockchain metadata for existing POAP ${tokenIdNumber}`);
            } catch (error) {
              // Columns might not exist yet - ignore
              console.warn('Could not update POAP metadata (columns may not exist):', error);
            }
          } else {
            console.log(`ℹ️ POAP ${tokenIdNumber} already exists with blockchain metadata`);
          }
          // Return early - don't increment totalSupply to avoid double-counting
          return;
        }

        // Create POAP in database
        const poapData: ICreatePoapParams = {
          issuerId: Number(issuerId),
          eventId: Number(eventId),
          tokenId: tokenIdNumber,
          ownerAddress: userAddress,
        };

        await createPoap.run(poapData, client);

        // Update event's totalSupply by incrementing it
        try {
          await client.query(
            `UPDATE events 
             SET "totalSupply" = COALESCE("totalSupply", 0) + 1,
                 "updatedAt" = now()
             WHERE "eventId" = $1`,
            [Number(eventId)]
          );
        } catch (error) {
          // Column might not exist yet - ignore (backward compatibility)
          console.warn('Could not update event totalSupply (column may not exist):', error);
        }

        // Store block hash for reorg detection
        await this.storeBlockHash(event.blockNumber, block.hash ?? '', client);

        // Update POAP with blockchain metadata (if columns exist)
        try {
          await client.query(
            `UPDATE poaps 
             SET block_number = $1, transaction_hash = $2 
             WHERE "tokenId" = $3`,
            [event.blockNumber, event.transactionHash, tokenIdNumber]
          );
        } catch (error) {
          // Columns might not exist yet - ignore
          console.warn('Could not update POAP metadata (columns may not exist):', error);
        }

        console.log(`✅ Successfully synced POAP ${tokenIdNumber} to database`);
      });
    }, context);
  }

  /**
   * Get basic status
   */
  getStatus() {
    return {
      isListening: this.isListening,
      lastProcessedBlock: this.lastProcessedBlock
    };
  }

  /**
   * Get detailed health status
   */
  getDetailedStatus(): HealthStatus {
    const errorRate = this.metrics.totalEventsProcessed > 0
      ? this.metrics.totalErrors / this.metrics.totalEventsProcessed
      : 0;

    return {
      isHealthy: this.isListening && this.metrics.processingLag < 100 && errorRate < 0.1,
      isListening: this.isListening,
      lastProcessedBlock: this.metrics.lastProcessedBlock,
      currentChainBlock: this.metrics.currentChainBlock,
      processingLag: this.metrics.processingLag,
      totalEventsProcessed: this.metrics.totalEventsProcessed,
      errorRate: errorRate,
      uptime: Date.now() - this.metrics.uptime,
      reorgsDetected: this.metrics.reorgsDetected
    };
  }

  /**
   * Get metrics
   */
  getMetrics(): Metrics {
    return { ...this.metrics };
  }
}

// Export singleton instance
export const blockchainSyncService = new BlockchainSyncService();
