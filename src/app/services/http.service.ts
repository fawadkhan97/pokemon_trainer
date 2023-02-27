import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pokeapiResponse } from '../models/pokeapiResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }


  getPokemons(): Observable<pokeapiResponse>{

    return this.http.get<pokeapiResponse>('https://pokeapi.co/api/v2/pokemon');
  }

  getPaginatedPokemons(apiUrl: string): Observable<pokeapiResponse>{
    return this.http.get<pokeapiResponse>(apiUrl);
  }
}
