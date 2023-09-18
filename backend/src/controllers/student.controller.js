const createError = require('http-errors');
const xlsx = require('xlsx');
const apiStatus = require('../constants/apiStatus.constant');
const { DEFAULT_PAGE, DEFAULT_PER_PAGE } = require('../constants/pagination.constant');
const { TEN_RANGE_SCORE } = require('../constants/score.constant');
const { transporter, sendCreateAccountEmail } = require('../utils/mail.util');
const path = require('path');

const Student = require('../models').Student;
const Question = require('../models').Question;
const Result = require('../models').Result;
const StudentExamClass = require('../models').StudentExamClass;
const Exam = require('../models').Exam;
const ExamClass = require('../models').ExamClass;
const Course = require('../models').Course;
const Teacher = require('../models').Teacher;

const getAll = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || DEFAULT_PAGE;
        const perPage = parseInt(req.query.perPage) || DEFAULT_PER_PAGE;
        const students = await Student.findAll({
            where: {
                isDeleted: false,
            },
            offset: (page - 1) * perPage,
            limit: perPage,
            attributes: { exclude: ['password'] },
        });

        const count = await Student.count({
            where: {
                isDeleted: false,
            },
        });

        if (!students) {
            throw createError.InternalServerError('Cannot fetch all students');
        }

        return res.json({
            status: apiStatus.SUCCESS,
            message: 'Fetch all students successfully',
            data: {
                students,
                count,
            },
        });
    } catch (err) {
        return res.json({
            status: apiStatus.OTHER_ERROR,
            message: 'Get all students fail',
        });
    }
};

const getAtMost2RecentAdded = async (req, res) => {
    try {
        const students = await Student.findAll({
            where: {
                isDeleted: false,
            },
            order: [['createdAt', 'DESC']],
            limit: 2,
            raw: true,
        });

        if (!students) {
            throw createError.InternalServerError('Cannot fetch 2 recently added students');
        }

        return res.json({
            status: apiStatus.SUCCESS,
            message: 'Fetch 2 recently added students successfully',
            data: students,
        });
    } catch (err) {
        return res.json({
            status: apiStatus.OTHER_ERROR,
            message: 'Get recent added students fail',
        });
    }
};

const getById = async (req, res) => {
    try {
        const id = req.params.id;
        const student = await Student.findOne({
            where: {
                id: id,
                isDeleted: false,
            },
            // include: { all: true, nested: true },
            include: [{ model: ExamClass, include: [{ model: Course }, { model: Teacher }] }],
        });

        if (!student) {
            throw createError.NotFound(`Cannot find student with id ${id}`);
        }

        return res.json({
            status: apiStatus.SUCCESS,
            message: 'Find student successfully',
            data: student,
        });
    } catch (err) {
        return res.json({
            status: apiStatus.OTHER_ERROR,
            message: 'Get student by id fail',
        });
    }
};

const getByCode = async (req, res) => {
    try {
        const code = req.params.code;

        const student = await Student.findOne({
            where: {
                code: code,
                isDeleted: false,
            },
            include: { all: true, nested: true },
        });

        if (!student) {
            throw createError.NotFound(`Cannot find student with code ${code}`);
        }

        return res.json({
            status: apiStatus.SUCCESS,
            message: 'Find student successfully',
            data: student,
        });
    } catch (err) {
        return res.json({
            status: apiStatus.OTHER_ERROR,
            message: 'Get student by code fail',
        });
    }
};

