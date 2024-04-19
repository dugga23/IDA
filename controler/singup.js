const signup= require('../module/signup.module');
const bcrypt = require('bcrypt');
const validator = require('validator');
const { v4: uuidv4 } = require('uuid')
//signup api 
exports.signup= async (req, res) => {
    const { firstname, lastname, number, email, gender, username, password } = req.body;
    try {
      // Check if the username already exists
      const existingUser = await signup.findOne({ username });
  
      if (existingUser) {
        // User with the same username already exists
        return res.status(400).json({ message: 'Username already exists' });
      }
           // Validate first name and last name (should not contain numbers)
           if (!validator.isAlpha(firstname) || !validator.isAlpha(lastname)) {
            return res.status(400).json({ message: 'First name and last name should only contain alphabetic characters' });
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        // Validate number format (should contain 10 digits)
        if (!validator.isNumeric(number) || number.length !== 10) {
            return res.status(400).json({ message: 'Number should contain 10 digits' });
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
  }