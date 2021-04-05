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
  wordlistsForm: FormGroup;
  saveDelete: ContextPack[] = [];
  isShown = false;
  finishPack: ContextPack[] = [];



  data = JSON.parse(localStorage.getItem('data'));
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
      id: '',
      name: new FormControl(this.data.name, Validators.compose([
        Validators.required,
      ])),
      enabled : new FormControl(this.data.enabled, Validators.compose([
        Validators.required,
        Validators.pattern('^(true|false)'),
      ])),
      icon: '',
      wordlist: this.fb.array([])});

      this.wordlistsForm.valueChanges.subscribe(data => this.validateForm());
      console.log(this.wordlistsForm);
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
  const save =  ((this.wordlistsForm.controls.wordlist as FormArray).at(empIndex));
  ((this.wordlistsForm.controls.wordlist as FormArray).removeAt(empIndex));
  this.saveDelete[0].wordlists[empIndex] = (save);

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
