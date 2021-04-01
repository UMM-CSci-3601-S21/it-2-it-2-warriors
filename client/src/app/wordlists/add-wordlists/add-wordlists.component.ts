import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ContextPack,Wordlist } from 'src/app/contextpacks/contextpack';
import { ContextPackCardComponent } from 'src/app/contextpacks/contextpack-card.component';
import { ContextPackListComponent } from 'src/app/contextpacks/contextpack-list.component';
import { ContextPackService } from 'src/app/contextpacks/contextpack.service';


@Component({
  selector: 'app-add-wordlists',
  templateUrl: './add-wordlists.component.html',
  styleUrls: ['./add-wordlists.component.scss']
})
export class AddWordlistsComponent implements OnInit  {
    wordlistsForm: FormGroup;
    data = JSON.parse(localStorage.getItem('name'));
    contextpack: ContextPack;
    contextPackList: ContextPackListComponent;
    i: ContextPack[] = [];
    m;
    o: ContextPack[] = [];
    q: ContextPack[] = [];


    contextpackcard = new ContextPackCardComponent(this.contextPackService,this.snackBar,this.router);
    isShown = false;
    inputValue;

    formErrors = {
      wordlists: this.wordlistsErrors()
    };

    validationMessages = {
      wordlists: {
        name: [
          {type: 'required', message: 'Name is required'},
        ],
        enabled: {
          required: 'Must be true or false (check capitalization)',
        },
        nouns: {
          word: {
          },
          forms: {
          },
        },
        adjectives: {
          word: {
          },
          forms: {
          },
        },
        verbs: {
          word: {
          },
          forms: {
          },
        },
        misc: {
          word: {
          },
          forms: {
          },
        }
      }
    };

    constructor(private fb: FormBuilder, private contextPackService: ContextPackService,
      private snackBar: MatSnackBar, private router: Router) { }




    ngOnInit() {
      this.wordlistsForm = this.fb.group({
        name: new FormControl(this.data, Validators.compose([
          Validators.required,
        ])),
        wordlists: this.fb.array([])
      });
      this.wordlistsForm.valueChanges.subscribe(data => this.validateForm());
    }

    initwordlist() {
      return this.fb.group({
        //  ---------------------forms fields on x level ------------------------
        name: new FormControl('', Validators.compose([
          Validators.required,
        ])),
        enabled: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern('^(true|false)$'),
        ])),
        // ---------------------------------------------------------------------
        nouns: this.fb.array([]),
        adjectives: this.fb.array([]),
        verbs: this.fb.array([]),
        misc: this.fb.array([])

      });
    }

    initNouns() {
      return this.fb.group({
        //  ---------------------forms fields on y level ------------------------
        word: [''],
        // ---------------------------------------------------------------------
        forms: this.fb.array([
          this.fb.control('')
        ])
      });
    }

    addWordlist() {
      const control = this.wordlistsForm.controls.wordlists as FormArray;
      control.push(this.initwordlist());
    }
    addPosArray(ix: number, pos: string){
      const control = (this.wordlistsForm.controls.wordlists as FormArray).at(ix).get(`${pos}`) as FormArray;
      control.push(this.initNouns());
    }
    addForms(ix: number, iy: number, pos: string) {
      const control = ((this.wordlistsForm.controls.wordlists as FormArray).at(ix).get(`${pos}`) as FormArray)
      .at(iy).get('forms') as FormArray;
      control.push(this.fb.control(''));
    }
    setWord(ix: number, iy: number, pos: string){
      const control = (((this.wordlistsForm.controls.wordlists as FormArray).at(ix).get(`${pos}`) as FormArray).at(iy)
      .get('word'));

      const formAdd = (((this.wordlistsForm.controls.wordlists as FormArray).at(ix).get(`${pos}`) as FormArray).at(iy)
      .get('forms') as FormArray).at(0).value.toString();
      console.log('didnt go through');
        control.setValue(formAdd);
        console.log(ix,iy);
    }


    removeWordlist(empIndex: number){
      (this.wordlistsForm.controls.wordlists as FormArray).removeAt(empIndex);
    }

    removeWord(ix: number, iy: number, pos: string){
      ((this.wordlistsForm.controls.wordlists as FormArray).at(ix).get(`${pos}`) as FormArray).removeAt(iy);
    }

    removeForm(ix: number, iy: number, iz: number,  pos: string){
      (((this.wordlistsForm.controls.wordlists as FormArray).at(ix).get(`${pos}`) as FormArray)
      .at(iy).get('forms') as FormArray).removeAt(iz);
    }

    wordlistsErrors() {
      return [{
        //  ---------------------forms errors on x level ------------------------
        name: [' ', [Validators.required]],
        enabled:[' ', [Validators.required]],

        // ---------------------------------------------------------------------
        nouns: this.nounsErrors()

      }];

    }

    nounsErrors() {
      return [{
        //  ---------------------forms errors on y level ------------------------
        word: '',
        forms: this.fb.array([
          this.fb.control('')
        ]),

      }];
    }
    // form validation
    validateForm() {
      this.validateWordlists();
    }
    validateWordlists() {
      const wordlistsA = this.wordlistsForm.controls.wordlists as FormArray;
      // console.log(XsA.value);
      this.formErrors.wordlists = [];
      let x = 1;
      while (x <= wordlistsA.length) {
        this.formErrors.wordlists.push({
          name: [' ', [Validators.required]],
          enabled: [' ', [Validators.required]],
          nouns: [{
            word: '',
            forms: this.fb.array([
              this.fb.control('')
            ]),
          }]
        });
        x++;
      }
    }


  toggleShow() {
  this.isShown = ! this.isShown;
  return this.isShown;
  }





//---------------------------------- grabs the value that the user inputs
  grabValue(event){
    if(event.target.value !== null || event.target.value !== undefined){
     this.inputValue= event.target.value;
    }
     return(this.inputValue);
  }

//-----------------------------------------------------------------------------submits the form updating the context pack

  submitForm() {
    if(this.inputValue === undefined){
      this.inputValue = this.data;
    } ;


    this.contextPackService.getContextPacks().subscribe(contextpacks => {
      for(this.m = 0;this.m<contextpacks.length;this.m++){
        this.i.push(contextpacks[this.m]);
        if(contextpacks[this.m].name === this.inputValue.toString())// figure out a better if
        {

          this.o.push(contextpacks[this.m]);
          // figure out the more than two context packs situation
        }

      }
      const formArray = this.wordlistsForm.get('wordlists') as FormArray;
      for(this.m=0;this.m<formArray.value.length;this.m++){
        this.o[0].wordlists.push(formArray.value[this.m]);
      }
      this.contextPackService.updateContextPack(this.o[0]).subscribe(contextpack => {
      this.snackBar.open(contextpack.name[0].toUpperCase()+contextpack.name.substring(1,
        contextpack.name.length).toLowerCase()
        + ' Pack is Updated ' , null, {
          duration: 2000,
        });
        this.router.navigate(['/contextpacks/' + this.o[0]._id]);
      }, err => {
        this.snackBar.open('Failed to update the pack', 'OK', {
          duration: 5000,
        });
      });}
 ,);



}

}
