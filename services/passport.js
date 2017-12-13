const passport = require("passport"),
  User = require("../models/user"),
  config = require("../config"),
  JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt,
  LocalStrategy = require('passport-local')


//create local Strategy
const localOptions = { userNameFeild : 'email' }

const localLogin = new LocalStrategy(localOptions, (email, password, done) => {

//verify this username and password and call done with user if it is the correct username and password otherwise we will call false

  User.findOne({ email : email }, (err, user) => {
    if (err) { return done(err) }
    if (!user) { return done(null, false) }

    //compare password - is 'password' === to user.password?
    // remember that we hased the password
    
  })
})

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
