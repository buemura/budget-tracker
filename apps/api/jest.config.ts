import type { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

export default async (): Promise<Config> => {
  return {
    roots: ['<rootDir>/src'],
    preset: 'ts-jest',
    testEnvironment: 'node',
    verbose: true,
    setupFiles: ['<rootDir>/tests/jest-setup.ts'],
    testMatch: ['**/**/*.(spec|test).ts'],
    detectOpenHandles: true,
    collectCoverage: false,
    coveragePathIgnorePatterns: ['node_modules', '<rootDir>/src/repositories'],
    collectCoverageFrom: ['**/*.(t|j)s'],
    transform: {
      '^.+\\.(t|j)s$': 'ts-jest',
    },
    forceExit: true,
    modulePaths: ['<rootDir>'],
    moduleDirectories: ['node_modules', 'src'],
    moduleFileExtensions: ['js', 'json', 'ts'],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  };
};
