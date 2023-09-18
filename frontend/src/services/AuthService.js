import axios from '../configs/axios.config';

const AuthService = {
    login: async (username, password, role) => {
        const submitRole = parseInt(role);
        const response = await axios.post('/api/v1/auth/signin', { username, password, role: submitRole });

        if (response.data.data && response.data.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data.data));
        }
        return response.data;
    },

    logout: async () => {
        localStorage.removeItem('user');
    },

    changePassword: async (oldPassword, newPassword) => {
        const token = JSON.parse(localStorage.getItem('user')).token;
        const bearerToken = `Bearer ${token}`;
        const configs = {
            headers: {
                Authorization: bearerToken,
                'Content-Type': 'application/json',
            },
        };

        const data = {
            oldPassword,
            newPassword,
        };

        const response = await axios.post('/api/v1/auth/change-password', data, configs);
        return response.data;
    },
};

export default AuthService;
