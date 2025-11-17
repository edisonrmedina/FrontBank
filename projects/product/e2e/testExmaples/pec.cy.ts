describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:4200/');
  });
  it('passes', () => {
    cy.visit('http://localhost:4200/create');
  });
  it('passes', () => {
    cy.visit('http://localhost:4200/edit');
  });
});
