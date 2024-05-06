const signup = require('../module/signup.module');
const bcrypt = require('bcrypt');
const jwtmodule = require('../module/jwt.module');

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        // Find the user in MongoDB
        const user = await signup.findOne({ username });

        // Check if the user exists
        if (!user) {
            console.log("User not found");
            return res.status(401).json({ message: 'User not found' });
        }

        // Check if the password is correct
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            console.log("Password does not match");
            return res.status(401).json({ error: 'Authentication failed' });
        }

        // Generate token
        const token = jwtmodule.generateToken({ 
            id: user._id,
            username: user.username,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            // Add other required fields from the signup data
        });

        // Return token along with user data and success message
        console.log("Login successful", token);
        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                firstname: user.firstname,
                lastname: user.lastname,
                // Add other required fields from the signup data
            }
        });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ error: 'Login failed' });
    }
};


exports.logout=async(req,res)=>{
   // const token= req.headers.authorization;
res.json({message:'logged out successfully'});
}