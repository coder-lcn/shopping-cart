beforeEach(() => {
  cy.visit("http://localhost:5173");
});

const checkTotal = () => {
  let total = 0;

  cy.dataset("total")
    .invoke("text")
    .then((text) => {
      cy.dataset("price")
        .each((item) => {
          total += Number(cy.$$(item).text().slice(1));
        })
        .then(() => {
          expect(text).to.contains(total);
        });
    });
};

const checkShoppingCartLength = (count) => {
  cy.dataset("list").should("be.visible").children().should("be.length", count);
};

describe("shopping cart", () => {
  it("add a prop to shopping cart", () => {
    cy.dataset("addtocart").first().click();
    checkShoppingCartLength(1);
    checkTotal();
  });

  it.only("modify the number of props", () => {
    cy.dataset("addtocart").first().click();
    checkShoppingCartLength(1);

    cy.dataset("count").should("have.value", "1");
    cy.dataset("dec").should("be.disabled");

    cy.dataset("inc").click();
    cy.dataset("dec").should("not.disabled");
    cy.dataset("count").should("have.value", "2");
    checkTotal();

    cy.dataset("dec").click();
    cy.dataset("count").should("have.value", "1");
    checkTotal();
  });

  it("add mutil prop to shopping cart", () => {
    cy.dataset("addtocart").first().click();
    cy.dataset("close").click();

    cy.dataset("addtocart").last().click();
    checkShoppingCartLength(2);

    checkTotal();
  });

  it("remove a prop", () => {
    cy.dataset("addtocart").first().click();
    cy.dataset("close").click();

    cy.dataset("addtocart").last().click();
    checkShoppingCartLength(2);
    checkTotal();

    cy.dataset("delete").first().click();
    checkTotal();
    checkShoppingCartLength(1);
  });

  it("remove all prop", () => {
    cy.dataset("addtocart").first().click();
    cy.dataset("close").click();

    cy.dataset("addtocart").last().click();
    checkShoppingCartLength(2);
    checkTotal();

    cy.dataset("delete").click({ multiple: true });
    cy.dataset("list").should("not.exist");

    cy.dataset("backStore").should("be.visible");
  });
});
