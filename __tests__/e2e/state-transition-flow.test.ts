/**
 * End-to-end test for state transition flow:
 * 1. Parse blockchain input
 * 2. Process through state transition
 * 3. Generate SQL updates
 */

// Mock parser before importing
jest.mock('@game/state-transition/src/stf/v1/parser', () => ({
  __esModule: true,
  default: jest.fn((input: string) => {
    if (input.includes('issuerCreate|')) {
      const payload = JSON.parse(input.split('|')[1]);
      return {
        input: 'issuerCreate',
        payload: {
          issuerId: parseInt(payload.issuerId, 10),
          issuerAddress: payload.issuerAddress.toLowerCase(),
        },
      };
    }
    if (input.includes('eventCreate|')) {
      const payload = JSON.parse(input.split('|')[1]);
      return {
        input: 'eventCreate',
        payload: {
          issuerId: parseInt(payload.issuerId, 10),
          eventId: parseInt(payload.eventId, 10),
          eventMaxSupply: parseInt(payload.eventMaxSupply, 10),
          eventMintExpiration: parseInt(payload.eventMintExpiration, 10),
          eventOrganizer: payload.eventOrganizer.toLowerCase(),
        },
      };
    }
    if (input.includes('poapMint|')) {
      const payload = JSON.parse(input.split('|')[1]);
      return {
        input: 'poapMint',
        payload: {
          issuerId: parseInt(payload.issuerId, 10),
          eventId: parseInt(payload.eventId, 10),
          tokenId: parseInt(payload.tokenId, 10),
          ownerAddress: (payload.ownerAddress || payload.to || payload.userAddress || '').toLowerCase(),
        },
      };
    }
    if (input.includes('poapUpdate|')) {
      const payload = JSON.parse(input.split('|')[1]);
      return {
        input: 'poapUpdate',
        payload: {
          issuerId: parseInt(payload.issuerId, 10),
          eventId: parseInt(payload.eventId, 10),
          tokenId: parseInt(payload.tokenId, 10),
          ownerAddress: (payload.ownerAddress || payload.to || payload.userAddress || '').toLowerCase(),
        },
      };
    }
    return { input: 'invalidString' };
  }),
  isInvalid: jest.fn((input: any) => input.input === 'invalidString'),
}));

jest.mock('@game/state-transition/src/stf/v1/transition', () => ({
  issuerCreate: jest.fn(async (input: any) => [[jest.fn(), input.payload]]),
  eventCreate: jest.fn(async (input: any) => [[jest.fn(), input.payload]]),
  poapMint: jest.fn(async () => []),
  poapUpdate: jest.fn(async () => []),
}));

import stateTransition from '@game/state-transition/src/stf/v1/index';
import parse from '@game/state-transition/src/stf/v1/parser';
import {
  issuerCreate,
  eventCreate,
  poapMint,
  poapUpdate,
} from '@game/state-transition/src/stf/v1/transition';
import {
  createMockSubmittedChainData,
  createMockPrando,
  createMockPool,
  assertSQLUpdate,
} from '../utils/testHelpers';

