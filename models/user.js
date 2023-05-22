const db = require('../config/config');
const bcrypt = require('bcryptjs')

const User = {}

User.register = async (user) => {

    const hash = await bcrypt.hash(user.password, 10)

    const sql = `
        INSERT INTO
            users(
                name,
                lastname,
                phone, 
                email, 
                image,
                dni,
                password,
                created_at,
                updated_at,
                session_token
            )
        values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING id

    `
    return db.oneOrNone(sql, [
        user.name,
        user.lastname,
        user.phone,
        user.email,
        user.image,
        user.dni,
        hash,
        new Date(),
        new Date(),
        user.session_token
    ])       
}

User.findByEmail = (email) => {
    const sql = `
        SELECT 
            U.id,
            U.name, 
            U.lastname,
            U.phone,
            U.email,
            U.image,
            U.dni,
            U.password,
            U.session_token,
            RES.id AS residential,
            RES.name AS conjunto,
            json_agg(
                json_build_object(
                    'id', R.id,
                    'name', R.name,
                    'image', R.image
                )
            ) AS roles
        FROM 
            users AS U 
        INNER JOIN 
            user_has_roles AS UHR
        ON 
            UHR.iduser = u.id
        INNER JOIN 
            roles AS R
        ON 
            R.id = UHR.idroles
        INNER JOIN  
            residential_has_user AS RHU
        ON 
            RHU.iduser = U.id
        INNER JOIN
            residential AS RES 
        ON
            RES.id = RHU.idresidential
        WHERE 
            email = $1
        GROUP BY U.id, RES.name, RES.id;`;

    return db.oneOrNone(sql, email)
}

User.findById = (id, callback) => {
    const sql = `
        SELECT
	        name, 
	        lastname,
	        phone,
	        email,
	        image,
	        dni,
	        password,
	        session_token
        FROM
        	users
        WHERE 
	        id = $1`;
    return db.oneOrNone(sql, id).then(user => {callback(null, user)})
}

User.update = (user) =>{
    const sql = `
        UPDATE
            users
        SET 
            name = $2,
            lastname = $3,
            email = $4,
            dni = $5,
            phone = $6,
            image = $7,
            password = $8,
            updated_at = $9
        WHERE
            id = $1
    `;
    return db.none(sql, [
        user.id,
        user.name,
        user.lastname,
        user.email,
        user.dni,
        user.phone,
        user.image,
        user.password,
        new Date()
    ])
}

User.updateSessionToken = (id_user, session_token) => {
  const sql = `
  UPDATE
	    users
  SET 
      session_token = $2
  WHERE
	    id = $1
  `;
  return db.none(sql, [id_user, session_token]);
};

User.dataResident = (conjunto) => {
    
    const sql = `
         SELECT
            U.id, 
	        U.name,
	        U.lastname,
	        U.phone,
            U.email,
            U.dni,
            U.password,
            s.id as idset,
	        s.tower,
	        s.apartament
        FROM residential as RES
	    INNER JOIN residential_has_user as RHU
	    ON 
		    RES.id = RHU.idresidential 
	    INNER JOIN users as U 
	    ON 
		    RHU.iduser = U.id
	    INNER JOIN user_has_sets as uhs 
	    ON 
		    uhs.iduser = u.id
	    INNER JOIN sets as s 
	    ON
		    s.id = uhs.idsets
        WHERE RES.name = $1
    `;

    return db.manyOrNone(sql, conjunto);

}

User.getDataUser = (nameRol,nameResidential) => {

    const sql = `
        SELECT  
            u.id,
	        u.name,
	        u.lastname,
	        u.phone,
	        u.email,
	        u.dni
        FROM roles AS r 
        INNER JOIN user_has_roles AS uhr
        ON
	        r.id = uhr.idroles
        INNER JOIN users AS u 
        ON 
	        uhr.iduser = u.id
        INNER JOIN residential_has_user AS rhu
        ON 
	        rhu.iduser = u.id
        INNER JOIN residential AS res 
        ON 
	        res.id = rhu.idresidential 
        WHERE r.name = $1 AND res.name = $2
    `;

    return db.manyOrNone(sql, [nameRol, nameResidential]);

}


module.exports = User;