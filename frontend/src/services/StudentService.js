import axios from '../configs/axios.config';

const StudentService = {
    getUpcomingExamClass: async () => {
        const token = JSON.parse(localStorage.getItem('user')).token;
        const bearerToken = `Bearer ${token}`;
        const configs = {
            headers: {
                Authorization: bearerToken,
            },
        };
        const response = await axios.get('/api/v1/examClass/upcoming-exam', configs);
        return response.data;
    },
    getExamClassById: async (id) => {
        const token = JSON.parse(localStorage.getItem('user')).token;
        const bearerToken = `Bearer ${token}`;
        const configs = {
            headers: {
                Authorization: bearerToken,
            },
        };
        const response = await axios.get(`/api/v1/examClass/${id}`, configs);
        return response.data;
    },
    startExam: async (examClassId, studentId, examId) => {
        const token = JSON.parse(localStorage.getItem('user')).token;
        const bearerToken = `Bearer ${token}`;
        const configs = {
            headers: {
                Authorization: bearerToken,
            },
        };

        const data = {
            examClassId,
            studentId,
            examId,
        };

        const response = await axios.post('/api/v1/students/start-exam', data, configs);
        return response.data;
    },
    getStudentById: async (id) => {
        const token = JSON.parse(localStorage.getItem('user')).token;
        const bearerToken = `Bearer ${token}`;
        const configs = {
            headers: {
                Authorization: bearerToken,
            },
        };

        const response = await axios.get(`/api/v1/students/${id}`, configs);
        return response.data;
    },
    submitExam: async (answers, examId) => {
        const token = JSON.parse(localStorage.getItem('user')).token;
        const bearerToken = `Bearer ${token}`;
        const configs = {
            headers: {
                Authorization: bearerToken,
            },
        };

        const data = {
            answers,
            examId,
        };

        const response = await axios.post(`/api/v1/students/submit-exam`, data, configs);
        return response.data;
    },
    getResultList: async () => {
        const token = JSON.parse(localStorage.getItem('user')).token;
        const bearerToken = `Bearer ${token}`;
        const configs = {
            headers: {
                Authorization: bearerToken,
            },
        };

        const response = await axios.get('/api/v1/students/result', configs);
        return response.data;
    },
};

export default StudentService;
