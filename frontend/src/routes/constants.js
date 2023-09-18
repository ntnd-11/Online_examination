import Home from '../pages/Home';
import AdminHome from '../pages/AdminHome';
import Exam from '../pages/Student/Exam';
import Profile from '../pages/Profile';
import MainLayout from '../components/layouts/MainLayout';
import AuthLayout from '../components/layouts/AuthLayout';
import TeacherManagement from '../pages/Admin/TeacherManagement';
import StudentManagement from '../pages/Admin/StudentManagement';
import UserRole from '../constants/UserRole';
import CreateTeacher from '../pages/Admin/CreateTeacher';
import CreateStudent from '../pages/Admin/CreateStudent';
import DetailTeacher from '../pages/Admin/DetailTeacher';
import DetailStudent from '../pages/Admin/DetailStudent';
import ImportTeacherFile from '../pages/Admin/ImportTeacherFile';
import ImportStudentFile from '../pages/Admin/ImportStudentFile';
import ExamClassManagement from '../pages/Teacher/ExamClassManagement';
import CreateExamClass from '../pages/Teacher/CreateExamClass';
import DetailExamClass from '../pages/Teacher/DetailExamClass';
import ExamManagement from '../pages/Teacher/ExamManagement';
import CreateExam from '../pages/Teacher/CreateExam';
import DetailExam from '../pages/Teacher/DetailExam';
import ExamLayout from '../components/layouts/ExamLayout';
import ExamClassList from '../pages/Student/ExamClassList';
import StartExam from '../pages/Student/StartExam';
import AddStudentToExamClass from '../pages/Teacher/AddStudentToExamClass';
import ImportStudentToExamClass from '../pages/Teacher/ImportStudentToExamClass';
import PageNotFound from '../pages/PageNotFound';
import ResultList from '../pages/Student/ResultList';
import StudentDetailExamClass from '../pages/Student/StudentDetailExamClass';
import ClassResultList from '../pages/Teacher/ClassResultList';
import ClassResultDetail from '../pages/Teacher/ClassResultDetail';
import ChangePassword from '../pages/ChangePassword';

export const publicUrl = [
    {
        path: '/login',
        layout: AuthLayout,
    },
    {
        path: '*',
        layout: PageNotFound,
    },
];

export const privateUrl = [
    {
        path: '/',
        element: Home,
        layout: MainLayout,
    },
    {
        path: '/profile',
        element: Profile,
        layout: MainLayout,
    },
    {
        path: '/change-password',
        element: ChangePassword,
        layout: MainLayout,
    },
    {
        path: '/exam-class',
        element: ExamClassList,
        layout: MainLayout,
    },
    {
        path: '/exam-class/:id',
        element: StudentDetailExamClass,
        layout: MainLayout,
    },
    {
        path: '/exams/:id/start',
        element: Exam,
        layout: ExamLayout,
    },
    {
        role: UserRole.STUDENT,
        path: '/result',
        element: ResultList,
        layout: MainLayout,
    },
    {
        role: UserRole.STUDENT,
        path: '/exams/:id/start-exam',
        element: StartExam,
        layout: MainLayout,
    },
    {
        role: UserRole.TEACHER,
        path: '/exam-class-management',
        element: ExamClassManagement,
        layout: MainLayout,
    },
    {
        role: UserRole.TEACHER,
        path: '/create-exam-class',
        element: CreateExamClass,
        layout: MainLayout,
    },
    {
        role: UserRole.TEACHER,
        path: '/exam-class-management/:id',
        element: DetailExamClass,
        layout: MainLayout,
    },
    {
        role: UserRole.TEACHER,
        path: '/exam-class-management/:id/add-student',
        element: AddStudentToExamClass,
        layout: MainLayout,
    },
    {
        role: UserRole.TEACHER,
        path: '/exam-class-management/:id/import-student',
        element: ImportStudentToExamClass,
        layout: MainLayout,
    },
    {
        role: UserRole.TEACHER,
        path: '/exam-management',
        element: ExamManagement,
        layout: MainLayout,
    },
    {
        role: UserRole.TEACHER,
        path: '/exam-management/:id',
        element: DetailExam,
        layout: MainLayout,
    },
    {
        role: UserRole.TEACHER,
        path: '/create-exam',
        element: CreateExam,
        layout: MainLayout,
    },
    {
        role: UserRole.TEACHER,
        path: '/class-result',
        element: ClassResultList,
        layout: MainLayout,
    },
    {
        role: UserRole.TEACHER,
        path: '/class-result/:id',
        element: ClassResultDetail,
        layout: MainLayout,
    },
    {
        role: UserRole.ADMIN,
        path: '/admin',
        element: AdminHome,
        layout: MainLayout,
    },
    {
        role: UserRole.ADMIN,
        path: '/admin/teacher-management',
        element: TeacherManagement,
        layout: MainLayout,
    },
    {
        role: UserRole.ADMIN,
        path: '/admin/student-management',
        element: StudentManagement,
        layout: MainLayout,
    },
    {
        role: UserRole.ADMIN,
        path: '/admin/teacher-management/create-teacher',
        element: CreateTeacher,
        layout: MainLayout,
    },
    {
        role: UserRole.ADMIN,
        path: '/admin/student-management/create-student',
        element: CreateStudent,
        layout: MainLayout,
    },
    {
        role: UserRole.ADMIN,
        path: '/admin/teacher-management/:id',
        element: DetailTeacher,
        layout: MainLayout,
    },
    {
        role: UserRole.ADMIN,
        path: '/admin/student-management/:id',
        element: DetailStudent,
        layout: MainLayout,
    },
    {
        role: UserRole.ADMIN,
        path: '/admin/teacher-management/import-file',
        element: ImportTeacherFile,
        layout: MainLayout,
    },
    {
        role: UserRole.ADMIN,
        path: '/admin/student-management/import-file',
        element: ImportStudentFile,
        layout: MainLayout,
    },
];
