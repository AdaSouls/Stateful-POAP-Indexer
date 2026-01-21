// Mock @paima/sdk/concise before importing parser
jest.mock('@paima/sdk/concise', () => ({
  PaimaParser: jest.fn().mockImplementation(() => ({
    start: jest.fn((input: string) => {
      // Simple mock parser logic
      if (input.startsWith('issuerCreate|')) {
        const payload = JSON.parse(input.split('|')[1]);
        return { command: 'issuerCreate', args: { payload } };
      }
      if (input.startsWith('eventCreate|')) {
        const payload = JSON.parse(input.split('|')[1]);
        return { command: 'eventCreate', args: { payload } };
      }
      if (input.startsWith('poapMint|')) {
        const payload = JSON.parse(input.split('|')[1]);
        return { command: 'poapMint', args: { payload } };
      }
      if (input.startsWith('poapUpdate|')) {
        const payload = JSON.parse(input.split('|')[1]);
        return { command: 'poapUpdate', args: { payload } };
      }
      throw new Error('Invalid input');
    }),
  })),
}));

import parse, { isInvalid } from '@game/state-transition/src/stf/v1/parser';
import type { InvalidInput } from '@game/utils';

describe('Parser', () => {
  describe('parse', () => {
    it('should parse issuerCreate input correctly', () => {
      const input = 'issuerCreate|{"issuerId":"1","issuerAddress":"0x1234567890123456789012345678901234567890"}';
      const parsed = parse(input);

      expect(parsed.input).toBe('issuerCreate');
      expect((parsed as any).payload.issuerId).toBe(1);
      expect((parsed as any).payload.issuerAddress).toBe('0x1234567890123456789012345678901234567890');
    });

    it('should parse eventCreate input correctly', () => {
      const input = 'eventCreate|{"issuerId":"1","eventId":"14","eventMaxSupply":"100","eventMintExpiration":"1748943196","eventOrganizer":"0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199"}';
      const parsed = parse(input);

      expect(parsed.input).toBe('eventCreate');
      expect((parsed as any).payload.issuerId).toBe(1);
      expect((parsed as any).payload.eventId).toBe(14);
      expect((parsed as any).payload.eventMaxSupply).toBe(100);
      expect((parsed as any).payload.eventMintExpiration).toBe(1748943196);
      expect((parsed as any).payload.eventOrganizer).toBe('0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199');
    });

    it('should parse poapMint input correctly', () => {
      const input = 'poapMint|{"issuerId":"1","eventId":"14","tokenId":"100","ownerAddress":"0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199"}';
      const parsed = parse(input);

      expect(parsed.input).toBe('poapMint');
      expect((parsed as any).payload.issuerId).toBe(1);
      expect((parsed as any).payload.eventId).toBe(14);
      expect((parsed as any).payload.tokenId).toBe(100);
      expect((parsed as any).payload.ownerAddress).toBe('0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199');
    });

    it('should parse poapMint with alternative field names (to, userAddress)', () => {
      const input1 = 'poapMint|{"issuerId":"1","eventId":"14","tokenId":"100","to":"0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199"}';
      const parsed1 = parse(input1);
      expect((parsed1 as any).payload.ownerAddress).toBe('0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199');

      const input2 = 'poapMint|{"issuerId":"1","eventId":"14","tokenId":"100","userAddress":"0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199"}';
      const parsed2 = parse(input2);
      expect((parsed2 as any).payload.ownerAddress).toBe('0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199');
    });

    it('should parse poapUpdate input correctly', () => {
      const input = 'poapUpdate|{"issuerId":"1","eventId":"33","tokenId":"100","ownerAddress":"0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199"}';
      const parsed = parse(input);

      expect(parsed.input).toBe('poapUpdate');
      expect((parsed as any).payload.issuerId).toBe(1);
      expect((parsed as any).payload.eventId).toBe(33);
      expect((parsed as any).payload.tokenId).toBe(100);
      expect((parsed as any).payload.ownerAddress).toBe('0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199');
    });

    it('should convert addresses to lowercase', () => {
      const input = 'issuerCreate|{"issuerId":"1","issuerAddress":"0xABCDEFABCDEFABCDEFABCDEFABCDEFABCDEFABCD"}';
      const parsed = parse(input);

      expect((parsed as any).payload.issuerAddress).toBe(
        '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd'
      );
    });

    it('should return invalidString for malformed input', () => {
      const input = 'invalidCommand|{"data":"test"}';
      const parsed = parse(input);

      expect(parsed.input).toBe('invalidString');
    });

    it('should return invalidString for invalid JSON', () => {
      const input = 'issuerCreate|{invalid json}';
      const parsed = parse(input);

      expect(parsed.input).toBe('invalidString');
    });

    it('should return invalidString for empty input', () => {
      const input = '';
      const parsed = parse(input);

      expect(parsed.input).toBe('invalidString');
    });

    it('should handle missing payload', () => {
      const input = 'issuerCreate|';
      const parsed = parse(input);

      expect(parsed.input).toBe('invalidString');
    });
  });

  describe('isInvalid', () => {
    it('should return true for invalid input', () => {
      const invalidInput: InvalidInput = { input: 'invalidString' };
      expect(isInvalid(invalidInput)).toBe(true);
    });

    it('should return false for valid input', () => {
      const validInput = {
        input: 'issuerCreate',
        payload: { issuerId: 1, issuerAddress: '0x123' },
      };
      expect(isInvalid(validInput as any)).toBe(false);
    });
  });
});


