const db = require('../config/config')

const Rol = {};

Rol.create = (id_rol, id_user) => {
    const sql = `
        INSERT INTO 
            user_has_roles(
                idroles,
                iduser,
                created_at,
                updated_at
            )
        VALUES($1,$2,$3,$4);
    `
    return db.none(sql, [
        id_rol,
        id_user,
        new Date(),
        new Date()
    ])
}

module.exports = Rol; 