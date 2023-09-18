import axios from '../configs/axios.config';

const AdminService = {
    downloadImportTeacherTemplate: async () => {
        const token = JSON.parse(localStorage.getItem('user')).token;
        const bearerToken = `Bearer ${token}`;
        const configs = {
            headers: {
                Authorization: bearerToken,
            },
            responseType: 'blob',
        };

        const response = await axios.get('/api/v1/teachers/download-import-template', configs);
        return response.data;
    },

    downloadImportStudentTemplate: async () => {
        const token = JSON.parse(localStorage.getItem('user')).token;
        const bearerToken = `Bearer ${token}`;
        const configs = {
            headers: {
                Authorization: bearerToken,
            },
            responseType: 'blob',
        };

        const response = await axios.get('/api/v1/students/download-import-template', configs);
        return response.data;
    },
};

export default AdminService;
