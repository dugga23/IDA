// const jwt = require('jsonwebtoken');

// const jwtmiddleware = () => (req, res, next) => {
//   const authorization = req.headers['authorization'];
//   if (!authorization) return res.status(401).json({ error: 'Token not found' });

//   const token = authorization.split(' ')[1];
//   if (!token) return res.status(401).json({ error: 'Unauthorized' });
  
//   try {
//       if (!process.env.secret_key) {
//           throw new Error('JWT secret key is not provided');
//       }
//       const decoded = jwt.verify(token, process.env.secret_key);
//       req.user = decoded;
//       next();
//   } catch (err) {
//       console.error(err);
//       res.status(401).json({ error: 'Invalid token' });
//   }
// }

// module.exports = jwtmiddleware;
