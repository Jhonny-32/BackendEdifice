const Residential = require('../models/residentialS');

module.exports = {

    async register(req, res, next){
        try {
            
            const dataR = req.body;
            const data = await Residential.createResidential(dataR);
            return res.status(201).json({
                success: true,
                message: `Se realizo correctamente el registro`,
                data: {
                    'id' : data.id
                }
            });


        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: `Error con el registro`,
                error: error
            })
        }
    },

    async dataResidentialUser(req, res, next){
        try{
            const idResidential = req.body.id_residential;
            const idUser = req.body.id_user;
            
            await Residential.register(idResidential, idUser);

            return res.status(201).json({
                success: true,
                message: 'Los datos fueron guardados correctamente'
            })

        }catch(error){
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: "Error al guardar los datos",
                error: error
            })}
    }
    

}