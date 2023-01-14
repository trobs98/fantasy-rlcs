import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Player } from 'src/app/models/player';

@Component({
  selector: 'add-player-to-team',
  templateUrl: './add-player-to-team.component.html',
  styleUrls: ['./add-player-to-team.component.css']
})
export class AddPlayerToTeamComponent {
  header: string = 'Add Player';
  displayedColumns: string[] = ['addPlayer', 'decal', 'teamName', 'playerName'];
  players: Player[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { players: Player[]},
    private MatDialogRef: MatDialogRef<AddPlayerToTeamComponent>
    ) {
    data.players.forEach(player => {
      this.players.push(player);
    });
  }

  addPlayer(element: Player): void {
    this.MatDialogRef.close(element);
  }

}
