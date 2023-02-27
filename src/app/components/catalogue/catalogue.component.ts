import { Component, OnInit } from '@angular/core';
import { pokeapiResponse } from 'src/app/models/pokeapiResponse';
import { Pokemon } from 'src/app/models/pokemon';
import { HttpService } from 'src/app/services/http.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css'],
})
export class CatalogueComponent implements OnInit {
  pokemons!: Pokemon[];
  pokeApiResponse!: pokeapiResponse;
  constructor(
    private http: HttpService,
    private sessionService: SessionStorageService
  ) {}

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
}


