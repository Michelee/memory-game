describe('game single person', () => {
  beforeEach(() => {
    cy.visit('https://memory-game-micheleancheta.vercel.app/play-alone')
  })

  it('should flip the cards on click and reset if there is no match', () => {
    cy.get('.grid > :nth-child(6)').click()
    cy.get('.grid > :nth-child(6)').should('have.class', 'bg-orange-500')
    cy.get('.grid > :nth-child(2)').click()
    cy.get('.grid > :nth-child(2)').should('have.class', 'bg-orange-500')
    cy.wait(200)
    cy.get('.grid > :nth-child(6)').should('not.have.class', 'bg-orange-500')
    cy.get('.grid > :nth-child(2)').should('not.have.class', 'bg-orange-500')
  });

  it('should keep score same', () => {
    cy.get('.grid > :nth-child(6)').click()
    cy.get('.grid > :nth-child(6)').should('have.class', 'bg-orange-500')
    cy.get('.grid > :nth-child(2)').click()
    cy.get('.grid > :nth-child(2)').should('have.class', 'bg-orange-500')
    cy.wait(200)
    cy.get('.my-5 > :nth-child(2)').contains('0')
  });

  it('should flip the cards over when click and keep them open if it is a match', () => {
    cy.get('.grid > :nth-child(9)').click()
    cy.get('.grid > :nth-child(9)').should('have.class', 'bg-orange-500')
    cy.get('.grid > :nth-child(7)').click()
    cy.get('.grid > :nth-child(7)').should('have.class', 'bg-orange-500')
    cy.wait(200)
    cy.get('.grid > :nth-child(7)').should('have.class', 'bg-green-500')
    cy.get('.grid > :nth-child(9)').should('have.class', 'bg-green-500')
  });

  it('should increase score by 1', () => {
    cy.get('.my-5 > :nth-child(2)').contains('0')
    cy.get('.grid > :nth-child(9)').click()
    cy.get('.grid > :nth-child(9)').should('have.class', 'bg-orange-500')
    cy.get('.grid > :nth-child(7)').click()
    cy.get('.grid > :nth-child(7)').should('have.class', 'bg-orange-500')
    cy.wait(200)
    cy.get('.my-5 > :nth-child(2)').contains('1')
  });
})