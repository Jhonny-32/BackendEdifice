const UserController = require('../controllers/userController');

module.exports = (app) => {

    app.post('/api/user/create', UserController.create) 
    
    app.post('/api/user/login', UserController.login)

}