import { Given } from "@badeball/cypress-cucumber-preprocessor";

Given("Launch the portal and store the session", () => {

  cy.visit("https://rahulshettyacademy.com/client/#/auth/login");

  cy.get('#userEmail').type("jhgfdertyu@gmail.com");
  cy.get('#userPassword').type("LYZM2@xMdmWbEGv");
  cy.get('#login').click();

  cy.url().should('include', '/dashboard');

  cy.window().then((win) => {

    const browserState = {
      localStorage: {},
      sessionStorage: {}
    };

    // ✅ Local Storage
    for (let i = 0; i < win.localStorage.length; i++) {
      const key = win.localStorage.key(i);
      browserState.localStorage[key] =
        win.localStorage.getItem(key);
    }

    // ✅ Session Storage
    for (let i = 0; i < win.sessionStorage.length; i++) {
      const key = win.sessionStorage.key(i);
      browserState.sessionStorage[key] =
        win.sessionStorage.getItem(key);
    }

    // ✅ Cookies
    cy.getCookies().then((cookies) => {
      browserState.cookies = cookies;

      // ✅ Store EVERYTHING
      cy.writeFile(
        "cypress/fixtures/browserState.json",
        browserState
      );
    });

  });

});