import { ethers } from 'ethers';
import { requirePoolWriteAccess, createEvent, ICreateEventParams, getEventByEventId, createPoap, ICreatePoapParams, getPoapByTokenId } from '@game/db';

// Contract configuration
const POAP_CONTRACT_ADDRESS = "0x68FF54eCa3C4b71ecE479306F199816f5f4c17d0";
const providerRPC = {
  name: "Amoy",
  rpc: "https://rpc-amoy.polygon.technology",
  chainId: 80002,
};

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
        "name": "to",
        "type": "address"
      }
    ],
    "name": "TokenMinted",
    "type": "event"
  }
];

export class BlockchainSyncService {
  private provider: ethers.JsonRpcProvider;
  private contract: ethers.Contract;
  private isListening: boolean = false;
  private lastProcessedBlock: number = 0;
  private syncInterval: NodeJS.Timeout | null = null;

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

      // Start listening for new events
      this.contract.on("EventCreated", this.handleEventCreated.bind(this));
      this.contract.on("TokenMinted", this.handleTokenMinted.bind(this));
      
      this.isListening = true;
      console.log('✅ Blockchain event listener started');

      // Set up periodic sync as backup
      this.syncInterval = setInterval(() => {
        this.syncRecentEvents();
      }, 30000); // Sync every 30 seconds

    } catch (error) {
      console.error('❌ Failed to start blockchain sync:', error);
    }
  }

  async stopListening() {
    if (!this.isListening) return;

    this.contract.removeAllListeners("EventCreated");
    this.contract.removeAllListeners("TokenMinted");
    
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
    }
    
    this.isListening = false;
    console.log('🛑 Blockchain event listener stopped');
  }

  private async processHistoricalEvents() {
    try {
      const currentBlock = await this.provider.getBlockNumber();
      const fromBlock = Math.max(1, currentBlock - 50000); // Check last 50k blocks

      console.log(`📚 Processing historical events from block ${fromBlock} to ${currentBlock}`);

      // Process EventCreated events
      const eventCreatedEvents = await this.contract.queryFilter(
        "EventCreated",
        fromBlock,
        "latest"
      );

      console.log(`📊 Found ${eventCreatedEvents.length} historical EventCreated events`);

      for (const event of eventCreatedEvents) {
        await this.processEvent(event);
      }

      // Process TokenMinted events
      const tokenMintedEvents = await this.contract.queryFilter(
        "TokenMinted",
        fromBlock,
        "latest"
      );

      console.log(`📊 Found ${tokenMintedEvents.length} historical TokenMinted events`);

      for (const event of tokenMintedEvents) {
        await this.processPoapEvent(event);
      }

      this.lastProcessedBlock = currentBlock;
    } catch (error) {
      console.error('❌ Error processing historical events:', error);
    }
  }

  private async syncRecentEvents() {
    try {
      const currentBlock = await this.provider.getBlockNumber();
      
      if (currentBlock <= this.lastProcessedBlock) return;

      console.log(`🔄 Syncing events from block ${this.lastProcessedBlock + 1} to ${currentBlock}`);

      // Sync EventCreated events
      const eventCreatedEvents = await this.contract.queryFilter(
        "EventCreated",
        this.lastProcessedBlock + 1,
        currentBlock
      );

      for (const event of eventCreatedEvents) {
        await this.processEvent(event);
      }

      // Sync TokenMinted events
      const tokenMintedEvents = await this.contract.queryFilter(
        "TokenMinted",
        this.lastProcessedBlock + 1,
        currentBlock
      );

      for (const event of tokenMintedEvents) {
        await this.processPoapEvent(event);
      }

      this.lastProcessedBlock = currentBlock;
    } catch (error) {
      console.error('❌ Error syncing recent events:', error);
    }
  }

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

  private async handleTokenMinted(
    issuerId: bigint,
    eventId: bigint,
    tokenId: bigint,
    to: string,
    event: ethers.Log
  ) {
    console.log('🎉 New TokenMinted event detected:', {
      issuerId: issuerId.toString(),
      eventId: eventId.toString(),
      tokenId: tokenId.toString(),
      to,
      blockNumber: event.blockNumber,
      transactionHash: event.transactionHash
    });

    await this.processPoapEvent(event);
  }

  private async processEvent(event: ethers.Log) {
    try {
      const decoded = this.contract.interface.parseLog({
        topics: event.topics,
        data: event.data
      });

      if (!decoded) {
        console.error('❌ Failed to decode event');
        return;
      }

      const {
        issuerId,
        eventId,
        eventMaxSupply,
        eventMintExpiration,
        eventOrganizer,
      } = decoded.args;

      const eventIdNumber = Number(eventId);

      // Check if event already exists in database
      const pool = requirePoolWriteAccess();
      
      try {
        const existingEvent = await getEventByEventId.run({ eventId: eventIdNumber }, pool);
        if (existingEvent.length > 0) {
          console.log(`ℹ️ Event ${eventIdNumber} already exists in database`);
          return;
        }
      } catch (error) {
        // Event doesn't exist, continue with creation
        console.log(`ℹ️ Event ${eventIdNumber} not found in database, creating...`);
      }

      // Create event in database
      const eventData: ICreateEventParams = {
        issuerId: Number(issuerId),
        eventId: eventIdNumber,
        eventMaxSupply: Number(eventMaxSupply),
        eventMintExpiration: Number(eventMintExpiration),
        eventOrganizer: eventOrganizer,
      };

      try {
        await createEvent.run(eventData, pool);
        console.log(`✅ Successfully synced event ${eventIdNumber} to database`);
      } catch (error: any) {
        if (error.message?.includes('duplicate') || error.code === '23505') {
          console.log(`ℹ️ Event ${eventIdNumber} already exists in database (duplicate key)`);
        } else {
          console.error(`❌ Failed to sync event ${eventIdNumber}:`, error);
        }
      }

    } catch (error) {
      console.error('❌ Error processing event:', error);
    }
  }

  private async processPoapEvent(event: ethers.Log) {
    try {
      const decoded = this.contract.interface.parseLog({
        topics: event.topics,
        data: event.data
      });

      if (!decoded) {
        console.error('❌ Failed to decode POAP event');
        return;
      }

      const {
        issuerId,
        eventId,
        tokenId,
        to,
      } = decoded.args;

      const tokenIdNumber = Number(tokenId);

      // Check if POAP already exists in database
      const pool = requirePoolWriteAccess();
      
      try {
        const existingPoap = await getPoapByTokenId.run({ tokenId: tokenIdNumber }, pool);
        if (existingPoap.length > 0) {
          console.log(`ℹ️ POAP ${tokenIdNumber} already exists in database`);
          return;
        }
      } catch (error) {
        // POAP doesn't exist, continue with creation
        console.log(`ℹ️ POAP ${tokenIdNumber} not found in database, creating...`);
      }

      // Create POAP in database
      const poapData: ICreatePoapParams = {
        issuerId: Number(issuerId),
        eventId: Number(eventId),
        tokenId: tokenIdNumber,
        ownerAddress: to,
      };

      try {
        await createPoap.run(poapData, pool);
        console.log(`✅ Successfully synced POAP ${tokenIdNumber} to database`);
      } catch (error: any) {
        if (error.message?.includes('duplicate') || error.code === '23505') {
          console.log(`ℹ️ POAP ${tokenIdNumber} already exists in database (duplicate key)`);
        } else {
          console.error(`❌ Failed to sync POAP ${tokenIdNumber}:`, error);
        }
      }

    } catch (error) {
      console.error('❌ Error processing POAP event:', error);
    }
  }

  getStatus() {
    return {
      isListening: this.isListening,
      lastProcessedBlock: this.lastProcessedBlock
    };
  }
}

// Export singleton instance
export const blockchainSyncService = new BlockchainSyncService();





