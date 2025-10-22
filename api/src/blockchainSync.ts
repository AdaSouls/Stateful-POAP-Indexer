import { blockchainSyncService } from './services/blockchainSync.service';

// Auto-start blockchain sync when the module is imported
export async function initializeBlockchainSync() {
  try {
    console.log('🚀 Initializing blockchain synchronization...');
    await blockchainSyncService.startListening();
    console.log('✅ Blockchain synchronization initialized successfully');
  } catch (error) {
    console.error('❌ Failed to initialize blockchain synchronization:', error);
  }
}

// Export the service for manual control
export { blockchainSyncService };







