const express = require("express");
const Router = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const signupModel = require("../module/signup.module");
//const jwt = require('jsonwebtoken');
//const env= require('dotenv').config();
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

Router.post('/', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user in MongoDB
        const user = await signupModel.findOne({ username });

        // Check if the user exists
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        // Check if the password is correct
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Authentication failed' });
        }

        // Generate JWT token
        //const token = jwt.sign({ username: user.username }, process.env.secret_key);

        // Return token along with the success message
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
});

module.exports = Router;
