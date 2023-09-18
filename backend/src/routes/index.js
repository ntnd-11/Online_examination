const authRoutes = require('./auth.route');
const teacherRoutes = require('./teacher.route');
const studentRoutes = require('./student.route');
const examClassRoutes = require('./examClass.route');
const examRoutes = require('./exam.route');
const studentExamClassRoutes = require('./studentExamClass.route');

const route = (app) => {
    app.use('/api/v1/auth', authRoutes);
    app.use('/api/v1/teachers', teacherRoutes);
    app.use('/api/v1/students', studentRoutes);
    app.use('/api/v1/examClass', examClassRoutes);
    app.use('/api/v1/exams', examRoutes);
    app.use('/api/v1/student-exam-class', studentExamClassRoutes);
};

module.exports = route;
