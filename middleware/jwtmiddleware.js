const jwt = require('jsonwebtoken');
const dotenv= require('dotenv');
const  jwtmodule=require('../module/jwt.module');
dotenv.config();

 const secretkey=process.env.secret_key;

module.exports = (req, res, next) => {
    // Get token from headers
    const token = req.headers.authorization;


    // Check if token exists
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    console.log(token);
    // Verify token
    const userId=jwtmodule.verifyToken(token);
    if(userId)  {
        next();
        return res.status(200).json({ message: userId });

    }
    else{
        return res.status(404).json({ message: 'error' });

}
};