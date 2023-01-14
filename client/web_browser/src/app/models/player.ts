import { Team } from "./team";

export class Player {
    id: string;
    name: string;
    playerName: string;
    team: Team;

    constructor(id: string, name: string, playerName: string, team: Team) {
        this.id = id;
        this.name = name;
        this.playerName = playerName;
        this.team = team;
    }
}
