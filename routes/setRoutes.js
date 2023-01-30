const SetsController = require('../controllers/setsController');
const passport = require('passport');

module.exports = (app) => {

    app.get('/api/sets/getSetsData', passport.authenticate('jwt', {session: false}), SetsController.getDataSets )

}