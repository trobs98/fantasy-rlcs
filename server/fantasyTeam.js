const dbConnect = require('./dbConnect');
const FantasyTeam = require('./models/fantasy-team-model');

/*
 *  @param  {string} email The email that corresponds to the account's FantasyTeam 
 *  @return {FantasyTeam} The fantasy team object of the user's email or null
 */
function getFantasyTeamByEmail(email) {
    return new Promise((resolve, reject) => {
        dbConnect.callFantasyDbQuery('SELECT * FROM fantasy_team WHERE user_email = "' + email + '"').then(
            result => {
                if (result.result.length > 0) {
                    let fantasyTeamResult = result.result[0];

                    let teamName = fantasyTeamResult.name ? fantasyTeamResult.name : null;
                    let email = fantasyTeamResult.user_email ? fantasyTeamResult.user_email : null;
                    let forwardIdsArray = fantasyTeamResult.forward_row ? fantasyTeamResult.forward_row.split(",") : [];
                    let midfieldIdsArray = fantasyTeamResult.midfield_row ? fantasyTeamResult.midfield_row.split(",") : [];
                    let defenseIdsArray = fantasyTeamResult.defense_row ? fantasyTeamResult.defense_row.split(",") : [];

                    resolve(new FantasyTeam(teamName, email, forwardIdsArray, midfieldIdsArray, defenseIdsArray));
                } else {
                    resolve(null);
                }
            },
            error => {
                reject(error);
            }
        )
    });
}

/*
 *  @param  {string} email
 *  @param  {string[]} forwards
 *  @param  {string[]} midfields
 *  @param  {string[]} defenders
 *  @return 
 */
function setFantasyTeamByEmail(email, forwards, midfielders, defenders) {
    return new Promise((resolve, reject) => {
        dbConnect.callFantasyDbQuery().then(
            result => {

            },
            error => {
                
            }
        )
    });
}

function createNewFantasyTeam(email, teamName, forwards, midfielders, defense) {

}

module.exports = {
    getFantasyTeamByEmail: getFantasyTeamByEmail,
    setFantasyTeamByEmail: setFantasyTeamByEmail,
    createNewFantasyTeam: createNewFantasyTeam
}