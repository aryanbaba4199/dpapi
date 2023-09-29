const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

// Define the User schema
const userSchema = new Schema({
  username: String,
  useremail: String,
  userpassword: String,
});

// Add Passport-Local Mongoose plugin to handle username and password
userSchema.plugin(passportLocalMongoose);

// Create a model using the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
