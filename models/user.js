const mongoose = require('mongoose'),
      Schema = mongoose.Schema


//Define model
//mongoose will not reaconize two emails with the same characters but that have differant cases as the same thing thats why we convert it to lower case
const userSchema = new Schema({
  email : { type : String, unique : true, lowercase : true},
  name : String
})


// create the model calss
//says hey mongoose there is a new schema here it is about user
const ModelClass = mongoose.model('user', userSchema)


//export the model
module.exports = ModelClass
