module.exports = class Team {
    id;
    players;
    name;
    region;
    imageUrl;
    
    constructor(id, players, name, region, imageUrl) {
        this.id = id;
        this.players = players;
        this.name = name;
        this.region = region;
        this.imageUrl = imageUrl;
    }
}