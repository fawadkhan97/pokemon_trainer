import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor(private router:Router) {}

  addPokemonToTrainerCollection() {}

  logOut() {
    sessionStorage.clear();
    this.router.navigate(['/']);
  }
}
