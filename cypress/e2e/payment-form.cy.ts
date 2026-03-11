describe('template spec', () => {
  it('Successful Payment Form Submission', function () {
    cy.visit('http://localhost:8080/')

    cy.get('[data-testid="input-email"]').click();
    cy.get('[data-testid="input-email"]').type('john.doe@example.com');
    cy.get('[data-testid="input-cardNumber"]').click();
    cy.get('[data-testid="input-cardNumber"]').type('1111222233334444');
    cy.get('[data-testid="input-cvv"]').click();
    cy.get('[data-testid="input-cvv"]').type('123');
    cy.get('[data-testid="input-zip"]').click();
    cy.get('[data-testid="input-zip"]').type('SW1W 0NY');
    cy.get('[data-testid="input-nameOnCard"]').click();
    cy.get('[data-testid="input-nameOnCard"]').type('John Doe');
    cy.get('[data-testid="input-expiry"]').click();
    cy.get('[data-testid="input-expiry"]').type('01/29');
    cy.get('[data-testid="pay-by-card-button"]').click();
    cy.get('[data-testid="logo"]').should('be.visible');
    cy.get('[data-testid="success-icon"]').should('be.visible');
    cy.get('[data-testid="order-complete"]').should('be.visible');
    cy.get('[data-testid="order-complete"]').should('have.text', 'Order complete');
    cy.get('[data-testid="thank-you-message"]').should('be.visible');
    cy.get('[data-testid="thank-you-message"]').should('have.text', 'Thank you for your payment. You will receive your purchased products shortly.');
    cy.get('[data-testid="order-number"]').should('be.visible');
  });

  it('payment form validation', function () {
    cy.visit('http://localhost:8080/')

    cy.get('[data-testid="pay-by-card-button"]').click();
    cy.get('[data-testid="error-email"]').should('be.visible');
    cy.get('[data-testid="error-email"]').should('have.text', 'Invalid email address');
    cy.get('[data-testid="error-cardNumber"]').should('be.visible');
    cy.get('[data-testid="error-cardNumber"]').should('have.text', 'Card number must be 16 digits');
    cy.get('[data-testid="error-expiry"]').should('be.visible');
    cy.get('[data-testid="error-expiry"]').should('have.text', 'Card has expired');
    cy.get('[data-testid="error-cvv"]').should('be.visible');
    cy.get('[data-testid="error-cvv"]').should('have.text', 'CVC must be 3 digits');
    cy.get('[data-testid="error-zip"]').should('be.visible');
    cy.get('[data-testid="error-zip"]').should('have.text', 'Enter a valid UK postal code');
    cy.get('[data-testid="error-nameOnCard"]').should('be.visible');
    cy.get('[data-testid="error-nameOnCard"]').should('have.text', 'Name must be at least 2 characters');
  });
});



