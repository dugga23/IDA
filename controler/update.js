const signup = require ('../module/signup.module');

exports.updateprofile= async(req,res)=>{
    const { userId } = req.params; // Extract user ID from URL params
    const userDataToUpdate = req.body; // Extract updated user data from request body

    try {
        // Check if the user exists
        const existingUser = await signup.findById(userId);
        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update the user data
        Object.keys(userDataToUpdate).forEach(key => {
            if (userDataToUpdate[key] !== undefined) {
                existingUser[key] = userDataToUpdate[key];
            }
        });

        // Save the updated user data
        await existingUser.save();

        res.json({ message: 'User updated successfully', user: existingUser });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Error updating user', error: error });
    }
}