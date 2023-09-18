const createError = require('http-errors');
const xlsx = require('xlsx');
const apiStatus = require('../constants/apiStatus.constant');
const { DEFAULT_PAGE, DEFAULT_PER_PAGE } = require('../constants/pagination.constant');
const { sendCreateAccountEmail } = require('../utils/mail.util');
const path = require('path');

const Teacher = require('../models').Teacher;
const Student = require('../models').Student;
const StudentExamClass = require('../models').StudentExamClass;
const ExamClass = require('../models').ExamClass;
const Department = require('../models').Department;
const Course = require('../models').Course;

const getAll = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || DEFAULT_PAGE;
        const perPage = parseInt(req.query.perPage) || DEFAULT_PER_PAGE;
        const teachers = await Teacher.findAll({
            where: {
                isDeleted: false,
            },
            offset: (page - 1) * perPage,
            limit: perPage,
            attributes: { exclude: ['password'] },
        });

        const count = await Teacher.count({
            where: {
                isDeleted: false,
            },
        });

        if (!teachers) {
            throw createError.InternalServerError('Cannot fetch all teachers');
        }

        return res.json({
            status: apiStatus.SUCCESS,
            message: 'Fetch all teachers successfully',
            data: {
                teachers,
                count,
            },
        });
    } catch (err) {
        return res.json({
            status: apiStatus.OTHER_ERROR,
            message: 'Get all teachers fail',
        });
    }
};

const getAtMost2RecentAdded = async (req, res) => {
    try {
        const teachers = await Teacher.findAll({
            where: {
                isDeleted: false,
            },
            order: [['createdAt', 'DESC']],
            limit: 2,
            raw: true,
        });

        if (!teachers) {
            throw createError.InternalServerError('Cannot fetch 2 recently added teachers');
        }

        return res.json({
            status: apiStatus.SUCCESS,
            message: 'Fetch 2 recently added teachers successfully',
            data: teachers,
        });
    } catch (err) {
        return res.json({
            status: apiStatus.OTHER_ERROR,
            message: 'Get recent added teachers fail',
        });
    }
};

const getById = async (req, res) => {
    try {
        const id = req.params.id;

        const teacher = await Teacher.findOne({
            where: {
                id: id,
                isDeleted: false,
            },
        });

        if (!teacher) {
            throw createError.NotFound(`Cannot find teacher with id ${id}`);
        }

        return res.json({
            status: apiStatus.SUCCESS,
            message: 'Find teacher successfully',
            data: teacher,
        });
    } catch (err) {
        return res.json({
            status: apiStatus.OTHER_ERROR,
            message: 'Get teacher by id fail',
        });
    }
};
const create = async (req, res) => {
    try {
        const newTeacher = await Teacher.create(req.body);
        if (!newTeacher) {
            throw createError.BadRequest('Failed to create new teacher');
        }

        sendCreateAccountEmail(req.body.email, req.body.fullname, req.body.username, req.body.password, 'Giảng viên');

        return res.json({
            status: apiStatus.SUCCESS,
            message: 'Create new teacher successfully',
            data: newTeacher,
        });
    } catch (err) {
        return res.json({
            status: apiStatus.OTHER_ERROR,
            message: 'Create new teacher fail!',
        });
    }
};
const updateById = async (req, res) => {
    try {
        const teacher = await Teacher.findOne({
            where: {
                id: req.params.id,
                isDeleted: false,
            },
        });

        if (!teacher) {
            throw createError.NotFound(`Failed to find teacher with id ${req.params.id}`);
        }

        teacher.update({
            username: req.body?.username,
            password: req.body?.password,
            fullname: req.body?.fullname,
            email: req.body?.email,
            phoneNumber: req.body?.phoneNumber,
            citizenIdentification: req.body?.citizenIdentification,
            dateOfBirth: req.body?.dateOfBirth,
            ethnic: req.body?.ethnic,
            gender: req.body?.gender,
        });

        await teacher.save();
        return res.json({
            status: apiStatus.SUCCESS,
            message: 'Update teacher successfully',
            data: teacher,
        });
    } catch (err) {
        return res.json({
            status: apiStatus.OTHER_ERROR,
            message: 'Get teacher by id fail',
        });
    }
};
const removeById = async (req, res) => {
    try {
        const teacher = await Teacher.findOne({
            where: {
                id: req.params.id,
                isDeleted: false,
            },
        });

        if (!teacher) {
            throw createError.NotFound(`Failed to find teacher with id ${req.params.id}`);
        }

        await Teacher.destroy({
            where: {
                id: req.params.id,
            },
        });

        return res.json({
            status: apiStatus.SUCCESS,
            message: 'Delete teacher successfully',
        });
    } catch (err) {
        return res.json({
            status: apiStatus.OTHER_ERROR,
            message: err.message,
        });
    }
};
const importFile = async (req, res) => {
    try {
        const path = req.file.path;
        const workbook = xlsx.readFile(path);
        const sheetNameList = workbook.SheetNames;
        const jsonData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetNameList[0]]);
        const teachers = await Teacher.bulkCreate(jsonData);

        if (!teachers) {
            throw createError.InternalServerError('Failed to import teachers from file');
        }

        for (const teacher of jsonData) {
            sendCreateAccountEmail(teacher.email, teacher.fullname, teacher.username, teacher.password, 'Giảng viên');
        }

        return res.json({
            status: apiStatus.SUCCESS,
            message: 'Import teachers from file successfully',
        });
    } catch (err) {
        return res.json({
            status: apiStatus.OTHER_ERROR,
            message: err.message,
        });
    }
};

