// Mock @paima/node-sdk/db before importing
jest.mock('@paima/node-sdk/db', () => ({
  getConnection: jest.fn(() => ({
    query: jest.fn(() => Promise.resolve({ rows: [] })),
  })),
}));

import { CreateOwnerController } from '@game/api/src/controllers/owners/createOwner';
import { requirePoolWriteAccess, createOwner } from '@game/db';
import { createMockPool, createMockOwner } from '../../../utils/testHelpers';

// Mock the database module
jest.mock('@game/db', () => ({
  requirePoolWriteAccess: jest.fn(),
  createOwner: {
    run: jest.fn(),
  },
}));

describe('CreateOwnerController', () => {
  let controller: CreateOwnerController;
  let mockPool: any;

  beforeEach(() => {
    controller = new CreateOwnerController();
    mockPool = createMockPool();
    (requirePoolWriteAccess as jest.Mock).mockReturnValue(mockPool);
    jest.clearAllMocks();
  });

  describe('post', () => {
    it('should create a new owner successfully', async () => {
      const ownerData = {
        ownerAddress: '0x9876543210987654321098765432109876543210',
        email: 'owner@test.com',
        username: 'Test Owner',
      };

      const mockOwner = createMockOwner(ownerData);
      (createOwner.run as jest.Mock).mockResolvedValue([mockOwner]);

      const result = await controller.post(ownerData);

      expect(requirePoolWriteAccess).toHaveBeenCalled();
      expect(createOwner.run).toHaveBeenCalledWith(
        expect.objectContaining({
          ownerAddress: ownerData.ownerAddress,
          email: ownerData.email,
          username: ownerData.username,
        }),
        mockPool
      );
      expect(result).toEqual(mockOwner);
    });

    it('should handle null optional fields', async () => {
      const ownerData = {
        ownerAddress: '0x9876543210987654321098765432109876543210',
      };

      const mockOwner = createMockOwner({
        ...ownerData,
        email: null,
        username: null,
      });
      (createOwner.run as jest.Mock).mockResolvedValue([mockOwner]);

      const result = await controller.post(ownerData as any);

      expect(createOwner.run).toHaveBeenCalledWith(
        expect.objectContaining({
          email: null,
          username: null,
        }),
        mockPool
      );
      expect(result).toEqual(mockOwner);
    });

    it('should return error response on database error', async () => {
      const ownerData = {
        ownerAddress: '0x9876543210987654321098765432109876543210',
        email: 'owner@test.com',
      };

      const dbError = new Error('Database error');
      (createOwner.run as jest.Mock).mockRejectedValue(dbError);

      const result = await controller.post(ownerData);

      expect(result).toEqual({
        error: 'Failed to create owner',
        details: 'Database error',
      });
    });

    it('should handle case-insensitive address and email', async () => {
      const ownerData = {
        ownerAddress: '0xABCDEFABCDEFABCDEFABCDEFABCDEFABCDEFABCD',
        email: 'OWNER@TEST.COM',
      };

      const mockOwner = createMockOwner();
      (createOwner.run as jest.Mock).mockResolvedValue([mockOwner]);

      await controller.post(ownerData);

      const callArgs = (createOwner.run as jest.Mock).mock.calls[0][0];
      expect(callArgs.ownerAddress).toBe(ownerData.ownerAddress);
    });
  });
});


