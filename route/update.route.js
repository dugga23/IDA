const express = require("express");
const Router = express.Router();
const bodyParser = require('body-parser');
const updatecontroler= require('../controler/update');
 // Import your user model
const app = express();
// Middleware to parse JSON requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Update API
Router.put('/:userId', updatecontroler.updateprofile);

module.exports = Router;
