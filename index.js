const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000; // or any other port you prefer

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/signup', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a user schema
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  phone: String,
  username: String,
  password: String,
  address: String,
});

const User = mongoose.model('User', userSchema);

// Middleware to parse JSON
app.use(bodyParser.json());

// Serve HTML file
app.get('/home', (req, res) => {
  res.sendFile(__dirname + '/home.html');
});
app.get('/aboutus', (req, res) => {
  res.sendFile(__dirname + '/aboutus.html');
});
app.get('/contactus', (req, res) => {
  res.sendFile(__dirname + '/contactus.html');
});
app.get('/signin', (req, res) => {
  res.sendFile(__dirname + '/signin.html');
});
app.get('/contactus', (req, res) => {
  res.sendFile(__dirname + '/contactus.html');
});
app.get('/angualr1', (req, res) => {
  res.sendFile(__dirname + '/angular1.html');
});
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/signup.html');
});

// Handle form submission


// Middleware to parse JSON
app.use(bodyParser.json());

// Serve HTML, CSS, and JS files
app.use(express.static('public'));

// Handle form submission
app.post('/signup', (req, res) => {
  const userData = req.body;

  // Create a new user document
  const newUser = new User(userData);

  // Save the user to the database
  newUser.save((err) => {
      if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
      } else {
          res.status(200).send('Sign-up successful!');
      }
  });
});

app.post('/signin', async (req, res) => {
  try {
    const signInData = req.body;
    const existingUser = await User.findOne({ username: signInData.username, password: signInData.password });
    
    if (existingUser) {
      res.status(200).send('Sign-in successful!');
    } else {
      res.status(401).send('Invalid credentials');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
