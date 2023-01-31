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
    }

}