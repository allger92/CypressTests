/// <reference types="Cypress" /> 
import {loginApp} from "./login"; 
Cypress.config('defaultCommandTimeout', 150000);
describe('Research', ()=>{
    it ('Keywords - live-parsing',()=>{
    const domain = loginApp.funcLogin('https://online.seranking.com',"autoqaseranking@gmail.com","qa2020qa")
    // генерируем слово
    var num = Math.random()*1000000;
    var number = Math.round(num);
    var items = Array('german','ger man','agerman','algerman','agorman','agromet','uzman');
    var item = items[Math.floor(Math.random()*items.length)];
    var keyword = item + ' '+ number;
    cy.log(keyword);
    // переходим в рисерч
    cy.visit(domain + '/research.keywords.html/start');
    var index_country = Math.floor(Math.random() * 80); // генерируем случайный пункт из списка стран
    cy.get('.competitor-search__region-select').click().find('.se-dropdown-slot__item').eq(index_country).click(); // выбираем страну
    cy.get('.se-input-2__area').type(keyword); // вводим слово 
    cy.get('.competitor-search__button > .se-button-2__wrapper').click(); // нажимаем кнопку "анализировать"
    cy.get('.domains-table__tile-base').find('table').should('exist'); //убеждаемся, что появились данные в таблице "сайты в органической выдаче"
    cy.get('.no-data-page').should('not.exist'); //убеждаемся, что нету заглушки "нет данных"

    

     });
});