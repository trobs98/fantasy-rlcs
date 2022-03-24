module.exports = class Team {
    players;
    name;
    region;
    imageUrl;
    
    constructor(players, name, region, imageUrl) {
        this.players = players;
        this.name = name;
        this.region = region;
        this.imageUrl = imageUrl;
    }
}