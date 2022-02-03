import { Component, ComponentFactoryResolver, OnInit, Output } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: String = '';
  password: String = '';

  constructor(
      private AuthenticationService: AuthenticationService,
      private Router: Router
    ) { }

  ngOnInit(): void { }

  submitLogin(): void {
    this.AuthenticationService.setEmail(this.email);
    this.AuthenticationService.setLoggedIn(true);
    this.Router.navigateByUrl('/points');
  }
}
