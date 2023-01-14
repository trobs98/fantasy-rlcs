const axios = require('axios').default;

function getGameStatsByGameId(gameId) {

}

function getPlayerStatsByGameId(gameId, playerId) {
    
    return new Promise((resolve, reject) => {
        axios.get("https://zsr.octane.gg/matches?event=614b6e37f8090ec74528642a&stage=2&stage=3", {})
        .then((data) => {
            try {
                let eventData = data.data;

                eventData.forEach(match => {
                    let blueTeam = match.blue;
                    let orangeTeam = match.orange;
                    blueTeam.players.forEach(player => [

                    ]);
                    orangeTeam.players.forEach(player => {

                    });
                });
                console.log('data: ', data.data);
                resolve(data.data);
            }
            catch(err) {
                reject(err);
            }
            
        });
    });
}

module.exports = {
    getPlayerStatsByGameId: getPlayerStatsByGameId
}