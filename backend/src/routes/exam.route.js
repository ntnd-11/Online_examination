const express = require('express');
const {
    getAll,
    getById,
    create,
    updateById,
    removeById,
    importExam,
    downloadImportTemplate,
} = require('../controllers/exam.controller');
const { isAuthenticated, isAdminOrTeacher, isAccessTeacher } = require('../middlewares/auth.middleware');
const { upload } = require('../middlewares/uploadXlsxFile.middleware');

const router = express.Router();

router.get('/', isAuthenticated, getAll);
router.get('/download-import-template', isAuthenticated, downloadImportTemplate);
router.get('/:id', isAuthenticated, getById);
router.post('/', isAccessTeacher, upload.single('exams'), create);
router.put('/:id', isAccessTeacher, upload.single('exams'), updateById);
router.delete('/:id', isAccessTeacher, removeById);

module.exports = router;
