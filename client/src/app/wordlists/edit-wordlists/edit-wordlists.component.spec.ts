import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AbstractControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ContextPackService } from 'src/app/contextpacks/contextpack.service';
import { MockContextPackService } from 'src/testing/contextpack.service.mock';

import { EditWordlistsComponent } from './edit-wordlists.component';

describe('EditWordlistComponent', () => {
  let component: EditWordlistsComponent ;
  let editWordlistForm: FormGroup;
  let fixture: ComponentFixture<EditWordlistsComponent>;



  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        MatCardModule
      ],
      declarations: [ EditWordlistsComponent ],
      providers: [{ provide: ContextPackService, useValue: new MockContextPackService()}
                  ]

    })
    .compileComponents().catch(error => {
      expect(error).toBeNull();
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWordlistsComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
    editWordlistForm = component.wordlistsForm;
    expect(editWordlistForm).toBeDefined();
    expect(editWordlistForm.controls).toBeDefined();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(editWordlistForm).toBeTruthy();
  });


  describe('the pack name field', () => {
    let nameControl: AbstractControl;

    beforeEach(() => {
      nameControl = component.wordlistsForm.controls.name;
    });


  });
  describe('Toggle Button', ()=>{
    it('should toggle the boolean status', ()=>{
      expect(component.toggleShow()).toBeTruthy();
    });

  });

  describe('Add wordlist', () =>{
    it('should add a wordlist when prompted', () =>{
      component.addWordlist();
      let formValue = component.wordlistsForm.value;
      expect(formValue.wordlists.length).toEqual(3);
      component.addWordlist();
      formValue = component.wordlistsForm.value;
      expect(formValue.wordlists.length).toEqual(4);
    });
  });
  describe('Add nouns', () =>{
    it('should add an array of nouns when prompted', () =>{

      component.addWordlist();
      component.addPosArray(0, 'nouns');
      let control = ((component.wordlistsForm.value.wordlists as Array<any>)[0]);
      console.log(control.nouns);
      expect(control.nouns.length).toEqual(2);
      // Add 2 noun arrays, we expect two to be present
      component.addPosArray(0, 'nouns');
      control = ((component.wordlistsForm.value.wordlists as Array<any>)[0]);
      expect(control.nouns.length).toEqual(3);
    });
  });
  describe('Add verbs', () =>{
    it('should add an array of verbs when prompted', () =>{

      component.addWordlist();
      component.addPosArray(0, 'verbs');
      let control = ((component.wordlistsForm.value.wordlists as Array<any>)[0]);
      expect(control.verbs.length).toEqual(2);
      // Add 2 noun arrays, we expect two to be present
      component.addPosArray(0, 'verbs');
      control = ((component.wordlistsForm.value.wordlists as Array<any>)[0]);
      expect(control.verbs.length).toEqual(3);
    });
  });

  describe('Add forms', () =>{
    it('should add a form to the forms array when prompted', () =>{

      component.addWordlist();
      component.addPosArray(0, 'verbs');
      component.addForms(0, 0, 'verbs');
      const control = ((component.wordlistsForm.value.wordlists as Array<any>)[0]);
      expect(control.verbs[0].forms.length).toEqual(3);
    });
  });

  describe('Removing components of a context pack during creation', ()=>{
    it('should remove a form to the forms array when prompted', () =>{
      // Add components so they can be removes
      component.addWordlist();
      component.addPosArray(0, 'verbs');
      component.addPosArray(0, 'verbs');
      component.addForms(0, 0, 'verbs');
      // make sure components were added
      let controls = ((component.wordlistsForm.value.wordlists as Array<any>)[0]);
      expect(controls.verbs[0].forms.length).toEqual(3);
      // remove a form
      component.removeForm(0, 0, 0,'verbs');
      controls = ((component.wordlistsForm.value.wordlists as Array<any>)[0]);
      expect(controls.verbs[0].forms.length).toEqual(2);
      //remove verb word group
      expect(controls.verbs.length).toEqual(3);
      component.removeWord(0, 0, 'verbs');
      controls = ((component.wordlistsForm.value.wordlists as Array<any>)[0]);
      console.log(controls.verbs[0]);
      expect(controls.verbs.length).toEqual(2);
      // remove wordlist
      component.addWordlist();
      controls = component.wordlistsForm.value.wordlists as Array<any>;
      expect(controls.length).toEqual(4);
      component.deleteWordlist(1);
      controls = component.wordlistsForm.value.wordlists as Array<any>;
      expect(controls.length).toEqual(3);
    });

  });




  describe('Submit', ()=>{
    it('It should submit the word lists', ()=>{
    expect(component.submitFormUpdate).toBeTruthy();
    const response: FormGroup = editWordlistForm;

    spyOn(ContextPackService.prototype, 'getContextPacks').and.returnValue(of(response.value));

    spyOn(ContextPackService.prototype, 'updateContextPack').and.returnValue(of(response.value));
    expect(component.submitFormUpdate());
    });});});
