// Mock for @paima/node-sdk/db
export type SQLUpdate = [any, any];

export function getConnection(creds: any, readOnly: boolean): any {
  return {
    query: jest.fn(() => Promise.resolve({ rows: [] })),
  };
}


