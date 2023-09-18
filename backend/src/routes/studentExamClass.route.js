const express = require('express');
const { isAuthenticated } = require('../middlewares/auth.middleware');
const { getByExamClassIdAndStudentId, downloadImportTemplate } = require('../controllers/studentExamClass.controller');

const router = express.Router();

router.get('/', isAuthenticated, getByExamClassIdAndStudentId);
router.get('/download-import-template', isAuthenticated, downloadImportTemplate);

module.exports = router;
