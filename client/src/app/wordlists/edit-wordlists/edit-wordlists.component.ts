import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ContextPack } from 'src/app/contextpacks/contextpack';
import { ContextPackListComponent } from 'src/app/contextpacks/contextpack-list.component';
import { ContextPackService } from 'src/app/contextpacks/contextpack.service';

@Component({
  selector: 'app-edit-wordlists',
  templateUrl: './edit-wordlists.component.html',
  styleUrls: ['./edit-wordlists.component.scss']
})
export class EditWordlistsComponent implements OnInit {
  saveDelete: ContextPack[] = [];
  isShown = false;
  finishPack: ContextPack[] = [];
  data = JSON.parse(localStorage.getItem('data'));


  wordlistsForm: FormGroup;


  contextpack: ContextPack;
  contextPackList: ContextPackListComponent;
  i: ContextPack[] = [];
  m;
  o: ContextPack[] = [];
  y: ContextPack[] = [];
  q: ContextPack[] = [];
  len: number;
  formErrors = {
    wordlists: this.contextPackService.wordlistsErrors(this.fb)
  };

  validationMessages =  this.contextPackService.validate();


  constructor(private fb: FormBuilder,private route: ActivatedRoute,private contextPackService: ContextPackService,
    private snackBar: MatSnackBar, private router: Router,private cdr: ChangeDetectorRef) { }


   ngOnInit() {
    console.log(this.data);
    this.saveDelete.push(this.data);
    this.finishPack.push(this.data);

    this.wordlistsForm = this.fb.group({
      id: new FormControl(this.data._id, []),
      icon: new FormControl(this.data.icon, []),
      name: new FormControl(this.data.name, []),
      enabled: new FormControl(this.data.enabled.toString(), []),
      wordlists: this.fb.array(
        this.data.wordlists.map(
          x=>this.fb.group({
            name: new FormControl(x.name, []),
            enabled: new FormControl(x.enabled, []),
            nouns: this.fb.array(
              x.nouns.map(
                p=>this.fb.group({
                word: new FormControl(p.word, []),
                forms: this.fb.array(
                  p.forms.map(
                    q => this.fb.group({
                      forms: new FormControl(q,[])
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
                      forms: new FormControl(q,[])
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
                      forms: new FormControl(q,[])
                    })
                  )
                ) }))),
            miscs:this.fb.array(
              x.misc.map(
                p=>this.fb.group({
                word: new FormControl(p.word, []),
                forms:this.fb.array(
                  p.forms.map(
                    q => this.fb.group({
                      forms: new FormControl(q,[])
                    })
                  )
                ) })))

          }
            ),


           )
    )
      });

      console.log(this.wordlistsForm);
      //this.wordlistsForm.valueChanges.subscribe(data => this.validateForm());

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
    (this.wordlistsForm.controls.wordlists as FormArray).removeAt(empIndex);
  }

  addWordlist(empIndex: number){
    const control =((this.wordlistsForm.controls.wordlist as FormArray).at(empIndex));
    control.setValue(this.saveDelete[0].wordlists[empIndex]);
    }



// submits the form

  submitForm() {
    return 0;
}

// Shows the new form

viewWordlistJSON(){
  const nameArray = this.wordlistsForm.value.name as FormArray;
  const enableArray = this.wordlistsForm.value.enabled as FormArray;
  console.log(nameArray);
  const str = JSON.parse(enableArray.toString().toLowerCase());
  this.finishPack[0].name =  nameArray.toString();
  this.finishPack[0].enabled = str;
  console.log(nameArray);
  console.log(str);
  return(this.finishPack[0]);

}

}
