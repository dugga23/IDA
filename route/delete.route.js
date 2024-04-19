const express = require("express");
const Router = express.Router();
const bodyParser = require('body-parser');
const deleteprofilecontroler= require('../controler/deleteprofile');
const app= express();
// Middleware to parse JSON requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Delete API
Router.delete('/:userId',deleteprofilecontroler.deleteprofile);

module.exports = Router;
