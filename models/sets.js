const db = require('../config/config');

const Sets ={}

Sets.getData = () => {

    const sql = `
        SELECT * FROM sets
    `;

    return db.manyOrNone(sql);

}

module.exports = Sets