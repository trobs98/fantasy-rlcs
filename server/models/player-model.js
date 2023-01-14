module.exports = class Player {
    id;
    name;
    playerName;
    team;

    constructor(id, name, playerName, team) {
        this.id = id;
        this.name = name;
        this.playerName = playerName;
        this.team = team;
    }
}