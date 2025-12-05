import { Controller, Route, Post, Get } from 'tsoa';
import { blockchainSyncService } from '../../services/blockchainSync.service';
import { requirePoolWriteAccess } from '@game/db';
import { IErrorResponse } from "@game/utils";

interface HealthStatus {
  status: 'healthy' | 'unhealthy' | 'degraded';
  indexing: {
    isRunning: boolean;
    lastProcessedBlock: number;
    currentChainBlock: number;
    lag: number;
    eventsProcessed: number;
    errorRate: number;
    uptime: number;
    reorgsDetected: number;
  };
  database: {
    connected: boolean;
    latency?: number;
  };
  blockchain: {
    connected: boolean;
    chainId?: number;
    blockNumber?: number;
  };
  timestamp: string;
}

@Route('blockchain')
export class BlockchainSyncController extends Controller {
  @Post('start-sync')
  public async startSync(): Promise<{ success: boolean; message: string } | IErrorResponse> {
    try {
      await blockchainSyncService.startListening();
      return {
        success: true,
        message: 'Blockchain synchronization started successfully'
      };
    } catch (error: any) {
      console.error("❌ Error starting blockchain sync:", error);
      return {
        error: 'Failed to start blockchain sync',
        details: error.message ?? error,
      };
    }
  }

  @Post('stop-sync')
  public async stopSync(): Promise<{ success: boolean; message: string } | IErrorResponse> {
    try {
      await blockchainSyncService.stopListening();
      return {
        success: true,
        message: 'Blockchain synchronization stopped successfully'
      };
    } catch (error: any) {
      console.error("❌ Error stopping blockchain sync:", error);
      return {
        error: 'Failed to stop blockchain sync',
        details: error.message ?? error,
      };
    }
  }

  @Get('sync-status')
  public async getSyncStatus(): Promise<{ 
    isListening: boolean; 
    lastProcessedBlock: number;
    message: string 
  } | IErrorResponse> {
    try {
      const status = blockchainSyncService.getStatus();
      return {
        isListening: status.isListening,
        lastProcessedBlock: status.lastProcessedBlock,
        message: status.isListening ? 'Sync is running' : 'Sync is stopped'
      };
    } catch (error: any) {
      console.error("❌ Error getting sync status:", error);
      return {
        error: 'Failed to get sync status',
        details: error.message ?? error,
      };
    }
  }

  @Get('health')
  public async getHealth(): Promise<HealthStatus | IErrorResponse> {
    try {
      const status = blockchainSyncService.getDetailedStatus();
      
      // Check database health
      const dbHealth = await this.checkDatabaseHealth();
      
      // Check blockchain health
      const chainHealth = await this.checkChainHealth();
      
      // Determine overall status
      let overallStatus: 'healthy' | 'unhealthy' | 'degraded' = 'healthy';
      if (!status.isListening || !dbHealth.connected || !chainHealth.connected) {
        overallStatus = 'unhealthy';
      } else if (status.processingLag > 100 || status.errorRate > 0.1) {
        overallStatus = 'degraded';
      }
      
      return {
        status: overallStatus,
        indexing: {
          isRunning: status.isListening,
          lastProcessedBlock: status.lastProcessedBlock,
          currentChainBlock: status.currentChainBlock,
          lag: status.processingLag,
          eventsProcessed: status.totalEventsProcessed,
          errorRate: status.errorRate,
          uptime: status.uptime,
          reorgsDetected: status.reorgsDetected
        },
        database: dbHealth,
        blockchain: chainHealth,
        timestamp: new Date().toISOString()
      };
    } catch (error: any) {
      console.error("❌ Error getting health status:", error);
      return {
        error: 'Failed to get health status',
        details: error.message ?? error,
      };
    }
  }

  @Get('metrics')
  public async getMetrics(): Promise<any | IErrorResponse> {
    try {
      const metrics = blockchainSyncService.getMetrics();
      const status = blockchainSyncService.getDetailedStatus();
      
      return {
        ...metrics,
        errorsByType: Object.fromEntries(metrics.errorsByType),
        errorRate: status.errorRate,
        processingLag: status.processingLag
      };
    } catch (error: any) {
      console.error("❌ Error getting metrics:", error);
      return {
        error: 'Failed to get metrics',
        details: error.message ?? error,
      };
    }
  }

  /**
   * Check database connection health
   */
  private async checkDatabaseHealth(): Promise<{ connected: boolean; latency?: number }> {
    try {
      const startTime = Date.now();
      const pool = requirePoolWriteAccess();
      await pool.query('SELECT 1');
      const latency = Date.now() - startTime;
      
      return {
        connected: true,
        latency
      };
    } catch (error) {
      console.error('Database health check failed:', error);
      return {
        connected: false
      };
    }
  }

  /**
   * Check blockchain connection health
   */
  private async checkChainHealth(): Promise<{ connected: boolean; chainId?: number; blockNumber?: number }> {
    try {
      const provider = blockchainSyncService.getProvider();
      const blockNumber = await provider.getBlockNumber();
      const network = await provider.getNetwork();
      
      return {
        connected: true,
        chainId: Number(network.chainId),
        blockNumber
      };
    } catch (error) {
      console.error('Blockchain health check failed:', error);
      return {
        connected: false
      };
    }
  }
}
