const createError = require('http-errors');

const { role } = require('../constants/role.constant');
const { verifyToken } = require('../utils/jwt.util');

const isAdmin = (req, res, next) => {
    try {
        const bearerToken = req.headers.authorization;
        const userInfo = verifyToken(bearerToken);
        if (userInfo.role === role.ADMIN) {
            req.userInfo = userInfo;
            next();
        } else {
            throw new createError.Unauthorized('User is not allowed');
        }
    } catch (err) {
        res.json({
            message: err.message,
        });
    }
};

const isTeacher = (req, res, next) => {
    try {
        const bearerToken = req.headers.authorization;
        const userInfo = verifyToken(bearerToken);
        if (userInfo.role === role.TEACHER) {
            req.userInfo = userInfo;
            next();
        } else {
            throw new createError.Unauthorized('User is not allowed');
        }
    } catch (err) {
        res.json({
            message: err.message,
        });
    }
};

const isAdminOrTeacher = (req, res, next) => {
    try {
        const bearerToken = req.headers.authorization;
        const userInfo = verifyToken(bearerToken);
        if (userInfo.role === role.ADMIN || userInfo.role === role.TEACHER) {
            req.userInfo = userInfo;
            next();
        } else {
            throw new createError.Unauthorized('User is not allowed');
        }
    } catch (err) {
        res.json({
            message: err.message,
        });
    }
};

const isStudent = (req, res, next) => {
    try {
        const bearerToken = req.headers.authorization;
        const userInfo = verifyToken(bearerToken);
        if (userInfo.role === role.STUDENT) {
            req.userInfo = userInfo;
            next();
        } else {
            throw new createError.Unauthorized('User is not allowed');
        }
    } catch (err) {
        res.json({
            message: err.message,
        });
    }
};

const isAuthenticated = (req, res, next) => {
    try {
        const bearerToken = req.headers.authorization;
        const userInfo = verifyToken(bearerToken);
        req.userInfo = userInfo;
        next();
    } catch (err) {
        res.json({
            message: err.message,
        });
    }
};

const isAccessTeacher = async (req, res, next) => {
    try {
        const bearerToken = req.headers.authorization;
        const userInfo = verifyToken(bearerToken);
        if (userInfo.role === role.ADMIN) {
            req.userInfo = userInfo;
            next();
        } else if (userInfo.role === role.TEACHER) {
            req.userInfo = userInfo;
            next();
        } else {
            throw new createError.Unauthorized('User is not allowed');
        }
    } catch (err) {
        res.json({
            message: err.message,
        });
    }
};

const isAccessStudent = async (req, res, next) => {
    try {
        const bearerToken = req.headers.authorization;
        const userInfo = verifyToken(bearerToken);
        if (userInfo.role === role.ADMIN || userInfo.role === role.TEACHER) {
            req.userInfo = userInfo;
            next();
        } else if (userInfo.role === role.STUDENT) {
            req.userInfo = userInfo;
            next();
        } else {
            throw new createError.Unauthorized('User is not allowed');
        }
    } catch (err) {
        res.json({
            message: err.message,
        });
    }
};

module.exports = {
    isAdmin,
    isTeacher,
    isAdminOrTeacher,
    isStudent,
    isAccessTeacher,
    isAccessStudent,
    isAuthenticated,
};
