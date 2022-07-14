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
    'host' : '127.0.0.1',
    'port' : 5432,
    'database' : '',
    'user' : 'postgress',
    'password' : ''
}

const db = pgp(databaseconfig);
module.exports = db;