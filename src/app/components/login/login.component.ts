import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { HttpService } from 'src/app/services/http.service';
import { PokemonTrainer } from 'src/app/models/pokemonTrainer.model';
import { ToastrService } from 'ngx-toastr';
import {
  Observable,
  catchError,
  finalize,
  of,
  switchMap,
  throwError,
} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  name: string = '';
  isUserLoggedIn: boolean = false;
  SigningIn: boolean = false;
  errors = '';
  constructor(
    private authService: AuthService,
    private sessionService: SessionStorageService,
    private router: Router,
    private httpService: HttpService,
    private alertService: ToastrService
  ) {
    this.isUserLoggedIn = this.authService.isLoggedIn();
  }

  ngOnInit(): void {
    console.log(this.isUserLoggedIn);
    if (this.isUserLoggedIn) {
      this.router.navigate(['/catalogue']);
    }
  }

  onSubmit(): void {
    this.SigningIn = true;
    if (this.name.trim()) {
      this.errors = '';

      //check if user exist already
      this.httpService
        .getTrainerAndPokemonsByName(this.name)
        .pipe(
          catchError((error) => {
            console.error(error);
            return throwError(
              () => new Error('error while retrieving trainer')
            );
          }),
          switchMap((user) => {
            if (user && user.length) {
              // If no user object with a matching username is found,
              //user[0](the first user object in array) is returned.
              return of(
                user.find((user) => user.username === this.name) || user[0]
              );
            } else {
              // If user is not present,  save the user to trainer api and return the user as an observable
              let trainer = {
                username: this.name,
                pokemons: [],
              };
              return this.saveTrainerToDb(trainer).pipe(
                catchError((error) => {
                  console.error(error);
                  return throwError(
                    () => new Error('error while saving trainer')
                  );
                }),
                switchMap((savedUser) => of(savedUser))
              );
            }
          }),
          finalize(() => {
            this.SigningIn = false;
          })
        )
        .subscribe({
          next: (user) => {
            // Success case: returned user object
            this.saveUserToStorageAndNavigate(user);
          },
          error: (error) => {
            // Error case: handle the error here
            this.alertService.error(error); // ...
          },
        });
    } else {
      this.errors = 'please enter your name';
      this.SigningIn = false;
      return;
    }
  }

  saveTrainerToDb(trainer: PokemonTrainer) {
    return this.httpService.saveTrainer(trainer);
  }

  saveUserToStorageAndNavigate(user: PokemonTrainer) {
    this.sessionService.saveUser(user);
    this.router.navigateByUrl('/catalogue');
    this.SigningIn = false;
  }
}
