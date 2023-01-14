import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { RoutingService } from '../services/routing.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../dialogs/error-dialog/error-dialog.component';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(
      private AuthenticationService: AuthenticationService,
      private RoutingService: RoutingService,
      private Dialog: MatDialog
    ) { }

  ngOnInit(): void { }

  submitLogin(): void {
    this.AuthenticationService.attemptLogin(this.email, this.password).subscribe((data: any) => {
      console.log('data.access: ', data.access);
      if (data.access) {
        this.AuthenticationService.setLoggedIn(true);
        this.AuthenticationService.setEmail(this.email);
        this.RoutingService.setDefaultLoggedInRoute();
      }
    }, (error: any) => {
      console.log('error: ', error);
      this.displayLoginErrorDialog();
    });
  }

  displayLoginErrorDialog(): void {
    const dialog = this.Dialog.open(ErrorDialogComponent, {
      data: { message: 'There was an error with the email or password. If you have forgotten your login credentials please continue with \'Forgot Password?\'', header: 'ERROR LOGGING IN!'}
    });

    dialog.afterClosed().subscribe(result => {
      console.log('closed dialog');
    });
  }

  goToSignUp(): void {
    console.log('signup');
    this.RoutingService.setRoute('/signup');
  }

  forgotPassword(): void {
    console.log('forgot password: ');
    this.RoutingService.setRoute('/forgot-password');
  }
}
