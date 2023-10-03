const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');


// Connect to MongoDB
mongoose.connect("mongodb+srv://aryanbaba4199:Aryan7277@cluster0.swtqxeq.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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
