import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // Ensure jest.setup.ts exists in the root directory
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock CSS imports
  },
  testMatch: [
    '<rootDir>/**/__tests__/**/*.[jt]s?(x)', // Corrected path for test folders
    '<rootDir>/**/*.(spec|test).[tj]s?(x)', // Matches test files anywhere in the project
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest', // Use ts-jest for TypeScript files
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'], // Ensures compatibility with common file extensions
  rootDir: './', // Ensures Jest can resolve paths relative to the project root
};

export default config;
