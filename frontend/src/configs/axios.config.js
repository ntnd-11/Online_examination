import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
});

// instance.interceptors.request.use((req) => {
//     if (JSON.parse(JSON.parse(localStorage.getItem('persist:user')).userInfo)?.data?.token) {
//         req.headers.Authorization = `Bearer ${
//             JSON.parse(JSON.parse(localStorage.getItem('persist:user')).userInfo).data.token
//         }`;
//     }
//     return req;
// });

export default instance;
