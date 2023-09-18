const express = require('express');
const { getAll, getById, create, updateById, removeById } = require('../controllers/question.controller');
const { isAuthenticated, isAccessTeacher } = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/', isAuthenticated, getAll);
router.get('/:id', isAuthenticated, getById);
router.post('/', isAccessTeacher, create);
router.put('/:id', isAccessTeacher, updateById);
router.delete('/:id', isAccessTeacher, removeById);

module.exports = router;