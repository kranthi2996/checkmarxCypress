// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import DashboardClicks from "./PageObjects/DashboardClicks";

Cypress.Commands.add('safeLogout', () => {

  cy.on('uncaught:exception', (err) => {
    if (err.message.includes("Cannot read properties of undefined (reading 'response')")) {
      return false;
    }
  });

  DashboardClicks.gethomelogout().click();
  DashboardClicks.gethomedropdown().contains('Logout').click();

  cy.url().should('include', '/auth/login');
});
