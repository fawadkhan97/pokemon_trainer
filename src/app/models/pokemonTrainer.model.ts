import { Pokemon } from "./pokemon.model";

export class PokemonTrainer {
  id?: number;
  username: string = '';
  pokemons!: Pokemon[];
}
