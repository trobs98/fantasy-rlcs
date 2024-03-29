const axios = require('axios').default;

let Player = require('./models/player-model');
let Team = require('./models/team-model');

function getNaActiveTeamsData() {

    return new Promise((resolve, reject) => {
        axios.get('https://zsr.octane.gg/teams/active?region=NA', {})
        .then((data) => {
            try {
                let teamsData = data.data.teams;
                let teams = [];

                for (let i = 0; i < teamsData.length; i++) {
                    let currentTeam = teamsData[i].team;
                    let teamsPlayers = teamsData[i].players;
    
                    let id = currentTeam._id;
                    let players = [];
                    let name = currentTeam.name;
                    let region = currentTeam.region;
                    let imageUrl = currentTeam.image;
        
                    for (let j = 0; j < teamsPlayers.length; j++) {
                        let playerData = teamsPlayers[j];
                        let player = new Player(playerData._id, playerData.name, playerData.tag, new Team(id, [], name, region, imageUrl));
    
                        players.push(player);
                    }
    
                    teams.push(new Team(id, players, name, region, imageUrl));
                }
        
                resolve(teams);
            }
            catch(err) {
                reject(err);
            }
        });
    });

}

function getMyFantasyTeamByEmail(email) {

}

module.exports = {
    getNaActiveTeamsData: getNaActiveTeamsData,
    getMyFantasyTeamByEmail: getMyFantasyTeamByEmail
}