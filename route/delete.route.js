const express = require("express");
const Router = express.Router();
const bodyParser = require('body-parser');
const signup = require('../module/signup.module'); // Import your user model
const app= express();
// Middleware to parse JSON requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Delete API
Router.delete('/:userId', async (req, res) => {
    const { userId } = req.params; // Extract user ID from URL params

    try {
        // Check if the user exists
        const existingUser = await signup.findById(userId);
        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Delete the user from the database
        await signup.findByIdAndDelete(userId);

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Error deleting user', error: error });
    }
});

module.exports = Router;
