const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 4000; // You can change the port as needed
const cors = require('cors');
const User = require('./User');
const passport = require('passport');
const {psinit} = require('./passport');
const expressSession = require('express-session');
const bcrypt = require('bcrypt');
var crypto = require('crypto');
const { constrainedMemory } = require('process');


// Allow requests from your frontend (assuming it runs on port 3000)
app.use(cors({ origin: 'https://www.dreamplanner.in'}));
// app.use(cors({origin : 'http://localhost:3000'}));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended : true }));

psinit(passport);
app.use(expressSession({secret : 'secret', resave : true, saveUninitialized : false}));
app.use(passport.initialize());
app.use(passport.session());



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
  status : String,
  payment : String,
});
const Booking = mongoose.model('Booking', bookingSchema);






app.post("/api/signup", async (req, res) => {
  try {
    const user = await User.findOne({ useremail: req.body.useremail });
    

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = await User.create(req.body);
    const saltRounds = 10; // Number of salt rounds
const hashedPassword = await bcrypt.hash(user.password, saltRounds);
user.userpassword = hashedPassword;

await user.save();
    res.status(201).json(newUser);
    console.log("User created", newUser);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "User creation failed" });
  }
});


// Log in 




app.post('/api/signin', (req, res, next) => {
  console.log(req.body.userpassword, req.body.useremail);
  passport.authenticate('local', 
   (err, user, info) => {
    if (err) {
      console.error('Error during authentication:', err);
      return res.status(500).json({ message: 'Internal server error during authentication' });
    }
    if (!user) {
      console.error('Authentication failed:', info.message);
      return res.status(401).json({ message: 'Authentication failed' });
    }

    req.login(user, (loginErr) => {
      if (loginErr) {
        console.error('Error during login:', loginErr);
        return res.status(500).json({ message: 'Internal server error during login' });
      }
      console.log('User logged in', user);
      return res.status(200).json({message : 'Authentication successful', username : user.username}) 
    });
  })(req, res, next);
});




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
    console.log(incomingData);
    
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


