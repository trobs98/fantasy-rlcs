import { Injectable, Optional, SkipSelf } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {
  private loggedInPaths: Array<String> = ['/points', '/pick-team', '/transfers'];
  private notLoggedInPaths: Array<String> = ['/login', '/signup', '/forgot-password'];
  private currentRoute: string = '';

  routeObserver: Subject<string> = new Subject<string>();

  constructor(
    private Router: Router,
    private Location: Location,
    private AuthenticationService: AuthenticationService,
    @Optional() @SkipSelf() sharedService?: RoutingService
  ) {

    // Forces service to be a singleton
    if (sharedService) {
      throw new Error('RoutingService is already loaded');
    }

    /*
     *  SUBSCRIPTION TO THE CURRENT ROUTE AND AUTHENTICATION
     */
    this.routeObserver.subscribe(value => {
      this.currentRoute = value;
    });

    this.AuthenticationService.loggedInObserver.subscribe(loggedIn => {
      
      if (loggedIn) {
        this.setRoute(this.Location.path());
      }
      else {
        this.setDefaultNotLoggedInRoute();
      }
    });

    this.Router.events.subscribe((event: any) => {
      if (event.navigationTrigger === 'popstate') {
        this.setRoute(this.Location.path());
      }
    });

    this.setRoute(this.Location.path());
  }

  getNotLoggedInPaths(): Array<String> {
    return this.notLoggedInPaths;
  }

  getLoggedInPaths(): Array<String> {
    return this.loggedInPaths;
  }

  getCurrentRoute(): string {
    return this.currentRoute;
  }

  /* 
    * - Routes based on whether logged in or not and the current url path
    * - Defaults to /login or /points if url path does not exist
    */
  setRoute(route: string): void {
    if (!this.AuthenticationService.getLoggedIn()) {
      if (this.getNotLoggedInPaths().indexOf(route) > -1) {
        this.routeObserver.next(route);
        this.Router.navigateByUrl(route);
      }
      else {
        this.setDefaultNotLoggedInRoute();
      }
    }
    else {
      if (this.getLoggedInPaths().indexOf(route) > -1) {
        this.routeObserver.next(route);
        this.Router.navigateByUrl(route);
      }
      else {
        this.setDefaultLoggedInRoute();
      }
    }
  }

  setDefaultNotLoggedInRoute(): void {
    this.setRoute('/login');
  }

  setDefaultLoggedInRoute(): void {
    this.setRoute('/points');
  }
}
