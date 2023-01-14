import { Injectable, Optional, SkipSelf } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';
import { FantasyTeam } from '../models/fantasy-team';
import { Team } from '../models/team';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  email: string;
  fantasyTeam: FantasyTeam = new FantasyTeam();

  fantasyTeamObserver: Subject<FantasyTeam> = new Subject<FantasyTeam>();

  constructor(
    private HttpClient: HttpClient,
    private AuthenticationService: AuthenticationService,
    @Optional() @SkipSelf() sharedService?: AccountService
  ) {
    if (sharedService) {
      throw new Error('AccountService is already loaded');
    }

    this.email = AuthenticationService.getEmail();
    this.fantasyTeamObserver.subscribe(fantasyTeam => {
      this.fantasyTeam = fantasyTeam;
    });
  }
  
  retrieveMyFantasyTeam() {
    return this.HttpClient.get('http://localhost:3000/fantasy-team', {responseType: 'json', withCredentials: true, params: new HttpParams().set('email', this.email)});
  }

  getMyFantastyTeam(): FantasyTeam {
    return this.fantasyTeam;
  }

  setMyFantasyTeam(fantasyTeam: FantasyTeam) {
    this.fantasyTeamObserver.next(fantasyTeam);
  }
}
