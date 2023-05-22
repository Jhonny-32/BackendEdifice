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

Sets.create = (set) =>{
	const sql = `
		INSERT INTO 
			sets(
				tower,
				apartament,
				created_at,
				updated_at
			)
		VALUES($1, $2, $3, $4) RETURNING id
	`;
	return db.oneOrNone(sql, [
		set.tower,
		set.apartament,
		new Date(),
		new Date()
	])
}

Sets.userHasSets = (uhs) =>{
	const sql = `
		INSERT INTO 
			user_has_sets(
				iduser,
				idsets,
				created_at,
				updated_at
			)
		VALUES($1, $2, $3, $4)
	`;

	return db.oneOrNone(sql, [
		uhs.iduser,
		uhs.idsets,
		new Date(),
		new Date()
	])
}

Sets.userHasSetsCreate = (id_user, id_sets) =>{
	const sql = `
		INSERT INTO 
			user_has_sets(
				iduser,
				idsets,
				created_at,
				updated_at
			)
		VALUES($1, $2, $3, $4)
	`;

	return db.oneOrNone(sql, [
		id_user,
		id_sets,
		new Date(),
		new Date()
	])
}

Sets.createTA = (tower, apartament) =>{
	const sql = `
		INSERT INTO 
			sets(
				tower,
				apartament,
				created_at,
				updated_at
			)
		VALUES($1, $2, $3, $4) RETURNING id
	`;
	return db.oneOrNone(sql, [
		tower,
		apartament,
		new Date(),
		new Date()
	])
}

Sets.updateSet = (set) => {
	const sql = `
		UPDATE sets
			SET 
			tower = $2, 
    		apartament = $3,
			updated_at = $4
		WHERE id = $1;
	`;
	return db.none(sql, [
		set.setid,
		set.tower,
		set.apartament,
		new Date()
	])
}

module.exports = Sets