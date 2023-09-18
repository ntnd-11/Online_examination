const createError = require('http-errors');
const { compare, genSaltSync, hashSync } = require('bcryptjs');

const { role } = require('../constants/role.constant');
const { generateToken } = require('../utils/jwt.util');
const apiStatus = require('../constants/apiStatus.constant');
const Admin = require('../models').Admin;
const Teacher = require('../models').Teacher;
const Student = require('../models').Student;

const signin = async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        if (req.body.role === role.ADMIN) {
            const admin = await Admin.findOne({
                where: {
                    username: username,
                },
                raw: true,
            });
            if (!admin) {
                throw createError.Unauthorized('User does not exist');
            }

            const isCorrectPassword = await compare(password, admin.password);
            if (!isCorrectPassword) {
                throw createError.Unauthorized('Incorrect password');
            }

            const userInfo = {
                id: admin.id,
                role: role.ADMIN,
            };

            const token = generateToken(userInfo);
            return res.json({
                status: apiStatus.SUCCESS,
                message: 'Login successfully as admin',
                data: {
                    ...admin,
                    password: null,
                    token: token,
                    role: role.ADMIN,
                },
            });
        } else if (req.body.role === role.TEACHER) {
            const teacher = await Teacher.findOne({
                where: {
                    username: username,
                },
                raw: true,
            });
            if (!teacher) {
                throw createError.Unauthorized('User does not exist');
            }

            const isCorrectPassword = await compare(password, teacher.password);
            if (!isCorrectPassword) {
                throw createError.Unauthorized('Incorrect password');
            }

            const userInfo = {
                id: teacher.id,
                role: role.TEACHER,
            };

            const token = generateToken(userInfo);
            return res.json({
                status: apiStatus.SUCCESS,
                message: 'Login successfully as teacher',
                data: {
                    ...teacher,
                    password: null,
                    token: token,
                    role: role.TEACHER,
                },
            });
        } else if (req.body.role === role.STUDENT) {
            const student = await Student.findOne({
                where: {
                    username: username,
                },
                raw: true,
            });
            if (!student) {
                throw createError.Unauthorized('User does not exist');
            }

            const isCorrectPassword = await compare(password, student.password);
            if (!isCorrectPassword) {
                throw createError.Unauthorized('Incorrect password');
            }

            const userInfo = {
                id: student.id,
                role: role.STUDENT,
            };

            const token = generateToken(userInfo);
            return res.json({
                status: apiStatus.SUCCESS,
                message: 'Login successfully as student',
                data: {
                    ...student,
                    password: null,
                    token: token,
                    role: role.STUDENT,
                },
            });
        } else {
            throw createError.Unauthorized('Error occured when user sign in');
        }
    } catch (err) {
        return res.json({
            status: apiStatus.AUTH_ERROR,
            message: err.message,
        });
    }
};

const changePassword = async (req, res) => {
    try {
        if (req.userInfo.role === role.TEACHER) {
            const oldPassword = req.body.oldPassword;
            const newPassword = req.body.newPassword;

            const user = await Teacher.findOne({
                where: {
                    id: req.userInfo.id,
                },
            });

            const isCorrectPassword = await compare(oldPassword, user.password);

            if (!isCorrectPassword) {
                throw createError.Unauthorized('Nhập không đúng mật khẩu cũ');
            }

            const salt = genSaltSync(10);
            const hashedPassword = hashSync(newPassword, salt);

            await Teacher.update(
                {
                    password: hashedPassword,
                },
                {
                    where: {
                        id: req.userInfo.id,
                    },
                },
            );

            return res.json({
                status: apiStatus.SUCCESS,
                message: 'Change password successfully',
            });
        } else if (req.userInfo.role === role.STUDENT) {
            const oldPassword = req.body.oldPassword;
            const newPassword = req.body.newPassword;

            const user = await Student.findOne({
                where: {
                    id: req.userInfo.id,
                },
            });

            const isCorrectPassword = await compare(oldPassword, user.password);

            if (!isCorrectPassword) {
                throw createError.Unauthorized('Nhập không đúng mật khẩu cũ');
            }

            const salt = genSaltSync(10);
            const hashedPassword = hashSync(newPassword, salt);

            await Student.update(
                {
                    password: hashedPassword,
                },
                {
                    where: {
                        id: req.userInfo.id,
                    },
                },
            );

            return res.json({
                status: apiStatus.SUCCESS,
                message: 'Change password successfully',
            });
        } else if (req.userInfo.role === role.ADMIN) {
            const oldPassword = req.body.oldPassword;
            const newPassword = req.body.newPassword;

            const user = await Admin.findOne({
                where: {
                    id: req.userInfo.id,
                },
            });

            const isCorrectPassword = await compare(oldPassword, user.password);

            if (!isCorrectPassword) {
                throw createError.Unauthorized('Nhập không đúng mật khẩu cũ');
            }

            const salt = genSaltSync(10);
            const hashedPassword = hashSync(newPassword, salt);

            await Admin.update(
                {
                    password: hashedPassword,
                },
                {
                    where: {
                        id: req.userInfo.id,
                    },
                },
            );

            return res.json({
                status: apiStatus.SUCCESS,
                message: 'Change password successfully',
            });
        } else {
            throw createError.Unauthorized('Error occured when user change password');
        }
    } catch (err) {
        return res.json({
            status: apiStatus.AUTH_ERROR,
            message: err.message,
        });
    }
};

module.exports = { signin, changePassword };
