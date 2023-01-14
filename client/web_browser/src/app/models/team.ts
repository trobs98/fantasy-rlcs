import { Player } from "./player";

export class Team {
    id: string;
    players: Player[];
    name: string;
    region: string;
    imageUrl: string;
    
    constructor(id: string, players: Player[], name: string, region: string, imageUrl: string) {
        this.id = id;
        this.players = players;
        this.name = name;
        this.region = region;
        this.imageUrl = imageUrl;
    }
}
