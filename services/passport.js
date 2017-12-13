const passport = require("passport"),
  User = require("../models/user"),
  config = require("../config"),
  JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;

//setup options for Jwt Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret

};

//Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  // see if user id and payload exists in our database
  //if it does call done() with that other
  // otherwise call done witout a user object
  User.findById(payload.sub, (err, user) => {
    if (err) {
      return done(err, false);
    }
    if (user) {
      done(null, user);
    } else {
      done(null, false)
    }

  });

});

passport.use(jwtLogin);
