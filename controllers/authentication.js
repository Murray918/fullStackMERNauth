const User = require("../models/user"),
      jwt = require('jwt-simple'),
      config = require('../config')


function tokenForUser(user) {
  const timestamp = new Date().getTime()
  return jwt.encode({ sub : user.id, iat: timestamp }, config.secret)
}


exports.signup = function(req, res, next) {
  const email = req.body.email,
        password = req.body.password;

  if (!email || !password) {
    return res.status(422).send( { error : "You must provide an email and password!" } )
  }

  //  see if a user with the given email exists
  User.findOne({ email: email }, (err, existingUser) => {
    if (err) {
      return next(err);
    }

    //If a the email is used return error
    if (existingUser) {
      return res.status(422).send({ error: "Email has been used" });
    }

    //If the email is does not exist create and save user record
    const user = new User({
      email: email,
      password: password
    });

    user.save(err => {
      if (err) {
        return next(err);
      }
        //  Respond to the request whether or not the user was created
      res.json({ token : tokenForUser(user) });

    });
  });
};
