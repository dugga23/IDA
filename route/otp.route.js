// otp.route.js
const express = require("express");
const Router = express.Router();
const bodyParser = require('body-parser');
const otpcontroler= require('../controler/otp');
const app = express();

// Middleware to parse JSON requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// OTP generation API

Router.post('/otp', otpcontroler.genrateotp);
  Router.post('/verifyotp',otpcontroler.verifyotp);

module.exports = Router;
