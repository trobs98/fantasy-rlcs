module.exports = class FantasyTeam {
    teamName;
    email;
    forwards;
    midfields;
    defenders;

    constructor(teamName, email, forwards, midfields, defenders) {
        this.teamName = teamName;
        this.email = email;
        this.forwards = forwards;
        this.midfields = midfields;
        this.defenders = defenders;
    }

    getTeam() {
        return {
            forwards: this.forwards,
            midfields: this.midfields,
            defenders: this.defenders
        };
    }
}