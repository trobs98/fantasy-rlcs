const express = require('express');
const bodyparser = require('body-parser');
const cookieparser = require('cookie-parser');
const cors = require('cors');
const authentication = require('./authentication');
const dbConnect = require('./dbConnect');
const teams = require('./teams');
const gameInfo = require('./gameInfo');
const fantasyTeam = require('./fantasyTeam');

const app = express();
const port = 3000;

const statusCodes = {
    'unauth': {code: 401, message: 'Unauthorized'}
}

dbConnect.openAuthDbConnectionPool();
dbConnect.openFantasyDbConnectionPool();

app.use(cors({'credentials': true, 'origin': 'http://localhost:4200', 'allowedHeaders': 'application/json, text/plain'}));
//app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(cookieparser());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/players', (req, res) => {

});

app.get('/fantasy-team', (req, res) => {
    if (req.query && req.query.email) {
        let email = req.query.email;

        fantasyTeam.getFantasyTeamByEmail(email).then((result) => {
            return res.send(result);
        });
    }
    else {
        return res.send();
    }
});

app.get('/active-na-teams', (req, res) => {
    teams.getNaActiveTeamsData().then((teamData) => {
        res.send(teamData);
    });
});

app.post('/login', (req, res) => {
    let email;
    let password;

    let failedLogin = false;

    if (req.body) {
        if (req.body.email && req.body.email !== null && req.body.password && req.body.password !== null) {
            email = req.body.email;
            password = req.body.password;
        }
        else {
            failedLogin = true;
        }
    }
    else {
        failedLogin = true;
    }

    if (failedLogin) {
        res.statusCode = statusCodes.unauth.code;
        res.statusMessage = statusCodes.unauth.message;

        return res.send('Status Code ' + res.statusCode + ': ' + res.statusMessage + ' - There is an issue with the sign up data.');
    }
    else {
        authentication.loginByEmail(email, password).then(resolveResult, rejectResult);

        function resolveResult(result) {
            res.cookie('access_token', email + ":" + result.access_token, {encode: String, httpOnly: false, secure: false, expires: new Date(Date.now() + authentication.ACCESS_TOKEN_EXPIRY_LENGTH * 1000)});
            return res.send({
                'access': result.access,
                'email': email
            });
        }

        function rejectResult(error) {
            res.statusCode = statusCodes.unauth.code;
            res.statusMessage = statusCodes.unauth.message;
            return res.send('Status Code ' + res.statusCode + ': ' + res.statusMessage + ' - ' + error.message);
        }
    }
});

app.post('/signup', (req, res) => {
    let email;
    let password;
    let firstname;
    let lastname;

    let failedSignUp = false;

    if (req.body) {
        if (req.body.email && req.body.email !== null && req.body.password && req.body.password !== null) {
            email = req.body.email;
            password = req.body.password;
        }
        else {
            failedSignUp = true;
        }

        if (req.body.firstname && req.body.firstname !== null) {
            firstname = req.body.firstname;
        }
        if (req.body.lastname && req.body.lastname !== null) {
            lastname = req.body.lastname;
        }
    }
    else {
        failedSignUp = true;
    }

    if (failedSignUp) {
        res.statusCode = statusCodes.unauth.code;
        res.statusMessage = statusCodes.unauth.message;

        return res.send('Status Code ' + res.statusCode + ': ' + res.statusMessage + ' - There is an issue with the sign up data.');
    }
    else {
        function resolveResult(result) {
            return res.send(result);
        }

        function rejectResult(error) {
            res.statusCode = 406;
            return res.send(error.message);
        }
        
        authentication.signUp(email, password, firstname, lastname).then(resolveResult, rejectResult);
    }
});

app.get('/getPlayerStats', (req, res) => {
    gameInfo.getPlayerStatsByGameId(1, 1).then(resolveResult, rejectResult)

    function resolveResult(result) {
        return res.send(result);
    }

    function rejectResult(error) {
        res.statusCode = 406;
        return res.send(error.message);
    }
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});