

export class UpdatePackPage {
  navigateTo() {
     return cy.visit('/contextpacks');

  }

  getTitle() {
    return cy.get('.edit-wordlist-title');
  }

  updatePackButton() {
    return cy.get('[data-test="confirmUpdatePackButton"]');
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
  removeWordlist(){
    return cy.get('.remove-wordlist').first().click({force: true});
  }

  addPosArray(pos: string){
    return cy.get(`.add-${pos}-button`).click({force: true});
  }
  showJson(){
    return cy.get('[data-test="showJsonButton"]').click({force: true});
  }
  contextPackForm(){
    return cy.get('.form-value');
  }



}
