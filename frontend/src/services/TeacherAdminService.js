import axios from '../configs/axios.config';

const TeacherAdminService = {
    getAll: async (page, perPage) => {
        const token = JSON.parse(localStorage.getItem('user')).token;
        const bearerToken = `Bearer ${token}`;
        const configs = {
            headers: {
                Authorization: bearerToken,
            },
        };
        const response = await axios.get(`/api/v1/teachers?page=${page}&perPage=${perPage}`, configs);
        return response.data;
    },
    getRecentlyAdded: async () => {
        const token = JSON.parse(localStorage.getItem('user')).token;
        const bearerToken = `Bearer ${token}`;
        const configs = {
            headers: {
                Authorization: bearerToken,
            },
        };
        const response = await axios.get(`/api/v1/teachers/recently-added`, configs);
        return response.data;
    },
    getById: async (id) => {
        const token = JSON.parse(localStorage.getItem('user')).token;
        const bearerToken = `Bearer ${token}`;
        const configs = {
            headers: {
                Authorization: bearerToken,
            },
        };

        const response = await axios.get(`/api/v1/teachers/${id}`, configs);
        return response.data;
    },
    create: async (
        username,
        password,
        fullname,
        citizenIdentification,
        email,
        phoneNumber,
        dateOfBirth,
        ethnic,
        gender,
        department,
    ) => {
        const token = JSON.parse(localStorage.getItem('user')).token;
        const bearerToken = `Bearer ${token}`;
        const configs = {
            headers: {
                Authorization: bearerToken,
                'Content-Type': 'application/json',
            },
        };
        const data = {
            username,
            password,
            fullname,
            citizenIdentification,
            email,
            phoneNumber,
            dateOfBirth,
            ethnic,
            gender,
            departmentId: department,
        };
        const response = await axios.post('/api/v1/teachers', data, configs);
        return response.data;
    },
    update: async (id, username, fullname, citizenIdentification, email, phoneNumber, dateOfBirth, ethnic, gender) => {
        const token = JSON.parse(localStorage.getItem('user')).token;
        const bearerToken = `Bearer ${token}`;
        const configs = {
            headers: {
                Authorization: bearerToken,
                'Content-Type': 'application/json',
            },
        };
        const data = {
            username,
            fullname,
            citizenIdentification,
            email,
            phoneNumber,
            dateOfBirth,
            ethnic,
            gender,
        };
        const response = await axios.put(`/api/v1/teachers/${id}`, data, configs);
        return response.data;
    },
    remove: async (id) => {
        const token = JSON.parse(localStorage.getItem('user')).token;
        const bearerToken = `Bearer ${token}`;
        const configs = {
            headers: {
                Authorization: bearerToken,
            },
        };

        const response = await axios.delete(`/api/v1/teachers/${id}`, configs);
        return response.data;
    },
    import: async (file) => {
        const token = JSON.parse(localStorage.getItem('user')).token;
        const bearerToken = `Bearer ${token}`;
        const configs = {
            headers: {
                Authorization: bearerToken,
                'Content-Type': 'multipart/form-data',
            },
        };

        const bodyFormData = new FormData();
        bodyFormData.append('teachers', file);
        const response = await axios.post('/api/v1/teachers/import', bodyFormData, configs);
        return response.data;
    },
    getAllDepartments: async () => {
        const token = JSON.parse(localStorage.getItem('user')).token;
        const bearerToken = `Bearer ${token}`;
        const configs = {
            headers: {
                Authorization: bearerToken,
            },
        };
        const response = await axios.get('/api/v1/teachers/departments', configs);
        return response.data;
    },
    getAllCourse: async () => {
        const token = JSON.parse(localStorage.getItem('user')).token;
        const bearerToken = `Bearer ${token}`;
        const configs = {
            headers: {
                Authorization: bearerToken,
            },
        };
        const response = await axios.get('/api/v1/teachers/courses', configs);
        return response.data;
    },
};

export default TeacherAdminService;
