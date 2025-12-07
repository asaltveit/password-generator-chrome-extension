module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  testMatch: [
    '**/tests/**/*.test.js'
  ],
  collectCoverageFrom: [
    '*.js',
    '!tests/**',
    '!node_modules/**'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1'
  },
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html']
};
