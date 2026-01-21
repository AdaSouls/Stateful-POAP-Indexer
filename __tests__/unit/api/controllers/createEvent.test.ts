// Mock @paima/node-sdk/db before importing
jest.mock('@paima/node-sdk/db', () => ({
  getConnection: jest.fn(() => ({
    query: jest.fn(() => Promise.resolve({ rows: [] })),
  })),
}));

import { CreateEventController } from '@game/api/src/controllers/events/createEvent';
import { requirePoolWriteAccess, createEvent, getEventByEventId, updateEventMetadata } from '@game/db';
import { createMockPool, createMockEvent } from '../../../utils/testHelpers';

// Mock the database module
jest.mock('@game/db', () => ({
  requirePoolWriteAccess: jest.fn(),
  createEvent: {
    run: jest.fn(),
  },
  getEventByEventId: {
    run: jest.fn(),
  },
  updateEventMetadata: {
    run: jest.fn(),
  },
}));

describe('CreateEventController', () => {
  let controller: CreateEventController;
  let mockPool: any;

  beforeEach(() => {
    controller = new CreateEventController();
    mockPool = createMockPool();
    (requirePoolWriteAccess as jest.Mock).mockReturnValue(mockPool);
    jest.clearAllMocks();
  });

  describe('post', () => {
    it('should create a new event successfully', async () => {
      const eventData = {
        issuerId: 1,
        eventId: 100,
        eventMaxSupply: 1000,
        eventMintExpiration: Math.floor(Date.now() / 1000) + 86400,
        eventOrganizer: '0x1234567890123456789012345678901234567890',
        title: 'Test Event',
        description: 'Test Description',
        imageUrl: 'https://example.com/image.jpg',
        eventStartDate: Math.floor(Date.now() / 1000),
      };

      const mockEvent = createMockEvent(eventData);
      (createEvent.run as jest.Mock).mockResolvedValue([mockEvent]);

      const result = await controller.post(eventData);

      expect(requirePoolWriteAccess).toHaveBeenCalled();
      expect(createEvent.run).toHaveBeenCalledWith(
        expect.objectContaining({
          issuerId: eventData.issuerId,
          eventId: eventData.eventId,
          eventMaxSupply: eventData.eventMaxSupply,
          eventMintExpiration: eventData.eventMintExpiration,
          eventOrganizer: eventData.eventOrganizer.toLowerCase(),
          title: eventData.title,
          description: eventData.description,
          imageUrl: eventData.imageUrl,
          eventStartDate: eventData.eventStartDate,
        }),
        mockPool
      );
      expect(result).toEqual(mockEvent);
    });

    it('should auto-generate eventId when not provided', async () => {
      const eventData = {
        issuerId: 1,
        eventMaxSupply: 1000,
        eventMintExpiration: Math.floor(Date.now() / 1000) + 86400,
        eventOrganizer: '0x1234567890123456789012345678901234567890',
      };

      const mockSequenceResult = { rows: [{ eventId: '200' }] };
      mockPool.query = jest.fn().mockResolvedValue(mockSequenceResult);

      const mockEvent = createMockEvent({ eventId: 200 });
      (createEvent.run as jest.Mock).mockResolvedValue([mockEvent]);

      const result = await controller.post(eventData as any);

      expect(mockPool.query).toHaveBeenCalledWith(
        "SELECT nextval('events_eventId_seq') as \"eventId\""
      );
      expect(createEvent.run).toHaveBeenCalledWith(
        expect.objectContaining({ eventId: 200 }),
        mockPool
      );
      expect(result).toEqual(mockEvent);
    });

    it('should update existing event metadata when event already exists', async () => {
      const eventData = {
        issuerId: 1,
        eventId: 100,
        eventMaxSupply: 1000,
        eventMintExpiration: Math.floor(Date.now() / 1000) + 86400,
        eventOrganizer: '0x1234567890123456789012345678901234567890',
        title: 'Updated Title',
        description: 'Updated Description',
      };

      // Simulate event already exists (empty result from createEvent)
      (createEvent.run as jest.Mock).mockResolvedValue([]);

      const existingEvent = createMockEvent({
        ...eventData,
        title: 'Updated Title',
        description: 'Updated Description',
      });
      (getEventByEventId.run as jest.Mock).mockResolvedValue([existingEvent]);
      (updateEventMetadata.run as jest.Mock).mockResolvedValue([]);

      const result = await controller.post(eventData);

      expect(createEvent.run).toHaveBeenCalled();
      expect(updateEventMetadata.run).toHaveBeenCalledWith(
        expect.objectContaining({
          eventId: eventData.eventId,
          title: eventData.title,
          description: eventData.description,
        }),
        mockPool
      );
      expect(getEventByEventId.run).toHaveBeenCalledWith(
        { eventId: eventData.eventId },
        mockPool
      );
      expect(result).toEqual(existingEvent);
    });

    it('should handle null optional fields', async () => {
      const eventData = {
        issuerId: 1,
        eventId: 100,
        eventMaxSupply: 1000,
        eventMintExpiration: Math.floor(Date.now() / 1000) + 86400,
        eventOrganizer: '0x1234567890123456789012345678901234567890',
      };

      const mockEvent = createMockEvent(eventData);
      (createEvent.run as jest.Mock).mockResolvedValue([mockEvent]);

      const result = await controller.post(eventData as any);

      expect(createEvent.run).toHaveBeenCalledWith(
        expect.objectContaining({
          title: null,
          description: null,
          imageUrl: null,
          eventEndDate: null,
        }),
        mockPool
      );
      expect(result).toEqual(mockEvent);
    });

    it('should return error response on database error', async () => {
      const eventData = {
        issuerId: 1,
        eventId: 100,
        eventMaxSupply: 1000,
        eventMintExpiration: Math.floor(Date.now() / 1000) + 86400,
        eventOrganizer: '0x1234567890123456789012345678901234567890',
      };

      const dbError = new Error('Database connection failed');
      (createEvent.run as jest.Mock).mockRejectedValue(dbError);

      const result = await controller.post(eventData as any);

      expect(result).toEqual({
        error: 'Failed to create event',
        details: 'Database connection failed',
      });
    });

    it('should handle case-insensitive organizer address', async () => {
      const eventData = {
        issuerId: 1,
        eventId: 100,
        eventMaxSupply: 1000,
        eventMintExpiration: Math.floor(Date.now() / 1000) + 86400,
        eventOrganizer: '0xABCDEFABCDEFABCDEFABCDEFABCDEFABCDEFABCD',
      };

      const mockEvent = createMockEvent(eventData);
      (createEvent.run as jest.Mock).mockResolvedValue([mockEvent]);

      await controller.post(eventData as any);

      expect(createEvent.run).toHaveBeenCalledWith(
        expect.objectContaining({
          eventOrganizer: eventData.eventOrganizer.toLowerCase(),
        }),
        mockPool
      );
    });
  });
});


