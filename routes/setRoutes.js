const SetsController = require('../controllers/setsController');
const passport = require('passport');

module.exports = (app) => {

    app.get('/api/sets/getSetsData/:conjunto', passport.authenticate('jwt', {session: false}), SetsController.getDataSets );

    app.post('/api/sets/createSet', passport.authenticate('jwt', {session: false}), SetsController.createSet );

    app.post('/api/sets/createUserHasSet', passport.authenticate('jwt', {session: false}), SetsController.createUserHasSet );
}