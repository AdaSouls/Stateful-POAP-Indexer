const ignorePaths = ['/node_modules/', '/build/', '/integration-testing/'];

module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'node',
  coveragePathIgnorePatterns: [...ignorePaths, '/__tests__/utils/'],
  testPathIgnorePatterns: [...ignorePaths],
  testMatch: ['**/__tests__/**/*.test.ts'],
  setupFiles: ['dotenv/config'],
  setupFilesAfterEnv: ['<rootDir>/jestSetup.ts'],
  transformIgnorePatterns: [
    'node_modules/(?!(@paima|@game)/)',
  ],
  globals: {
    'ts-jest': {
      tsconfig: {
        experimentalDecorators: true,
        emitDecoratorMetadata: true,
      },
    },
  },
  moduleNameMapper: {
    '^@paima/sdk/concise$': '<rootDir>/__tests__/mocks/paima-concise.mock.ts',
    '^@paima/node-sdk/db$': '<rootDir>/__tests__/mocks/paima-db.mock.ts',
  },
};
