const createError = require('http-errors');
const xlsx = require('xlsx');
const path = require('path');

const Exam = require('../models').Exam;
const apiStatus = require('../constants/apiStatus.constant');
const { DEFAULT_PAGE, DEFAULT_PER_PAGE } = require('../constants/pagination.constant');
const { role } = require('../constants/role.constant');
const ExamClass = require('../models').ExamClass;
const Question = require('../models').Question;
const Answer = require('../models').Answer;
const StudentExamClass = require('../models').StudentExamClass;

const getAll = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || DEFAULT_PAGE;
        const perPage = parseInt(req.query.perPage) || DEFAULT_PER_PAGE;

        let exams = [];
        let count = 0;

        if (req.userInfo.role === role.ADMIN) {
            exams = await Exam.findAll({
                where: {
                    isDeleted: false,
                },
                offset: (page - 1) * perPage,
                limit: perPage,
                // include: { all: true, nested: true },
                include: [{ model: ExamClass }],
            });

            count = await Exam.count({
                where: {
                    isDeleted: false,
                },
            });
        } else if (req.userInfo.role === role.TEACHER) {
            exams = await Exam.findAll({
                where: {
                    isDeleted: false,
                },
                offset: (page - 1) * perPage,
                limit: perPage,
                // include: { all: true, nested: true },
                include: [{ model: ExamClass }],
            });
            count = await Exam.count({
                where: {
                    isDeleted: false,
                },
            });
            exams = exams.filter((exam) => exam.ExamClass.teacherId === req.userInfo.id);
        } else if (req.userInfo.role === role.STUDENT) {
            const studentExamClasses = await StudentExamClass.findAll({
                where: {
                    studentId: req.userInfo.id,
                },
                include: { all: true, nested: true },
            });

            exams = studentExamClasses.ExamClasses.Exams;
            count = exams.length;
        }

        if (!exams) {
            throw createError.InternalServerError('Cannot fetch all exams');
        }

        return res.json({
            status: apiStatus.SUCCESS,
            message: 'Fetch all exams successfully',
            data: {
                exams,
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

const getById = async (req, res, next) => {
    try {
        const id = req.params.id;

        const exam = await Exam.findOne({
            where: {
                id: id,
                isDeleted: false,
            },
            // include: { all: true, nested: true },
            include: [{ model: ExamClass }, { model: Question, include: [{ model: Answer }] }],
        });

        if (!exam) {
            throw createError.NotFound(`Cannot find exam with id ${id}`);
        }

        return res.json({
            status: apiStatus.SUCCESS,
            message: 'Find exam successfully',
            data: exam,
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
        const newExam = await Exam.create(req.body);
        const examFile = req.file.path;
        const workbook = xlsx.readFile(examFile);
        const sheetNameList = workbook.SheetNames;
        const jsonData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetNameList[0]]);

        for (data of jsonData) {
            const question = await Question.create({
                question: data['question'],
                examId: newExam.id,
            });

            for (let i = 1; i <= 4; i++) {
                if (data['result'] === i) {
                    await Answer.create({
                        description: data[`answer${i}`],
                        isCorrect: true,
                        questionId: question.id,
                    });
                } else {
                    await Answer.create({
                        description: data[`answer${i}`],
                        isCorrect: false,
                        questionId: question.id,
                    });
                }
            }
        }

        if (!newExam) {
            throw createError.BadRequest('Failed to create new exam');
        }
        return res.json({
            status: apiStatus.SUCCESS,
            message: 'Create new exam successfully',
            data: newExam,
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
        const exam = await Exam.findOne({
            where: {
                id: req.params.id,
                isDeleted: false,
            },
        });

        if (!exam) {
            throw createError.NotFound(`Failed to find exam with id ${req.params.id}`);
        }

        exam.update({
            name: req.body?.name,
            startTime: req.body?.startTime,
            endTime: req.body?.endTime,
            time: req.body?.time,
            description: req.body?.description,
            examClassId: req.body?.examClassId,
        });

        await exam.save();

        if (req.file) {
            // BEGIN
            // Delete old questions and answers
            const questions = await Question.findAll({
                where: {
                    examId: exam.id,
                },
            });

            for (const question of questions) {
                await Answer.destroy({
                    where: {
                        questionId: question.id,
                    },
                });
            }

            await Question.destroy({
                where: {
                    examId: exam.id,
                },
            });
            // END

            // BEGIN
            // Create new questions and answers
            const examFile = req.file.path;
            const workbook = xlsx.readFile(examFile);
            const sheetNameList = workbook.SheetNames;
            const jsonData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetNameList[0]]);

            for (data of jsonData) {
                const question = await Question.create({
                    question: data['question'],
                    examId: exam.id,
                });

                for (let i = 1; i <= 4; i++) {
                    if (data['result'] === i) {
                        await Answer.create({
                            description: data[`answer${i}`],
                            isCorrect: true,
                            questionId: question.id,
                        });
                    } else {
                        await Answer.create({
                            description: data[`answer${i}`],
                            isCorrect: false,
                            questionId: question.id,
                        });
                    }
                }
            }
            // END
        }

        return res.json({
            status: apiStatus.SUCCESS,
            message: 'Update exam successfully',
            data: exam,
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
        const exam = await Exam.findOne({
            where: {
                id: req.params.id,
                isDeleted: false,
            },
        });

        if (!exam) {
            throw createError.NotFound(`Failed to find exam with id ${req.params.id}`);
        }

        const questions = await Question.findAll({
            where: {
                examId: exam.id,
            },
        });

        for (const question of questions) {
            await Answer.destroy({
                where: {
                    questionId: question.id,
                },
            });
        }

        await Question.destroy({
            where: {
                examId: exam.id,
            },
        });

        await Exam.destroy({
            where: {
                id: req.params.id,
            },
        });
        return res.json({
            status: apiStatus.SUCCESS,
            message: 'Delete exam successfully',
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
        const templateFilePath = path.join(__dirname, '../../public/import-exams-template.xlsx');
        res.download(templateFilePath);
    } catch (err) {
        return res.json({
            status: apiStatus.OTHER_ERROR,
            message: err.message,
        });
    }
};

module.exports = { getAll, getById, create, updateById, removeById, downloadImportTemplate };
