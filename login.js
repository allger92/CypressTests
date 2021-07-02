export class LoginApp {
funcLogin(url, login, password, secret){
cy.visit("https://" + url).wait(500);
//var secret = 'def(JD-s))Et>][}rn6Y_v';
cy.getCookie('PHPSESSID',"value").then((sessionIdO) =>{
    var sessionId = String(sessionIdO.value);
    cy.log("кука сессии = ", sessionId);
    var cookie1 = String(String(sessionId) + secret);
    cy.log("секрет + кука сессии = ", cookie1);
    const crypto = require('crypto');
    var cookie2 = String(crypto.createHash('md5').update(cookie1).digest('hex'));
    var testCookie = cookie2.substr(0,10);
    cy.log("кука тестовая = ",testCookie);
    cy.setCookie('test', testCookie, {domain: String(url)});

});

cy.visit("https://" + url);
cy.get('input[name="aItem[login]"]').type(login)
    .get('input[name="aItem[password]"]').type(password)
    .get('.f_btn_title').click()
    .get('.right-menu__profile').should('exist');
    return(url);
    }
}

export const loginApp = new LoginApp ()