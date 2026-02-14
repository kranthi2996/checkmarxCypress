 /// <reference types="cypress" />
 import { Given,Then,When } from "@badeball/cypress-cucumber-preprocessor";


Given("launch the url and assert the check boxes",()=>{
 cy.visit('https://example.cypress.io/commands/actions')

//Check box
cy.get("input[type='checkbox']").not('[disabled]').check()
cy.get("input[type='checkbox']").should('be.checked')


cy.get("input[type='radio']").not('[disabled]').check()
cy.get("input[type='radio'][value='radio1']").should('not.be.checked')
cy.get("input[type='radio'][value='radio3']").should('be.disabled')

// Our app has a listener on 'contextmenu' event in our 'scripts.js'
// that hides the div and shows an input on right click

})
  

Given("Static and dymic elements",()=>{
    cy.visit('https://example.cypress.io/commands/actions')
    cy.get('.action-select').select("oranges").should('have.value',"fr-oranges")
    cy.get('.action-select-multiple')
  .select(['apples', 'oranges', 'bananas'])
cy.get('.action-select-multiple')
  // when getting multiple values, invoke "val" method first
  .invoke('val')
  .should('deep.equal', ['fr-apples', 'fr-oranges', 'fr-bananas'])

})

When("Dynamic Elements",()=>{
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
    cy.get('#autocomplete').type('ind',{ delay: 300 })
cy.get('.ui-menu-item').each(($el,index,$list) => {
    if($el.text()==="India"){
        $el.click()
    }
 })
});

When("displayed-text,hide and show",()=>{
    cy.visit("https://rahulshettyacademy.com/AutomationPractice")
    cy.get('#displayed-text').should('be.visible');
 cy.get('#hide-textbox').click()
    cy.get('#displayed-text').should('not.be.visible');
    cy.get('#show-textbox').click()
    cy.get('#displayed-text').should('be.visible');
})

When("Alerts",()=>{
    cy.visit("https://rahulshettyacademy.com/AutomationPractice")
    cy.get('#alertbtn').click()
    
    cy.on('window:alert',(str)=>{
        expect(str).to.equal("Hello , share this practice page and share your knowledge")
    })
    cy.get('#confirmbtn').click()
    cy.on('window:confirm',(str1)=>{
        expect(str1).to.equal("Hello , Are you sure you want to confirm?")
    })
})

When("Child tab or window",()=>{
    cy.visit("https://rahulshettyacademy.com/AutomationPractice")
    cy.get('#opentab').invoke('removeAttr','target').click();
    cy.origin("https://www.qaclickacademy.com/",()=>{
        cy.get("#navbarSupportedContent a[href*='about']").click();
    })
})

