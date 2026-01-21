import {
  createEvent,
  createIssuer,
  createOwner,
  createEventPoapRelation,
  updateOwner,
} from '@game/middleware/src/endpoints/write';
import { setupMockFetch, resetAllMocks } from '../../utils/testHelpers';

describe('Middleware Write Endpoints', () => {
  beforeEach(() => {
    resetAllMocks();
  });

  describe('createEvent', () => {
    it('should create event successfully', async () => {
      const eventInfo = {
        issuerId: 1,
        eventId: 100,
        eventMaxSupply: 1000,
        eventMintExpiration: Math.floor(Date.now() / 1000) + 86400,
        eventOrganizer: '0x1234567890123456789012345678901234567890',
        title: 'Test Event',
      };
      const mockResponse = {
        event: { ...eventInfo },
      };
      setupMockFetch(mockResponse);

      const result = await createEvent(eventInfo as any);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.result).toEqual(mockResponse);
      }
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('create_event'),
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(eventInfo),
        })
      );
    });
  });

  describe('createIssuer', () => {
    it('should create issuer successfully', async () => {
      const address = '0x1234567890123456789012345678901234567890';
      const name = 'Test Issuer';
      const email = 'issuer@test.com';
      const organization = 'Test Org';
      const mockResponse = {
        issuer: { issuerAddress: address, username: name },
      };
      setupMockFetch(mockResponse);

      const result = await createIssuer(address, name, email, organization);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.result).toEqual(mockResponse);
      }
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('create_issuer'),
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ address, name, email, organization }),
        })
      );
    });
  });

  describe('createOwner', () => {
    it('should create owner successfully', async () => {
      const address = '0x9876543210987654321098765432109876543210';
      const email = 'owner@test.com';
      const mockResponse = {
        event: { ownerAddress: address, email },
      };
      setupMockFetch(mockResponse);

      const result = await createOwner(address, email);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.result).toEqual(mockResponse);
      }
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('create_owner'),
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ address, email }),
        })
      );
    });

    it('should handle undefined email', async () => {
      const address = '0x9876543210987654321098765432109876543210';
      const mockResponse = {
        event: { ownerAddress: address },
      };
      setupMockFetch(mockResponse);

      const result = await createOwner(address, undefined);

      expect(result.success).toBe(true);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          body: JSON.stringify({ address, email: undefined }),
        })
      );
    });
  });

  describe('createEventPoapRelation', () => {
    it('should create event POAP relation successfully', async () => {
      const relationInfo = {
        eventId: 1,
        tokenId: 100,
      };
      const mockResponse = {
        event: { ...relationInfo },
      };
      setupMockFetch(mockResponse);

      const result = await createEventPoapRelation(relationInfo as any);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.result).toEqual(mockResponse);
      }
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('create_event_poap'),
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(relationInfo),
        })
      );
    });
  });

  describe('updateOwner', () => {
    it('should update owner successfully', async () => {
      const address = '0x9876543210987654321098765432109876543210';
      const email = 'newemail@test.com';
      const mockResponse = { success: true };
      setupMockFetch(mockResponse);

      const result = await updateOwner(address, email);

      expect(result.success).toBe(true);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('update_owner'),
        expect.objectContaining({
          method: 'PATCH',
          body: JSON.stringify({ address, email }),
        })
      );
    });
  });
});


