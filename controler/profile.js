const signup= require('../module/signup.module');

exports.profile=  async (req, res) => {
    try {
      const { username } = req.params;
  
      // Find user by username in the database
      const user = await signup.findOne({ username });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Exclude sensitive information like password from the response
      const userProfile = {
        firstname: user.firstname,
        lastname: user.lastname,
        number: user.number,
        email: user.email,
        gender: user.gender,
        username: user.username,
        bio:user.bio
      };
  
      res.json(userProfile);
    } catch (err) {
      console.error('Error retrieving user profile:', err);
      res.status(500).json({ message: 'Error retrieving user profile', error: err });
    }
}