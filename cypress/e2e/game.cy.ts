describe("game single person", () => {
  beforeEach(() => {
    cy.visit("https://memory-game-micheleancheta.vercel.app");
    cy.setCookie("userId", "29308409-7b63-49f7-b747-6d13d8a08c1c");
    cy.visit("https://memory-game-micheleancheta.vercel.app/game/dull-owl-86");
  });

  it("should show the restart button", () => {
    const button = cy.get("button").contains("Restart");
    expect(button).to.exist;
  });

  it("should show the new game button", () => {
    const button = cy.get("button").contains("New Game");
    expect(button).to.exist;
  });

  // it("should flip the card", () => {
  //   cy.intercept("/rest/v1/game*").as("updateGame");
  //   cy.get(".grid > :nth-child(6)").click();
  //   cy.wait("@updateGame").then(() => {
  //     cy.get(".grid > :nth-child(6)").should("have.class", "bg-orange-500");
  //   });
  //   cy.get(".grid > :nth-child(9)").click();
  //   cy.wait("@updateGame").then(() => {
  //     cy.get(".grid > :nth-child(9)").should("have.class", "bg-orange-500");
  //   });
  //   cy.wait(200);
  //   cy.get(".grid > :nth-child(6)").should("have.class", "bg-blue-500");
  //   cy.get(".grid > :nth-child(9)").should("have.class", "bg-blue-500");
  // });
});

describe("game more than one person", () => {
  //   beforeEach(() => {
  //     cy.visit("https://memory-game-micheleancheta.vercel.app");
  //     cy.setCookie("userId", "de345e08-c90a-4369-8282-ae239652badc");
  //     cy.visit("https://memory-game-micheleancheta.vercel.app/game/fast-snail-71");
  //   });

  it("should show the countdown", () => {
    cy.visit("https://memory-game-micheleancheta.vercel.app");
    cy.setCookie("userId", "de345e08-c90a-4369-8282-ae239652badc");
    cy.visit(
      "https://memory-game-micheleancheta.vercel.app/game/fast-snail-71"
    );
    cy.wait(200);
    const countdown = cy.get('.ml-4')
    expect(countdown).to.exist;
  });

  //   it("should show the new game button", () => {
  //     const button = cy.get('button').contains('New Game')
  //     expect(button).to.exist
  //   });

  //   it("should flip the card", () => {
  //     cy.intercept("/rest/v1/game*").as("updateGame");
  //     cy.get(".grid > :nth-child(6)").click();
  //     cy.wait("@updateGame").then(() => {
  //       cy.get(".grid > :nth-child(6)").should("have.class", "bg-orange-500");
  //     });
  //     cy.get(".grid > :nth-child(9)").click();
  //     cy.wait("@updateGame").then(() => {
  //       cy.get(".grid > :nth-child(9)").should("have.class", "bg-orange-500");
  //     });
  //     cy.wait(200);
  //     cy.get(".grid > :nth-child(6)").should("have.class", "bg-blue-500");
  //     cy.get(".grid > :nth-child(9)").should("have.class", "bg-blue-500");
  //   });
});
