// Mock @paima/node-sdk/db before importing db
jest.mock('@paima/node-sdk/db', () => ({
  getConnection: jest.fn(() => ({
    query: jest.fn(() => Promise.resolve({ rows: [] })),
  })),
}));

import {
  getAllIssuers,
  getIssuerByWalletAddress,
  getIssuerByUuid,
  getAllEvents,
  getEventByEventId,
  getAllPoaps,
  getPoapByTokenId,
  getAllOwners,
  getOwnerByWalletAddress,
} from '@game/db';
import { createMockPool, createMockIssuer, createMockEvent, createMockPoap, createMockOwner } from '../../utils/testHelpers';

describe('Database Queries', () => {
  let mockPool: any;

  beforeEach(() => {
    mockPool = createMockPool();
  });

  describe('Issuer Queries', () => {
    it('should query all issuers', async () => {
      const mockIssuers = [
        createMockIssuer({ issuerId: 1 }),
        createMockIssuer({ issuerId: 2 }),
      ];
      mockPool.setResult('SELECT * FROM issuers', mockIssuers);

      const result = await getAllIssuers.run(undefined, mockPool);

      expect(result).toEqual(mockIssuers);
      expect(mockPool.getQueries().length).toBeGreaterThan(0);
    });

    it('should query issuer by wallet address', async () => {
      const address = '0x1234567890123456789012345678901234567890';
      const mockIssuer = createMockIssuer({ issuerAddress: address });
      mockPool.setResult('SELECT * FROM issuers', [mockIssuer]);

      const result = await getIssuerByWalletAddress.run(
        { walletAddress: address },
        mockPool
      );

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
    });

    it('should query issuer by UUID', async () => {
      const uuid = 'test-issuer-uuid';
      const mockIssuer = createMockIssuer({ issuerUuid: uuid });
      mockPool.setResult('SELECT * FROM issuers', [mockIssuer]);

      const result = await getIssuerByUuid.run(
        { issuerUuid: uuid },
        mockPool
      );

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('Event Queries', () => {
    it('should query all events', async () => {
      const mockEvents = [
        createMockEvent({ eventId: 1 }),
        createMockEvent({ eventId: 2 }),
      ];
      mockPool.setResult('SELECT * FROM events', mockEvents);

      const result = await getAllEvents.run(undefined, mockPool);

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
    });

    it('should query event by eventId', async () => {
      const eventId = 100;
      const mockEvent = createMockEvent({ eventId });
      mockPool.setResult('SELECT * FROM events', [mockEvent]);

      const result = await getEventByEventId.run(
        { eventId },
        mockPool
      );

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      if (result.length > 0) {
        expect(result[0].eventId).toBe(eventId);
      }
    });
  });

  describe('POAP Queries', () => {
    it('should query all POAPs', async () => {
      const mockPoaps = [
        createMockPoap({ tokenId: 100 }),
        createMockPoap({ tokenId: 101 }),
      ];
      mockPool.setResult('SELECT * FROM poaps', mockPoaps);

      const result = await getAllPoaps.run(undefined, mockPool);

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
    });

    it('should query POAP by tokenId', async () => {
      const tokenId = 500;
      const mockPoap = createMockPoap({ tokenId });
      mockPool.setResult('SELECT * FROM poaps', [mockPoap]);

      const result = await getPoapByTokenId.run(
        { tokenId },
        mockPool
      );

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('Owner Queries', () => {
    it('should query all owners', async () => {
      const mockOwners = [
        createMockOwner({ ownerId: 1 }),
        createMockOwner({ ownerId: 2 }),
      ];
      mockPool.setResult('SELECT * FROM owners', mockOwners);

      const result = await getAllOwners.run(undefined, mockPool);

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
    });

    it('should query owner by wallet address', async () => {
      const address = '0x9876543210987654321098765432109876543210';
      const mockOwner = createMockOwner({ ownerAddress: address });
      mockPool.setResult('SELECT * FROM owners', [mockOwner]);

      const result = await getOwnerByWalletAddress.run(
        { walletAddress: address },
        mockPool
      );

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
    });
  });
});


