const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) =>{
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid token.' });
    }

};



const authorizeUser = (req, res, next) => {
    const userIdInToken = req.user.id;
    const userIdInParams = parseInt(req.params.userId, 10);

    if (userIdInToken !== userIdInParams) {
        return res.status(403).json({ message: 'Access denied. You cannot access another user\'s data.' });
    }
    next();
};

module.exports = { authenticateToken, authorizeUser };