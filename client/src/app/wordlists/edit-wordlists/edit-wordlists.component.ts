import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { ContextPack,Wordlist } from 'src/app/contextpacks/contextpack';
import { ContextPackCardComponent } from 'src/app/contextpacks/contextpack-card.component';
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
  contextpackcard = new ContextPackCardComponent(this.contextPackService,this.snackBar,this.router);
  m;
  formErrors = {
    wordlists: this.contextPackService.wordlistsErrors(this.fb)
  };

  validationMessages =  this.contextPackService.validate();


  constructor(private fb: FormBuilder,private route: ActivatedRoute,private contextPackService: ContextPackService,
    private snackBar: MatSnackBar, private router: Router) { }


   ngOnInit() {
    console.log(this.data);

    this.wordlistsForm = this.fb.group({
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
                forms: new FormControl(p.forms, [])

              }))),
            adjectives:this.fb.array(
              x.adjectives.map(
                p=>this.fb.group({
                word: new FormControl(p.word, []),
                forms: new FormControl(p.forms, [])
              }))),
            verbs:this.fb.array(
              x.verbs.map(
                p=>this.fb.group({
                word: new FormControl(p.word, []),
                forms: new FormControl(p.forms, [])
              }))),
            misc:this.fb.array(
              x.misc.map(
                p=>this.fb.group({
                word: new FormControl(p.word, []),
                forms: new FormControl(p.forms, [])
                 })))

          }
            ),


           )
    )
      });


      this.wordlistsForm.valueChanges.subscribe(data => this.validateForm());

  }

  // adds wordlist
  addWordlist(cp) {
    this.router.navigate(['edit/wordlist']);
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

    console.log((this.wordlistsForm.controls.wordlists as FormArray).removeAt(empIndex));
    console.log(this.data.wordlists.splice(empIndex,empIndex+1));
  }

  removeWord(ix: number, iy: number, pos: string){
    ((this.wordlistsForm.controls.wordlists as FormArray).at(ix).get(`${pos}`) as FormArray).removeAt(iy);
    console.log(this.data.wordlists[ix][(`${pos}`)].splice(iy,iy+1));

  }



// submits the form


submitForm() {
    this.contextPackService.updateContextPack(this.wordlistsForm.value).subscribe(contextpack => {
    this.snackBar.open(this.wordlistsForm.value.name
      + ' Pack is Updated ' , null, {
        duration: 2000,
      });
      this.router.navigate(['/contextpacks/' + this.data._id]);
    }, err => {
      this.snackBar.open('Failed to update the pack', 'OK', {
        duration: 5000,
      });
    });}


}
