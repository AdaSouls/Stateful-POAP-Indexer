// Mock @paima/node-sdk/db before importing
jest.mock('@paima/node-sdk/db', () => ({
  getConnection: jest.fn(() => ({
    query: jest.fn(() => Promise.resolve({ rows: [] })),
  })),
}));

import { AllEventsController } from '@game/api/src/controllers/events/getAllEvents';
import { requirePool, getAllEvents, getEventsWithFilters } from '@game/db';
import { filterEventsWithTransactionHash } from '@game/api/src/utils/eventSanitizer';
import { createMockPool, createMockEvent } from '../../../utils/testHelpers';

// Mock the database module
jest.mock('@game/db', () => ({
  requirePool: jest.fn(),
  getAllEvents: {
    run: jest.fn(),
  },
  getEventsWithFilters: {
    run: jest.fn(),
  },
}));

jest.mock('@game/api/src/utils/eventSanitizer', () => ({
  filterEventsWithTransactionHash: jest.fn((events) => events),
}));

describe('AllEventsController', () => {
  let controller: AllEventsController;
  let mockPool: any;

  beforeEach(() => {
    controller = new AllEventsController();
    mockPool = createMockPool();
    (requirePool as jest.Mock).mockReturnValue(mockPool);
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('should return all events without filters', async () => {
      const mockEvents = [
        createMockEvent({ eventId: 1, transaction_hash: '0x123' }),
        createMockEvent({ eventId: 2, transaction_hash: '0x456' }),
      ];
      (getAllEvents.run as jest.Mock).mockResolvedValue(mockEvents);

      const result = await controller.getAll();

      expect(requirePool).toHaveBeenCalled();
      expect(getAllEvents.run).toHaveBeenCalledWith(undefined, mockPool);
      expect(filterEventsWithTransactionHash).toHaveBeenCalledWith(mockEvents);
      expect(result).toEqual(mockEvents);
    });

    it('should use filtered query when filters are provided', async () => {
      const mockEvents = [createMockEvent({ eventId: 1, transaction_hash: '0x123' })];
      (getEventsWithFilters.run as jest.Mock).mockResolvedValue(mockEvents);

      const result = await controller.getAll(
        '0x1234567890123456789012345678901234567890', // organiserAddress
        undefined, // eventIdSearch
        undefined, // titleSearch
        'active', // calculatedStatus
        undefined, // eventStartDateMin
        undefined, // eventStartDateMax
        undefined, // expirationMin
        undefined, // expirationMax
        undefined, // maxSupplyMin
        undefined, // maxSupplyMax
        undefined, // totalSupplyMin
        undefined, // totalSupplyMax
        'createdAt', // sortBy
        'desc' // order
      );

      expect(getEventsWithFilters.run).toHaveBeenCalledWith(
        expect.objectContaining({
          organiserAddress: '0x1234567890123456789012345678901234567890',
          calculatedStatus: 'active',
          sortBy: 'createdAt',
          order: 'desc',
        }),
        mockPool
      );
      expect(result).toEqual(mockEvents);
    });

    it('should return error response on database error', async () => {
      const dbError = new Error('Database connection failed');
      (getAllEvents.run as jest.Mock).mockRejectedValue(dbError);

      const result = await controller.getAll();

      expect(result).toEqual({
        error: 'Failed to get events',
        details: 'Database connection failed',
      });
    });

    it('should handle empty results', async () => {
      (getAllEvents.run as jest.Mock).mockResolvedValue([]);

      const result = await controller.getAll();

      expect(result).toEqual([]);
    });
  });
});


