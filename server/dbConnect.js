var mysql = require("mysql");
var config = require("./config");

let authPool;
let fantasyPool;

let openAuthDbConnectionPool = () => {
    if (!authPool) {
        authPool = mysql.createPool({
            connectionLimit: 10,
            host: config.auth_database.host,
            user: config.auth_database.user,
            password: config.auth_database.password,
            database: config.auth_database.database
        });
        return;
    }
};

let openFantasyDbConnectionPool = () => {
    if (!fantasyPool) {
        fantasyPool = mysql.createPool({
            connectionLimit: 10,
            host: config.fantasy_database.host,
            user: config.fantasy_database.user,
            password: config.fantasy_database.password,
            database: config.fantasy_database.database
        });
        return;
    }
};

let callAuthDbQuery = (query) => {
    return new Promise((resolve, reject) => {
        if (!authPool) {
            return console.error('No database connection.');
        }
        
        authPool.getConnection((err, connection) => {
            if (err) {
                return err;
            }
    
            if (connection) {
                connection.query(query, (err, result, fields) => {
                    if (err) {
                        return reject("db", `${err.message}`);
                    }
                    resolve({'result': result, 'error': err, 'fields': fields});
                });

                connection.release();
            }
        });
    });
}

let callFantasyDbQuery = (query) => {
    return new Promise((resolve, reject) => {
        if (!fantasyPool) {
            return console.error('No database connection.');
        }
        
        fantasyPool.getConnection((err, connection) => {
            if (err) {
                return err;
            }
    
            if (connection) {
                connection.query(query, (err, result, fields) => {
                    if (err) {
                        return reject("db", `${err.message}`);
                    }
                    resolve({'result': result, 'error': err, 'fields': fields});
                });

                connection.release();
            }
        });
    });
}

let closeAuthDbConnectionPool = () => {
    if (!authPool) {
        return console.error('No database connection.');
    }
    
    authPool.end();
}

let closeFantasyDbConnectionPool = () => {
    if (!fantasyPool) {
        return console.error('No database connection.');
    }
    
    fantasyPool.end();
}

module.exports = {
    openAuthDbConnectionPool: openAuthDbConnectionPool,
    openFantasyDbConnectionPool: openFantasyDbConnectionPool,
    callAuthDbQuery: callAuthDbQuery,
    callFantasyDbQuery: callFantasyDbQuery,
    closeAuthDbConnectionPool: closeAuthDbConnectionPool,
    closeFantasyDbConnectionPool: closeFantasyDbConnectionPool
}