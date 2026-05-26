const Sets = require('../models/sets');

module.exports = {

    async getDataSets(req, res, next){
       try {
        const conjunto = req.params.conjunto;
        const data = await Sets.getData(conjunto);
        console.log(`Status ${JSON.stringify(data)}`);
        return res.status(201).json(data);
      } catch (error) {
        console.log(`Error: ${error}`);
        return res.status(501).json({
          success: false,
          message: 'Error al obtener la informacion.',
        });
      }
    },

    async createSet(req, res, next){
       try {
        const set = req.body;
        const data = await Sets.create(set);
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
          message: 'Error al registar el apartamento.',
        });
      }
    },

    async createUserHasSet(req, res, next){
      try {
        const uhs = req.body;

        await Sets.userHasSets(uhs);

        return res.status(201).json({
            success: true,
            message: `Se realizo correctamente el registro`
        });

      } catch (error) {
        console.log(`Error: ${error}`);
        return res.status(501).json({
          success: false,
          message: 'Error al realizar el registro.',
        });
      }
    }

}