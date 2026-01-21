/**
 * End-to-end test for the complete flow:
 * 1. Create Issuer
 * 2. Create Event
 * 3. Mint POAP
 * 4. Query results
 */

// Mock @paima/node-sdk/db before importing
jest.mock('@paima/node-sdk/db', () => ({
  getConnection: jest.fn(() => ({
    query: jest.fn(() => Promise.resolve({ rows: [] })),
  })),
}));

import { CreateIssuerController } from '@game/api/src/controllers/issuers/createIssuer';
import { CreateEventController } from '@game/api/src/controllers/events/createEvent';
import { CreatePoapController } from '@game/api/src/controllers/poaps/createPoap';
import { AllPoapsController } from '@game/api/src/controllers/poaps/getAllPoaps';
import {
  requirePoolWriteAccess,
  requirePool,
  createIssuer,
  createEvent,
  createPoap,
  getAllPoaps,
  getEventByEventId,
  getIssuerByWalletAddress,
} from '@game/db';
import {
  createMockPool,
  createMockIssuer,
  createMockEvent,
  createMockPoap,
} from '../utils/testHelpers';

// Mock the database module
jest.mock('@game/db', () => ({
  requirePoolWriteAccess: jest.fn(),
  requirePool: jest.fn(),
  createIssuer: {
    run: jest.fn(),
  },
  createEvent: {
    run: jest.fn(),
  },
  createPoap: {
    run: jest.fn(),
  },
  getAllPoaps: {
    run: jest.fn(),
  },
  getEventByEventId: {
    run: jest.fn(),
  },
  getIssuerByWalletAddress: {
    run: jest.fn(),
  },
  updateEventMetadata: {
    run: jest.fn(),
  },
}));

