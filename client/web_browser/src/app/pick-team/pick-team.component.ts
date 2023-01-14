import { Component, OnInit } from '@angular/core';
import { Team } from '../models/team';
import { Player } from '../models/player';
import { TeamService } from '../services/team.service';
import { AuthenticationService } from '../services/authentication.service';
import { AccountService } from '../services/account.service';
import { MatDialog } from '@angular/material/dialog';
import { AddPlayerToTeamComponent } from '../dialogs/add-player-to-team/add-player-to-team.component';
import { FantasyTeam } from '../models/fantasy-team';
import { EMPTY_PLAYER } from '../global';

@Component({
  selector: 'pick-team',
  templateUrl: './pick-team.component.html',
  styleUrls: ['./pick-team.component.css']
})
export class PickTeamComponent implements OnInit {

  activeNATeams: Team[] = [];
  activeNAPlayers: Player[] = [];
  myFantasyTeam: FantasyTeam = new FantasyTeam();

  forwards: Player[] = [];
  midfields: Player[] = [];
  defenders: Player[] = [];

  constructor(
    private TeamService: TeamService,
    private AuthenticationService: AuthenticationService,
    private MatDialog: MatDialog,
    private AccountService: AccountService
  ) {

    this.TeamService.getActiveNATeams().subscribe((teamsData: any) => {
      this.activeNATeams = <Team[]>teamsData;
      for (let i = 0; i < this.activeNATeams.length; i++) {
        for (let j = 0; j < this.activeNATeams[i].players.length; j++) {
          let player: Player = this.activeNATeams[i].players[j];

          if (player.team.imageUrl == null) {
            player.team.imageUrl = EMPTY_PLAYER.logoUrl;
          }

          this.activeNAPlayers.push(player);
        }
      }
      
      this.AccountService.retrieveMyFantasyTeam().subscribe((myTeam: any) => {
        this.AccountService.setMyFantasyTeam(<FantasyTeam>myTeam);
        this.myFantasyTeam = this.AccountService.getMyFantastyTeam();

        this.populateTeam();
      });
    });
  }

  ngOnInit(): void {
    this.populateTeam();
  }

  addPlayerClick(playerLogo: MouseEvent, row: number, position: number) {

    const addPlayerDialog = this.MatDialog.open(AddPlayerToTeamComponent, {
      data: { players: this.activeNAPlayers },
      width: '50vw'
    });

    addPlayerDialog.afterClosed().subscribe((selectedPlayer: Player | undefined) => {
      console.log('result: ', selectedPlayer);

      if (selectedPlayer) {
        let image: HTMLImageElement = <HTMLImageElement>playerLogo.target;
        image.src = selectedPlayer.team.imageUrl;

        let label: HTMLElement = <HTMLElement>image.nextElementSibling;
        label.innerHTML = selectedPlayer.playerName;
      }
    });
  }

  populateTeam() {

    for (let i: number = 0; this.activeNAPlayers.length > i; i++) {
      for (let j: number = 0; this.myFantasyTeam.forwards.length > j; j++) {
        if (this.activeNAPlayers[i].id === this.myFantasyTeam.forwards[j]) {
          this.forwards.push(this.activeNAPlayers[i]);
        }
      }
      for (let k: number = 0; this.myFantasyTeam.midfields.length > k; k++) {
        if (this.activeNAPlayers[i].id === this.myFantasyTeam.midfields[k]) {
          this.midfields.push(this.activeNAPlayers[i]);
        }
      }
      for (let l: number = 0; this.myFantasyTeam.defenders.length > l; l++) {
        if (this.activeNAPlayers[i].id === this.myFantasyTeam.defenders[l]) {
          this.defenders.push(this.activeNAPlayers[i]);
        }
      }
    }

    console.log('forwards: ', this.forwards);

  }
}
