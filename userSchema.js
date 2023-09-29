const mongoose = require('mongoose');
const schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');


const userSchema = new Schema({
  username: String,
  useremail: String, // Add useremail field
  userpassword: String, // Add userpassword field
  // Add other user properties as needed
});

// Add Passport-Local Mongoose plugin to handle username/password
userSchema.plugin(passportLocalMongoose);

const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email : {
    type: String,
    required: true
  },
  address: String,
  mobile: {
    type: String,
    required: true
  },
  selectedServices: [String],
  functionType : String,
  Detail : String,
  time : String,
});



module.exports = Booking;
