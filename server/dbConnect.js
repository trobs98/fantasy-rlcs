var mysql = require("mysql");

let pool;

let openDbConnectionPool = () => {
    if (!pool) {
        pool = mysql.createPool({
            connectionLimit: 10,
            host: 'localhost',
            user: 'root',
            password: '***REMOVED***',
            database: 'rl_fantasy_admin'
        });
        return;
    }
};

let callDbQuery = (query) => {
    return new Promise((resolve, reject) => {
        if (!pool) {
            return console.error('No database connection.');
        }
        
        pool.getConnection((err, connection) => {
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

let closeDbConnectionPool = () => {
    if (!pool) {
        return console.error('No database connection.');
    }
    
    pool.end();
}

module.exports = {
    openDbConnectionPool: openDbConnectionPool,
    callDbQuery: callDbQuery,
    closeDbConnectionPool: closeDbConnectionPool
}