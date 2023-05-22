const UserController = require('../controllers/userController');
const passport = require('passport')

module.exports = (app, upload) => {

    app.post('/api/user/create', UserController.create);

    app.post('/api/user/getDataResident',passport.authenticate('jwt', {session: false}),UserController.getDataResident);//es tipo get
    
    app.post('/api/user/login', UserController.login);

    app.post('/api/user/createSecurity', passport.authenticate('jwt', {session: false}), UserController.createSecurity);

    app.post('/api/user/createResident', passport.authenticate('jwt', {session: false}), UserController.createOwner);

    app.put('/api/users/update',passport.authenticate('jwt', {session: false}), upload.array('image', 1), UserController.update);

    app.put('/api/users/updateWithOut',UserController.updateWithOutImage);

    app.put('/api/users/updateResident',passport.authenticate('jwt', {session: false}),UserController.updateResident);

    app.get('/api/users/getDataUser/:nameRol/:nameResidential',passport.authenticate('jwt', {session: false}), UserController.getDataUser);

}

//Sirve para seguridad de los usuarios con su respectivo token
//passport.authenticate('jwt', {session: false})
