import { ContextpackListPage } from 'cypress/support/contextpack-list.po';
import { UpdatePackPage } from 'cypress/support/edit-wordlist.po';



describe('Edit a Context pack', () => {
  const page = new UpdatePackPage();
  const page2 = new ContextpackListPage();

  before(() => {
    cy.task('seed:database');
  });

  beforeEach(() => {
    page.navigateTo();
  });

  it('Should have the correct title', () => {
    page2.clickViewInfo(page2.getContextpackCards().first());
    cy.get('.buttonroute').should('have.text', 'Add Wordlist').click();
    page.getTitle().should('have.text', 'Edit Context Pack Wordlists');
  });


  it('Should check if the context pack exist and has all the correct information', () => {

    page2.clickViewInfo(page2.getContextpackCards().first());
    cy.get('.buttonroute').should('have.text', 'Add Wordlist').click();
    cy.get('.form-controlOne').should('exist');
    cy.get('.form-controlTwo').should('exist');
    cy.get('.form-controlThree').should('exist');
    cy.get('.form-controlFour').should('exist');
    cy.get('.form-controlOne').should('have.value','588935f57546a2daea44de7c');
    cy.get('.form-controlTwo').should('have.value','farm');
    cy.get('.form-controlThree').click().first();
    cy.get('.form-controlFour').should('have.value','barn.jpg');
  });


  it('Should click add and remove wordlist', () => {

    page2.clickViewInfo(page2.getContextpackCards().first());
    cy.get('.buttonroute').should('have.text', 'Add Wordlist').click();
    page.addWordlist();
    page.removeWordlist();
  });


  it('Should find wordlist information', () => {

    page2.clickViewInfo(page2.getContextpackCards().first());
    cy.get('.buttonroute').should('have.text', 'Add Wordlist').click();
    cy.get('.form-control-wordlist-name').first().should('exist');
    cy.get('.form-control-wordlist-name').first().should('have.value','farm_animals');
    cy.get('.form-control-wordlist-enabled').first().should('exist');
    cy.get('.form-control-wordlist-enabled').first().click();
  });

  it('should press show json ', () =>{
    page2.clickViewInfo(page2.getContextpackCards().first());
    cy.get('.buttonroute').should('have.text', 'Add Wordlist').click();
    page.showJson();
  });
  it('should press download json ', () =>{
    page2.clickViewInfo(page2.getContextpackCards().first());
    cy.get('.buttonroute').should('have.text', 'Add Wordlist').click();
    cy.get('.submitJSON').click();
  });
  it('should update the context pack ', () =>{
    page2.clickViewInfo(page2.getContextpackCards().first());
    cy.get('.buttonroute').should('have.text', 'Add Wordlist').click();
    cy.get('.submitEdits').click();
  });

  it('it should remove and add a noun ', () =>{
    page2.clickViewInfo(page2.getContextpackCards().first());
    cy.get('.buttonroute').should('have.text', 'Add Wordlist').click();
    cy.get('.add-nouns-button').first().click();
    cy.get('.removeNoun').first().click();
  });

  it('it should remove and add a adjective ', () =>{
    page2.clickViewInfo(page2.getContextpackCards().first());
    cy.get('.buttonroute').should('have.text', 'Add Wordlist').click();
    cy.get('.add-adjective-button').first().click();
    cy.get('.removeAdjective').first().click();
  });

  it('it should remove and add a verb ', () =>{
    page2.clickViewInfo(page2.getContextpackCards().first());
    cy.get('.buttonroute').should('have.text', 'Add Wordlist').click();
    cy.get('.add-verbs-button').first().click();
    cy.get('.removeVerb').first().click();
  });

  it('it should remove and add a misc ', () =>{
    page2.clickViewInfo(page2.getContextpackCards().first());
    cy.get('.buttonroute').should('have.text', 'Add Wordlist').click();
    cy.get('.add-miscs-button').first().click();
    cy.get('.removeMisc').first().click();
  });
  it('it should add a verb adjective noun and misc form ', () =>{
    page2.clickViewInfo(page2.getContextpackCards().first());
    cy.get('.buttonroute').should('have.text', 'Add Wordlist').click();
    cy.get('.add-nouns-button').first().click();
    cy.get('.add-miscs-button').first().click();
    cy.get('.add-adjective-button').first().click();
    cy.get('.add-verbs-button').first().click();
    cy.get('.add-noun-form-button').first().click();
    cy.get('.add-adjective-form-button').first().click();
     cy.get('.add-verb-form-button').first().click();
     cy.get('.add-misc-form-button').first().click();
  });

  it('it should add a verb adjective noun and misc form ', () =>{
    page2.clickViewInfo(page2.getContextpackCards().first());
    cy.get('.buttonroute').should('have.text', 'Add Wordlist').click();
   

  });








});
