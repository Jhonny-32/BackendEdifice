const db = require('../config/config');


const Orders ={}

Orders.findByStatus = (statuss,conjunto) =>{

    const sql = `
        SELECT 
	        o.id,
	        o.idsets,
	        o.iduser,
	        o.image1,
	        o.descriptions,
	        o.statuss,
			o.timestamp,
	    JSON_BUILD_OBJECT(
		    'id', u.id,
		    'name', u.name,
		    'lastname', u.lastname,
		    'phone', u.phone
	    ) AS client,
	    JSON_BUILD_OBJECT(
		    'id', s.id,
		    'tower', s.tower,
		    'apartament', s.apartament
	    ) AS sets
        FROM 
	        orders AS o 
        INNER JOIN 
	        users AS u 
        ON 
	        o.iduser = u.id
        INNER JOIN 
	        sets AS s 
        ON 
	        o.idsets = s.id
		INNER JOIN 
			residential_has_user AS rhu
		ON
			rhu.iduser = u.id
		INNER JOIN
			residential AS r
		ON 
			r.id = rhu.idresidential
		
        WHERE 
	        statuss = $1 AND r.name = $2;
    `;
        
    return db.manyOrNone(sql, [statuss, conjunto])
}

Orders.findByClientAndStatus = (statuss, conjunto, idClient) =>{

    const sql = `
        SELECT 
	        o.id,
	        o.idsets,
	        o.iduser,
	        o.image1,
	        o.descriptions,
	        o.statuss,
			o.timestamp,
	    JSON_BUILD_OBJECT(
		    'id', u.id,
		    'name', u.name,
		    'lastname', u.lastname,
		    'phone', u.phone
	    ) AS client,
	    JSON_BUILD_OBJECT(
		    'id', s.id,
		    'tower', s.tower,
		    'apartament', s.apartament
	    ) AS sets
        FROM 
	        orders AS o 
        INNER JOIN 
	        users AS u 
        ON 
	        o.iduser = u.id
        INNER JOIN 
	        sets AS s 
        ON 
	        o.idsets = s.id
		INNER JOIN 
			residential_has_user AS rhu
		ON
			rhu.iduser = u.id
		INNER JOIN
			residential AS r
		ON 
			r.id = rhu.idresidential
		
        WHERE 
	        statuss = $1 
			AND r.name = $2 
			AND o.iduser= $3
    `;

    return db.manyOrNone(sql,[statuss, conjunto, idClient])

}

Orders.insert = (order) =>{
    const sql = `
        INSERT INTO
            orders(
                idsets,
                iduser,
                image1,
                image2,
                image3,
                descriptions,
                statuss,
                timestamp,
                created_at,
                updated_at
            )
        VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING id
    `
    return db.oneOrNone(sql, [
        order.idsets,
        order.iduser,
        order.image1,
        order.image2,
        order.image3,
        order.descriptions,
        order.statuss,
        Date.now,
        new Date(),
        new Date()
    ])
}

Orders.update = (order) =>{
    const sql = `
        UPDATE
            orders
        SET
            idsets = $2,
            iduser = $3,
            image1 = $4,
            image2 = $5,
            image3 = $6,
            descriptions = $7,
            statuss = $8,
            created_at = $9,
            updated_at = $10
        WHERE
            id = $1
    `;
    return db.none(sql, [
        order.id,
        order.idsets,
        order.iduser,
        order.image1,
        order.image2,
        order.image3,
        order.descriptions,
        order.statuss,
        new Date(),
        new Date()
    ])
}

module.exports = Orders;