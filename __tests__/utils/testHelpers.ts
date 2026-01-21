import type { Pool } from 'pg';
import type { SQLUpdate } from '@paima/node-sdk/db';

/**
 * Mock database pool for testing
 */
export class MockPool {
  private queries: Array<{ text: string; values?: any[] }> = [];
  private results: Map<string, any[]> = new Map();

  query(text: string, values?: any[]): Promise<{ rows: any[] }> {
    this.queries.push({ text, values });
    const key = text.trim().toLowerCase();
    
    // Return mock result if set, otherwise empty array
    const result = this.results.get(key) || [];
    return Promise.resolve({ rows: result });
  }

  setResult(queryText: string, result: any[]): void {
    this.results.set(queryText.trim().toLowerCase(), result);
  }

  getQueries(): Array<{ text: string; values?: any[] }> {
    return this.queries;
  }

  clear(): void {
    this.queries = [];
    this.results.clear();
  }
}

/**
 * Create a mock pool instance
 */
export function createMockPool(): MockPool {
  return new MockPool();
}

/**
 * Mock SubmittedChainData for testing
 */
export function createMockSubmittedChainData(
  inputData: string,
  blockHeight: number = 1000
): any {
  return {
    inputData,
    blockHeight,
    timestamp: Date.now(),
    txHash: '0x' + 'a'.repeat(64),
  };
}

/**
 * Mock Prando randomness generator
 */
export function createMockPrando(): any {
  return {
    next: jest.fn(() => 0.5),
    nextInt: jest.fn(() => 1),
  };
}

/**
 * Helper to create mock issuer data
 */
export function createMockIssuer(overrides?: Partial<any>): any {
  return {
    issuerId: 1,
    issuerAddress: '0x1234567890123456789012345678901234567890',
    issuerUuid: 'test-issuer-uuid',
    username: 'Test Issuer',
    email: 'issuer@test.com',
    organization: 'Test Org',
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  };
}

/**
 * Helper to create mock event data
 */
export function createMockEvent(overrides?: Partial<any>): any {
  return {
    eventId: 1,
    eventUuid: 'test-event-uuid',
    issuerId: 1,
    maxSupply: 100,
    expiration: Math.floor(Date.now() / 1000) + 86400, // 24 hours from now
    organiserAddress: '0x1234567890123456789012345678901234567890',
    status: 'active',
    title: 'Test Event',
    description: 'Test Description',
    imageUrl: 'https://example.com/image.jpg',
    eventStartDate: Math.floor(Date.now() / 1000),
    eventEndDate: null,
    totalSupply: 0,
    transaction_hash: '0x' + 'b'.repeat(64),
    block_number: 1000,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  };
}

/**
 * Helper to create mock POAP data
 */
export function createMockPoap(overrides?: Partial<any>): any {
  return {
    poapUuid: 'test-poap-uuid',
    issuerId: 1,
    eventId: 1,
    tokenId: 100,
    ownerAddress: '0x9876543210987654321098765432109876543210',
    transaction_hash: '0x' + 'c'.repeat(64),
    block_number: 1001,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  };
}

/**
 * Helper to create mock owner data
 */
export function createMockOwner(overrides?: Partial<any>): any {
  return {
    ownerId: 1,
    ownerAddress: '0x9876543210987654321098765432109876543210',
    username: 'Test Owner',
    email: 'owner@test.com',
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  };
}

/**
 * Helper to create mock event POAP relation data
 */
export function createMockEventPoap(overrides?: Partial<any>): any {
  return {
    relationUuid: 'test-relation-uuid',
    eventId: 1,
    tokenId: 100,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  };
}

/**
 * Assert that SQLUpdate has correct structure
 */
export function assertSQLUpdate(update: SQLUpdate): void {
  expect(update).toBeDefined();
  expect(Array.isArray(update)).toBe(true);
  expect(update.length).toBeGreaterThan(0);
  // The first element should be a callable or query descriptor; depending on
  // the underlying implementation it may be a function or an object wrapper.
  expect(['function', 'object']).toContain(typeof (update as any)[0]);
}

/**
 * Mock fetch for middleware tests
 */
export function setupMockFetch(mockResponse: any): void {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockResponse),
      ok: true,
      status: 200,
    } as Response)
  ) as jest.Mock;
}

/**
 * Reset all mocks
 */
export function resetAllMocks(): void {
  jest.clearAllMocks();
  const fetchAny = global.fetch as any;
  if (fetchAny && typeof fetchAny.mockClear === 'function') {
    fetchAny.mockClear();
  }
}


