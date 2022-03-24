import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { RoutingService } from '../services/routing.service';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  firstname = new FormControl('', [Validators.required]);
  lastname = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  constructor(
    private AuthenticationService: AuthenticationService,
    private RoutingService: RoutingService
  ) {}

  ngOnInit(): void {
    
  }

  signUp(): void {
    this.AuthenticationService.attemptSignUp(this.email.value, this.password.value, this.firstname.value, this.lastname.value).subscribe((data: any) => {
      this.RoutingService.setDefaultNotLoggedInRoute();
    });
  }

  checkIfDisabled(): void {
    console.log('firstname? ', this.firstname.invalid);
    console.log('lastname? ', this.lastname.invalid);
    console.log('email? ', this.email.invalid);
    console.log('password? ', this.password.invalid);
  }
}
