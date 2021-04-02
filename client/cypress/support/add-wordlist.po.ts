import {ContextPack, Wordlist} from 'src/app/contextpacks/contextpack';

export class AddWordlistPage {
  navigateTo() {
    return cy.visit('/edit/wordlist');
  }

  getTitle() {
    return cy.get('.add-wordlist-title');
  }

  wordlistButton() {
    return cy.get('[data-test="confirmAddWordlistButton"]');
  }

  selectMatSelectValue(select: Cypress.Chainable, value: string) {
    // Find and click the drop down
    return select.click({ multiple: true, force:true })
      // Select and click the desired value from the resulting menu
      .get(`mat-option[value="${value}"]`).click({ multiple: true, force:true });
  }

  getFormField(fieldName: string) {
    return cy.get(`mat-form-field [formcontrolname=${fieldName}]`);
  }

  addWordlist(){
    return cy.get('.add-wordlist-button').click({force: true});
  }
  addPosArray(pos: string){
    return cy.get(`.add-${pos}-button`).click({force: true});
  }

  wordlistForm(){
    return cy.get('.form-value');
  }




  addWord(wordlist: Wordlist) {
    this.addWordlist();
    this.addPosArray('noun');
    this.addPosArray('verb');
    this.addPosArray('adj');
    this.addPosArray('misc');
    if (wordlist) {
      this.getFormField('name').then(els => {
        [...els].forEach(el => cy.wrap(el).type('horsies', {force:true}));
      });
    }
    this.selectMatSelectValue(this.getFormField('enabled'), wordlist.enabled.toString());
    return this.addWordlist().click({ multiple: true, force:true });
  }
}
