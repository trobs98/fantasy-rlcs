import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(
    private HttpClient: HttpClient
  ) { }

  getPlayers() {
    return this.HttpClient.get('http://localhost:3000/players', {responseType: 'json', withCredentials: true});
  }

  getActiveNATeams() {
    return this.HttpClient.get('http://localhost:3000/active-na-teams', {responseType: 'json', withCredentials: true});
  }
}
