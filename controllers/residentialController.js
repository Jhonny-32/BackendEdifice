const Residential = require('../models/residentialS');

module.exports = {

    async register(req, res, next){
        try {
            
            const dataR = req.body;
            const data = await Residential.createResidential(dataR);
            return res.status(201).json({
                success: true,
                message: `Se realizo correctamente el registro`
            });


        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: `Error con el registro`,
                error: error
            })
        }
    }

}