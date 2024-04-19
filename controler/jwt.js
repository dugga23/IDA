//const jwtmiddleware= require('../middleware/jwtmiddleware');

// Controller function to generate JWT token
exports.generateJWT = (req, res) => {
    const { userId } = req.body;
    const token = jwtModel.generateToken(userId);
    res.send({ token });
};

// Controller function to verify JWT token
exports.verifyJWT = (req, res) => {
    const { token } = req.body;
    const userId = jwt.verifyToken(token);
    if (userId) {
        res.send({ userId });
    } else {
        res.status(401).send({ message: 'Unauthorized' });
    }
};