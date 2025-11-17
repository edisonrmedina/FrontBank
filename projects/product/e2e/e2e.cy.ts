describe('Product App', () => {
  it('should load the main page', () => {
    cy.visit('http://localhost:4200'); // o el puerto donde sirvas "product"
    cy.contains('Product'); // cualquier texto real de tu app
  });
});
