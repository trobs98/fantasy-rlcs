import { Injectable, Optional, SkipSelf } from '@angular/core';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpParams } from '@angular/common/http';

const ACCESS_TOKEN_COOKIE_DATA = {
  'name': 'access_token',
  'path': '/',
  'domain': 'localhost',
  'secure': true
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private loggedIn: Boolean;
  private email: string;

  loggedInObserver: Subject<Boolean> = new Subject<Boolean>();

  constructor(
      private Router: Router,
      private CookieService: CookieService,
      private HttpClient: HttpClient,
      @Optional() @SkipSelf() sharedService?: AuthenticationService
  ) 
  {
    if (sharedService) {
      throw new Error('AuthenticationService is already loaded');
    }
    console.log('AuthenticationService Created.');

    this.loggedIn = this.getCookieLoggedIn() ? true : false;
    this.email = this.getCookieLoggedIn() ? this.getCookieLoggedIn().split(":")[0] : '';
    
    this.loggedInObserver.subscribe(value => {
      this.loggedIn = value;
    });
  }

  getCookieLoggedIn(): string {
    return this.CookieService.get(ACCESS_TOKEN_COOKIE_DATA.name);
  }

  setLoggedIn(loggedIn: Boolean): void {
    this.loggedInObserver.next(loggedIn);
  }

  attemptLogin(email: string, password: string) {
    let body = new HttpParams()
      .set('email', email)
      .set('password', password);

    return this.HttpClient.post('http://localhost:3000/login', body, {responseType: 'json', withCredentials: true});
  }

  attemptSignUp(email: string, password: string, firstname: string, lastname: string) {
    console.log('email: ',email);
    console.log('password: ',password);
    console.log('firstname: ',firstname);
    console.log('lastname: ',lastname);
    let body = new HttpParams()
      .set('email', email)
      .set('password', password)
      .set('firstname', firstname)
      .set('lastname', lastname);

    return this.HttpClient.post('http://localhost:3000/signup', body, {responseType: 'json', withCredentials: true});
  }

  getLoggedIn(): Boolean {
    return this.loggedIn;
  }

  logout(): void {
    this.setLoggedIn(false);
    this.setEmail('');
    this.CookieService.delete(ACCESS_TOKEN_COOKIE_DATA.name, ACCESS_TOKEN_COOKIE_DATA.path);
  }

  setEmail(email: string): void {
    this.email = email;
  }

  getEmail(): string {
    return this.email;
  }
}
