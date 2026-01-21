import {
  getAllEvents,
  getAllIssuers,
  getIssuerByAddress,
  getIssuerByUuid,
  getAllOwners,
  getOwnerByAddress,
  getOwnerByUuid,
  getAllPoaps,
  getAllEventPoapRelations,
} from '@game/middleware/src/endpoints/queries';
import { setupMockFetch, resetAllMocks } from '../../utils/testHelpers';

describe('Middleware Query Endpoints', () => {
  beforeEach(() => {
    resetAllMocks();
  });

  describe('getAllEvents', () => {
    it('should fetch all events successfully', async () => {
      const mockResponse = {
        event: [
          { eventId: 1, title: 'Event 1' },
          { eventId: 2, title: 'Event 2' },
        ],
      };
      setupMockFetch(mockResponse);

      const result = await getAllEvents();

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.result).toEqual(mockResponse);
      }
      expect(global.fetch).toHaveBeenCalled();
    });

    it('should handle fetch errors', async () => {
      global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));

      await expect(getAllEvents()).rejects.toThrow('Network error');
    });
  });

  describe('getAllIssuers', () => {
    it('should fetch all issuers successfully', async () => {
      const mockResponse = {
        issuers: [
          { issuerId: 1, issuerAddress: '0x123' },
          { issuerId: 2, issuerAddress: '0x456' },
        ],
      };
      setupMockFetch(mockResponse);

      const result = await getAllIssuers();

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.result).toEqual(mockResponse);
      }
    });
  });

  describe('getIssuerByAddress', () => {
    it('should fetch issuer by address successfully', async () => {
      const address = '0x1234567890123456789012345678901234567890';
      const mockResponse = {
        issuer: { issuerId: 1, issuerAddress: address },
      };
      setupMockFetch(mockResponse);

      const result = await getIssuerByAddress(address);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.result).toEqual(mockResponse);
      }
      expect(global.fetch).toHaveBeenCalled();
    });
  });

  describe('getIssuerByUuid', () => {
    it('should fetch issuer by UUID successfully', async () => {
      const uuid = 'test-uuid-123';
      const mockResponse = {
        issuer: { issuerUuid: uuid, issuerId: 1 },
      };
      setupMockFetch(mockResponse);

      const result = await getIssuerByUuid(uuid);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.result).toEqual(mockResponse);
      }
    });
  });

  describe('getAllOwners', () => {
    it('should fetch all owners successfully', async () => {
      const mockResponse = {
        owners: [
          { ownerId: 1, ownerAddress: '0x123' },
          { ownerId: 2, ownerAddress: '0x456' },
        ],
      };
      setupMockFetch(mockResponse);

      const result = await getAllOwners();

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.result).toEqual(mockResponse);
      }
    });
  });

  describe('getOwnerByAddress', () => {
    it('should fetch owner by address successfully', async () => {
      const address = '0x9876543210987654321098765432109876543210';
      const mockResponse = {
        owner: { ownerId: 1, ownerAddress: address },
      };
      setupMockFetch(mockResponse);

      const result = await getOwnerByAddress(address);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.result).toEqual(mockResponse);
      }
    });
  });

  describe('getOwnerByUuid', () => {
    it('should fetch owner by UUID successfully', async () => {
      const uuid = 'test-owner-uuid';
      const mockResponse = {
        owner: { ownerUuid: uuid, ownerId: 1 },
      };
      setupMockFetch(mockResponse);

      const result = await getOwnerByUuid(uuid);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.result).toEqual(mockResponse);
      }
    });
  });

  describe('getAllPoaps', () => {
    it('should fetch all POAPs successfully', async () => {
      const mockResponse = {
        poaps: [
          { tokenId: 100, eventId: 1 },
          { tokenId: 101, eventId: 1 },
        ],
      };
      setupMockFetch(mockResponse);

      const result = await getAllPoaps();

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.result).toEqual(mockResponse);
      }
    });
  });

  describe('getAllEventPoapRelations', () => {
    it('should fetch all event POAP relations successfully', async () => {
      const mockResponse = {
        relations: [
          { eventId: 1, tokenId: 100 },
          { eventId: 1, tokenId: 101 },
        ],
      };
      setupMockFetch(mockResponse);

      const result = await getAllEventPoapRelations();

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.result).toEqual(mockResponse);
      }
    });
  });
});


