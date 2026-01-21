// Mock @paima/node-sdk/db before importing
jest.mock('@paima/node-sdk/db', () => ({
  getConnection: jest.fn(() => ({
    query: jest.fn(() => Promise.resolve({ rows: [] })),
  })),
}));

import { CreatePoapController } from '@game/api/src/controllers/poaps/createPoap';
import { requirePoolWriteAccess, createPoap } from '@game/db';
import { createMockPool, createMockPoap } from '../../../utils/testHelpers';

// Mock the database module
jest.mock('@game/db', () => ({
  requirePoolWriteAccess: jest.fn(),
  createPoap: {
    run: jest.fn(),
  },
}));

describe('CreatePoapController', () => {
  let controller: CreatePoapController;
  let mockPool: any;

  beforeEach(() => {
    controller = new CreatePoapController();
    mockPool = createMockPool();
    (requirePoolWriteAccess as jest.Mock).mockReturnValue(mockPool);
    jest.clearAllMocks();
  });

  describe('post', () => {
    it('should create a new POAP successfully', async () => {
      const poapData = {
        issuerId: 1,
        eventId: 100,
        tokenId: 500,
        ownerAddress: '0x9876543210987654321098765432109876543210',
      };

      const mockPoap = createMockPoap(poapData);
      (createPoap.run as jest.Mock).mockResolvedValue([mockPoap]);

      const result = await controller.post(poapData);

      expect(requirePoolWriteAccess).toHaveBeenCalled();
      expect(createPoap.run).toHaveBeenCalledWith(poapData, mockPool);
      expect(result).toEqual(mockPoap);
    });

    it('should return error response on database error', async () => {
      const poapData = {
        issuerId: 1,
        eventId: 100,
        tokenId: 500,
        ownerAddress: '0x9876543210987654321098765432109876543210',
      };

      const dbError = new Error('Database constraint violation');
      (createPoap.run as jest.Mock).mockRejectedValue(dbError);

      const result = await controller.post(poapData);

      expect(result).toEqual({
        error: 'Failed to create poap',
        details: 'Database constraint violation',
      });
    });

    it('should handle missing required fields gracefully', async () => {
      const incompletePoapData = {
        issuerId: 1,
        // Missing eventId, tokenId, ownerAddress
      };

      const dbError = new Error('Missing required fields');
      (createPoap.run as jest.Mock).mockRejectedValue(dbError);

      const result = await controller.post(incompletePoapData as any);

      expect(result).toEqual({
        error: 'Failed to create poap',
        details: 'Missing required fields',
      });
    });
  });
});