const addStudentToExamClass = async (req, res) => {
    try {
        const studentExamClass = await StudentExamClass.create(req.body);
        if (!studentExamClass) {
            throw createError.BadRequest('Failed to add new student to exam class');
        }
        return res.json({
            status: apiStatus.SUCCESS,
            message: 'Add new student to exam class successfully',
            data: studentExamClass,
        });
    } catch (err) {
        return res.json({
            status: apiStatus.OTHER_ERROR,
            message: err.message,
        });
    }
};

const importStudentFileToExamClass = async (req, res) => {
    try {
        const path = req.file.path;
        const workbook = xlsx.readFile(path);
        const sheetNameList = workbook.SheetNames;
        const jsonData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetNameList[0]]);

        for (const studentExamClass of jsonData) {
            const student = await Student.findOne({
                where: {
                    code: studentExamClass.studentCode,
                },
            });
            const examClass = await ExamClass.findOne({
                where: {
                    code: studentExamClass.examClassCode,
                },
            });

            await StudentExamClass.create({
                studentId: student.id,
                examClassId: examClass.id,
            });
        }

        // const studentExamClasses = await StudentExamClass.bulkCreate(jsonData);
        // if (!studentExamClasses) {
        //     throw createError.InternalServerError('Failed to import students from file to exam class');
        // }

        return res.json({
            status: apiStatus.SUCCESS,
            message: 'Import students to exam class from file successfully',
        });
    } catch (err) {
        return res.json({
            status: apiStatus.OTHER_ERROR,
            message: err.message,
        });
    }
};

const getAllDepartments = async (req, res) => {
    try {
        const departments = await Department.findAll({
            where: {
                isDeleted: false,
            },
        });

        if (!departments) {
            throw createError.InternalServerError('Cannot fetch all departments');
        }

        return res.json({
            status: apiStatus.SUCCESS,
            message: 'Get all departments successfully',
            data: departments,
        });
    } catch (err) {
        return res.json({
            status: apiStatus.OTHER_ERROR,
            message: err.message,
        });
    }
};

const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.findAll({
            where: {
                isDeleted: false,
            },
        });

        if (!courses) {
            throw createError.InternalServerError('Cannot fetch all courses');
        }

        return res.json({
            status: apiStatus.SUCCESS,
            message: 'Get all courses successfully',
            data: courses,
        });
    } catch (err) {
        return res.json({
            status: apiStatus.OTHER_ERROR,
            message: err.message,
        });
    }
};

const getStudentFromExamClass = async (req, res) => {
    try {
        const studentExamClass = await StudentExamClass.findAll({
            where: {
                examClassId: req.params.examClassId,
            },
            include: [{ model: Student }],
        });

        if (!studentExamClass) {
            throw createError.InternalServerError('Cannot fetch all students');
        }

        return res.json({
            status: apiStatus.SUCCESS,
            message: 'Get all students from exam class successfully',
            data: studentExamClass,
        });
    } catch (err) {
        return res.json({
            status: apiStatus.OTHER_ERROR,
            message: err.message,
        });
    }
};

const removeStudentFromExamClass = async (req, res) => {
    try {
        const studentExamClass = await StudentExamClass.findOne({
            where: {
                studentId: req.query.studentId,
                examClassId: req.query.examClassId,
            },
        });

        if (!studentExamClass) {
            throw createError.NotFound('Cannot get student in exam class');
        }

        await StudentExamClass.destroy({
            where: {
                studentId: req.query.studentId,
                examClassId: req.query.examClassId,
            },
        });

        return res.json({
            status: apiStatus.SUCCESS,
            message: 'Delete student from exam class successfully',
        });
    } catch (err) {
        return res.json({
            status: apiStatus.OTHER_ERROR,
            message: err.message,
        });
    }
};

const downloadImportTemplate = async (req, res) => {
    try {
        const templateFilePath = path.join(__dirname, '../../public/import-teachers-template.xlsx');
        res.download(templateFilePath);
    } catch (err) {
        return res.json({
            status: apiStatus.OTHER_ERROR,
            message: err.message,
        });
    }
};

module.exports = {
    getAll,
    getAtMost2RecentAdded,
    getById,
    getAllDepartments,
    getAllCourses,
    create,
    updateById,
    removeById,
    importFile,
    addStudentToExamClass,
    importStudentFileToExamClass,
    getStudentFromExamClass,
    removeStudentFromExamClass,
    downloadImportTemplate,
};
