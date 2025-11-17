import type { Config } from 'jest';
import { createCjsPreset } from 'jest-preset-angular/presets';

const config: Config = {
  ...createCjsPreset(),

  testEnvironment: 'jsdom',

  // VERY IMPORTANT FOR MONOREPOS
  roots: ['<rootDir>/projects/'],

  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],

  transform: {
    '^.+\\.(ts|js|mjs|html)$': 'jest-preset-angular',
  },

  moduleFileExtensions: ['ts', 'html', 'js', 'json', 'mjs'],

  transformIgnorePatterns: ['node_modules/(?!@datorama/akita)'],

  moduleNameMapper: {
    '^shared$': '<rootDir>/projects/shared/src/public-api',
    '^product$': '<rootDir>/projects/product/src/public-api',
    '^app-bancaria$': '<rootDir>/projects/app-bancaria/src/public-api',

    '^@app/(.*)$': '<rootDir>/projects/app-bancaria/src/app/$1',
    '^@product/(.*)$': '<rootDir>/projects/product/src/app/$1',
    '^@shared/(.*)$': '<rootDir>/projects/shared/src/app/$1',
  },
};

export default config;
