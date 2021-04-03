import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ContextPackCardComponent } from './contextpack-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { Word, Wordlist,ContextPack} from './contextpack';
import { MockContextPackService } from 'src/testing/contextpack.service.mock';
import { ContextPackService } from './contextpack.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';


describe('ContextPackCardComponent', () => {

  let component: ContextPackCardComponent;
  let fixture: ComponentFixture<ContextPackCardComponent>;
  let component2: ContextPackCardComponent;
  let fixture2: ComponentFixture<ContextPackCardComponent>;
  let emptyWordlist: Wordlist;
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
      declarations: [ ContextPackCardComponent ],
      providers:[{ provide: ContextPackService, useValue: new MockContextPackService()},
                 {provide: Router, useValue: routerSpy},
                 {provide: MatSnackBar,useValue: matsnackbarSpy}
                ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContextPackCardComponent);
    fixture2 = TestBed.createComponent(ContextPackCardComponent);
    component = fixture.componentInstance;
    component2 = fixture2.componentInstance;

    const noun: Word = {
      word: 'you',
      forms: ['you', 'yoyo', 'yos', 'yoted']
    };
    const adjective: Word = {
      word: 'green',
      forms: ['green', 'greener']
    };
    const verb: Word = {
      word: 'ran',
      forms: ['ran', 'running']
    };
    const misc: Word = {
      word: 'langerhans',
      forms: ['langerhans', 'langerhan']
    };
    const testNouns: Word[] = [noun];
    const testVerbs: Word[] = [verb];
    const testAdjectives: Word[] = [adjective];
    const testMisc: Word[] = [misc];
    emptyWordlist ={

    };

    const testWordListBig: Wordlist[] = [{
      name: 'howdy',
      enabled: true,
      nouns: testNouns,
      verbs: testVerbs,
      adjectives: testAdjectives,
      misc: testMisc
    },
  {
      name: 'partner',
      enabled: true,
      nouns: testNouns,
      verbs: testVerbs,
      adjectives: testAdjectives,
      misc: testMisc
  }];

     component.contextpack = {
      _id: 'pat_id',
      enabled: true,
      name: 'happy',
      wordlists: testWordListBig
    };
    component2.contextpack = {
      _id: 'mat_id',
      enabled: true,
      name: 'Joy',
    };




    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should have displayNouns,verbs,adjective,misc return null if undefined', () => {
    expect(component.displayWords(emptyWordlist, 'nouns')).toBeNull();
    expect(component.displayWords(emptyWordlist, 'verbs')).toBeNull();
    expect(component.displayWords(emptyWordlist, 'adjectives')).toBeNull();
    expect(component.displayWords(emptyWordlist, 'misc')).toBeNull();
  });

  it('should have displayNouns,verbs,adjective,misc return null if undefined', () => {
    expect(component2.displayAllWords(component2.contextpack, 'nouns')).toBeNull();
    expect(component2.displayAllWords(component2.contextpack, 'verbs')).toBeNull();
    expect(component2.displayAllWords(component2.contextpack, 'adjectives')).toBeNull();
    expect(component2.displayAllWords(component2.contextpack, 'misc')).toBeNull();
  });

  it('should create a download element when given a json', () => {
    expect(component.downloadJson(component.contextpack, component.contextpack.name).toString()).toContain('happy');

  });
  it('should convert a json into a correctly formatted json', () => {
    expect(component.convertToBetterJson(component.contextpack).$schema).
    toEqual('https://raw.githubusercontent.com/kidstech/story-builder/master/Assets/packs/schema/pack.schema.json');
    expect(component.convertToBetterJson(component.contextpack).id).toBeUndefined();
  });

  it('should change the value of the button and wordlist value for enable. It would then update the context pack'+
   'with the new version', () => {
    const element = {
      textContent: 'disable'
    };
    spyOn(component,'submit');
    expect(component.setEnableOrDisable(element,component.contextpack.wordlists[0],component.contextpack)).toEqual('false');
    expect(component.setEnableOrDisable(element,component.contextpack.wordlists[0],component.contextpack)).toEqual('true');
  });


  it('should submit', () => {
    const response: ContextPack = component.contextpack;


    spyOn(ContextPackService.prototype, 'updateContextPack').and.returnValue(of(response));
    expect(component.submit(component.contextpack));

    expect (routerSpy.navigate).toHaveBeenCalledWith(['/contextpacks/pat_id']);

    expect(component.submit(undefined));



    expect (matsnackbarSpy.open).toHaveBeenCalledWith( 'Happy Pack is Updated ', null, Object({ duration: 2000 }) );

  });


  it('should navigate', () => {

  expect(component.saveAndRoute(component.contextpack));
  expect (routerSpy.navigate).toHaveBeenCalledWith(['edit/wordlist']);
  });


});
