module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // Configure additional setup
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock CSS files
  },
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)', // Match test files in __tests__ directories
    '**/?(*.)+(spec|test).[tj]s?(x)', // Match *.spec.ts, *.test.ts, *.spec.tsx, etc.
  ],
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'ts-jest', // Transform TypeScript and JavaScript files
  },
};
