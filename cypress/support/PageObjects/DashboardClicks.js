class DashboardClicks{


    getAdmin(){
        return cy.get('a[href="/web/index.php/admin/viewAdminModule"]');
    }

    getpim(){
        return cy.get('a[href="/web/index.php/pim/viewPimModule"]');
    }

    getleave(){
        return cy.get('a[href="/web/index.php/leave/viewLeaveModule"]');
    }   

    gettime(){
        return cy.get('a[href="/web/index.php/time/viewTimeModule"]');
    }

    getrecruitment(){
        return cy.get('a[href="/web/index.php/recruitment/viewRecruitmentModule"]');
    }
     getmyinfo(){
        return cy.get('a[href="/web/index.php/pim/viewMyDetails"]'); 

        // href="/web/index.php/pim/viewMyDetails"
    }
     getperformance(){
        return cy.get('a[href="/web/index.php/performance/viewPerformanceModule"]');
    }

    getdashboard(){
        return cy.get('a[href="/web/index.php/dashboard/index"]');
    }

    getdirectory(){
        return cy.get('a[href="/web/index.php/directory/viewDirectory"]');
    }

    getmaintenance(){
        return cy.get('a[href="/web/index.php/maintenance/viewMaintenanceModule"]');
    }
    
    getbuzz(){     
        return cy.get('a[href="/web/index.php/buzz/viewBuzz"]');
    }   

    getabout(){
        return cy.get('a[href="/web/index.php/pim/viewCompanyStructure"]');
    }   

    getsearch(){
        return cy.get('input[placeholder="Search"]');   
    }

    gethomedropdown(){
        return cy.get('.oxd-userdropdown-link');
    
    }
    
    gethomelogout(){
        return cy.get('.oxd-userdropdown-tab');
    }

}

export default new DashboardClicks();