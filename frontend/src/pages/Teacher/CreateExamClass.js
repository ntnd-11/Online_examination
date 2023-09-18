import { ArrowBackIcon } from '@chakra-ui/icons';
import { Box, FormControl, FormLabel, Input, Text, Button, Select, useToast } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import TeacherAdminService from '../../services/TeacherAdminService';
import ApiStatus from '../../constants/ApiStatus';
import TeacherService from '../../services/TeacherService';
import store from '../../store/store';
import UserRole from '../../constants/UserRole';

function CreateExamClass() {
    const loggedInUser = store.getState().authReducer.user;

    const [isLoading, setIsLoading] = useState(false);
    const [courses, setCourses] = useState([]);
    const [code, setCode] = useState();
    const [name, setName] = useState();
    const [courseId, setCourseId] = useState();
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();
    const toast = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        TeacherAdminService.getAllCourse()
            .then((response) => {
                if (response.status !== ApiStatus.SUCCESS) {
                    toast({
                        title: response.message,
                        status: 'error',
                        position: 'bottom',
                        duration: 5000,
                        isClosable: true,
                    });
                } else {
                    setCourses(response.data);
                }
            })
            .catch((err) => {
                toast({
                    title: err.message,
                    status: 'error',
                    position: 'bottom',
                    duration: 5000,
                    isClosable: true,
                });
            });
    }, [toast]);

    const handleCreateNewExamClass = () => {
        setIsLoading(true);
        if (loggedInUser.role !== UserRole.TEACHER) {
            setIsLoading(false);
            toast({
                title: 'You are not allowed to create new exam class',
                status: 'error',
                position: 'bottom',
                duration: 5000,
                isClosable: true,
            });
        } else {
            TeacherService.createNewExamClass(code, name, startTime, endTime, courseId, loggedInUser.id)
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
                        navigate('/exam-class-management');
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
        }
    };

    return (
        <Box bg={'white'} mr={4} borderRadius={5} pt={4} pb={4} pl={4} pr={4} overflow={'auto'}>
            <Box display={'flex'}>
                <Link to="/exam-class-management">
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
                    Tạo lớp thi
                </Text>
            </Box>
            <Box pl={8} pr={8}>
                <Box display={'flex'} justifyContent={'space-between'}>
                    <FormControl mr={8} isRequired>
                        <FormLabel>Mã lớp</FormLabel>
                        <Input onChange={(e) => setCode(e.target.value)} />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Tên lớp</FormLabel>
                        <Input onChange={(e) => setName(e.target.value)} />
                    </FormControl>
                </Box>
                <Box display={'flex'} justifyContent={'space-between'}>
                    <FormControl mr={8} isRequired>
                        <FormLabel>Thời gian bắt đầu</FormLabel>
                        <Input
                            placeholder="Select start time"
                            type="datetime-local"
                            onChange={(e) => setStartTime(e.target.value)}
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Thời gian kết thúc</FormLabel>
                        <Input
                            placeholder="Select end time"
                            type="datetime-local"
                            onChange={(e) => setEndTime(e.target.value)}
                        />
                    </FormControl>
                </Box>
                <FormControl isRequired>
                    <FormLabel>Học phần</FormLabel>
                    <Select placeholder="Select course" onChange={(e) => setCourseId(e.target.value)}>
                        {courses.map((c, i) => {
                            return (
                                <option key={i} value={c.id}>
                                    {c.name}
                                </option>
                            );
                        })}
                    </Select>
                </FormControl>
            </Box>
            <Box display={'flex'} justifyContent={'center'} mt={8}>
                <Button
                    color={'white'}
                    bgColor={'#54A1E4'}
                    _hover={{ opacity: '0.9' }}
                    onClick={handleCreateNewExamClass}
                    isLoading={isLoading}
                >
                    Thêm mới
                </Button>
            </Box>
        </Box>
    );
}

export default CreateExamClass;
