import { Pokemon } from "./pokemon.model";

export class PokeApiResponse {
  count!: number;
  next!: string;
  previous!: string;
  results!: Pokemon[];

  constructor(count: number, next: string, previous: string, results: Pokemon[]) {
    this.count = count;
    this.next = next;
    this.previous = previous;
    this.results = results;
  }
}

