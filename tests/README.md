# Test Suite

This directory contains unit and integration tests for the Chrome extension.

## Structure

```
tests/
├── unit/              # Unit tests for individual functions
│   ├── password.test.js
│   └── clipboard.test.js
├── integration/       # Integration tests for UI interactions
│   ├── popup.test.js
│   └── content.test.js
├── utils/             # Test utilities and helpers
│   └── test-helpers.js
├── setup.js           # Jest setup file with mocks
└── README.md          # This file
```

## Running Tests

### Run all tests
```bash
npm test
```

### Run only unit tests
```bash
npm run test:unit
```

### Run only integration tests
```bash
npm run test:integration
```

### Run tests in watch mode
```bash
npm run test:watch
```

### Run tests with coverage
```bash
npm run test:coverage
```

## Test Types

### Unit Tests
Unit tests focus on testing individual functions in isolation:
- Password generation logic
- Clipboard operations
- Utility functions

### Integration Tests
Integration tests verify that multiple components work together:
- Popup UI interactions
- Content script DOM manipulation
- Event handling
- User workflows

## Setup

The test setup (`setup.js`) includes:
- Chrome API mocks (storage, runtime)
- Clipboard API mocks
- DOM environment configuration

## Writing New Tests

When adding new functionality, create corresponding tests:

1. **Unit tests** should go in `tests/unit/`
2. **Integration tests** should go in `tests/integration/`
3. Use the helper utilities in `tests/utils/` for common operations

Example:
```javascript
describe('New Feature', () => {
  beforeEach(() => {
    resetDOM();
  });

  test('should do something', () => {
    // Test implementation
  });
});
```
