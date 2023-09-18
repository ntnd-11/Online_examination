import { ArrowBackIcon } from '@chakra-ui/icons';
import { Box, FormControl, FormLabel, Input, Text, Button, Select, useToast, Icon, Textarea } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ApiStatus from '../../constants/ApiStatus';
import TeacherService from '../../services/TeacherService';
import { FaCloudUploadAlt, FaFileAlt } from 'react-icons/fa';

function CreateExam() {
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState();
    const [time, setTime] = useState();
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();
    const [examClass, setExamClass] = useState();
    const [examClasses, setExamClasses] = useState([]);
    const [description, setDescription] = useState();
    const [examFile, setExamFile] = useState();
    const toast = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        TeacherService.getAllExamClassesWithoutPagination()
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
                    setExamClasses(response.data);
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

    const handleCreateNewExam = () => {
        setIsLoading(true);
        TeacherService.createNewExam(name, time, startTime, endTime, examClass, description, examFile)
            .then((response) => {
                setIsLoading(false);
                if (response.status !== ApiStatus.SUCCESS) {
                    toast({
                        title: response.message,
                        status: 'error',
                        position: 'bottom',
                        duration: 5000,
                        isClosable: true,
                    });
                } else {
                    toast({
                        title: response.message,
                        status: 'success',
                        position: 'bottom',
                        duration: 5000,
                        isClosable: true,
                    });
                    navigate('/exam-management');
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
            <Box display={'flex'}>
                <Link to="/exam-management">
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
                    Tạo bài thi
                </Text>
            </Box>
            <Box pl={8} pr={8}>
                <Box display={'flex'} justifyContent={'space-between'}>
                    <FormControl mr={8} isRequired>
                        <FormLabel>Tên bài thi</FormLabel>
                        <Input onChange={(e) => setName(e.target.value)} />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Thời gian (phút)</FormLabel>
                        <Input onChange={(e) => setTime(e.target.value)} />
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
                <FormControl>
                    <FormLabel>Mô tả</FormLabel>
                    <Textarea
                        placeholder="Exam description (introduction, ...)"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Lớp thi</FormLabel>
                    <Select onChange={(e) => setExamClass(e.target.value)} placeholder="Select exam class code">
                        {examClasses.map((e, i) => {
                            return (
                                <option key={i} value={e.id}>
                                    {e.code}
                                </option>
                            );
                        })}
                    </Select>
                </FormControl>
                <FormControl mt={8} mr={8} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <FormLabel
                        display={'flex'}
                        alignItems="center"
                        borderWidth={2}
                        padding={2}
                        borderRadius={5}
                        _hover={{ cursor: 'pointer' }}
                    >
                        <Icon as={FaCloudUploadAlt} mr={2} />
                        Tải lên file bài thi
                    </FormLabel>
                    <Input
                        onChange={(e) => setExamFile(e.target.files[0])}
                        type={'file'}
                        aria-hidden="true"
                        display={'none'}
                    />
                </FormControl>
                {examFile && (
                    <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                        <Icon as={FaFileAlt} mr={2} />
                        <Text>{examFile.name}</Text>
                    </Box>
                )}
            </Box>
            <Box display={'flex'} justifyContent={'center'} mt={8}>
                <Button
                    color={'white'}
                    bgColor={'#54A1E4'}
                    _hover={{ opacity: '0.9' }}
                    onClick={handleCreateNewExam}
                    isLoading={isLoading}
                >
                    Thêm mới
                </Button>
            </Box>
        </Box>
    );
}

export default CreateExam;
