/// <reference types="cypress" />

const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");
import Loginpage from "../../support/PageObjects/Loginpage";
import DashboardClicks from "../../support/PageObjects/DashboardClicks";
import myinfo from "../../support/PageObjects/myinfo";
const fixlogin = require("../../fixtures/userdata/login.json");


Given('Launch the cypress portal', () => {
    cy.visit(Cypress.env('baseurl2'));
});

When('Enter the text in input for email', () => {
    cy.get('.action-email').type(fixlogin.email)
    cy.get('.action-email').should('have.value', fixlogin.email)
});

