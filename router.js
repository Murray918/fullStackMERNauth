const Authentication = require('./controllers/authentication'),
	passportService = require('./services/passport'),
	passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {
	app.get('/', requireAuth, function(req, res) {
		res.send({ message: 'Here is a secret code bingBang4567' });
	});
	app.post('/signin', requireSignin, Authentication.signin);
	app.post('/signup', Authentication.signup);
};
