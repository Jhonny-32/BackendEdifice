const Residential = require('../models/residential');

module.exports = {

    async registerResidential(req, res, next){
        try {
            
            const residential = req.body;
            const data = await Residential.registerResidential();
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