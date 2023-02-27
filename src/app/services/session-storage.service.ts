import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon';
import { pokeapiResponse } from '../models/pokeapiResponse';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  constructor() {}

  saveUser(userName: string) {
    sessionStorage.setItem('trainerName', userName);
  }

  savePokemon(pokemons: pokeapiResponse) {
    sessionStorage.setItem("pokemons", JSON.stringify(pokemons));
  }


  getUser() {
        sessionStorage.getItem('trainerName');

  }

  getPokemonFromSession(): pokeapiResponse{
    const data = sessionStorage.getItem('pokemons');
    if (data) {
    return  JSON.parse(data);
    } else {
      return new pokeapiResponse(0,'','',[]);
    }
  }
}
