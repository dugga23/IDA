// Import necessary modules
const express = require("express");
const Router = express.Router();
const bodyParser = require('body-parser');
const signup = require("../module/signup.module"); // Import your signup module
//const jwtmiddleware= require('../jwt');

const app= express();


// Middleware to parse JSON requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(jwtmiddleware);
// Profile API
Router.get('/:username',  async (req, res) => {
  try {
    const { username } = req.params;

    // Find user by username in the database
    const user = await signup.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Exclude sensitive information like password from the response
    const userProfile = {
      firstname: user.firstname,
      lastname: user.lastname,
      number: user.number,
      email: user.email,
      gender: user.gender,
      username: user.username,
      bio:user.bio
    };

    res.json(userProfile);
  } catch (err) {
    console.error('Error retrieving user profile:', err);
    res.status(500).json({ message: 'Error retrieving user profile', error: err });
  }
});

// Export the profile router
module.exports = Router;
