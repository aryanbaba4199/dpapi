const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 4000; // You can change the port as needed
const cors = require('cors');

// Allow requests from your frontend (assuming it runs on port 3000)
app.use(cors({ origin: 'https://dream-planner.vercel.app' }));

app.use(bodyParser.json());
console.log("hi")

// Connect to MongoDB
mongoose.connect("mongodb+srv://aryanbaba4199:Aryan7277@cluster0.swtqxeq.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const bookingSchema = new mongoose.Schema({
  name: String,
  address: String,
  mobile: String,
  selectedServices: [String],
  functtionType : String,
  msg : String,
});
const Booking = mongoose.model('Booking', bookingSchema);

app.post('/api/bookings', async (req, res) => {
  try {
    const bookingData = req.body;
    console.log(bookingData);
    const newBooking = new Booking(bookingData);
    await newBooking.save();
    res.status(201).json({ message: 'Booking successful' });
    console.log('hello')
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Booking failed' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



