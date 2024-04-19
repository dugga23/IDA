// Import necessary modules
const express = require("express");
const Router = express.Router();
const bodyParser = require('body-parser');
const profilecontroler= require('../controler/profile');

//const jwtmiddleware= require('../jwt');

const app= express();


// Middleware to parse JSON requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(jwtmiddleware);
// Profile API
Router.get('/:username', profilecontroler.profile);  

// Export the profile router
module.exports = Router;
