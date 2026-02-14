class Loginpage{

getUsername(){
    return cy.get('input[placeholder="Username"]')};

getPassword(){
    return cy.get('input[placeholder="Password"]')};

getLoginButton(){
    return cy.get('button[type="submit"]')}

    getforgotpassword(){   
        return cy.get('.orangehrm-login-forgot-header')
    }

}
export default new Loginpage();