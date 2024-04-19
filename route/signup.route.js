const express = require("express");
const Router = express.Router();
const signup = require("../module/signup.module");
const bodyParser = require('body-parser');
const signgupcontroler= require('../controler/singup');
//const bcrypt = require('bcrypt');
const app = express();
//const validator = require('validator');
//const { v4: uuidv4 } = require('uuid');

// Middleware to parse JSON requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//signup api

app.use('/signup', Router);
Router.post('/',signgupcontroler.signup);


// Set up a unique index on the username field
signup.collection.createIndex({ username: 1 }, { unique: true });

module.exports = Router;
