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
	        email = $1`;

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

module.exports = User;