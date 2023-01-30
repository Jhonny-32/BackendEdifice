const db = require('../config/config');

const Residential = {}

Residential.createResidential = (dataR) =>{
    
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
        dataR.name,
        dataR.nit,
        dataR.address,
        dataR.lat,
        dataR.lng,
        new Date(),
        new Date()
    ]);

}


Residential.register = ( id_residential, id_user) => {
    const sql = `
        INSERT INTO 
            residential_has_user(
                idresidential,
                iduser,
                created_at,
                updated_at
            )
        VALUES($1,$2,$3,$4);
    `
    return db.none(sql, [
        id_residential,
        id_user,
        new Date(),
        new Date()
    ])
}

module.exports = Residential;