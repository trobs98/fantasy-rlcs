import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { RoutingService } from '../services/routing.service';

@Component({
  selector: 'homescreen',
  templateUrl: './homescreen.component.html',
  styleUrls: ['./homescreen.component.css']
})
export class HomescreenComponent implements OnInit {
  account: String;
  loggedIn: Boolean;
  showSidenav: Boolean = true;

  opened = true;
  currentRoute: String;

  constructor(
      private AuthenticationService: AuthenticationService,
      private RoutingService: RoutingService
    ) {
      this.loggedIn = this.AuthenticationService.getLoggedIn();
      this.currentRoute = this.RoutingService.getCurrentRoute();
      this.account = this.AuthenticationService.getEmail();
    }

  ngOnInit(): void {
    this.AuthenticationService.loggedInObserver.subscribe(loggedIn => {
      this.loggedIn = loggedIn;
    });

    this.RoutingService.routeObserver.subscribe(route => {
      this.currentRoute = route;
    });
  }

  setRoute(route: string): void {
    this.RoutingService.setRoute(route);
  }

  logout(): void {
    this.AuthenticationService.logout();
  }
}
