import stateTransition from '@game/state-transition/src/stf/v1/index';
import type { SubmittedChainData } from '@paima/sdk/utils';
import { createMockSubmittedChainData, createMockPrando, createMockPool } from '../../utils/testHelpers';

// Mock parser and transition functions
jest.mock('@game/state-transition/src/stf/v1/parser', () => ({
  __esModule: true,
  default: jest.fn(),
  isInvalid: jest.fn(),
}));

jest.mock('@game/state-transition/src/stf/v1/transition', () => ({
  issuerCreate: jest.fn(),
  eventCreate: jest.fn(),
  poapMint: jest.fn(),
  poapUpdate: jest.fn(),
}));

import parse, { isInvalid } from '@game/state-transition/src/stf/v1/parser';
import { issuerCreate, eventCreate, poapMint, poapUpdate } from '@game/state-transition/src/stf/v1/transition';

describe('State Transition Entrypoint', () => {
  let mockDbConn: any;
  let mockPrando: any;

  beforeEach(() => {
    mockDbConn = createMockPool();
    mockPrando = createMockPrando();
    jest.clearAllMocks();
  });

  it('should process issuerCreate input', async () => {
    const inputData = createMockSubmittedChainData('issuerCreate|{"issuerId":"1","issuerAddress":"0x123"}');
    const mockParsed = {
      input: 'issuerCreate',
      payload: { issuerId: 1, issuerAddress: '0x123' },
    };
    const mockSQLUpdates = [[jest.fn(), {}]];

    (parse as jest.Mock).mockReturnValue(mockParsed);
    (isInvalid as unknown as jest.Mock).mockReturnValue(false);
    (issuerCreate as jest.Mock).mockResolvedValue(mockSQLUpdates);

    const result = await stateTransition(inputData, 1000, mockPrando, mockDbConn);

    expect(parse).toHaveBeenCalledWith(inputData.inputData);
    expect(isInvalid).toHaveBeenCalledWith(mockParsed);
    expect(issuerCreate).toHaveBeenCalledWith(mockParsed);
    expect(result).toEqual(mockSQLUpdates);
  });

  it('should process eventCreate input', async () => {
    const inputData = createMockSubmittedChainData('eventCreate|{"issuerId":"1","eventId":"100","eventMaxSupply":"1000","eventMintExpiration":"1234567890","eventOrganizer":"0x123"}');
    const mockParsed = {
      input: 'eventCreate',
      payload: { issuerId: 1, eventId: 100, eventMaxSupply: 1000, eventMintExpiration: 1234567890, eventOrganizer: '0x123' },
    };
    const mockSQLUpdates = [[jest.fn(), {}]];

    (parse as jest.Mock).mockReturnValue(mockParsed);
    (isInvalid as unknown as jest.Mock).mockReturnValue(false);
    (eventCreate as jest.Mock).mockResolvedValue(mockSQLUpdates);

    const result = await stateTransition(inputData, 1000, mockPrando, mockDbConn);

    expect(eventCreate).toHaveBeenCalledWith(mockParsed);
    expect(result).toEqual(mockSQLUpdates);
  });

  it('should process poapMint input', async () => {
    const inputData = createMockSubmittedChainData('poapMint|{"issuerId":"1","eventId":"100","tokenId":"500","ownerAddress":"0x123"}');
    const mockParsed = {
      input: 'poapMint',
      payload: { issuerId: 1, eventId: 100, tokenId: 500, ownerAddress: '0x123' },
    };
    const mockSQLUpdates: any[] = [];

    (parse as jest.Mock).mockReturnValue(mockParsed);
    (isInvalid as unknown as jest.Mock).mockReturnValue(false);
    (poapMint as jest.Mock).mockResolvedValue(mockSQLUpdates);

    const result = await stateTransition(inputData, 1000, mockPrando, mockDbConn);

    expect(poapMint).toHaveBeenCalledWith(mockParsed);
    expect(result).toEqual(mockSQLUpdates);
  });

  it('should process poapUpdate input', async () => {
    const inputData = createMockSubmittedChainData('poapUpdate|{"issuerId":"1","eventId":"100","tokenId":"500","ownerAddress":"0x123"}');
    const mockParsed = {
      input: 'poapUpdate',
      payload: { issuerId: 1, eventId: 100, tokenId: 500, ownerAddress: '0x123' },
    };
    const mockSQLUpdates: any[] = [];

    (parse as jest.Mock).mockReturnValue(mockParsed);
    (isInvalid as unknown as jest.Mock).mockReturnValue(false);
    (poapUpdate as jest.Mock).mockResolvedValue(mockSQLUpdates);

    const result = await stateTransition(inputData, 1000, mockPrando, mockDbConn);

    expect(poapUpdate).toHaveBeenCalledWith(mockParsed);
    expect(result).toEqual(mockSQLUpdates);
  });

  it('should return empty array for invalid input', async () => {
    const inputData = createMockSubmittedChainData('invalid|input');
    const mockParsed = { input: 'invalidString' };

    (parse as jest.Mock).mockReturnValue(mockParsed);
    (isInvalid as unknown as jest.Mock).mockReturnValue(true);

    const result = await stateTransition(inputData, 1000, mockPrando, mockDbConn);

    expect(result).toEqual([]);
    expect(issuerCreate).not.toHaveBeenCalled();
    expect(eventCreate).not.toHaveBeenCalled();
    expect(poapMint).not.toHaveBeenCalled();
    expect(poapUpdate).not.toHaveBeenCalled();
  });

  it('should return empty array for unknown input type', async () => {
    const inputData = createMockSubmittedChainData('unknownCommand|{}');
    const mockParsed = {
      input: 'unknownCommand',
      payload: {},
    };

    (parse as jest.Mock).mockReturnValue(mockParsed);
    (isInvalid as unknown as jest.Mock).mockReturnValue(false);

    const result = await stateTransition(inputData, 1000, mockPrando, mockDbConn);

    expect(result).toEqual([]);
  });
});


