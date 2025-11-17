/// <reference types="cypress" />
const BASE_URL = 'http://localhost:4200';

function waitForProducts(count) {
  cy.get('tbody tr').should('have.length.at.least', count);
}

it('debería buscar productos por ID o nombre', () => {
  cy.visit(BASE_URL);

  waitForProducts(2);

  cy.get('.form-control').type('TC-001 - Tarjeta Habiente');

  cy.get('tbody tr').should('have.length', 1);
  cy.contains('TC-001 - Tarjeta Habiente');

  cy.get('.search-input').clear();

  waitForProducts(1);
});
