const promise = require('bluebird');
const options = {
    promiseLib: promise,
    query:(e) =>{}
}

const pgp = require('pg-promise')(options);
const types = pgp.pg.types;
types.setTypeParser(1114, function(stringValues){
    return stringValues
});

const databaseconfig = {
    'host' : process.env.DB_HOST || '127.0.0.1',
    'port' : process.env.DB_PORT || 5432,
    'database' : process.env.DB_NAME || 'EdificeJP',
    'user' : process.env.DB_USER || 'postgres',
    'password' : process.env.DB_PASSWORD || 'angeles-32'
}

const db = pgp(databaseconfig);
module.exports = db;