const BASE_URL = 'http://localhost:4200';

describe('🏦 Product App - Smoke Tests', () => {
  it('debería cargar la aplicación', () => {
    cy.visit(BASE_URL);
    cy.contains('Bank'); // texto que tu app muestra
    cy.get('.create-button').should('exist');
  });

  it('debería renderizar la tabla', () => {
    cy.visit(BASE_URL);
    cy.get('.table-bank-scroll').should('exist');
    cy.get('.table-bank-scroll .header-icon').should('exist');
  });
});

describe('dar click en add/agregar , que este disponible por ultimo cliclearlo ', () => {
  it('encontrar el button', () => {
    cy.visit('http://localhost:4200');
    cy.get('.create-button').should('be.enabled');
  });

  it('existen elementos dentro de la tabla ', () => {
    cy.visit('http://localhost:4200');
    cy.get('.table-bank-scroll').find('.header-icon');
  });
});

describe('Product App', () => {
  it('should load the main page', () => {
    cy.visit('http://localhost:4200');
    cy.contains('Bank');
  });
});

describe('dar click en add/agregar , que este disponible por ultimo cliclearlo ', () => {
  it('encontrar el button', () => {
    cy.visit('http://localhost:4200');
    cy.get('.create-button').should('be.enabled');
  });

  it('existen elementos dentro de la tabla ', () => {
    cy.visit('http://localhost:4200');
    cy.get('.table-bank-scroll').find('.header-icon');
  });
});
