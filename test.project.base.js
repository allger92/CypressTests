
/// <reference types="Cypress" /> 
import {loginApp} from "./login"; 
/*Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})*/ //код для игнорирования ошибок в приложении 
Cypress.config('defaultCommandTimeout', 10000);
describe('Wizard', ()=>{
  it ('Add project with Audit and Report',()=>{  // в данном тесте НЕ выключается аудит и отчет, проверки соответственные
    
  //const domain = loginApp.funcLogin('https://germatsky:MmJiOTA2Y2QzMzQ0ZDAxNDJlOTBhMDZj@green-test.sr-srv.net',"germatsky@seranking.com","111111","_default_secret_key_446455781");
  const domain = loginApp.funcLogin('online.seranking.com',"autoqaseranking@gmail.com","qa2020qa","def(JD-s))Et>][}rn6Y_v")
  cy.get("span[data-locator=\'tabs.item_0\']").invoke('text').then((value1) => { // запоминаем кол-во проектов на дашборде 
   var val1 = parseInt(value1.match(/\d+/));
   cy.log(val1);
   var items = Array('oz.by','rw.by','onliner.by','menu.by','103.by','imdb.com');
   var site = items[Math.floor(Math.random()*items.length)];
   var num = Math.random()*1000000000;
   var name = String(Math.round(num));  // выбрали сайт из массива 
   cy.get('.button-menu').click(); //зашли в визард
   cy.get('div[data-locator=\'wizard.steps.general.fields.title_input\']').type(name);  //1й шаг
   cy.get('div[data-locator=\'wizard.steps.general.fields.url_input\']').type(site);
   cy.get('button[data-locator=\'wizard.steps.general.footer.next_step_button\']').click();
   cy.get('textarea[data-locator=\'wizard.proposition_tool.textarea\']').type(site).type('{enter}').type('aguzov');  //2й шаг
   cy.get('button[data-locator=\'wizard.steps.keywords.add.add_keyword_button\']').click().get('.se-notification-2__wrapper').should('be.visible');
   cy.get('button[data-locator=\'wizard.steps.keywords.footer.next_step_button\']').click();

   var country = Array('укр','герм','бела','рос');
     var region = Array('Оде','Munich','Вите','Перм');
     var index = Math.floor(Math.random()*country.length);
     var select_country =country[index];
     var select_region =region[index];
   cy.url().then((url1) => {  //3й шаг + выдергиваем id сайта
    var site_id = parseInt(url1.match(/\d+/));
    cy.wait(1500);
    cy.get('button[data-locator=\'wizard.steps.engines.add_engines_form.add_engine_button\']').click();
    cy.wait(1500);
    cy.get('button[data-locator=\'dropdown.button\']').click();
    cy.get('div[data-locator=\'dropdown.item.item.google_mobile\']').click();
    cy.wait(1000);
    cy.get('button[data-locator=\'wizard.steps.engines.form.select_country\']')
    .click().get('.se-input-2__area').type(select_country).get('.se-dropdown-2-menu').click();
    cy.get('div[data-locator=\'wizard.steps.engines.add_engines_form.region_selector.google_regions\']').click()
    .type(select_region).get('.se-dropdown-2-menu').find('.se-dropdown-item').eq(0).click();
    cy.get('button[data-locator=\'wizard.steps.engines.add_engines_form.add_engine_button\']').click();
    cy.wait(1500);
    cy.get('button[data-locator=\'wizard.steps.engines.footer.next_step_button\']').click();
    cy.get('button[data-locator=\'wizard.proposition_tool.display_toggle_button\']').click().wait(3000) //4й шаг
    .get('.table__kw:nth-child(1)').click().get('.table__kw:nth-child(2)').click(); 
    cy.wait(2000);
    cy.get('button[data-locator=\'wizard.steps.competitors.add_button\']').click().get('.se-notification-2__wrapper').should('be.visible');
    cy.get('button[data-locator=\'wizard.steps.competitors.footer.next_step_button\']').click();
    cy.get('button[data-locator=\'wizard.steps.analytics.footer.next_step_button\']').click();
    cy.get("span[data-locator=\'tabs.item_0\']").invoke('text').then((value2) => {  //проверяем что кол-во проектов увеличилось
     var val2 = parseInt(value2.match(/\d+/));
     cy.log(val2);
     expect(val2).to.eq(val1 + 1)
     });
  
   cy.get('div[data-locator=\'dashboard.dashboard_content.search\']').type(name);   //проверяем что проект есть на дашборде 
   cy.wait(1500);
   cy.get('#ProjectList').find('.row-title-content').should('have.text', name).click().wait(2000);
   cy.get('#ProjectList').find('div[data-locator=\'dashboard.projects_table.row_toggle\']').eq(2)
   .find('.row-title-content').should('contain.text', select_region); // проверяем что есть ПС
   cy.visit("https://"+ domain + "/admin.site.rankings.site_id-" + site_id + ".html").wait(2000); //переходим в позиции и проверяем, что есть слова
   cy.get('.rankings-table-wrapper').find('table').find('tr').eq(0).find('.rankings-table__col_first').find('.row-text__keyword').should('contain.text', site);
   cy.get('.rankings-table-wrapper').find('table').find('tr').eq(1).find('.rankings-table__col_first').find('.row-text__keyword').should('contain.text', 'aguzov');
   cy.visit("https://" + domain + "/admin.audit.site_id-" + site_id + ".html"); // переходим в аудит и проверяем, что заглушки нету
   cy.get('.overview-placeholder__img').should('not.exist');
   cy.visit("https://" + domain + "/admin.reports.list.html?type=scheduled"); // переходим в отчеты и проверяем, что отчет есть
   cy.wait(3000);
   cy.get('table').find('tr').eq(1).find('.mutable-table-label__text').should('contain.text', name);
   cy.visit("https://" + domain + "/admin.site.edit.site_id-"+ site_id + ".html"); //заходим в настройки и удаляем проект
   cy.get('button[data-locator=\'wizard.steps.general.delete_project_button\']').click();
   cy.get('.se-button-2_color-red').click();
   cy.get('div[data-locator=\'dashboard.dashboard_content.search\']').type(name);   //проверяем что проекта нету на дашборде 
   cy.wait(1500);
   cy.get('#ProjectList').find('.row-title-content').should('not.exist');

   });
   
  });


  });

  it ('Add project without Audit and Report',()=>{    // в данном тесте выключается аудит и отчет, проверки соответственные 
      
    
    //const domain = loginApp.funcLogin('germatsky:MmJiOTA2Y2QzMzQ0ZDAxNDJlOTBhMDZj@green-test.sr-srv.net',"germatsky@seranking.com","111111","_default_secret_key_446455781");
    const domain = loginApp.funcLogin('online.seranking.com',"autoqaseranking@gmail.com","qa2020qa","def(JD-s))Et>][}rn6Y_v");
      
    cy.get("span[data-locator=\'tabs.item_0\']").invoke('text').then((value1) => { // запоминаем кол-во проектов на дашборде 
     
      var val1 = parseInt(value1.match(/\d+/));
      cy.log(val1);
      var items = Array('oz.by','rw.by','onliner.by','menu.by','103.by','imdb.com');
      var site = items[Math.floor(Math.random()*items.length)];// выбрали сайт из массива 
      var num = Math.random()*1000000000;
      var name = String(Math.round(num));  
      cy.get('.button-menu').click(); //зашли в визард
      cy.get('div[data-locator=\'wizard.steps.general.fields.title_input\']').type(name);  //1й шаг
      cy.get('div[data-locator=\'wizard.steps.general.fields.url_input\']').type(site);
      cy.get('div[data-locator=\'wizard.steps.general.fields.auto_report_switch\']').click(); //выключаем отчет
      cy.get('div[data-locator=\'wizard.steps.general.fields.enable_audit_switch\']').click(); //выключаем аудит
      cy.get('button[data-locator=\'wizard.steps.general.footer.next_step_button\']').click();
      cy.get('textarea[data-locator=\'wizard.proposition_tool.textarea\']').type(site).type('{enter}').type('aguzov');  //2й шаг
      cy.get('button[data-locator=\'wizard.steps.keywords.add.add_keyword_button\']').click().get('.se-notification-2__wrapper').should('be.visible');
      cy.get('button[data-locator=\'wizard.steps.keywords.footer.next_step_button\']').click();
   
      var country = Array('укр','герм','бела','рос');
      var region = Array('Оде','Munich','Вите','Перм');
      var index = Math.floor(Math.random()*country.length);
      var select_country =country[index];
      var select_region =region[index];
      cy.url().then((url1) => {  //3й шаг + выдергиваем id сайта
       var site_id = parseInt(url1.match(/\d+/));
       cy.wait(1500);
       cy.get('button[data-locator=\'wizard.steps.engines.add_engines_form.add_engine_button\']').click();
       cy.wait(1500);
       cy.get('button[data-locator=\'dropdown.button\']').click();
       cy.get('div[data-locator=\'dropdown.item.item.google_mobile\']').click();
       cy.wait(1000);
       cy.get('button[data-locator=\'wizard.steps.engines.form.select_country\']')
       .click().get('.se-input-2__area').type(select_country).get('.se-dropdown-2-menu').click();
       cy.get('div[data-locator=\'wizard.steps.engines.add_engines_form.region_selector.google_regions\']').click()
       .type(select_region).get('.se-dropdown-2-menu').find('.se-dropdown-item').eq(0).click();
       cy.get('button[data-locator=\'wizard.steps.engines.add_engines_form.add_engine_button\']').click();
       cy.wait(1500);
       cy.get('button[data-locator=\'wizard.steps.engines.footer.next_step_button\']').click();
       cy.get('button[data-locator=\'wizard.proposition_tool.display_toggle_button\']').click().wait(3000) //4й шаг
       .get('.table__kw:nth-child(1)').click().get('.table__kw:nth-child(2)').click(); 
       cy.wait(2000);
       cy.get('button[data-locator=\'wizard.steps.competitors.add_button\']').click().get('.se-notification-2__wrapper').should('be.visible');
       cy.get('button[data-locator=\'wizard.steps.competitors.footer.next_step_button\']').click();
       cy.get('button[data-locator=\'wizard.steps.analytics.footer.next_step_button\']').click();
       cy.get("span[data-locator=\'tabs.item_0\']").invoke('text').then((value2) => {  //проверяем что кол-во проектов увеличилось
        var val2 = parseInt(value2.match(/\d+/));
        cy.log(val2);
        expect(val2).to.eq(val1 + 1)
        });
     
      cy.get('div[data-locator=\'dashboard.dashboard_content.search\']').type(name);   //проверяем что проект есть на дашборде 
      cy.wait(1500);
      cy.get('#ProjectList').find('.row-title-content').should('have.text', name).click().wait(2000);
      cy.get('#ProjectList').find('div[data-locator=\'dashboard.projects_table.row_toggle\']').eq(2)
      .find('.row-title-content').should('contain.text', select_region); // проверяем что есть ПС
      cy.visit("https://" + domain + "/admin.site.rankings.site_id-" + site_id + ".html").wait(2000); //переходим в позиции и проверяем, что есть слова
      cy.get('.rankings-table-wrapper').find('table').find('tr').eq(0).find('.rankings-table__col_first').find('.row-text__keyword').should('contain.text', site);
      cy.get('.rankings-table-wrapper').find('table').find('tr').eq(1).find('.rankings-table__col_first').find('.row-text__keyword').should('contain.text', 'aguzov');
      cy.visit("https://" + domain + "/admin.audit.site_id-" + site_id + ".html"); // переходим в аудит и проверяем, что заглушка есть
      cy.get('.overview-placeholder__img').should('exist');
      cy.visit("https://" + domain + "/admin.reports.list.html?type=scheduled"); // переходим в отчеты и проверяем, что отчета нет
      cy.wait(3000);
      cy.get('table').find('tr').eq(1).find('.mutable-table-label__text').should('not.contain.text', name);
      cy.visit("https://" + domain + "/admin.site.edit.site_id-"+ site_id + ".html"); //заходим в настройки и удаляем проект
      cy.get('button[data-locator=\'wizard.steps.general.delete_project_button\']').click();
      cy.get('.se-button-2_color-red').click();
      cy.get('div[data-locator=\'dashboard.dashboard_content.search\']').type(name);   //проверяем что проекта нету на дашборде 
      cy.wait(1500);
      cy.get('#ProjectList').find('.row-title-content').should('not.exist');
   
      
      
     });
  });
    
    
  
  
    });
});

