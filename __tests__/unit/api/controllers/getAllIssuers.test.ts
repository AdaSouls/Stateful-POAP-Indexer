// Mock @paima/node-sdk/db before importing
jest.mock('@paima/node-sdk/db', () => ({
  getConnection: jest.fn(() => ({
    query: jest.fn(() => Promise.resolve({ rows: [] })),
  })),
}));

import { AllIssuersController } from '@game/api/src/controllers/issuers/getAllIssuers';
import { requirePool, getAllIssuers } from '@game/db';
import { createMockPool, createMockIssuer } from '../../../utils/testHelpers';

// Mock the database module
jest.mock('@game/db', () => ({
  requirePool: jest.fn(),
  getAllIssuers: {
    run: jest.fn(),
  },
}));

describe('AllIssuersController', () => {
  let controller: AllIssuersController;
  let mockPool: any;

  beforeEach(() => {
    controller = new AllIssuersController();
    mockPool = createMockPool();
    (requirePool as jest.Mock).mockReturnValue(mockPool);
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('should return all issuers successfully', async () => {
      const mockIssuers = [
        createMockIssuer({ issuerId: 1 }),
        createMockIssuer({ issuerId: 2 }),
        createMockIssuer({ issuerId: 3 }),
      ];
      (getAllIssuers.run as jest.Mock).mockResolvedValue(mockIssuers);

      const result = await controller.getAll();

      expect(requirePool).toHaveBeenCalled();
      expect(getAllIssuers.run).toHaveBeenCalledWith(undefined, mockPool);
      expect(result).toEqual(mockIssuers);
      expect(Array.isArray(result)).toBe(true);
    });

    it('should return empty array when no issuers exist', async () => {
      (getAllIssuers.run as jest.Mock).mockResolvedValue([]);

      const result = await controller.getAll();

      expect(result).toEqual([]);
      expect(Array.isArray(result)).toBe(true);
    });

    it('should return error response on database error', async () => {
      const dbError = new Error('Database connection failed');
      (getAllIssuers.run as jest.Mock).mockRejectedValue(dbError);

      const result = await controller.getAll();

      expect(result).toEqual({
        error: 'Failed to get issuers',
        details: 'Database connection failed',
      });
    });
  });
});


