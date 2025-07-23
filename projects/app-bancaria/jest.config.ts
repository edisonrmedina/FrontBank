import type { Config } from 'jest';
import { createCjsPreset } from 'jest-preset-angular/presets';

const config: Config = {
  ...createCjsPreset(),

  // Mapea correctamente shared, product, etc.
  moduleNameMapper: {
    '^shared(.*)$': '<rootDir>/dist/shared$1',
    '^product(.*)$': '<rootDir>/dist/product$1',
    '^app-bancaria(.*)$': '<rootDir>/dist/app-bancaria$1',
  },

  // Asegura que Jest ignore completamente el código fuente
  modulePathIgnorePatterns: [
    '<rootDir>/projects/shared',
    '<rootDir>/projects/product',
    '<rootDir>/projects/app-bancaria',
  ],

  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
};

export default config;
