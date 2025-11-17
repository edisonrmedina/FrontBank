// @ts-nocheck
/// <reference types="cypress" />
const BASE_URL = 'http://localhost:4200';

describe('Product App - Smoke Tests', () => {
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

describe('Crear múltiples productos', () => {
  const products = [{ id: 'E2E-001' }, { id: 'E2E-002' }];

  products.forEach((product) => {
    it(`debería crear el producto con ID ${product.id}`, () => {
      cy.visit(BASE_URL);

      cy.wait(1000);

      // Abrir modal
      cy.get('.create-button').first().click();

      // Completar campos
      cy.get('#id').type(product.id);
      cy.get('#name').type('Producto Cypress');
      cy.get('#description').type('Producto creado vía Cypress');
      cy.get('#logo').type(
        'https://portalbb-multimedia.bolivariano.com/images/default-source/general/bankard/bk-visa-signature.png'
      );
      cy.get('#date_release').type('2025-12-12');

      // Click en enviar
      cy.get('.button-secundario').click();

      // Validar éxito
      cy.contains(/(Operación Exitosa|Success)/).should('be.visible');
    });
  });
});

describe('Editar producto desde el dropdown', () => {
  it('debería editar el primer producto', () => {
    cy.visit(BASE_URL);
    cy.wait(1000);
    cy.get('tbody tr').first().as('firstRow');
    cy.get('@firstRow').find('.dropdown').click();
    cy.get('@firstRow')
      .find('.dropdown-item')
      .contains('Editar')
      .click({ force: true });
    cy.get('.modal-container').should('be.visible');
    const nuevoNombre = 'Producto Editado Cypress';
    cy.get('#name').clear().type(nuevoNombre);
    cy.get('.button-secundario').click();
    cy.contains(/Operación Exitosa|Success/i).should('be.visible');
    cy.get('@firstRow').find('td').contains(nuevoNombre);
  });
});

describe('Eliminar producto desde el dropdown', () => {
  it('debería eliminar el primer producto', () => {
    cy.visit(BASE_URL);
    cy.wait(1000);

    // 1️⃣ Seleccionar primera fila real
    cy.get('tbody tr').first().as('firstRow');

    // 2️⃣ Obtener nombre e ID dinámicamente
    cy.get('@firstRow').find('td').eq(1).invoke('text').as('productName');
    cy.get('@firstRow').find('td').eq(0).invoke('text').as('productId');

    // 3️⃣ Abrir dropdown
    cy.get('@firstRow').find('.dropdown').click();

    // 4️⃣ Click en "Eliminar"
    cy.get('@firstRow')
      .find('.dropdown-item')
      .contains(/Eliminar|Delete/i)
      .click({ force: true });

    // 5️⃣ Validar modal visible
    cy.get('.modal-overlay').should('be.visible');

    // 6️⃣ Validar texto del modal coincide con producto seleccionado
    cy.get('@productName').then((name) => {
      cy.get('@productId').then((id) => {
        cy.contains(`${name.trim()} - ${id.trim()}`).should('be.visible');
      });
    });

    // 7️⃣ Confirmar eliminación
    cy.get('.btn-confirm').click();

    // 8️⃣ Validar mensaje de éxito
    cy.contains(/Operación Exitosa|Success/i).should('be.visible');
  });
});

describe('Validaciones del formulario', () => {
  it('debería mostrar errores si los campos están vacíos', () => {
    cy.visit(BASE_URL);

    cy.wait(1000);

    // Abrir modal
    cy.get('.create-button').first().click();

    cy.get('#id').focus().blur();
    cy.contains(/ID.*obligatorio|required/i).should('be.visible');

    cy.get('#name').focus().blur();
    cy.contains(/Nombre.*obligatorio|required/i).should('be.visible');

    cy.get('#description').focus().blur();
    cy.contains(/Descripción.*obligatorio|required/i).should('be.visible');

    cy.get('#logo').focus().blur();
    cy.contains(/Logo.*obligatorio|required/i).should('be.visible');

    cy.get('#date_release').focus().blur();
    cy.contains(/Fecha.*obligatorio|required/i).should('be.visible');
  });
});

describe('Validar cálculo automático de date_revision', () => {
  it('debería autocalcular date_revision +1 año', () => {
    cy.visit(BASE_URL);
    cy.wait(1000);

    // Abrir modal de creación
    cy.get('.create-button').first().click();

    const releaseDate = '2025-12-12'; // AAAA-MM-DD
    const expectedRevision = '2026-12-12'; // +1 año

    // Escribir fecha de release
    cy.get('#date_release').type(releaseDate);

    // date_revision está disabled → usar .invoke('val')
    cy.get('#date_revision')
      .should('be.disabled')
      .invoke('val')
      .then((value) => {
        expect(value).to.equal(expectedRevision);
      });
  });
});
