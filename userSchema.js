const mongoose = require('mongoose');

// Define a MongoDB schema for bookings
const bookingSchema = new mongoose.Schema({
  name: String,
  address: String,
  mobile: String,
  selectedServices: [String],
  functionType : String,
  Detail : String,
  time : String,
});

// Create a model using the schema
const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
