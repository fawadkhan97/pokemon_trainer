import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  name: string = '';
  isUserLoggedIn: boolean = false;
  SigningIn:boolean=false;
  errors = '';
  constructor(private authService: AuthService,private sessionService: SessionStorageService,private router:Router) {
    this.isUserLoggedIn=this.authService.isLoggedIn();
  }

  ngOnInit(): void {
    console.log(this.isUserLoggedIn);
    if (this.isUserLoggedIn) {
      this.router.navigate(['/catalogue'])
    }
  }

  onSubmit(): void {
    this.SigningIn = true;
    if (this.name.trim()) {
      this.errors = '';
      this.sessionService.saveUser(this.name);
      this.router.navigateByUrl('/catalogue');
    } else {
      this.errors = 'please enter your name';
      this.SigningIn = false;
      return;
    }
  }
}
