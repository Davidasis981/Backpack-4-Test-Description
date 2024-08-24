const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    
    const token = req.header('Authorization');
    if (!token) {
        return res.status(403).json({ message: 'Token required' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
        // The HTTP 401 Unauthorized client error response status code indicates that a request
        // was not successful because it lacks valid authentication credentials for the requested resource.
    }
};

const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access denied' });
        }
        next();
    };
};

module.exports = { authenticateJWT, authorizeRoles };
