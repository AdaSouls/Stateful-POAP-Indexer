// Mock @paima/node-sdk/db before importing
jest.mock('@paima/node-sdk/db', () => ({
  getConnection: jest.fn(() => ({
    query: jest.fn(() => Promise.resolve({ rows: [] })),
  })),
}));

import {
  issuerCreate,
  eventCreate,
  poapMint,
  poapUpdate,
} from '@game/state-transition/src/stf/v1/transition';
import type {
  IssuerCreateInput,
  EventCreateInput,
  PoapMintInput,
  PoapUpdateInput,
} from '@game/state-transition/src/stf/v1/types';
import { assertSQLUpdate } from '../../utils/testHelpers';

describe('State Transition Functions', () => {
  describe('issuerCreate', () => {
    it('should create SQL update for issuer creation', async () => {
      const input: IssuerCreateInput = {
        input: 'issuerCreate',
        payload: {
          issuerId: 1,
          issuerAddress: '0x1234567890123456789012345678901234567890',
        },
      };

      const result = await issuerCreate(input);

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(1);
      assertSQLUpdate(result[0]);
    });

    it('should handle different issuer IDs', async () => {
      const input: IssuerCreateInput = {
        input: 'issuerCreate',
        payload: {
          issuerId: 999,
          issuerAddress: '0x9876543210987654321098765432109876543210',
        },
      };

      const result = await issuerCreate(input);

      expect(result.length).toBe(1);
      const [queryFn, params] = result[0];
      expect(params).toEqual({
        issuerId: 999,
        issuerAddress: '0x9876543210987654321098765432109876543210',
      });
    });
  });

  describe('eventCreate', () => {
    it('should create SQL update for event creation', async () => {
      const input: EventCreateInput = {
        input: 'eventCreate',
        payload: {
          issuerId: 1,
          eventId: 100,
          eventMaxSupply: 1000,
          eventMintExpiration: Math.floor(Date.now() / 1000) + 86400,
          eventOrganizer: '0x1234567890123456789012345678901234567890',
        },
      };

      const result = await eventCreate(input);

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(1);
      assertSQLUpdate(result[0]);
    });

    it('should handle all event parameters correctly', async () => {
      const expiration = Math.floor(Date.now() / 1000) + 86400;
      const input: EventCreateInput = {
        input: 'eventCreate',
        payload: {
          issuerId: 5,
          eventId: 200,
          eventMaxSupply: 5000,
          eventMintExpiration: expiration,
          eventOrganizer: '0xABCDEFABCDEFABCDEFABCDEFABCDEFABCDEFABCD',
        },
      };

      const result = await eventCreate(input);

      const [queryFn, params] = result[0];
      expect(params).toEqual({
        issuerId: 5,
        eventId: 200,
        eventMaxSupply: 5000,
        eventMintExpiration: expiration,
        eventOrganizer: input.payload.eventOrganizer.toLowerCase(),
      });
    });
  });

  describe('poapMint', () => {
    it('should return empty array (handled by blockchain sync)', async () => {
      const input: PoapMintInput = {
        input: 'poapMint',
        payload: {
          issuerId: 1,
          eventId: 100,
          tokenId: 500,
          ownerAddress: '0x9876543210987654321098765432109876543210',
        },
      };

      const result = await poapMint(input);

      // poapMint returns empty array as POAPs are handled by blockchain sync service
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(0);
    });
  });

  describe('poapUpdate', () => {
    it('should return empty array (handled by blockchain sync)', async () => {
      const input: PoapUpdateInput = {
        input: 'poapUpdate',
        payload: {
          issuerId: 1,
          eventId: 100,
          tokenId: 500,
          ownerAddress: '0x9876543210987654321098765432109876543210',
        },
      };

      const result = await poapUpdate(input);

      // poapUpdate returns empty array as POAPs are handled by blockchain sync service
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(0);
    });
  });
});


