import { Component, OnInit } from '@angular/core';
import { Team } from '../models/team';
import { TeamService } from '../services/team.service';

@Component({
  selector: 'pick-team',
  templateUrl: './pick-team.component.html',
  styleUrls: ['./pick-team.component.css']
})
export class PickTeamComponent implements OnInit {

  activeNATeams: Team[] = [];

  constructor(
    private TeamService: TeamService
  ) {
    this.TeamService.getActiveNATeams().subscribe((teamsData: any) => {
      this.activeNATeams = <Team[]>teamsData;

      console.log('this.activeNATeams: ', this.activeNATeams);
    });
  }

  ngOnInit(): void {
  }
}
