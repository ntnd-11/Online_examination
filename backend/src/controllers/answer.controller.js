const createError = require('http-errors');

const Answer = require('../models').Answer;

const getAll = async (req, res, next) => {
    try {
        const answer = await Answer.findAll({
            where: {
                isDeleted: false,
            },
        });

        if (!answer) {
            throw createError.InternalServerError('Cannot fetch all answers');
        }

        return res.json({
            message: 'Fetch all answers successfully',
            data: answer,
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

        const answer = await Answer.findOne({
            where: {
                id: id,
                isDeleted: false,
            },
        });

        if (!answer) {
            throw createError.NotFound(`Cannot find answer with id ${id}`);
        }

        return res.json({
            message: 'Find answer successfully',
            data: answer,
        });
    } catch (err) {
        return res.json({
            message: err.message,
        });
    }
};

const create = async (req, res, next) => {
    try {
        const newAnswer = await Answer.create(req.body);
        if (!newAnswer) {
            throw createError.BadRequest('Failed to create new answer');
        }
        return res.json({
            message: 'Create new answer successfully',
            data: newAnswer,
        });
    } catch (err) {
        return res.json({
            message: err.message,
        });
    }
};

const updateById = async (req, res, next) => {
    try {
        const answer = await Answer.findOne({
            where: {
                id: req.params.id,
                isDeleted: false,
            },
        });

        if (!answer) {
            throw createError.NotFound(`Failed to find answer with id ${req.params.id}`);
        }

        answer.update({
            description: req.body?.description,
            isCorrect: req.body?.isCorrect,
            questionId: req.body?.questionId,
        });

        await answer.save();
        return res.json({
            message: 'Update answer successfully',
            data: answer,
        });
    } catch (err) {
        return res.json({
            message: err.message,
        });
    }
};

const removeById = async (req, res, next) => {
    try {
        const answer = await Answer.findOne({
            where: {
                id: req.params.id,
                isDeleted: false,
            },
        });

        if (!answer) {
            throw createError.NotFound(`Failed to find answer with id ${req.params.id}`);
        }

        answer.update({
            isDeleted: true,
        });

        await answer.save();
        return res.json({
            message: 'Delete answer successfully',
        });
    } catch (err) {
        return res.json({
            message: err.message,
        });
    }
};

module.exports = { getAll, getById, create, updateById, removeById };
