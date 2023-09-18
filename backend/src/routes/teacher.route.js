const express = require('express');

const {
    getAll,
    getById,
    create,
    updateById,
    removeById,
    importFile,
    addStudentToExamClass,
    importStudentFileToExamClass,
    getAtMost2RecentAdded,
    getAllDepartments,
    getAllCourses,
    getStudentFromExamClass,
    removeStudentFromExamClass,
    downloadImportTemplate,
} = require('../controllers/teacher.controller');
const {
    isAdmin,
    isAuthenticated,
    isAccessTeacher,
    isTeacher,
    isAdminOrTeacher,
} = require('../middlewares/auth.middleware');
const { upload } = require('../middlewares/uploadXlsxFile.middleware');

const router = express.Router();

router.get('/', isAdmin, getAll);
router.get('/:id/student-in-examclass', isAccessTeacher, getStudentFromExamClass);
router.get('/recently-added', isAdmin, getAtMost2RecentAdded);
router.get('/departments', isAdminOrTeacher, getAllDepartments);
router.get('/courses', isAdminOrTeacher, getAllCourses);
router.get('/download-import-template', isAdmin, downloadImportTemplate);
router.get('/:id', isAuthenticated, getById);
router.post('/', isAdmin, create);
router.put('/:id', isAccessTeacher, updateById);
router.delete('/removeStudentFromExamClass', isAccessTeacher, removeStudentFromExamClass);
router.delete('/:id', isAdmin, removeById);
router.post('/import', isAdmin, upload.single('teachers'), importFile);
router.post('/addStudentToExamClass', isTeacher, addStudentToExamClass);
router.post('/importStudentToExamClass', isTeacher, upload.single('students'), importStudentFileToExamClass);

module.exports = router;
