import { Controller, Route, Post, Get } from 'tsoa';
import { blockchainSyncService } from '../../services/blockchainSync.service';
import { IErrorResponse } from "@game/utils";

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
}







