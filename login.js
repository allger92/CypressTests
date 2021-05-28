export class LoginApp {
funcLogin(url, login, password){
cy.visit(url);
cy.get('input[name="aItem[login]"]').type(login)
    .get('input[name="aItem[password]"]').type(password)
    .get('.f_btn_title').click()
    .get('.right-menu__profile').should('exist');
    return(url);
    }
}

export const loginApp = new LoginApp ()