const UserController = require('../controllers/userController');
const passport = require('passport')

module.exports = (app, upload) => {

    app.post('/api/user/create', UserController.create);
    
    app.post('/api/user/login', UserController.login);

    app.put('/api/users/update',passport.authenticate('jwt', {session: false}), upload.array('image', 1), UserController.update);
    app.put('/api/users/updateWithOut',passport.authenticate('jwt', {session: false}), UserController.updateWithOutImage);

}