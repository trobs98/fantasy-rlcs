import { Injectable, Optional, SkipSelf } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private loggedIn: Boolean;
  private email: String;

  loggedInObserver: Subject<Boolean> = new Subject<Boolean>();;

  constructor(
      private Router: Router,
      private CookieService: CookieService,
      @Optional() @SkipSelf() sharedService?: AuthenticationService
  ) 
  {
    if (sharedService) {
      throw new Error('AuthenticationService is already loaded');
    }
    console.log('AuthenticationService Created.');

    this.loggedIn = this.getCookieLoggedIn();
    this.email = '';
    
    this.loggedInObserver.subscribe(value => {
      this.loggedIn = value
      this.setCookieLoggedIn(value);
    });
  }

  private setCookieLoggedIn(loggedIn: Boolean): void {
    this.CookieService.set('loggedIn', String(loggedIn), { expires: 1});
  }

  private getCookieLoggedIn(): Boolean {
    return this.CookieService.get('loggedIn') && this.CookieService.get('loggedIn').toLowerCase() === 'true' ? true : false;
  }

  setLoggedIn(loggedIn: Boolean): void {
    this.loggedInObserver.next(loggedIn);
  }

  getLoggedIn(): Boolean {
    return this.loggedIn;
  }

  setEmail(email: String): void {
    this.email = email;
  }

  getEmail(): String {
    return this.email;
  }
}
