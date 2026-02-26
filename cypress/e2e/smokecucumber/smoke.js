/// <reference types="cypress" />

const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");
import Loginpage from "../../support/PageObjects/Loginpage";
import DashboardClicks from "../../support/PageObjects/DashboardClicks";
import myinfo from "../../support/PageObjects/myinfo";
const fixlogin = require("../../fixtures/userdata/login.json");
import { randomString, randomNumber } from "../../support/utils/numbers";
const randomName = randomString(5, 10);
const randomnumber = randomNumber(4, 8);


Given('Launch the HRM Portal', () => {
  cy.visit(Cypress.env('baseurl'));
});

When('I enter valid username and password', () => {
  Loginpage.getUsername().type(fixlogin.username);
  Loginpage.getPassword().type('admin123');
  Loginpage.getLoginButton().click();
});

Then('Assert to see modules of dashboard', () => {
  const modules = ['Admin', 'PIM', 'Leave', 'Time', 'Recruitment', 'My Info', 'Performance', 'Dashboard', 'Directory', 'Maintenance', 'Claim', 'Buzz'];
  modules.forEach(module => {
    cy.contains(module).should('be.visible');
  });
});


When('Click on the forgotpassword', () => {
  Loginpage.getforgotpassword().click();
});

Then('Assert to see the forgot password page', () => {
  Loginpage.getUsername().type(fixlogin.username);
  cy.contains('Reset Password').click();
  Loginpage.getLoginButton().click();
  // Adjust the wait time as needed for the email to be sent
  cy.contains('Reset Password link sent successfully').should('be.visible');
});

Then('Click on Myinfo module', () => {
  myinfo.getemployeename().invoke('text').then(userName => {
    cy.writeFile('cypress/fixtures/userdata/login.json', { ...fixlogin, loggedInUser: userName.trim() });
  });
  DashboardClicks.getmyinfo().click();
  cy.get('.orangehrm-edit-employee-name').should('have.text', fixlogin.loggedInUser);
  cy.get('.orangehrm-tabs-item').then($tabs => {
    const tabNames = [...$tabs].map(tab => tab.innerText.trim());
    expect(tabNames).to.deep.equal([
      'Personal Details', 'Contact Details', 'Emergency Contacts', 'Dependents', 'Immigration', 'Job', 'Salary', 'Report-to', 'Qualifications', 'Memberships']);
  });
});

Then('Update the user details and save', () => {
  // myinfo.getfirstname().clear().type("T" + randomName);
  // myinfo.getmiddlename().clear().type(randomName);
  // myinfo.getlastname().clear().type(randomName);
  // myinfo.getemployeeid().clear().type(randomnumber);
  // myinfo.getotherid().clear().type(randomnumber);
  // myinfo.getdrivinglicense().clear().type("Dl"  + randomnumber);
  myinfo.getcalender().eq(0).click()
  myinfo.getsavebutton().eq(0).click();
  cy.contains('Successfully Updated').should('be.visible');
});


Then('Logout from the application', () => {
  cy.safeLogout();
});


When('Intercepts the GET request and verify the response', () => {
  cy.visit("https://rahulshettyacademy.com/angularAppdemo/");
  cy.intercept({
    method: 'GET',
    url: 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty'
  },

    {
      statusCode: 200,
      body: [{
        "book_name": "RestAssured with Java",
        "isbn": "RSU",
        "aisle": "2301"
      }]

    }).as('bookretrievals')
  cy.get("button[class='btn btn-primary']").click()
  cy.wait('@bookretrievals').then(({ request, response }) => {
    cy.get('tr').should('have.length', response.body.length + 1)

  })
  cy.get('p').should('have.text', 'Oops only 1 Book available')

});


When('Modify request and verify the response', () => {
  cy.visit("https://rahulshettyacademy.com/angularAppdemo/");

  cy.intercept('GET', 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty',
    (req) => {
      req.url = "https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=malhotra"

      req.continue((res) => {
        // expect(res.statusCode).to.equal(403)
      })
    }
  ).as("dummyUrl")

  cy.get("button[class='btn btn-primary']").click()
  cy.wait('@dummyUrl')

});

When('API TTest', () => {
  cy.request('GET', 'https://jsonplaceholder.typicode.com/todos/1')
    .then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('id', 1);
      expect(response.body).to.have.property('title', 'delectus aut autem');
    });
});


Given("Intercepts", () => {

  cy.intercept(
    'GET',
    'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty',
    {
      statusCode: 200,
      body: [
        {
          book_name: "RestAssured with Java",
          isbn: "RSU",
          aisle: "2301"
        }
      ]
    }
  ).as('bookslist')
  cy.visit("https://rahulshettyacademy.com/angularAppdemo/")

  cy.get("button.btn.btn-primary").click()

  cy.wait('@bookslist').then(({request,response})=>{
    cy.get('tr').should('have.length', response.body.length + 1)
  })

  cy.get('p').should('have.text', 'Oops only 1 Book available')
})


Given("Calenders",()=>{
  const month='10'
  const year='2028'
  const day='26'
  const expectedDate = [String(Number(month) - 1),day,year]
cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/offers")
cy.get(".react-date-picker__calendar-button").click();
cy.get(".react-calendar__navigation__label").click();
cy.get(".react-calendar__navigation__label").click();
cy.contains('button',year).click()
cy.get('.react-calendar__year-view__months__month').eq(Number(month)-1).click()
cy.contains('button',day).click()
cy.screenshot();

//asser
cy.get('.react-date-picker__inputGroup__input').each(($el,index)=>{
  cy.wrap($el).invoke('val').should('eq',expectedDate[index]);
  
})
})