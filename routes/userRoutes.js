const UserController = require('../controllers/userController');
const passport = require('passport')

module.exports = (app, upload) => {

    app.post('/api/user/create', UserController.create);

    app.post('/api/user/getDataResident',passport.authenticate('jwt', {session: false}),UserController.getDataResident);
    
    app.post('/api/user/login', UserController.login);

    app.put('/api/users/update',passport.authenticate('jwt', {session: false}), upload.array('image', 1), UserController.update);
    app.put('/api/users/updateWithOut',passport.authenticate('jwt', {session: false}), UserController.updateWithOutImage);

}

//Sirve para seguridad de los usuarios con su respectivo token
//passport.authenticate('jwt', {session: false})