describe('End-to-End: Issuer -> Event -> POAP Flow', () => {
  let mockPool: any;
  let issuerController: CreateIssuerController;
  let eventController: CreateEventController;
  let poapController: CreatePoapController;
  let allPoapsController: AllPoapsController;

  const issuerAddress = '0x1234567890123456789012345678901234567890';
  const eventOrganizer = issuerAddress; // Same address for simplicity
  const ownerAddress = '0x9876543210987654321098765432109876543210';

  beforeEach(() => {
    mockPool = createMockPool();
    (requirePoolWriteAccess as jest.Mock).mockReturnValue(mockPool);
    (requirePool as jest.Mock).mockReturnValue(mockPool);

    issuerController = new CreateIssuerController();
    eventController = new CreateEventController();
    poapController = new CreatePoapController();
    allPoapsController = new AllPoapsController();

    jest.clearAllMocks();
  });

  it('should complete full flow: create issuer -> create event -> mint POAP -> query', async () => {
    // Step 1: Create Issuer
    const issuerData = {
      address: issuerAddress,
      email: 'issuer@test.com',
      name: 'Test Issuer',
      organization: 'Test Organization',
    };

    const mockIssuer = createMockIssuer({
      issuerAddress: issuerAddress,
      issuerId: 1,
      username: issuerData.name,
      email: issuerData.email,
      organization: issuerData.organization,
    });
    (createIssuer.run as jest.Mock).mockResolvedValue([mockIssuer]);

    const createdIssuer = await issuerController.createIssuer(issuerData);
    expect(createdIssuer).toBeDefined();
    expect((createdIssuer as any).issuerId).toBe(1);
    expect((createdIssuer as any).issuerAddress).toBe(issuerAddress);

    // Step 2: Create Event
    const eventData = {
      issuerId: 1,
      eventId: 100,
      eventMaxSupply: 1000,
      eventMintExpiration: Math.floor(Date.now() / 1000) + 86400,
      eventOrganizer: eventOrganizer,
      title: 'Test Event',
      description: 'Test Description',
    };

    const mockEvent = createMockEvent({
      ...eventData,
    });
    (createEvent.run as jest.Mock).mockResolvedValue([mockEvent]);

    const createdEvent = await eventController.post(eventData as any);
    expect(createdEvent).toBeDefined();
    expect((createdEvent as any).eventId).toBe(100);
    expect((createdEvent as any).issuerId).toBe(1);

    // Step 3: Mint POAP
    const poapData = {
      issuerId: 1,
      eventId: 100,
      tokenId: 500,
      ownerAddress: ownerAddress,
    };

    const mockPoap = createMockPoap({
      ...poapData,
      poapUuid: 'test-poap-uuid',
    });
    (createPoap.run as jest.Mock).mockResolvedValue([mockPoap]);

    const createdPoap = await poapController.post(poapData);
    expect(createdPoap).toBeDefined();
    expect((createdPoap as any).tokenId).toBe(500);
    expect((createdPoap as any).eventId).toBe(100);
    expect((createdPoap as any).ownerAddress).toBe(ownerAddress);

    // Step 4: Query all POAPs
    const mockPoaps = [mockPoap];
    (getAllPoaps.run as jest.Mock).mockResolvedValue(mockPoaps);

    const allPoaps = await allPoapsController.getAll();
    expect(allPoaps).toBeDefined();
    expect(Array.isArray(allPoaps)).toBe(true);
    if (Array.isArray(allPoaps) && allPoaps.length > 0) {
      expect(allPoaps[0].tokenId).toBe(500);
    }
  });

  it('should handle multiple POAPs for the same event', async () => {
    // Setup: Create issuer and event
    const issuerData = {
      address: issuerAddress,
      email: 'issuer@test.com',
      name: 'Test Issuer',
      organization: 'Test Organization',
    };
    const mockIssuer = createMockIssuer({ issuerId: 1 });
    (createIssuer.run as jest.Mock).mockResolvedValue([mockIssuer]);
    await issuerController.createIssuer(issuerData);

    const eventData = {
      issuerId: 1,
      eventId: 200,
      eventMaxSupply: 1000,
      eventMintExpiration: Math.floor(Date.now() / 1000) + 86400,
      eventOrganizer: eventOrganizer,
    };
    const mockEvent = createMockEvent({ eventId: 200 });
    (createEvent.run as jest.Mock).mockResolvedValue([mockEvent]);
    await eventController.post(eventData as any);

    // Mint multiple POAPs
    const poap1 = createMockPoap({ tokenId: 100, eventId: 200 });
    const poap2 = createMockPoap({ tokenId: 101, eventId: 200 });
    const poap3 = createMockPoap({ tokenId: 102, eventId: 200 });

    (createPoap.run as jest.Mock)
      .mockResolvedValueOnce([poap1])
      .mockResolvedValueOnce([poap2])
      .mockResolvedValueOnce([poap3]);

    await poapController.post({ issuerId: 1, eventId: 200, tokenId: 100, ownerAddress });
    await poapController.post({ issuerId: 1, eventId: 200, tokenId: 101, ownerAddress });
    await poapController.post({ issuerId: 1, eventId: 200, tokenId: 102, ownerAddress });

    // Query all POAPs
    (getAllPoaps.run as jest.Mock).mockResolvedValue([poap1, poap2, poap3]);
    const allPoaps = await allPoapsController.getAll();

    expect(Array.isArray(allPoaps)).toBe(true);
    if (Array.isArray(allPoaps)) {
      expect(allPoaps.length).toBe(3);
      expect(allPoaps.every(p => p.eventId === 200)).toBe(true);
    }
  });

  it('should handle errors gracefully at each step', async () => {
    // Step 1: Issuer creation fails
    const issuerData = {
      address: issuerAddress,
      email: 'issuer@test.com',
      name: 'Test Issuer',
      organization: 'Test Organization',
    };
    (createIssuer.run as jest.Mock).mockRejectedValue(new Error('Database error'));

    const issuerResult = await issuerController.createIssuer(issuerData);
    expect(issuerResult).toHaveProperty('error');

    // Step 2: Event creation fails
    const eventData = {
      issuerId: 1,
      eventId: 100,
      eventMaxSupply: 1000,
      eventMintExpiration: Math.floor(Date.now() / 1000) + 86400,
      eventOrganizer: eventOrganizer,
    };
    (createEvent.run as jest.Mock).mockRejectedValue(new Error('Event creation failed'));

    const eventResult = await eventController.post(eventData as any);
    expect(eventResult).toHaveProperty('error');

    // Step 3: POAP creation fails
    const poapData = {
      issuerId: 1,
      eventId: 100,
      tokenId: 500,
      ownerAddress: ownerAddress,
    };
    (createPoap.run as jest.Mock).mockRejectedValue(new Error('POAP creation failed'));

    const poapResult = await poapController.post(poapData);
    expect(poapResult).toHaveProperty('error');
  });
});


