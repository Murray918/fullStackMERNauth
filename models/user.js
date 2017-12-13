const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      bcrypt = require('bcrypt-nodejs')

//Define model
//mongoose will not reaconize two emails with the same characters but that have differant cases as the same thing thats why we convert it to lower case
const userSchema = new Schema({
  email : { type : String, unique : true, lowercase : true},
  password : String
})

//Pre save hook encrypt password
//Before saving a model, run this function
userSchema.pre('save', (next) => {
  // get access to the user model
  const user = this

//generate a salt then run callback
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err) }

//hash our password using the salt
  bcrypt.hash(user.password, salt, null, (err, hash)=> {
    if (err) { return next(err) }

//set the password to the hash
    user.password = hash
    next()

    })
  })
})

userSchema.methods.comparePasswords = (candidatePassword, callback) => {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) { return callback(err) }

    callback(null, isMatch);
  })
}

// create the model calss
//says hey mongoose there is a new schema here it is about user
const ModelClass = mongoose.model('user', userSchema)

//export the model
module.exports = ModelClass
