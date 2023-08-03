describe('home page', () => {
  beforeEach(() => {
    cy.visit('https://memory-game-micheleancheta.vercel.app/')
  })

  it('should contain the join game button', () => {
    const button = cy.get('button').contains('Join game')
    expect(button).to.exist
  })

  it('should contain the play alone button', () => {
    const button = cy.get('button').contains('Play alone')
    expect(button).to.exist
  })

  it('should contain the host game button', () => {
    const button = cy.get('button').contains('Host game')
    expect(button).to.exist
  })

  it('clicking "join game" navigates to a new url', () => {
    cy.get('button').contains('Join game').click()
    cy.url().should('include', '/join-game')
  })

  it('clicking "join game" navigates to a new url', () => {
    cy.get('button').contains('Host game').click()
    cy.url().should('include', '/new-game')
  })

  it('clicking "play alone" navigates to a new url', () => {
    cy.get('button').contains('Play alone').click()
    cy.url().should('include', '/play-alone')
  })
})