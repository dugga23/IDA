// const express= require('express');
// const app= express();
// const bodyParser= require('body-parser');
// const Router=express.Router();
// //const jwtmiddleware= require('../jwt');

// let revokedTokens = [];

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use('/logout',Router);
// Router.post('/:userId',jwtmiddleware,async(req,res)=>{
// const token= req.headers.authorization;
// revokedTokens.push(token);
// res.json({message:'logged out successfully'});
// });

// module.exports=Router;


// // const express = require('express');
// // const Router = express.Router();
// // const jwt = require('jsonwebtoken');

// // // Logout route
// // Router.post('/logout', (req, res) => {
// //   const token = req.cookies['refreshToken'];

// //   if (!token) {
// //     return res.status(401).send('Unauthorized');
// //   }

// //   try {
// //     // Verify the token
// //     const decoded = jwt.verify(token, process.env.secret_key);

// //     // If the token is valid, expire it by setting the expiry to a past date
// //     const expireToken = jwt.sign({}, process.env.secret_key, {
// //       expiresIn: -1
// //     });

// //     // Set the expired token as a cookie
// //     res.cookie('refreshToken', expireToken, {
// //       httpOnly: true,
// //       secure: true,
// //       sameSite: 'strict',
// //       maxAge: 0
// //     });

// //     res.send('Logged out');
// //   } catch (error) {
// //     res.status(401).send('Unauthorized');
// //   }
// // });

// // module.exports = Router;
