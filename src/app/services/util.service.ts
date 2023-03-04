import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from './toaster.service';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor(private router:Router,private toaster:ToasterService) {}

  addPokemonToTrainerCollection() {}

  logOut() {
    sessionStorage.clear();
    this.router.navigate(['/']);
  }

  logOutUnAuthorizedUser() {
    this.toaster.showError('You must be logged in to access');
    sessionStorage.clear();
    this.router.navigateByUrl('/');
  }
}
