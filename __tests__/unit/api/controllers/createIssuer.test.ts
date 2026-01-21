// Mock @paima/node-sdk/db before importing
jest.mock('@paima/node-sdk/db', () => ({
  getConnection: jest.fn(() => ({
    query: jest.fn(() => Promise.resolve({ rows: [] })),
  })),
}));

import { CreateIssuerController } from '@game/api/src/controllers/issuers/createIssuer';
import { requirePoolWriteAccess, createIssuer } from '@game/db';
import { createMockPool, createMockIssuer } from '../../../utils/testHelpers';

// Mock the database module
jest.mock('@game/db', () => ({
  requirePoolWriteAccess: jest.fn(),
  createIssuer: {
    run: jest.fn(),
  },
}));

describe('CreateIssuerController', () => {
  let controller: CreateIssuerController;
  let mockPool: any;

  beforeEach(() => {
    controller = new CreateIssuerController();
    mockPool = createMockPool();
    (requirePoolWriteAccess as jest.Mock).mockReturnValue(mockPool);
    jest.clearAllMocks();
  });

  describe('createIssuer', () => {
    it('should create a new issuer successfully', async () => {
      const issuerData = {
        address: '0x1234567890123456789012345678901234567890',
        email: 'issuer@test.com',
        name: 'Test Issuer',
        organization: 'Test Organization',
      };

      const mockIssuer = createMockIssuer({
        issuerAddress: issuerData.address,
        email: issuerData.email,
        username: issuerData.name,
        organization: issuerData.organization,
      });
      (createIssuer.run as jest.Mock).mockResolvedValue([mockIssuer]);

      const result = await controller.createIssuer(issuerData);

      expect(requirePoolWriteAccess).toHaveBeenCalled();
      expect(createIssuer.run).toHaveBeenCalledWith(
        expect.objectContaining({
          issuerAddress: issuerData.address,
          email: issuerData.email,
          username: issuerData.name,
          organization: issuerData.organization,
          issuerId: expect.any(Number),
        }),
        mockPool
      );
      expect(result).toEqual(mockIssuer);
    });

    it('should generate a unique issuerId', async () => {
      const issuerData = {
        address: '0x1234567890123456789012345678901234567890',
        email: 'issuer@test.com',
        name: 'Test Issuer',
        organization: 'Test Organization',
      };

      const mockIssuer = createMockIssuer();
      (createIssuer.run as jest.Mock).mockResolvedValue([mockIssuer]);

      await controller.createIssuer(issuerData);

      const callArgs = (createIssuer.run as jest.Mock).mock.calls[0][0];
      expect(callArgs.issuerId).toBeGreaterThan(0);
      expect(typeof callArgs.issuerId).toBe('number');
    });

    it('should return error response on database error', async () => {
      const issuerData = {
        address: '0x1234567890123456789012345678901234567890',
        email: 'issuer@test.com',
        name: 'Test Issuer',
        organization: 'Test Organization',
      };

      const dbError = new Error('Duplicate issuer');
      (createIssuer.run as jest.Mock).mockRejectedValue(dbError);

      const result = await controller.createIssuer(issuerData);

      expect(result).toEqual({
        error: 'Failed to create issuer',
        details: 'Duplicate issuer',
      });
      expect(controller.getStatus()).toBe(400);
    });

    it('should handle case-insensitive address', async () => {
      const issuerData = {
        address: '0xABCDEFABCDEFABCDEFABCDEFABCDEFABCDEFABCD',
        email: 'issuer@test.com',
        name: 'Test Issuer',
        organization: 'Test Organization',
      };

      const mockIssuer = createMockIssuer();
      (createIssuer.run as jest.Mock).mockResolvedValue([mockIssuer]);

      await controller.createIssuer(issuerData);

      const callArgs = (createIssuer.run as jest.Mock).mock.calls[0][0];
      expect(callArgs.issuerAddress).toBe(issuerData.address);
    });
  });
});


