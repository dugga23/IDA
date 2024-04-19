const signup = require('../module/signup.module'); 

exports.deleteprofile= async(req,res)=>{
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
}