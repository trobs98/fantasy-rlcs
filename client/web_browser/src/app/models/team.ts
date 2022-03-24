import { Player } from "./player";

export class Team {
    players: Player[];
    name: string;
    region: string;
    imageUrl: string;
    
    constructor(players: Player[], name: string, region: string, imageUrl: string) {
        this.players = players;
        this.name = name;
        this.region = region;
        this.imageUrl = imageUrl;
    }
}
