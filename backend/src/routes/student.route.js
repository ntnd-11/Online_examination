const express = require('express');

const {
    getAll,
    getById,
    create,
    updateById,
    removeById,
    importFile,
    getAtMost2RecentAdded,
    getByCode,
    startExam,
    submitExam,
    showResultListOfStudent,
    downloadImportTemplate,
} = require('../controllers/student.controller');
const {
    isAuthenticated,
    isAccessStudent,
    isAdminOrTeacher,
    isAdmin,
    isStudent,
} = require('../middlewares/auth.middleware');
const { upload } = require('../middlewares/uploadXlsxFile.middleware');

const router = express.Router();

router.get('/', isAuthenticated, getAll);
router.get('/result', isAuthenticated, showResultListOfStudent);
router.get('/recently-added', isAdmin, getAtMost2RecentAdded);
router.get('/code/:code', isAuthenticated, getByCode);
router.get('/download-import-template', isAdmin, downloadImportTemplate);
router.get('/:id', isAuthenticated, getById);
router.post('/', isAdminOrTeacher, create);
router.put('/:id', isAccessStudent, updateById);
router.delete('/:id', isAdminOrTeacher, removeById);
router.post('/import', isAdminOrTeacher, upload.single('students'), importFile);
router.post('/start-exam', isStudent, startExam);
router.post('/submit-exam', isAuthenticated, submitExam);

module.exports = router;
