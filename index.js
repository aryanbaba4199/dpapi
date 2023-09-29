const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 4000; // You can change the port as needed
const cors = require('cors');

// Allow requests from your frontend (assuming it runs on port 3000)
app.use(cors({ origin: 'https://www.dreamplanner.in'}));
// app.use(cors({origin : 'http://localhost:3000'}));
app.use(bodyParser.json());
console.log("hi")

// Connect to MongoDB
mongoose.connect("mongodb+srv://aryanbaba4199:Aryan7277@cluster0.swtqxeq.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const bookingSchema = new mongoose.Schema({
  name: String,
  email : String,
  address: String,
  mobile: String,
  selectedServices: [String],
  functtionType : String,
  msg : String,
  time : String,
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

// Displaying bookindg data
app.get('/api/getdata', async(req, res)=>{
  try{
    const incomingData = await Booking.find();
    
    res.status(200).json(incomingData);
  }catch(e){
    console.error("Error in retrieving data : ", e);
    res.status(500).json({message : "error in fetching"});
  }
});

// Displaying user data
app.get('/api/userdata/:userid', async (req, res) => {
  try {
    const userEmail = req.params.userid; // Retrieve user email from request parameters
    console.log(userEmail);
    const incomingData = await Booking.find({ email: userEmail });

    res.status(200).json(incomingData);
    console.log(incomingData);
  } catch (e) {
    console.error("Error in retrieving data : ", e);
    res.status(500).json({ message: "error in fetching" });
  }
});




// DELETE endpoint to delete data by ID
app.delete('/api/delete/:itemId', async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const deletedItem = await Booking.findByIdAndRemove(itemId);

    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
   
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting data:', error);
    res.status(500).json({ message: 'Error deleting data' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