const create = async (req, res) => {
    try {
        const newStudent = await Student.create(req.body);
        if (!newStudent) {
            throw createError.BadRequest('Failed to create new student');
        }

        sendCreateAccountEmail(req.body.email, req.body.fullname, req.body.username, req.body.password, 'Sinh viên');

        return res.json({
            status: apiStatus.SUCCESS,
            message: 'Create new student successfully',
            data: newStudent,
        });
    } catch (err) {
        return res.json({
            status: apiStatus.OTHER_ERROR,
            message: 'Create new student fail!',
        });
    }
};
const updateById = async (req, res) => {
    try {
        const student = await Student.findOne({
            where: {
                id: req.params.id,
                isDeleted: false,
            },
        });

        if (!student) {
            throw createError.NotFound(`Failed to find student with id ${req.params.id}`);
        }

        student.update({
            code: req.body?.code,
            username: req.body?.username,
            password: req.body?.password,
            fullname: req.body?.fullname,
            email: req.body?.email,
            phoneNumber: req.body?.phoneNumber,
            citizenIdentification: req.body?.citizenIdentification,
            dateOfBirth: req.body?.dateOfBirth,
            ethnic: req.body?.ethnic,
            gender: req.body?.gender,
            cpa: req.body?.cpa,
            generation: req.body?.generation,
        });

        await student.save();
        return res.json({
            status: apiStatus.SUCCESS,
            message: 'Update student successfully',
            data: student,
        });
    } catch (err) {
        return res.json({
            status: apiStatus.OTHER_ERROR,
            message: 'Get student by id fail',
        });
    }
};
const removeById = async (req, res) => {
    try {
        const student = await Student.findOne({
            where: {
                id: req.params.id,
                isDeleted: false,
            },
        });

        if (!student) {
            throw createError.NotFound(`Failed to find student with id ${req.params.id}`);
        }
        await student.destroy({
            where: {
                id: req.params.id,
            },
        });

        return res.json({
            status: apiStatus.SUCCESS,
            message: 'Delete student successfully',
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
        const students = await Student.bulkCreate(jsonData);

        if (!students) {
            throw createError.InternalServerError('Failed to import students from file');
        }

        for (const student of jsonData) {
            sendCreateAccountEmail(student.email, student.fullname, student.username, student.password, 'Sinh viên');
        }

        return res.json({
            status: apiStatus.SUCCESS,
            message: 'Import students from file successfully',
        });
    } catch (err) {
        return res.json({
            status: apiStatus.OTHER_ERROR,
            message: err.message,
        });
    }
};

const startExam = async (req, res) => {
    try {
        const studentExamClass = await StudentExamClass.findOne({
            where: {
                examClassId: req.body.examClassId,
                studentId: req.body.studentId,
                // examId: req.body.examId,
            },
            // include: { all: true, nested: true },
            include: [{ model: ExamClass }],
        });

        const currentTime = new Date().getTime();
        const startTime = new Date(studentExamClass.ExamClass.startTime).getTime();
        const endTime = new Date(studentExamClass.ExamClass.endTime).getTime();

        if (currentTime < startTime) {
            throw createError.BadRequest('Chưa đến giờ làm bài');
        } else if (currentTime > endTime) {
            throw createError.BadRequest('Đã quá thời gian làm bài');
        } else {
            if (!studentExamClass) {
                throw createError.NotFound('Student is not in this exam class or exam class not exists');
            }

            if (studentExamClass.isStart) {
                throw createError.InternalServerError('The exam has already been started');
            }

            await StudentExamClass.update(
                {
                    isStart: true,
                    examId: req.body.examId,
                },
                {
                    where: {
                        examClassId: req.body.examClassId,
                        studentId: req.body.studentId,
                        // examId: req.body.examId,
                    },
                },
            );

            return res.json({
                status: apiStatus.SUCCESS,
                message: 'Update student exam class successfully',
            });
        }
    } catch (err) {
        return res.json({
            status: apiStatus.OTHER_ERROR,
            message: err.message,
        });
    }
};

const submitExam = async (req, res) => {
    // Input: array answers [[questionId, ansId], ...] va examId
    // Output: Diem (so cau dung / tong so cau) * 10
    try {
        const userAnswers = req.body.answers;
        const examId = req.body.examId;

        let numCorrectAns = 0;

        // Get all question of exam
        const questions = await Question.findAll({
            where: {
                examId: examId,
            },
            include: { all: true, nested: true },
        });

        for (const answer of userAnswers) {
            for (const question of questions) {
                const correctAnsId = question.Answers.filter((ans) => ans.isCorrect === true)[0].id;
                if (parseInt(answer[0]) === parseInt(question.id)) {
                    if (parseInt(answer[1]) === parseInt(correctAnsId)) {
                        numCorrectAns++;
                    }
                }
            }
        }

        await StudentExamClass.update(
            {
                isFinish: true,
            },
            {
                where: {
                    examId: parseInt(examId),
                    studentId: req.userInfo.id,
                },
            },
        );

        const result = await Result.create({
            score: (TEN_RANGE_SCORE * numCorrectAns) / questions.length,
            examId: parseInt(examId),
            studentId: req.userInfo.id,
        });

        return res.json({
            status: apiStatus.SUCCESS,
            message: 'Your exam is submitted successfully',
            data: result,
        });
    } catch (err) {
        return res.json({
            status: apiStatus.OTHER_ERROR,
            message: err.message,
        });
    }
};

const showResultListOfStudent = async (req, res) => {
    try {
        const results = await Result.findAll({
            where: {
                studentId: req.userInfo.id,
            },
            include: [{ model: Exam, include: [{ model: ExamClass, include: [{ model: Course }] }] }],
        });

        if (!results) {
            throw createError.NotFound('Cannot find student results');
        }

        return res.json({
            status: apiStatus.SUCCESS,
            message: `Get ${req.userInfo.fullname} results successfully`,
            data: results,
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
        const templateFilePath = path.join(__dirname, '../../public/import-students-template.xlsx');
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
    getByCode,
    create,
    updateById,
    removeById,
    importFile,
    startExam,
    submitExam,
    showResultListOfStudent,
    downloadImportTemplate,
};
