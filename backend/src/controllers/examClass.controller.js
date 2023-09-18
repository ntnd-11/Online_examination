const createError = require('http-errors');
const apiStatus = require('../constants/apiStatus.constant');
const { DEFAULT_PAGE, DEFAULT_PER_PAGE } = require('../constants/pagination.constant');
const { MONTH_IN_MS } = require('../constants/time.constant');
const { role } = require('../constants/role.constant');

const ExamClass = require('../models').ExamClass;
const Teacher = require('../models').Teacher;
const Student = require('../models').Student;
const Course = require('../models').Course;
const Exam = require('../models').Exam;
const StudentExamClass = require('../models').StudentExamClass;
const Result = require('../models').Result;

const getAll = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || DEFAULT_PAGE;
        const perPage = parseInt(req.query.perPage) || DEFAULT_PER_PAGE;

        let examClasses = [];
        let count = 0;

        if (req.userInfo.role === role.ADMIN) {
            examClasses = await ExamClass.findAll({
                where: {
                    isDeleted: false,
                },
                offset: (page - 1) * perPage,
                limit: perPage,
                include: [{ model: Teacher }, { model: Course }],
            });

            count = await ExamClass.count({
                where: {
                    isDeleted: false,
                },
            });
        } else if (req.userInfo.role === role.TEACHER) {
            examClasses = await ExamClass.findAll({
                where: {
                    isDeleted: false,
                    teacherId: req.userInfo.id,
                },
                offset: (page - 1) * perPage,
                limit: perPage,
                include: [{ model: Teacher }, { model: Course }],
            });

            count = await ExamClass.count({
                where: {
                    isDeleted: false,
                    teacherId: req.userInfo.id,
                },
            });
        } else if (req.userInfo.role === role.STUDENT) {
            const studentExamClasses = StudentExamClass.findAll({
                where: {
                    studentId: req.userInfo.id,
                },
                offset: (page - 1) * perPage,
                limit: perPage,
                include: { all: true, nested: true },
            });

            examClasses = studentExamClasses.ExamClasses;

            count = await StudentExamClass.count({
                where: {
                    studentId: req.userInfo.id,
                },
            });
        }

        if (!examClasses) {
            throw createError.InternalServerError('Can not fetch all exam classes');
        }

        return res.json({
            status: apiStatus.SUCCESS,
            message: 'Fetch all exam classes successfully',
            data: {
                examClasses,
                count,
            },
        });
    } catch (err) {
        return res.json({
            status: apiStatus.OTHER_ERROR,
            message: err.message,
        });
    }
};

const getAllWithoutPagination = async (req, res, next) => {
    try {
        let examClasses = [];

        if (req.userInfo.role === role.ADMIN) {
            examClasses = await ExamClass.findAll({
                where: {
                    isDeleted: false,
                },
                include: { all: true, nested: true },
            });
        } else if (req.userInfo.role === role.TEACHER) {
            examClasses = await ExamClass.findAll({
                where: {
                    teacherId: req.userInfo.id,
                },
                // include: { all: true, nested: true },
                include: [{ model: Course }, { model: Teacher }],
            });
        } else if (req.userInfo.role === role.STUDENT) {
            const studentExamClasses = await StudentExamClass.findAll({
                where: {
                    studentId: req.userInfo.id,
                },
                include: { all: true, nested: true },
            });

            examClasses = studentExamClasses.ExamClasses;
        }

        if (!examClasses) {
            throw createError.InternalServerError('Can not fetch all exam classes');
        }

        return res.json({
            status: apiStatus.SUCCESS,
            message: 'Fetch all exam classes successfully',
            data: examClasses,
        });
    } catch (err) {
        return res.json({
            status: apiStatus.OTHER_ERROR,
            message: err.message,
        });
    }
};

const getById = async (req, res, next) => {
    try {
        const id = req.params.id;

        const examClass = await ExamClass.findOne({
            where: {
                id: id,
                isDeleted: false,
            },
            include: [{ model: Course }, { model: Student }, { model: Exam }],
        });

        if (!examClass) {
            throw createError.NotFound(`Cannot find exam class with id ${id}`);
        }

        return res.json({
            status: apiStatus.SUCCESS,
            message: 'Find exam class successfully',
            data: examClass,
        });
    } catch (err) {
        return res.json({
            status: apiStatus.OTHER_ERROR,
            message: err.message,
        });
    }
};

