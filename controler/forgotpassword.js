const signup = require('../module/signup.module');
const bcrypt = require('bcrypt');
const otpController = require('../controllers/otpController'); // Import the OTP controller

exports.forgotpassword = async (req, res) => {
    const userId = req.params.userId;
    const newPassword = req.body.newPassword;
    const confirmPassword = req.body.confirmPassword;
    const email = req.body.email; // Assuming you're passing email in the request body

    // Validate input
    if (!newPassword || !confirmPassword) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    if (newPassword !== confirmPassword) {
        return res.status(400).json({ error: 'New password and confirm password do not match' });
    }

    try {
        // Fetch user from database
        const user = await signup.findOne({ _id: userId });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Generate OTP and send to user's email
        await otpController.genrateotp({ body: { email } }, res); // Call OTP generation function

        // Hash new password and update in the database
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await signup.updateOne({ _id: userId }, { $set: { password: hashedPassword } });

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
