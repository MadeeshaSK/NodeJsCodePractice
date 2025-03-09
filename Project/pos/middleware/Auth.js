const jwt = require('jsonwebtoken');
const User = require('../model/User');

const verifyToken = (requireRoles=[]) => {
    return async (req, res, next) => {
        try {
            const token = req.headers['authorization']?.split(' ')[1];
            if (!token) {
                return res.status(403).json({ message: 'Access Denied' });
            }
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            const user = User.findOne({username: decoded.username});
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            if(requireRoles.length && !requireRoles.includes(user.role)) {
                return res.status(403).json({ message: 'No access here' });
            }
            next();
        } catch (error) {
            if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({ message: 'Invalid token' });
            } else if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token expired' });
            }
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = verifyToken;