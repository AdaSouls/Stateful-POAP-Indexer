import { RegisterRoutes } from './tsoa/routes';
import { initializeBlockchainSync } from './blockchainSync';

// Initialize blockchain sync when the API starts
initializeBlockchainSync();

export default RegisterRoutes;
