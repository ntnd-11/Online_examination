import { FaUserAlt, FaUserTie, FaUserGraduate, FaBookOpen, FaPen, FaTable } from 'react-icons/fa';

export const AdminControl = [
    {
        icon: FaUserTie,
        text: 'Quản lý giảng viên',
        to: '/admin/teacher-management',
    },
    {
        icon: FaUserGraduate,
        text: 'Quản lý sinh viên',
        to: '/admin/student-management',
    },
];

export const TeacherControl = [
    {
        icon: FaUserAlt,
        text: 'Hồ sơ cá nhân',
        to: '/profile',
    },
    {
        icon: FaBookOpen,
        text: 'Quản lý lớp thi',
        to: '/exam-class-management',
    },
    {
        icon: FaPen,
        text: 'Quản lý bài thi',
        to: '/exam-management',
    },
    {
        icon: FaTable,
        text: 'Kết quả thi',
        to: '/class-result',
    },
];

export const StudentControl = [
    {
        icon: FaUserAlt,
        text: 'Hồ sơ cá nhân',
        to: '/profile',
    },
    {
        icon: FaBookOpen,
        text: 'Danh sách lớp thi',
        to: '/exam-class',
    },
    {
        icon: FaTable,
        text: 'Kết quả thi',
        to: '/result',
    },
];
