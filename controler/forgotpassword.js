const signup=require('../module/signup.module');
const bcrypt = require('bcrypt');

exports.forgotpassword= async(req,res)=>{
    const userId = req.params.userId;
    const newPassword = req.body.newPassword;
    const confirmPassword = req.body.confirmPassword;

    // Validate input
    if ( !newPassword || !confirmPassword) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    if (newPassword !== confirmPassword) {
        return res.status(400).json({ error: 'New password and confirm password do not match' });
    }

    // Fetch user from database
   // const collection = client.db(IDA).collection(signup);
    const user = await signup.findOne({ _id: userId });

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    // Validate old password
   

    // Hash new password and update in the database
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await signup.updateOne({ _id: userId }, { $set: { password: hashedPassword } });

    res.status(200).json({ message: 'Password updated successfully' });
}