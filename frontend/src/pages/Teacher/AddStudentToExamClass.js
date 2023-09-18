import { Box, Button, FormControl, FormLabel, Input, Text, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import StudentAdminService from '../../services/StudentAdminService';
import ApiStatus from '../../constants/ApiStatus';
import TeacherService from '../../services/TeacherService';
import { ArrowBackIcon } from '@chakra-ui/icons';

function AddStudentToExamClass() {
    const [student, setStudent] = useState();
    const [studentCode, setStudentCode] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isSearchLoading, setIsSearchLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();
    const { id } = useParams();

    const handleSearchStudent = (code) => {
        setIsSearchLoading(true);
        StudentAdminService.getByCode(code)
            .then((response) => {
                if (response.status !== ApiStatus.SUCCESS) {
                    setIsSearchLoading(false);
                    toast({
                        title: response.message,
                        status: 'error',
                        position: 'bottom',
                        duration: 5000,
                        isClosable: true,
                    });
                } else {
                    setIsSearchLoading(false);
                    setStudent(response.data);
                }
            })
            .catch((err) => {
                setIsSearchLoading(false);
                toast({
                    title: err.message,
                    status: 'error',
                    position: 'bottom',
                    duration: 5000,
                    isClosable: true,
                });
            });
    };

    const handleAddStudent = () => {
        setIsLoading(true);
        TeacherService.addStudentToExamClass(student.id, id)
            .then((response) => {
                if (response.status !== ApiStatus.SUCCESS) {
                    setIsLoading(false);
                    toast({
                        title: response.message,
                        status: 'error',
                        position: 'bottom',
                        duration: 5000,
                        isClosable: true,
                    });
                } else {
                    setIsLoading(false);
                    toast({
                        title: response.message,
                        status: 'success',
                        position: 'bottom',
                        duration: 5000,
                        isClosable: true,
                    });
                    navigate(`/exam-class-management/${id}`);
                }
            })
            .catch((err) => {
                setIsLoading(false);
                toast({
                    title: err.message,
                    status: 'error',
                    position: 'bottom',
                    duration: 5000,
                    isClosable: true,
                });
            });
    };

    return (
        <Box bg={'white'} mr={4} borderRadius={5} pt={4} pb={4} pl={4} pr={4} overflow={'auto'}>
            <Box display={'flex'} flexDir={'row'}>
                <Link to={`/exam-class-management/${id}`}>
                    <ArrowBackIcon
                        fontSize={30}
                        fontWeight={'600'}
                        cursor={'pointer'}
                        bgColor={'#54A1E4'}
                        color={'white'}
                        borderRadius={5}
                        mr={4}
                    />
                </Link>
                <Text fontSize={20} fontWeight={500} mb={4}>
                    Thêm sinh viên vào lớp thi
                </Text>
            </Box>
            <Box>
                <Text fontSize={18} fontWeight={500}>
                    Thông tin lớp thi
                </Text>
                <Box>
                    <Text>Mã lớp thi: 123123</Text>
                    <Text>Môn thi: Công nghệ web và dịch vụ trực tuyến</Text>
                    <Text>Ngày thi: 12/12/2022</Text>
                    <Text>Thời gian thi: 08:00 - 09:00</Text>
                </Box>
            </Box>
            <Box mt={4}>
                <Text fontSize={18} fontWeight={500}>
                    Nhập thông tin sinh viên
                </Text>
                <FormControl isRequired>
                    <FormLabel>MSSV</FormLabel>
                    <Box display={'flex'} flexDir={'row'}>
                        <Input value={studentCode} onChange={(e) => setStudentCode(e.target.value)} mr={2} />
                        <Button onClick={() => handleSearchStudent(studentCode)} isLoading={isSearchLoading}>
                            Tìm kiếm
                        </Button>
                    </Box>
                </FormControl>
                {student && (
                    <Box>
                        <Text fontWeight={'500'}>Thông tin sinh viên</Text>
                        <Text>Mã sinh viên: {student.code}</Text>
                        <Text>Tên sinh viên: {student.fullname}</Text>
                        <Text>Ngày sinh: {student.dateOfBirth}</Text>
                        <Text>Giới tính: {student.gender}</Text>
                        <Text>Dân tộc: {student.ethnic}</Text>
                        <Text>SĐT: {student.phoneNumber}</Text>
                        <Text>CCCD: {student.citizenIdentification}</Text>
                        <Text>CPA: {student.cpa}</Text>
                        <Text>Khóa: {student.generation}</Text>
                    </Box>
                )}
                <Box textAlign={'center'}>
                    <Button
                        mt={4}
                        bgColor={'#54A1E4'}
                        color={'white'}
                        _hover={{ opacity: 0.9 }}
                        isLoading={isLoading}
                        onClick={handleAddStudent}
                    >
                        Thêm sinh viên
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

export default AddStudentToExamClass;
