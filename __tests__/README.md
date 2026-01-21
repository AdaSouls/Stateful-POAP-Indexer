# Backend Test Suite

This directory contains comprehensive unit tests and end-to-end tests for the Stateful POAP Indexer backend.

## Test Structure

```
__tests__/
├── utils/
│   └── testHelpers.ts          # Test utilities and mock helpers
├── unit/
│   ├── api/
│   │   └── controllers/        # API controller unit tests
│   ├── state-transition/        # State transition function tests
│   ├── middleware/              # Middleware endpoint tests
│   ├── db/                      # Database query tests
│   └── game-logic/              # Game logic function tests
└── e2e/                         # End-to-end integration tests
```

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in watch mode
```bash
npm run test:watch
```

### Run specific test file
```bash
npm test -- createEvent.test.ts
```

### Run tests with coverage
```bash
npm test -- --coverage
```

### Run only unit tests
```bash
npm test -- unit
```

### Run only end-to-end tests
```bash
npm test -- e2e
```

## Test Coverage

### Unit Tests

#### API Controllers
- ✅ `createEvent.test.ts` - Event creation controller
- ✅ `createPoap.test.ts` - POAP creation controller
- ✅ `createIssuer.test.ts` - Issuer creation controller
- ✅ `getAllPoaps.test.ts` - POAP query controller

#### State Transition
- ✅ `parser.test.ts` - Input parsing and validation
- ✅ `transition.test.ts` - State transition functions
- ✅ `index.test.ts` - State transition entrypoint

#### Middleware
- ✅ `queries.test.ts` - Query endpoint functions
- ✅ `write.test.ts` - Write endpoint functions

#### Database
- ✅ `queries.test.ts` - Database query functions

#### Game Logic
- ✅ `index.test.ts` - Game logic calculations

### End-to-End Tests

- ✅ `issuer-event-poap-flow.test.ts` - Complete flow: Create Issuer → Create Event → Mint POAP → Query
- ✅ `state-transition-flow.test.ts` - State transition processing flow

## Test Utilities

The `utils/testHelpers.ts` file provides:

- **MockPool** - Mock database pool for testing
- **createMockPool()** - Factory for mock database pools
- **createMockSubmittedChainData()** - Mock blockchain input data
- **createMockPrando()** - Mock randomness generator
- **createMockIssuer()** - Mock issuer data factory
- **createMockEvent()** - Mock event data factory
- **createMockPoap()** - Mock POAP data factory
- **setupMockFetch()** - Mock fetch for middleware tests
- **resetAllMocks()** - Reset all mocks between tests

## Writing New Tests

### Unit Test Example

```typescript
import { MyController } from '@game/api/src/controllers/my/controller';
import { createMockPool } from '../../utils/testHelpers';

jest.mock('@game/db', () => ({
  requirePoolWriteAccess: jest.fn(),
  myQuery: { run: jest.fn() },
}));

describe('MyController', () => {
  let controller: MyController;
  let mockPool: any;

  beforeEach(() => {
    controller = new MyController();
    mockPool = createMockPool();
    jest.clearAllMocks();
  });

  it('should do something', async () => {
    // Test implementation
  });
});
```

### End-to-End Test Example

```typescript
import { setupMockFetch } from '../utils/testHelpers';

describe('End-to-End: My Flow', () => {
  it('should complete full flow', async () => {
    // Step 1: Setup
    // Step 2: Execute
    // Step 3: Verify
  });
});
```

## Mocking Strategy

- **Database**: All database operations are mocked using Jest mocks
- **Fetch**: Global fetch is mocked for middleware tests
- **External Services**: All external dependencies are mocked
- **Randomness**: Prando generator is mocked for deterministic tests

## Test Best Practices

1. **Isolation**: Each test should be independent and not rely on other tests
2. **Clear Names**: Use descriptive test names that explain what is being tested
3. **Arrange-Act-Assert**: Structure tests with clear setup, execution, and verification
4. **Mock External Dependencies**: Mock all external services and databases
5. **Test Edge Cases**: Include tests for error conditions and edge cases
6. **Coverage**: Aim for high code coverage, especially for critical paths

## Continuous Integration

Tests are automatically run in CI/CD pipelines. Ensure all tests pass before merging:

```bash
npm test
```

## Troubleshooting

### Tests failing with module resolution errors
- Ensure all dependencies are installed: `npm ci`
- Check that TypeScript paths are correctly configured

### Database connection errors in tests
- All database operations should be mocked
- Use `createMockPool()` from test helpers

### Fetch errors in middleware tests
- Use `setupMockFetch()` to mock fetch responses
- Ensure mocks are reset between tests with `resetAllMocks()`


