module.exports = class PointsPerGame {
    gameId;
    playerId;
    score;
    goals;
    assists;
    saves;

    constructor(gameId, playerId, score, goals, assists, saves) {
        this.gameId = gameId;
        this.playerId = playerId;
        this.score = score;
        this.goals = goals;
        this.assists = assists;
        this.saves = saves;
    }
}
