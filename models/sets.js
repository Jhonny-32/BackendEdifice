const db = require('../config/config');

const Sets ={}

Sets.getData = (conjunto) => {

    const sql = `
        SELECT 
	        s.id,
	        s.tower, 
	        s.apartament,
	        u.id AS idClient,
	        u.name,
	        u.lastname
        FROM 
	        sets AS s
        INNER JOIN
	        user_has_sets AS uhs
        ON 
	        uhs.idsets = s.id
        INNER JOIN 
	        users AS u
        ON
	        u.id = uhs.iduser
        INNER JOIN 
	        residential_has_user AS rhu
        ON 
	        rhu.iduser = u.id
        INNER JOIN 
	        residential AS r 
        ON
	        r.id = rhu.idresidential
        WHERE 
	        r.name = $1
    `;

    return db.manyOrNone(sql, conjunto);

}

module.exports = Sets