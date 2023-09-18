const express = require('express');
const {
    getAll,
    getById,
    create,
    updateById,
    removeById,
    getAllWithoutPagination,
    getUpcomingExamClass,
    getRecentlyFinished,
    getClassResults,
} = require('../controllers/examClass.controller');
const { isAuthenticated, isAdminOrTeacher, isAccessTeacher } = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/', isAuthenticated, getAll);
router.get('/upcoming-exam', isAuthenticated, getUpcomingExamClass);
router.get('/getall-without-pagination', isAuthenticated, getAllWithoutPagination);
router.get('/recently-finished', isAuthenticated, getRecentlyFinished);
router.get('/:id', isAuthenticated, getById);
router.get('/:id/result', isAuthenticated, getClassResults);
router.post('/', isAdminOrTeacher, create);
router.put('/:id', isAccessTeacher, updateById);
router.delete('/:id', isAccessTeacher, removeById);

module.exports = router;
