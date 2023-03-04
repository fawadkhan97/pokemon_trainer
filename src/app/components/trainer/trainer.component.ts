import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonTrainer } from 'src/app/models/pokemonTrainer.model';
import { HttpService } from 'src/app/services/http.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.css', '.././../app.component.css'],
})
export class TrainerComponent implements OnInit {
  trainer!: PokemonTrainer;
  pokemons!: Pokemon[];

  constructor(
    private httpService: HttpService,
    private sessionService: SessionStorageService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.trainer = this.sessionService.getUser();

    this.httpService
      .getTrainerAndPokemonsByName(this.trainer.username)
      .subscribe({
        next: (response: PokemonTrainer[]) => {
          this.trainer = response[0];
          this.pokemons = response[0].pokemons;
          console.log(this.trainer, this.pokemons, response[0].pokemons);
        },
        error: (error: any) => {
          this.toastrService.error(error.message);
        },
      });
  }

  onRemovePokemon(pokemon: Pokemon) {
    this.trainer.pokemons = this.trainer.pokemons.filter(
      (p) => p.name != pokemon.name
    );
    this.httpService
      .updatePokemonToTrainerCollection(this.trainer.id!, this.trainer.pokemons)
      .subscribe({
        next: (response: PokemonTrainer) => {
          this.trainer = response;
          this.sessionService.saveUser(response);
        },
        error: (error: any) => {
          this.toastrService.error(error.message);
        },
      });
  }
}

