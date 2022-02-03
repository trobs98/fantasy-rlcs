import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'homescreen',
  templateUrl: './homescreen.component.html',
  styleUrls: ['./homescreen.component.css']
})
export class HomescreenComponent implements OnInit {

  LoggedInPaths: Array<String> = ['/points', '/pick-team', '/transfers'];
  NotLoggedInPaths: Array<String> = ['/login'];

  account: String = '';
  loggedIn: Boolean;

  opened = true;
  currentRoute: String;

  constructor(
      private AuthenticationService: AuthenticationService,
      private Router: Router,
      private Location: Location
    ) {
      this.loggedIn = this.AuthenticationService.getLoggedIn();

      let currentPath = this.Location.path();

      if (!this.loggedIn) {
        if (this.NotLoggedInPaths.indexOf(currentPath) > -1) {
          this.currentRoute = this.Location.path();
          this.Router.navigateByUrl(this.Location.path());
        }
        else {
          this.currentRoute = '/login';
          this.Router.navigateByUrl('/login');
        }
      }
      else {
        if (this.LoggedInPaths.indexOf(currentPath) > -1) {
          this.currentRoute = this.Location.path();
          this.Router.navigateByUrl(this.Location.path());
        }
        else {
          this.currentRoute = '/points';
          this.Router.navigateByUrl('/points');
        }
      }
    }

  ngOnInit(): void {
    this.account = this.AuthenticationService.getEmail();
    
    this.AuthenticationService.loggedInObserver.subscribe(loggedIn => {
      this.loggedIn = loggedIn;
      
      if (loggedIn) {
        this.currentRoute = this.Location.path();
        this.Router.navigateByUrl(this.Location.path());
      }
      else {
        this.currentRoute = '/login';
        this.Router.navigateByUrl('/login');
      }
    });
  }

  setRoute(route: String): void {
    this.currentRoute = route;
  }

  logout(): void {
    this.AuthenticationService.setLoggedIn(false);
  }
}