const create = async (req, res, next) => {
    try {
        const newExamClass = await ExamClass.create(req.body);
        if (!newExamClass) {
            throw createError.BadRequest('Failed to create new exam class');
        }
        return res.json({
            status: apiStatus.SUCCESS,
            message: 'Create new exam class successfully',
            data: newExamClass,
        });
    } catch (err) {
        return res.json({
            status: apiStatus.OTHER_ERROR,
            message: err.message,
        });
    }
};

const updateById = async (req, res, next) => {
    try {
        const examClass = await ExamClass.findOne({
            where: {
                id: req.params.id,
                isDeleted: false,
            },
        });

        if (!examClass) {
            throw createError.NotFound(`Failed to find exam class with id ${req.params.id}`);
        }

        examClass.update({
            code: req.body?.code,
            name: req.body?.name,
            courseId: req.body?.courseId,
            teacherId: req.body?.teacherId,
            startTime: req.body?.startTime,
            endTime: req.body?.endTime,
            description: req.body?.description,
        });

        await examClass.save();
        return res.json({
            status: apiStatus.SUCCESS,
            message: 'Update exam class successfully',
            data: examClass,
        });
    } catch (err) {
        return res.json({
            status: apiStatus.OTHER_ERROR,
            message: err.message,
        });
    }
};

const removeById = async (req, res, next) => {
    try {
        const examClass = await ExamClass.findOne({
            where: {
                id: req.params.id,
                isDeleted: false,
            },
        });

        if (!examClass) {
            throw createError.NotFound(`Failed to find exam class with id ${req.params.id}`);
        }

        await ExamClass.destroy({
            where: {
                id: req.params.id,
            },
        });

        return res.json({
            status: apiStatus.SUCCESS,
            message: 'Delete exam class successfully',
        });
    } catch (err) {
        return res.json({
            status: apiStatus.OTHER_ERROR,
            message: err.message,
        });
    }
};

const getUpcomingExamClass = async (req, res, next) => {
    try {
        const examClasses = await ExamClass.findAll({
            where: {
                isDeleted: false,
            },
            // include: { all: true, nested: true },
        });

        const currentTime = new Date().getTime();
        let currentUpcomingTime = Number.MAX_SAFE_INTEGER;
        let upcomingExamClass = null;

        for (const examClass of examClasses) {
            const startTime = new Date(examClass.startTime).getTime();
            const endTime = new Date(examClass.endTime).getTime();
            if (currentTime < endTime && startTime - currentTime < currentUpcomingTime) {
                currentUpcomingTime = startTime - currentTime;
                upcomingExamClass = examClass;
            }
        }

        return res.json({
            status: apiStatus.SUCCESS,
            message: 'Get upcoming exam class successfully',
            data: upcomingExamClass,
        });
    } catch (err) {
        return res.json({
            status: apiStatus.OTHER_ERROR,
            message: err.message,
        });
    }
};

const getRecentlyFinished = async (req, res, next) => {
    try {
        const results = [];
        const examClasses = await ExamClass.findAll({
            where: {
                isDeleted: false,
            },
        });

        const currentTime = new Date().getTime();
        for (const examClass of examClasses) {
            const endTime = new Date(examClass.endTime).getTime();
            if (endTime < currentTime && currentTime - endTime < MONTH_IN_MS) {
                results.push(examClass);
            }
        }

        return res.json({
            status: apiStatus.SUCCESS,
            message: 'Get recently finish exam class successfully',
            data: results,
        });
    } catch (err) {
        return res.json({
            status: apiStatus.OTHER_ERROR,
            message: err.message,
        });
    }
};

const getClassResults = async (req, res, next) => {
    try {
        const examClassId = req.params.id;
        const studentExamClasses = await StudentExamClass.findAll({
            where: {
                examClassId: examClassId,
            },
        });

        const examClassExamId = [];
        for (const studentExamClass of studentExamClasses) {
            examClassExamId.push(studentExamClass.examId);
        }

        const results = await Result.findAll({
            where: {
                examId: examClassExamId,
            },
            include: [{ model: Student }, { model: Exam }],
        });

        return res.json({
            status: apiStatus.SUCCESS,
            message: 'Get class result successfully',
            data: results,
        });
    } catch (err) {
        return res.json({
            status: apiStatus.OTHER_ERROR,
            message: err.message,
        });
    }
};

module.exports = {
    getAll,
    getAllWithoutPagination,
    getById,
    create,
    updateById,
    removeById,
    getUpcomingExamClass,
    getRecentlyFinished,
    getClassResults,
};
