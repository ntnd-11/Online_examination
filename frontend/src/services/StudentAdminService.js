import axios from '../configs/axios.config';

const StudentAdminService = {
    getAll: async (page, perPage) => {
        const token = JSON.parse(localStorage.getItem('user')).token;
        const bearerToken = `Bearer ${token}`;
        const configs = {
            headers: {
                Authorization: bearerToken,
            },
        };
        const response = await axios.get(`/api/v1/students?page=${page}&perPage=${perPage}`, configs);
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
        const response = await axios.get(`/api/v1/students/recently-added`, configs);
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

        const response = await axios.get(`/api/v1/students/${id}`, configs);
        return response.data;
    },
    getByCode: async (code) => {
        const token = JSON.parse(localStorage.getItem('user')).token;
        const bearerToken = `Bearer ${token}`;
        const configs = {
            headers: {
                Authorization: bearerToken,
            },
        };

        const response = await axios.get(`/api/v1/students/code/${code}`, configs);
        return response.data;
    },
    create: async (
        code,
        username,
        password,
        fullname,
        citizenIdentification,
        email,
        phoneNumber,
        dateOfBirth,
        ethnic,
        gender,
        cpa,
        generation,
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
            code,
            username,
            password,
            fullname,
            citizenIdentification,
            email,
            phoneNumber,
            dateOfBirth,
            ethnic,
            gender,
            cpa,
            generation,
        };
        const response = await axios.post('/api/v1/students', data, configs);
        return response.data;
    },
    update: async (
        id,
        code,
        username,
        fullname,
        citizenIdentification,
        email,
        phoneNumber,
        dateOfBirth,
        ethnic,
        gender,
        cpa,
        generation,
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
            code,
            username,
            fullname,
            citizenIdentification,
            email,
            phoneNumber,
            dateOfBirth,
            ethnic,
            gender,
            cpa,
            generation,
        };
        const response = await axios.put(`/api/v1/students/${id}`, data, configs);
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

        const response = await axios.delete(`/api/v1/students/${id}`, configs);
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
        bodyFormData.append('students', file);
        const response = await axios.post('/api/v1/students/import', bodyFormData, configs);
        return response.data;
    },
};

export default StudentAdminService;
