const Orders = require('../models/orders');
const storage = require('../utils/cloud_storage');
const asyncForEach = require('../utils/async_foreach');
const relativeTime = require('../utils/time_relative');

module.exports = {

  
    async findByStatus(req, res, next) {
      try {
        const statuss = req.params.statuss;
        const conjunto = req.params.conjunto;
        let data = await Orders.findByStatus(statuss, conjunto);
        
        data.forEach(d => {
          d.timestamp = relativeTime(new Date().getTime(), d.timestamp);
        });
        
        return res.status(201).json(data);
      } catch (error) {
        console.log(`Error: ${error}`);
        return res.status(501).json({
          success: false,
          message: 'Error al obtener las ordenes por estado.',
        });
      }
    },

    
    async findByClientAndStatus(req, res, next) {
      try {
        const statuss = req.params.statuss;
        const conjunto = req.params.conjunto;
        const idClient = req.params.idClient;
        let data = await Orders.findByClientAndStatus(statuss, conjunto, idClient);
        
        data.forEach(d => {
          d.timestamp = relativeTime(new Date().getTime(), d.timestamp);
        });

        return res.status(201).json(data);
      } catch (error) {
        console.log(`Error: ${error}`);
        return res.status(501).json({
          success: false,
          message: 'Error al obtener las ordenes por estado.',
        });
      }
    },

    
    async createOrder(req, res, next) {
    let order = JSON.parse(req.body.order);

    const files = req.files;

    let inserts = 0;

    if (files.length === 0) {
      return res.status(501).json({
        message: 'Error al registrar el producto no tiene imagen',
        success: false,
      });
    } else {
      try {
        const data = await Orders.insert(order); // ALMACENANDO LA INFORMACION
        order.id = data.id;

        const start = async () => {
          await asyncForEach(files, async (file) => {
            const pathImage = `image_${Date.now()}`;
            const url = await storage(file, pathImage);

            if (url !== undefined && url !== null) {
              if (inserts == 0) {
                // IMAGEN 1
                order.image1 = url;
              } else if (inserts == 1) {
                // IMAGEN 2
                order.image2 = url;
              } else if (inserts == 2) {
                // IMAGEN 3
                order.image3 = url;
              }
            }

            await Orders.update(order);
            inserts = inserts + 1;

            if (inserts == files.length) {
              return res.status(201).json({
                success: true,
                message: 'El producto se ha registrado correctamente',
              });
            }
          });
        };

        start();
      } catch (error) {
        console.log(`Error: ${error}`);
        return res.status(501).json({
          message: `Error al registrar el producto ${error}`,
          success: false,
          error: error,
        });
      }
    }
  },

  async updateOrder(req, res, next) {
    try {
      let order = req.body;
      order.statuss = 'ENTREGADO';
      await Orders.updateOrder(order);

      return res.status(201).json({
        success: true,
        message: 'La orden se actualizo correctamente',
      });
    } catch (error) {
      console.log(`Error ${error}`);
      return res.status(501).json({
        success: false,
        message: 'Hubo un error creando la orden',
        error: error,
      });
    }
  },

}