// otp.route.js
const express = require("express");
const Router = express.Router();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const otp = require('../module/otp.module'); // Import the otp module at the beginning
const signup = require("../module/signup.module");
const app = express();

// Middleware to parse JSON requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// OTP generation API
app.use('/otp', Router);
Router.post('/', async (req, res) => {
  const { email, number } = req.body;

  if (!email && !number) {
    return res.status(400).json({ message: 'Email or mobile number is required' });
  }
  const user = await signup.findOne({ email });
  if (!user) {
    return res.status(404).json({ error: 'please enter vaild email address' });
}
  
  const generatedOTP = generateNumericOTP(6);



  // Save the generated OTP to the database or in-memory store (assuming you have a database or store logic)
  try {
    const newOtp = new otp({
      email,
      number,
      otp: generatedOTP,
    });

    await newOtp.save();
    res.json({ message: 'OTP generated and saved to the database' });

    // Send OTP to the provided email or mobile number
    if (email) {
      sendOTPEmail(email, generatedOTP);
    } else {
      // Logic to send OTP to mobile number
    }

    // Log the result
  } catch (err) {
    console.error('Error saving OTP to the database:', err);
    res.status(500).json({ message: 'Error saving OTP to the database', error: err });
  }
});

function generateNumericOTP(length) {
  const digits = '0123456789';
  let otp = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * digits.length);
    otp += digits[randomIndex];
  }

  return otp;
}

function sendOTPEmail(email, otp) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'as9926261097@gmail.com', // Your email
      pass: 'ujzh vomm qemq hqkd', // Your email password
    },
  });

  const mailOptions = {
    from: 'as9926261097@gmail.com', // Your email
    to: email,
    subject: 'OTP for Verification',
    text: `Your OTP for verification is: ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending OTP email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

module.exports = Router;
