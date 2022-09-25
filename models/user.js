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

        WHERE 
            email = $1
        GROUP BY U.id`;

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
            phone = $4,
            image = $5,
            updated_at = $6
        WHERE
            id = $1
    `;
    return db.none(sql, [
        user.id,
        user.name,
        user.lastname,
        user.phone,
        user.image,
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


module.exports = User;