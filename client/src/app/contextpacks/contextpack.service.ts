import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ContextPack } from './contextpack';
import { map } from 'rxjs/operators';
import { FormControl, Validators } from '@angular/forms';







@Injectable()
export class ContextPackService {
  readonly contextpackUrl: string = environment.apiUrl + 'contextpacks';

  private data: ContextPack;
  private dataPack: ContextPack [];

  constructor(private httpClient: HttpClient) {
  }

  getContextPacks(): Observable<ContextPack[]> {
    const httpParams: HttpParams = new HttpParams();
    return this.httpClient.get<ContextPack[]>(this.contextpackUrl, {
      params: httpParams,
    });
  }

  getContextPackById(id: string): Observable<ContextPack> {
    return this.httpClient.get<ContextPack>(this.contextpackUrl + '/' + id);
  }

  filterContextPacks(contextpacks: ContextPack[], filters: { name?: string }): ContextPack[] {

    let filteredContextPacks = contextpacks;

    // Filter by topic
    if (filters.name) {
      filters.name = filters.name.toLowerCase();

      filteredContextPacks = filteredContextPacks.filter(contextpack => contextpack.name.toLowerCase().indexOf(filters.name) !== -1);
    }

    return filteredContextPacks;
  }

  addContextPack(newPack: ContextPack): Observable<string> {
    // Send post request to add a new user with the user data as the body.
    return this.httpClient.post<{id: string}>(this.contextpackUrl, newPack).pipe(map(res => res.id));
  }

  updateContextPack(updatePack: ContextPack): Observable<ContextPack> {

    return this.httpClient.put<ContextPack>(this.contextpackUrl, updatePack).pipe(map(res => res));
  }



  setData(data: ContextPack){
    this.data = data;
    localStorage.setItem('name',JSON.stringify(this.data.name));
    const name = this.data.name;
    return(name + ' is set in the local storage');
  }
  
  initwordlist(fb) {
    return fb.group({
      //  ---------------------forms fields on x level ------------------------
      name: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      enabled: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^(true|false)$'),
      ])),
      // ---------------------------------------------------------------------
      nouns: fb.array([]),
      adjectives: fb.array([]),
      verbs: fb.array([]),
      misc: fb.array([])

    });
  }

  initNouns(fb) {
    return fb.group({
      //  ---------------------forms fields on y level ------------------------
      word: [''],
      // ---------------------------------------------------------------------
      forms: fb.array([
        fb.control('')
      ])
    });
  }

   wordlistsErrors(fb) {
      return [{
        //  ---------------------forms errors on x level ------------------------
        name: [' ', [Validators.required]],
        enabled:[' ', [Validators.required]],

        // ---------------------------------------------------------------------
        nouns: this.nounsErrors(fb)

      }];

    }
    nounsErrors(fb) {
      return [{
        //  ---------------------forms errors on y level ------------------------
        word: '',
        forms: fb.array([
          fb.control('')
        ]),

      }];
    }

    validateWordlists(word,fb,formerrors) {
      // console.log(XsA.value);
      formerrors.wordlists = [];
      let x = 1;
      while (x <= word.length) {
        formerrors.wordlists.push({
          name: [' ', [Validators.required]],
          enabled: [' ', [Validators.required]],
          nouns: [{
            word: '',
            forms: fb.array([
              fb.control('')
            ]),
          }]
        });
        x++;
      }
    }

}








