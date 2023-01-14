const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const dbConnect = require('./dbConnect');

dotenv.config();

const ACCESS_TOKEN_EXPIRY_LENGTH = 3600;

function signUp(email, password, firstname, lastname) {
    let salt = crypto.randomBytes(16).toString('hex');
    let hash = hashPassword(password, salt);

    return new Promise((resolve, reject) => {
        getUserByEmail(email).then(result => {
            if (result.result.length > 0) {
                return reject(new Error('Email already exists'));
            }

            saveUser(null, email, hash, salt, firstname, lastname).then(success, error);

            function success(result) {
                return resolve({
                   'message': 'Successful Signup'
                });
            }
            function error(err) {
                return reject(err);
            }
        }, err => {
            return reject(err);
        });
    });
}

function loginByEmail(email, password) {
    return new Promise((resolve, reject) => {
        getUserByEmail(email).then(result => {
            if (result.result.length == 0) {
                return reject(new Error('Email does not exists'));
            }

            let hash_password = String(result.result[0].hash_password);
            let salt = String(result.result[0].salt);
            let stringPassword = String(password);

            if (validatePassword(stringPassword, hash_password, salt)) {
                let currentAccessToken = generateAccessToken(email)

                saveUserAccessToken(email, currentAccessToken).then(result => {
                    return resolve({ 
                        'access': true,
                        'access_token': currentAccessToken
                    });
                }, err => {
                    return reject(err);
                });
            }
            else {
                return reject(new Error('Incorrect Password'));
            }

        }, err => {
            return reject(err);
        });
    });
}

function loginByAccessToken(access_token) {
    return authenticatAccessToken(access_token);
}

function generateAccessToken(email) {
    return jwt.sign({ user: email } , process.env.TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY_LENGTH });
}

function authenticatAccessToken(accessToken) {
    try {
        return jwt.verify(accessToken, process.env.TOKEN_SECRET);
    }
    catch(Error) {
        return false;
    }
}

function hashPassword(password, salt) {
    // Hashing user's salt and password with 1000 iterations, 64 length and sha512 digest
    return crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
}

function validatePassword(password, hash_password, salt) {
    return hashPassword(password, salt) === hash_password;
}

function saveUser(id, email, hash_password, salt, firstname, lastname) {
    return new Promise((resolve, reject) => {
        dbConnect.callAuthDbQuery('INSERT INTO User(id, email, hash_password, salt, first_name, last_name) VALUES ('
                                + id + ',"' + email + '","' + hash_password + '","' + salt + '","' + firstname + '","' + lastname + '") ON DUPLICATE KEY UPDATE ' + 
                                'email="' + email + '", hash_password="' + hash_password + '", salt="' + salt + '", first_name="' + firstname + '", last_name="' + lastname + '";').then(
        result => {
            return resolve(result); 
        }, err => {
            return reject(err);    
        });
    });
}

function getUserByEmail(email) {
    return new Promise((resolve, reject) => {
        dbConnect.callAuthDbQuery('SELECT * FROM User WHERE email="' + email + '";').then(
        
        result => {
            return resolve(result);
        }, err => {
            return reject(err);
        });
    })

}

function saveUserAccessToken(email, accessToken) {
    return new Promise((resolve, reject) => {
        dbConnect.callAuthDbQuery('UPDATE User SET access_token="' + accessToken + '" WHERE email="' + email + '";').then(
            
        result => {
            return resolve(result);
        }, err => {
            return reject(err);
        });
    });
}

module.exports = {
    signUp: signUp,
    loginByEmail: loginByEmail,
    loginByAccessToken: loginByAccessToken,

    ACCESS_TOKEN_EXPIRY_LENGTH: ACCESS_TOKEN_EXPIRY_LENGTH
}