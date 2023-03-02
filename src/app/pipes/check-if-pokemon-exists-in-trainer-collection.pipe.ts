import { Pipe, PipeTransform } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';
import { SessionStorageService } from '../services/session-storage.service';

@Pipe({
  name: 'checkIfPokemonExistsInTrainerCollection'
})
export class CheckIfPokemonExistsInTrainerCollectionPipe implements PipeTransform {
constructor(private sessionService: SessionStorageService) {

    }
  transform(pokemon: Pokemon): unknown {

    return (Boolean(this.sessionService.getUser()?.pokemons.find((p) => p.name == pokemon.name && p.url == pokemon.url)));
  }

}
