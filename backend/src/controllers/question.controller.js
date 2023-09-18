const createError = require('http-errors');

const Question = require('../models').Question;

const getAll = async (req, res, next) => {
    try {
        const question = await Question.findAll({
            where: {
                isDeleted: false,
            },
        });

        if (!question) {
            throw createError.InternalServerError('Cannot fetch all questions');
        }

        return res.json({
            message: 'Fetch all questions successfully',
            data: question,
        });
    } catch (err) {
        return res.json({
            message: err.message,
        });
    }
};

const getById = async (req, res, next) => {
    try {
        const id = req.params.id;

        const question = await Question.findOne({
            where: {
                id: id,
                isDeleted: false,
            },
        });

        if (!question) {
            throw createError.NotFound(`Cannot find question with id ${id}`);
        }

        return res.json({
            message: 'Find question successfully',
            data: question,
        });
    } catch (err) {
        return res.json({
            message: err.message,
        });
    }
};

const create = async (req, res, next) => {
    try {
        const newQuestion = await Question.create(req.body);
        if (!newQuestion) {
            throw createError.BadRequest('Failed to create new question');
        }
        return res.json({
            message: 'Create new question successfully',
            data: newQuestion,
        });
    } catch (err) {
        return res.json({
            message: err.message,
        });
    }
};

const updateById = async (req, res, next) => {
    try {
        const question = await Question.findOne({
            where: {
                id: req.params.id,
                isDeleted: false,
            },
        });

        if (!question) {
            throw createError.NotFound(`Failed to find question with id ${req.params.id}`);
        }

        question.update({
            question: req.body?.question,
            examId: req.body?.examId,
        });

        await question.save();
        return res.json({
            message: 'Update question successfully',
            data: question,
        });
    } catch (err) {
        return res.json({
            message: err.message,
        });
    }
};

const removeById = async (req, res, next) => {
    try {
        const question = await Question.findOne({
            where: {
                id: req.params.id,
                isDeleted: false,
            },
        });

        if (!question) {
            throw createError.NotFound(`Failed to find question with id ${req.params.id}`);
        }

        question.update({
            isDeleted: true,
        });

        await question.save();
        return res.json({
            message: 'Delete question successfully',
        });
    } catch (err) {
        return res.json({
            message: err.message,
        });
    }
};

module.exports = { getAll, getById, create, updateById, removeById };
