const OderController = require('../controllers/orderController');
const passport = require('passport');

module.exports = (app, upload) => {
    app.post('/api/orders/create', upload.array('image', 3), OderController.createOrder);
    app.get('/api/orders/findByStatus/:statuss/:conjunto', passport.authenticate('jwt', {session: false}), OderController.findByStatus);
    app.get('/api/orders/findByClientAndStatus/:statuss/:conjunto/:idClient', passport.authenticate('jwt', {session: false}), OderController.findByClientAndStatus);
    app.post('/api/orders/updateOrder', passport.authenticate('jwt', {session: false}), OderController.updateOrder);
}