const createError = require('http-errors');
const apiStatus = require('../constants/apiStatus.constant');
const StudentExamClass = require('../models').StudentExamClass;
const path = require('path');

const getByExamClassIdAndStudentId = async (req, res) => {
    try {
        const studentExamClass = await StudentExamClass.findOne({
            where: {
                examClassId: req.query.examClassId,
                studentId: req.query.studentId,
            },
        });

        if (!studentExamClass) {
            throw createError.NotFound('Sinh viên chưa được thêm vào lớp thi hoặc lớp thi không tồn tại');
        }

        return res.json({
            status: apiStatus.SUCCESS,
            message: 'Get student exam class by exam class id and student id successfully',
            data: studentExamClass,
        });
    } catch (err) {
        return res.json({
            status: apiStatus.OTHER_ERROR,
            message: 'Create new teacher fail!',
        });
    }
};

const downloadImportTemplate = async (req, res) => {
    try {
        const templateFilePath = path.join(__dirname, '../../public/import-students-to-examclass-template.xlsx');
        res.download(templateFilePath);
    } catch (err) {
        return res.json({
            status: apiStatus.OTHER_ERROR,
            message: err.message,
        });
    }
};

module.exports = { getByExamClassIdAndStudentId, downloadImportTemplate };
