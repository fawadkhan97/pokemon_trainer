import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PokeApiResponse } from 'src/app/models/pokeapiResponse.model';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonTrainer } from 'src/app/models/pokemonTrainer.model';
import { HttpService } from 'src/app/services/http.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css'],
})
export class CatalogueComponent implements OnInit {
  pokemons!: Pokemon[];
  pokeApiResponse!: PokeApiResponse;
  pokemonTrainer!: PokemonTrainer;
  user!: PokemonTrainer;
  constructor(
    private http: HttpService,
    private sessionService: SessionStorageService,
    private alertService: ToastrService,
  ) {
    this.user = this.sessionService.getUser();
  }

  ngOnInit(): void {
    this.pokeApiResponse = this.sessionService.getPokemonFromSession();
    console.log(this.pokeApiResponse);
    if (!this.pokeApiResponse || !this.pokeApiResponse.results.length) {
      this.fetchIntialPokemonList();
    } else {
      this.pokemons = this.pokeApiResponse.results;
    }
  }

  fetchNextPokemonList() {
    this.http
      .getPaginatedPokemons(this.pokeApiResponse.next)
      .subscribe((data) => {
        console.log(data);
        this.pokeApiResponse = data;
        this.pokemons = data.results;

        this.sessionService.savePokemon(this.pokeApiResponse);
      });
  }

  fetchPreviousPokemonList() {
    this.http
      .getPaginatedPokemons(this.pokeApiResponse.previous)
      .subscribe((data) => {
        console.log(data);
        this.pokeApiResponse = data;
        this.pokemons = data.results;
                this.sessionService.savePokemon(this.pokeApiResponse);

      });
  }

  fetchIntialPokemonList() {
      this.http.getPokemons().subscribe((data) => {
        console.log(data);
        this.pokeApiResponse = data;
        this.pokemons = data.results;
        this.sessionService.savePokemon(this.pokeApiResponse);
      });
  }

  addPokemonsToTrainer(pokemon: Pokemon) {

    console.log(this.pokemonTrainer);
    this.http.addPokemonToTrainerCollection(this.user.id!,[...this.user.pokemons,pokemon]).subscribe({
      next: (data) => {
        this.user = data;
        this.sessionService.saveUser(this.user);
        this.alertService.success(
          pokemon?.name + '  addded to trainer collection',"Success"
        );
       },
      error: (error) => {this.alertService.error(error.message,"error");}
    });
  }
}


