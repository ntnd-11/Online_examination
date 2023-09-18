import axios from '../configs/axios.config';

const StudentExamClassService = {
    getByExamClassIdAndStudentId: async (examClassId, studentId) => {
        const token = JSON.parse(localStorage.getItem('user')).token;
        const bearerToken = `Bearer ${token}`;
        const configs = {
            headers: {
                Authorization: bearerToken,
            },
        };

        const response = await axios.get(
            `/api/v1/student-exam-class?examClassId=${examClassId}&studentId=${studentId}`,
            configs,
        );
        return response.data;
    },
};

export default StudentExamClassService;