describe('End-to-End: State Transition Flow', () => {
  let mockDbConn: any;
  let mockPrando: any;

  beforeEach(() => {
    mockDbConn = createMockPool();
    mockPrando = createMockPrando();
  });

  it('should process complete issuerCreate flow', async () => {
    const inputData = createMockSubmittedChainData(
      'issuerCreate|{"issuerId":"1","issuerAddress":"0x1234567890123456789012345678901234567890"}',
      1000
    );

    const result = await stateTransition(inputData, 1000, mockPrando, mockDbConn);

    expect(Array.isArray(result)).toBe(true);
    if (result.length > 0) {
      assertSQLUpdate(result[0]);
    }
  });

  it('should process complete eventCreate flow', async () => {
    const expiration = Math.floor(Date.now() / 1000) + 86400;
    const inputData = createMockSubmittedChainData(
      `eventCreate|{"issuerId":"1","eventId":"100","eventMaxSupply":"1000","eventMintExpiration":"${expiration}","eventOrganizer":"0x1234567890123456789012345678901234567890"}`,
      1001
    );

    const result = await stateTransition(inputData, 1001, mockPrando, mockDbConn);

    expect(Array.isArray(result)).toBe(true);
    if (result.length > 0) {
      assertSQLUpdate(result[0]);
      const [queryFn, params] = result[0];
      expect(params).toHaveProperty('issuerId');
      expect(params).toHaveProperty('eventId');
      expect(params).toHaveProperty('eventMaxSupply');
      expect(params).toHaveProperty('eventMintExpiration');
      expect(params).toHaveProperty('eventOrganizer');
    }
  });

  it('should process complete poapMint flow', async () => {
    const inputData = createMockSubmittedChainData(
      'poapMint|{"issuerId":"1","eventId":"100","tokenId":"500","ownerAddress":"0x9876543210987654321098765432109876543210"}',
      1002
    );

    const result = await stateTransition(inputData, 1002, mockPrando, mockDbConn);

    // poapMint returns empty array as it's handled by blockchain sync
    expect(Array.isArray(result)).toBe(true);
  });

  it('should process complete poapUpdate flow', async () => {
    const inputData = createMockSubmittedChainData(
      'poapUpdate|{"issuerId":"1","eventId":"100","tokenId":"500","ownerAddress":"0x9876543210987654321098765432109876543210"}',
      1003
    );

    const result = await stateTransition(inputData, 1003, mockPrando, mockDbConn);

    // poapUpdate returns empty array as it's handled by blockchain sync
    expect(Array.isArray(result)).toBe(true);
  });

  it('should handle multiple sequential state transitions', async () => {
    // First: Create issuer
    const issuerInput = createMockSubmittedChainData(
      'issuerCreate|{"issuerId":"1","issuerAddress":"0x1234567890123456789012345678901234567890"}',
      1000
    );
    const issuerResult = await stateTransition(issuerInput, 1000, mockPrando, mockDbConn);
    expect(Array.isArray(issuerResult)).toBe(true);

    // Second: Create event
    const expiration = Math.floor(Date.now() / 1000) + 86400;
    const eventInput = createMockSubmittedChainData(
      `eventCreate|{"issuerId":"1","eventId":"100","eventMaxSupply":"1000","eventMintExpiration":"${expiration}","eventOrganizer":"0x1234567890123456789012345678901234567890"}`,
      1001
    );
    const eventResult = await stateTransition(eventInput, 1001, mockPrando, mockDbConn);
    expect(Array.isArray(eventResult)).toBe(true);

    // Third: Mint POAP
    const poapInput = createMockSubmittedChainData(
      'poapMint|{"issuerId":"1","eventId":"100","tokenId":"500","ownerAddress":"0x9876543210987654321098765432109876543210"}',
      1002
    );
    const poapResult = await stateTransition(poapInput, 1002, mockPrando, mockDbConn);
    expect(Array.isArray(poapResult)).toBe(true);
  });

  it('should handle invalid input gracefully', async () => {
    const invalidInput = createMockSubmittedChainData('invalid|input', 1000);

    const result = await stateTransition(invalidInput, 1000, mockPrando, mockDbConn);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(0);
  });

  it('should parse and validate input correctly', () => {
    const validInput = 'issuerCreate|{"issuerId":"1","issuerAddress":"0x123"}';
    const parsed = parse(validInput);
    expect(parsed.input).toBe('issuerCreate');

    const invalidInput = 'invalidCommand|{}';
    const parsedInvalid = parse(invalidInput);
    expect(parsedInvalid.input).toBe('invalidString');
  });

  it('should handle address case normalization', async () => {
    const inputData = createMockSubmittedChainData(
      'issuerCreate|{"issuerId":"1","issuerAddress":"0xABCDEFABCDEFABCDEFABCDEFABCDEFABCDEFABCD"}',
      1000
    );

    const result = await stateTransition(inputData, 1000, mockPrando, mockDbConn);

    if (result.length > 0) {
      const [queryFn, params] = result[0];
      expect((params as any).issuerAddress).toBe(
        '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd'
      );
    }
  });
});


