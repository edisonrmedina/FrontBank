// @ts-nocheck
import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./setup-vitest.ts'],
  },
  resolve: {
    alias: {
      shared: path.resolve(__dirname, 'projects/shared/src/public-api.ts'),
      product: path.resolve(__dirname, 'projects/product/src/public-api.ts'),
      app: path.resolve(__dirname, 'projects/app-bancaria/src/app'),
    },
  },
});
