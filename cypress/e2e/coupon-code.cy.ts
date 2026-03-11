describe('template spec', () => {
  it('Coupon applied successfully', function () {
    cy.visit('http://localhost:8080/')

    cy.get('[data-testid="input-code"]').first().click();
    cy.get('[data-testid="input-code"]').first().type('25OFF');
    cy.get('[data-testid="apply-coupon-button"]').first().click();
    cy.get('[data-testid="amount-row-label-Discounts:"]').should('be.visible');
  });

  it('Coupon code not applied', function () {
    cy.visit('http://localhost:8080/')

    cy.get('[data-testid="apply-coupon-button"]').first().click();
    cy.get('[data-testid="no-coupon-applied-error"]').should('be.visible');
    cy.get('[data-testid="no-coupon-applied-error"]').should('have.text', 'Please enter a coupon code.');
  });
});

