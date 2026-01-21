// Mock @paima/node-sdk/db before importing
jest.mock('@paima/node-sdk/db', () => ({
  getConnection: jest.fn(() => ({
    query: jest.fn(() => Promise.resolve({ rows: [] })),
  })),
}));

import { AllPoapsController } from '@game/api/src/controllers/poaps/getAllPoaps';
import { requirePool, getAllPoaps } from '@game/db';
import { createMockPool, createMockPoap } from '../../../utils/testHelpers';

// Mock the database module
jest.mock('@game/db', () => ({
  requirePool: jest.fn(),
  getAllPoaps: {
    run: jest.fn(),
  },
}));

describe('AllPoapsController', () => {
  let controller: AllPoapsController;
  let mockPool: any;

  beforeEach(() => {
    controller = new AllPoapsController();
    mockPool = createMockPool();
    (requirePool as jest.Mock).mockReturnValue(mockPool);
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('should return all POAPs successfully', async () => {
      const mockPoaps = [
        createMockPoap({ tokenId: 100 }),
        createMockPoap({ tokenId: 101 }),
        createMockPoap({ tokenId: 102 }),
      ];
      (getAllPoaps.run as jest.Mock).mockResolvedValue(mockPoaps);

      const result = await controller.getAll();

      expect(requirePool).toHaveBeenCalled();
      expect(getAllPoaps.run).toHaveBeenCalledWith(undefined, mockPool);
      expect(result).toEqual(mockPoaps);
      expect(Array.isArray(result)).toBe(true);
    });

    it('should return empty array when no POAPs exist', async () => {
      (getAllPoaps.run as jest.Mock).mockResolvedValue([]);

      const result = await controller.getAll();

      expect(result).toEqual([]);
      expect(Array.isArray(result)).toBe(true);
    });

    it('should return error response on database error', async () => {
      const dbError = new Error('Database connection failed');
      (getAllPoaps.run as jest.Mock).mockRejectedValue(dbError);

      const result = await controller.getAll();

      expect(result).toEqual({
        error: 'Failed to get poaps',
        details: 'Database connection failed',
      });
    });
  });
});


