describe('Slot Machine', () => {
  it('should displays a slot machine with a 20 points initially', () => {
    cy.visit('/slot-machine');

    cy.get('[data-testid="slot-machine"]').should('be.visible');
    cy.get('[data-testid="slot-machine-item"]').should('have.length', 3);
    cy.get('[data-testid="spin-button"]')
      .should('be.visible')
      .should('be.enabled')
      .contains('Spin to Win!');
    cy.get('[data-testid="coins"]').contains('Coins: 20');
    cy.get('[data-testid="winnings"]').should('not.exist');
  });

  it('should starts spinning when user click', () => {
    cy.visit('/slot-machine');

    cy.get('[data-testid="spin-button"]').click();
    cy.get('[data-testid="spin-button"]').contains('Spinning...');
    cy.get('[data-testid="spin-button"]').should('be.disabled');

    cy.get('[data-testid="slot-machine-item"]')
      .should('have.css', 'animation-duration', '0.2s')
      .should('have.css', 'animation-timing-function', 'linear')
      .should('have.css', 'animation-iteration-count', 'infinite');
  });

  it('should stops spinning in a short time and show user the winnings', () => {
    cy.visit('/slot-machine');

    cy.get('[data-testid="spin-button"]').click();

    cy.get('[data-testid="slot-machine-item"]')
      .should('have.css', 'animation-duration', '0.2s')
      .should('have.css', 'animation-timing-function', 'ease-out')
      .should('have.css', 'animation-iteration-count', '1');

    cy.get('[data-testid="winnings"]').contains(/Winnings: \d+ coins/);
  });

  it('should enables the button again for next spin', () => {
    cy.visit('/slot-machine');

    cy.get('[data-testid="spin-button"]')
      .click()
      .contains('Spinning...')
      .should('be.disabled');

    cy.get('[data-testid="spin-button"]')
      .contains('Spin to Win!')
      .should('be.enabled');
  });
});
