const Authentication = require("./controllers/authentication"),
  passportService = require("./services/passport"),
  passport = require("passport");

const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignin = passport.authenticate('jwt', { session : false})

module.exports = app => {
  app.get('/', requireAuth, (req, res) => {
    res.send({ hi : 'there' })
  })
  app.post('/signin', requireSignin, Authentication.signin)
  app.post("/signup", Authentication.signup);
};
