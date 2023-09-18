const jwt = require('jsonwebtoken');
const createError = require('http-errors');

const generateToken = (userInfo) => {
    return jwt.sign(userInfo, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE_TIME,
    });
};

const verifyToken = (bearerToken) => {
    if (bearerToken !== undefined && bearerToken.startsWith('Bearer ')) {
        const token = bearerToken.split(' ')[1];
        if (!token) {
            throw new createError.Unauthorized('No token provided');
        }

        return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                throw new createError.Unauthorized('Invalid token');
            }
            return decoded;
        });
    } else {
        throw new createError.Unauthorized('Invalid token');
    }
};

module.exports = { generateToken, verifyToken };
