class myinfo {

    getemployeename() {
        return cy.get(".oxd-userdropdown-tab");
    }

    getfirstname() {
        return cy.get('input[placeholder="First Name"]');
    }
    getmiddlename() {
        return cy.get('input[placeholder="Middle Name"]');
    }
    getlastname() {
        return cy.get('input[placeholder="Last Name"]');
    }   

    getemployeeid(){
        return cy.contains('label', 'Employee Id').closest('.oxd-input-group').find('input');       }


    getotherid(){
            return cy.contains('label', 'Other Id').closest('.oxd-input-group').find('input');       }  

  getdrivinglicense(){
    return cy.contains('label', 'Driver\'s License Number').closest('.oxd-input-group').find('input');       }


    getsavebutton(){
        return cy.get('button[type="submit"]');
    }

    getcalender(){
        return cy.get('input[placeholder="yyyy-dd-mm"]');
    }

}

export default new myinfo();