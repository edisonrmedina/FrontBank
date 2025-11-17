import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    supportFile: false,
    specPattern: 'projects/**/e2e/**/*.cy.{js,ts}',
    baseUrl: 'http://localhost:4200',
  },
});
