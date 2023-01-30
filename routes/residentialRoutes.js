const ResidentialController = require('../controllers/residentialController');

module.exports = (app) =>{

    app.post('/api/residential/create', ResidentialController.register);

    app.post('/api/residential/saveResidentialUser', ResidentialController.dataResidentialUser);

}