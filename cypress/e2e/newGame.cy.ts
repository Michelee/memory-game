describe('new game section', () => {
  beforeEach(() => {
    cy.visit('https://memory-game-micheleancheta.vercel.app/new-game')
  })

  it('host game button should be disabled if the form is not completed', () => {
    cy.get('input').first().type('Joe Doe') // type in the input
    cy.get('[type="radio"]').first().check() // select theme numbers
    cy.get('button').contains('Host game').should('be.disabled')
  })

  it('host game button should be enable if the form is completed', () => {
    cy.get('input').first().type('Joe Doe') // type in the input
    cy.get('[type="radio"]').first().check() // select theme numbers
    cy.get('[type="radio"]').eq(2).check() // select size 4x4
    cy.get('button').contains('Host game').should('not.be.disabled')
  })
})

describe('start game section', () => {
  beforeEach(() => {
    cy.visit('https://memory-game-micheleancheta.vercel.app/new-game')
    cy.get('input').first().type('Joe Doe') // type in the input
    cy.get('[type="radio"]').first().check() // select theme numbers
    cy.get('[type="radio"]').eq(2).check() // select size 4x4
    cy.get('button').contains('Host game').should('not.be.disabled')
    cy.get('button').contains('Host game').click()
  })

  it('clicking "host game" should show the game code and the start game button', () => {
    cy.get('h2').contains('Game Code')
    cy.get('button').contains('Start game')
  })

  it('clicking start game should redirect to the game page', () => {
    cy.get('button').contains('Start game').click()
    cy.url().should('include', '/game')
  })
})
