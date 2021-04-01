import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Wordlist } from '../contextpacks/contextpack';

@Injectable({
  providedIn: 'root'
})
export class WordlistService {

  readonly wordlistUrl: string = environment.apiUrl + 'wordlists';
  constructor(private httpClient: HttpClient) {
  }

  getWordlists(): Observable<Wordlist[]> {
    const httpParams: HttpParams = new HttpParams();
    return this.httpClient.get<Wordlist[]>(this.wordlistUrl, {
      params: httpParams,
    });
  }

  getWordlistById(id: string): Observable<Wordlist> {
    return this.httpClient.get<Wordlist>(this.wordlistUrl + '/' + id);
  }
}
