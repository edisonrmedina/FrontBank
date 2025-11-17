import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    specPattern: 'projects/**/e2e/**/*.cy.{js,ts}',
    baseUrl: 'http://localhost:4200',
  },
});
