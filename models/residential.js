const db = require('../config/config');

const Residential = {}

Residential.registerResidential = (residential) =>{
    
    const sql = `
        INSERT INTO 
            residential(
                name,
                nit,
                address, 
                lat,
                lng,
                created_at,
                updated_at
            )
        VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING id

    `
    return db.oneOrNone(sql, [
        residential.name,
        residential.nit,
        residential.address,
        residential.lat,
        residential.lng,
        new Date(),
        new Date()
    ]);

}

module.exports = Residential;