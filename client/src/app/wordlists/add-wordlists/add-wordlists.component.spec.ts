import { compileComponentFromMetadata, componentFactoryName } from '@angular/compiler';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormGroup, AbstractControl, FormArray, FormBuilder } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ContextPack } from 'src/app/contextpacks/contextpack';

import { ContextPackService } from 'src/app/contextpacks/contextpack.service';
import { MockContextPackService } from 'src/testing/contextpack.service.mock';
import { AddWordlistsComponent } from './add-wordlists.component';

;

describe('AddWordlistComponent', () => {
  let component: AddWordlistsComponent ;
  let addWordlistForm: FormGroup;
  let fixture: ComponentFixture<AddWordlistsComponent>;
  const routerSpy = {navigate: jasmine.createSpy('navigate')};
  const matsnackbarSpy = {open: jasmine.createSpy('open')};


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
      declarations: [ AddWordlistsComponent ],
      providers: [{ provide: ContextPackService, useValue: new MockContextPackService() },
                  {provide: Router, useValue: routerSpy},
                  {provide: MatSnackBar,useValue: matsnackbarSpy}
                  ]

    })
    .compileComponents().catch(error => {
      expect(error).toBeNull();
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWordlistsComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
    addWordlistForm = component.wordlistsForm;
    expect(addWordlistForm).toBeDefined();
    expect(addWordlistForm.controls).toBeDefined();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(addWordlistForm).toBeTruthy();
  });


  describe('the pack name field', () => {
    let nameControl: AbstractControl;

    beforeEach(() => {
      nameControl = component.wordlistsForm.controls.name;
    });


  });
  describe('errors', () =>{
    it('should call errors', () =>{
      component.nounsErrors();
      component.wordlistsErrors();
    });
  });
  describe('Add wordlist', () =>{
    it('should add a wordlist when prompted', () =>{
      component.addWordlist();
      let formValue = component.wordlistsForm.value;
      expect(formValue.wordlists.length).toEqual(1);
      component.addWordlist();
      formValue = component.wordlistsForm.value;
      expect(formValue.wordlists.length).toEqual(2);
    });
  });
  describe('Add nouns', () =>{
    it('should add an array of nouns when prompted', () =>{

      component.addWordlist();
      component.addPosArray(0, 'nouns');
      let control = ((component.wordlistsForm.value.wordlists as Array<any>)[0]);
      console.log(control.nouns);
      expect(control.nouns.length).toEqual(1);
      // Add 2 noun arrays, we expect two to be present
      component.addPosArray(0, 'nouns');
      control = ((component.wordlistsForm.value.wordlists as Array<any>)[0]);
      expect(control.nouns.length).toEqual(2);
    });
  });
  describe('Add verbs', () =>{
    it('should add an array of verbs when prompted', () =>{

      component.addWordlist();
      component.addPosArray(0, 'verbs');
      let control = ((component.wordlistsForm.value.wordlists as Array<any>)[0]);
      expect(control.verbs.length).toEqual(1);
      // Add 2 noun arrays, we expect two to be present
      component.addPosArray(0, 'verbs');
      control = ((component.wordlistsForm.value.wordlists as Array<any>)[0]);
      expect(control.verbs.length).toEqual(2);
    });
  });

  describe('Add forms', () =>{
    it('should add a form to the forms array when prompted', () =>{

      component.addWordlist();
      component.addPosArray(0, 'verbs');
      component.addForms(0, 0, 'verbs');
      const control = ((component.wordlistsForm.value.wordlists as Array<any>)[0]);
      expect(control.verbs[0].forms.length).toEqual(2);
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
      expect(controls.verbs[0].forms.length).toEqual(2);
      // remove a form
      component.removeForm(0, 0, 0,'verbs');
      controls = ((component.wordlistsForm.value.wordlists as Array<any>)[0]);
      expect(controls.verbs[0].forms.length).toEqual(1);
      //remove verb word group
      expect(controls.verbs.length).toEqual(2);
      component.removeWord(0, 0, 'verbs');
      controls = ((component.wordlistsForm.value.wordlists as Array<any>)[0]);
      console.log(controls.verbs[0]);
      expect(controls.verbs.length).toEqual(1);
      // remove wordlist
      component.addWordlist();
      controls = component.wordlistsForm.value.wordlists as Array<any>;
      expect(controls.length).toEqual(2);
      component.removeWordlist(1);
      controls = component.wordlistsForm.value.wordlists as Array<any>;
      expect(controls.length).toEqual(1);
    });

  });

  describe('Set word feature', ()=>{
    it('should set the first form to the same word', ()=>{
      component.addWordlist();
      component.addPosArray(0, 'verbs');
      component.addForms(0 ,0 , 'verbs');

      (((component.wordlistsForm.controls.wordlists as FormArray).at(0).get(`verbs`) as FormArray).at(0)
    .get('forms') as FormArray).at(0).setValue('cow');

      component.setWord(0,0,'verbs');
      // expect cow to be the first form
      expect(((component.wordlistsForm.controls.wordlists as FormArray).at(0).get(`verbs`) as FormArray).at(0)
      .get('word').value).toEqual('cow');
    });
  });


  describe('Submit', ()=>{
    it('It should submit the word lists', ()=>{
    expect(component.submitForm).toBeTruthy();
    const response: FormGroup = addWordlistForm;

    spyOn(ContextPackService.prototype, 'getContextPacks').and.returnValue(of(response.value));

    spyOn(ContextPackService.prototype, 'updateContextPack').and.returnValue(of(response.value));
    expect(component.submitForm());
    });});});
