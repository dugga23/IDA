const express = require("express");
const Router = express.Router();
const signup = require("../module/signup.module");
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const app = express();
const validator = require('validator');
const { v4: uuidv4 } = require('uuid');

// Middleware to parse JSON requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//signup api

app.use('/signup', Router);
Router.post('/', async (req, res) => {
  const { firstname, lastname, number, email, gender, username, password } = req.body;
  try {
    // Check if the username already exists
    const existingUser = await signup.findOne({ username });

    if (existingUser) {
      // User with the same username already exists
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Your existing validation code...

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = uuidv4();
    // Add the new user to the in-memory store
    const newUser = new signup({
      _id: userId,
      firstname,
      lastname,
      number,
      email,
      gender,
      username,
      password: hashedPassword,
    });

    const result = await newUser.save();
    res.json({ message: 'signup successful' });

  } catch (err) {
    console.error('Error saving user to database:', err);
    res.status(500).json({ message: 'Error saving user to database', error: err });
  }
});

// Set up a unique index on the username field
signup.collection.createIndex({ username: 1 }, { unique: true });

module.exports = Router;
