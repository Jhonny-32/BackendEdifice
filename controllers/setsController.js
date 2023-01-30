const Sets = require('../models/sets');

module.exports = {

    async getDataSets(req, res, next){
        try {

            await Sets.getData();

            
            return res.status(201).json({
                success: true,
                message: `Se realizo con exito.`,
            })

            
        } catch (error) {
            return res.status(501).json({
                success: false, 
                message: `Error al traer los datos.`,
                error: error
            })
        }
    }

}