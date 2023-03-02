import { Injectable } from '@angular/core';
import { PokeApiResponse } from '../models/pokeapiResponse.model';
import { PokemonTrainer } from '../models/pokemonTrainer.model';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  constructor() {}

  saveUser(trainer: PokemonTrainer) {
    sessionStorage.setItem('user', JSON.stringify (trainer));
  }

  savePokemon(pokemons: PokeApiResponse) {
    sessionStorage.setItem("pokemons", JSON.stringify(pokemons));
  }


  getUser():PokemonTrainer {
      return JSON.parse( sessionStorage.getItem('user')||'');
  }

  getPokemonFromSession(): PokeApiResponse{
    const data = sessionStorage.getItem('pokemons');
    if (data) {
    return  JSON.parse(data);
    } else {
      return new PokeApiResponse(0,'','',[]);
    }
  }
}
