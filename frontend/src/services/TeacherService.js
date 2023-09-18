import axios from '../configs/axios.config';

const TeacherService = {
    createNewExamClass: async (code, name, startTime, endTime, courseId, teacherId) => {
        const token = JSON.parse(localStorage.getItem('user')).token;
        const bearerToken = `Bearer ${token}`;
        const configs = {
            headers: {
                Authorization: bearerToken,
            },
        };

        const data = {
            code,
            name,
            startTime,
            endTime,
            courseId,
            teacherId,
        };

        const response = await axios.post('/api/v1/examClass', data, configs);
        return response.data;
    },
    getAllExamClasses: async (page, perPage) => {
        const token = JSON.parse(localStorage.getItem('user')).token;
        const bearerToken = `Bearer ${token}`;
        const configs = {
            headers: {
                Authorization: bearerToken,
            },
        };
        const response = await axios.get(`/api/v1/examClass?page=${page}&perPage=${perPage}`, configs);
        return response.data;
    },
    getAllExamClassesWithoutPagination: async () => {
        const token = JSON.parse(localStorage.getItem('user')).token;
        const bearerToken = `Bearer ${token}`;
        const configs = {
            headers: {
                Authorization: bearerToken,
            },
        };
        const response = await axios.get(`/api/v1/examClass/getall-without-pagination`, configs);
        return response.data;
    },
    getRecentlyFinishedExamClasses: async () => {
        const token = JSON.parse(localStorage.getItem('user')).token;
        const bearerToken = `Bearer ${token}`;
        const configs = {
            headers: {
                Authorization: bearerToken,
            },
        };

        const response = await axios.get(`/api/v1/examClass/recently-finished`, configs);
        return response.data;
    },
    getUpcomingExamClasses: async () => {
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
    updateExamClass: async (id, code, name, courseId, startTime, endTime) => {
        const token = JSON.parse(localStorage.getItem('user')).token;
        const bearerToken = `Bearer ${token}`;
        const configs = {
            headers: {
                Authorization: bearerToken,
            },
        };

        const data = {
            code,
            name,
            courseId,
            startTime,
            endTime,
        };
        const response = await axios.put(`/api/v1/examClass/${id}`, data, configs);
        return response.data;
    },
    removeExamClass: async (id) => {
        const token = JSON.parse(localStorage.getItem('user')).token;
        const bearerToken = `Bearer ${token}`;
        const configs = {
            headers: {
                Authorization: bearerToken,
            },
        };

        const response = await axios.delete(`/api/v1/examClass/${id}`, configs);
        return response.data;
    },
    createNewExam: async (name, time, startTime, endTime, examClassId, description, examFile) => {
        const token = JSON.parse(localStorage.getItem('user')).token;
        const bearerToken = `Bearer ${token}`;
        const configs = {
            headers: {
                Authorization: bearerToken,
                'Content-Type': 'multipart/form-data',
            },
        };

        const bodyFormData = new FormData();
        bodyFormData.append('exams', examFile);
        bodyFormData.append('name', name);
        bodyFormData.append('time', time);
        bodyFormData.append('description', description);
        bodyFormData.append('startTime', startTime);
        bodyFormData.append('endTime', endTime);
        bodyFormData.append('examClassId', parseInt(examClassId));
        const response = await axios.post('/api/v1/exams', bodyFormData, configs);
        return response.data;
    },
    getAllExams: async (page, perPage) => {
        const token = JSON.parse(localStorage.getItem('user')).token;
        const bearerToken = `Bearer ${token}`;
        const configs = {
            headers: {
                Authorization: bearerToken,
            },
        };
        const response = await axios.get(`/api/v1/exams?page=${page}&perPage=${perPage}`, configs);
        return response.data;
    },
    getExamById: async (id) => {
        const token = JSON.parse(localStorage.getItem('user')).token;
        const bearerToken = `Bearer ${token}`;
        const configs = {
            headers: {
                Authorization: bearerToken,
            },
        };
        const response = await axios.get(`/api/v1/exams/${id}`, configs);
        return response.data;
    },
    updateExamById: async (id, name, time, startTime, endTime, examClassId, description, examFile) => {
        const token = JSON.parse(localStorage.getItem('user')).token;
        const bearerToken = `Bearer ${token}`;
        const configs = {
            headers: {
                Authorization: bearerToken,
                'Content-Type': 'multipart/form-data',
            },
        };

        const bodyFormData = new FormData();
        bodyFormData.append('name', name);
        bodyFormData.append('time', time);
        bodyFormData.append('startTime', startTime);
        bodyFormData.append('endTime', endTime);
        bodyFormData.append('description', description);
        bodyFormData.append('examClassId', parseInt(examClassId));
        if (examFile) {
            bodyFormData.append('exams', examFile);
        }
        const response = await axios.put(`/api/v1/exams/${id}`, bodyFormData, configs);
        return response.data;
    },
    removeExamById: async (id) => {
        const token = JSON.parse(localStorage.getItem('user')).token;
        const bearerToken = `Bearer ${token}`;
        const configs = {
            headers: {
                Authorization: bearerToken,
            },
        };

        const response = await axios.delete(`/api/v1/exams/${id}`, configs);
        return response.data;
    },
    addStudentToExamClass: async (studentId, examClassId) => {
        const token = JSON.parse(localStorage.getItem('user')).token;
        const bearerToken = `Bearer ${token}`;
        const configs = {
            headers: {
                Authorization: bearerToken,
                'Content-Type': 'application/json',
            },
        };

        const data = {
            studentId,
            examClassId,
        };

        const response = await axios.post(`/api/v1/teachers/addStudentToExamClass`, data, configs);
        return response.data;
    },
    importStudentToExamClass: async (file) => {
        const token = JSON.parse(localStorage.getItem('user')).token;
        const bearerToken = `Bearer ${token}`;
        const configs = {
            headers: {
                Authorization: bearerToken,
                'Content-Type': 'multipart/form-data',
            },
        };

        const bodyFormData = new FormData();
        bodyFormData.append('students', file);

        const response = await axios.post(`/api/v1/teachers/importStudentToExamClass`, bodyFormData, configs);
        return response.data;
    },
    getAllStudentsFromExamClass: async (examClassId) => {
        const token = JSON.parse(localStorage.getItem('user')).token;
        const bearerToken = `Bearer ${token}`;
        const configs = {
            headers: {
                Authorization: bearerToken,
                'Content-Type': 'application/json',
            },
        };

        const response = await axios.get(`/api/v1/teachers/${examClassId}/student-in-examclass`, configs);
        return response.data;
    },
    removeStudentFromExamClass: async (examClassId, studentId) => {
        const token = JSON.parse(localStorage.getItem('user')).token;
        const bearerToken = `Bearer ${token}`;
        const configs = {
            headers: {
                Authorization: bearerToken,
            },
        };

        const response = await axios.delete(
            `/api/v1/teachers/removeStudentFromExamClass?studentId=${studentId}&examClassId=${examClassId}`,
            configs,
        );
        return response.data;
    },
    getClassResult: async (examClassId) => {
        const token = JSON.parse(localStorage.getItem('user')).token;
        const bearerToken = `Bearer ${token}`;
        const configs = {
            headers: {
                Authorization: bearerToken,
            },
        };

        const response = await axios.get(`/api/v1/examClass/${examClassId}/result`, configs);
        return response.data;
    },
    downloadImportStudentToExamClassTemplate: async () => {
        const token = JSON.parse(localStorage.getItem('user')).token;
        const bearerToken = `Bearer ${token}`;
        const configs = {
            headers: {
                Authorization: bearerToken,
            },
            responseType: 'blob',
        };

        const response = await axios.get('/api/v1/student-exam-class/download-import-template', configs);
        return response.data;
    },
    downloadImportExamTemplate: async () => {
        const token = JSON.parse(localStorage.getItem('user')).token;
        const bearerToken = `Bearer ${token}`;
        const configs = {
            headers: {
                Authorization: bearerToken,
            },
            responseType: 'blob',
        };

        const response = await axios.get('/api/v1/exams/download-import-template', configs);
        return response.data;
    },
};

export default TeacherService;
