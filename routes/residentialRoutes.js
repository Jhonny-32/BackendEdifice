const ResidentialController = require('../controllers/residentialController');

module.exports = (app) =>{

    app.post('/api/residential/create', ResidentialController.register);

}