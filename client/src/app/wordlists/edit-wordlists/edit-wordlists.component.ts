import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { ContextPack,Wordlist } from 'src/app/contextpacks/contextpack';
import { ContextPackListComponent } from 'src/app/contextpacks/contextpack-list.component';
import { ContextPackService } from 'src/app/contextpacks/contextpack.service';

@Component({
  selector: 'app-edit-wordlists',
  templateUrl: './edit-wordlists.component.html',
  styleUrls: ['./edit-wordlists.component.scss']
})
export class EditWordlistsComponent implements OnInit {
  isShown = false;
  data = JSON.parse(localStorage.getItem('data'));
  wordlistsForm: FormGroup;
  history: Wordlist[] = [];



  formErrors = {
    wordlists: this.contextPackService.wordlistsErrors(this.fb)
  };

  validationMessages =  this.contextPackService.validate();


  constructor(private fb: FormBuilder,private route: ActivatedRoute,private contextPackService: ContextPackService,
    private snackBar: MatSnackBar, private router: Router) { }


   ngOnInit() {
    console.log(this.data);

    this.wordlistsForm = this.fb.group({
      id: new FormControl(this.data._id, []),
      icon: new FormControl(this.data.icon, []),
      name: new FormControl(this.data.name, []),
      enabled: new FormControl(this.data.enabled.toString(), []),
      wordlists: this.fb.array(
        this.data.wordlists.map(
          x=>this.fb.group({
            name: new FormControl(x.name, []),
            enabled: new FormControl(x.enabled.toString(), []),
            nouns: this.fb.array(
              x.nouns.map(
                p=>this.fb.group({
                word: new FormControl(p.word, []),
                forms: this.fb.array(
                  p.forms.map(
                    q => this.fb.group({
                      form: new FormControl(q,[])
                    })
                  )
                )

              }))),
            adjectives:this.fb.array(
              x.adjectives.map(
                p=>this.fb.group({
                word: new FormControl(p.word, []),
                forms:this.fb.array(
                  p.forms.map(
                    q => this.fb.group({
                      form: new FormControl(q,[])
                    })
                  )
                ) }))),
            verbs:this.fb.array(
              x.verbs.map(
                p=>this.fb.group({
                word: new FormControl(p.word, []),
                forms:this.fb.array(
                  p.forms.map(
                    q => this.fb.group({
                      form: new FormControl(q,[])
                    })
                  )
                ) }))),
            misc:this.fb.array(
              x.misc.map(
                p=>this.fb.group({
                word: new FormControl(p.word, []),
                forms:this.fb.array(
                  p.forms.map(
                    q => this.fb.group({
                      form: new FormControl(q,[])
                    })
                  )
                ) })))

          }
            ),


           )
    )
      });

      console.log(this.wordlistsForm);
      const formArray = this.wordlistsForm.get('wordlists').get('nouns') as FormArray;
      console.log(formArray);
      this.wordlistsForm.valueChanges.subscribe(data => this.validateForm());

  }

  // adds wordlist
  addWordlist() {
    const control = this.wordlistsForm.controls.wordlists as FormArray;
    control.push(this.initwordlist());
  }

  undoWordlist(){
    const undo = this.history.slice(0,1);
    console.log(undo);
    const length = (this.wordlistsForm.controls.wordlists as FormArray).length;
    const control = (this.wordlistsForm.controls.wordlists as FormArray).at(length+1).value(undo);
  }



  initwordlist() {
    return this.contextPackService.initwordlist(this.fb);
    }


toggleShow() {
  this.isShown = ! this.isShown;
  return this.isShown;
  }
  validateForm() {
    this.validateWordlists();
  }
  validateWordlists() {
    const wordlistsA = this.wordlistsForm.controls.wordlists as FormArray;
    // console.log(XsA.value);
    this.contextPackService.validateWordlists(wordlistsA,this.fb,this.formErrors);
  }

// deletes the wordlist
  deleteWordlist(empIndex: number){
    const copyForm = (this.wordlistsForm.controls.wordlists as FormArray).at(empIndex);
    (this.wordlistsForm.controls.wordlists as FormArray).removeAt(empIndex);
    this.data.wordlists.splice(empIndex,empIndex+1);
    this.history.push(copyForm);

  }

  removeWord(ix: number, iy: number, pos: string){
    ((this.wordlistsForm.controls.wordlists as FormArray).at(ix).get(`${pos}`) as FormArray).removeAt(iy);
    this.data.wordlists[ix][(`${pos}`)].splice(iy,iy+1);
  }



// submits the form

  submitForm() {
    return 0;
}

// Shows the new form

viewWordlistJSON(){
  return 0;

}

}
