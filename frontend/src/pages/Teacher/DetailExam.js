import { ArrowBackIcon } from '@chakra-ui/icons';
import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Text,
    Button,
    Select,
    useToast,
    Icon,
    Spinner,
    Textarea,
} from '@chakra-ui/react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ApiStatus from '../../constants/ApiStatus';
import TeacherService from '../../services/TeacherService';
import { FaCloudUploadAlt, FaFileAlt, FaFileDownload } from 'react-icons/fa';
import Question from '../../components/Question';

function DetailExam() {
    const { id } = useParams();

    const [exam, setExam] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingDownload, setIsLoadingDownload] = useState(false);
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

        TeacherService.getExamById(id)
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
                    setExam(response.data);
                    setName(response.data.name);
                    setTime(response.data.time);
                    setStartTime(response.data.startTime);
                    setEndTime(response.data.endTime);
                    setExamClass(response.data.ExamClass.id);
                    setDescription(response.data.description);
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
    }, [toast, id]);

    const handleUpdateExam = () => {
        setIsLoading(true);
        TeacherService.updateExamById(id, name, time, startTime, endTime, examClass, description, examFile)
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

    const handleDownLoadTemplate = () => {
        setIsLoadingDownload(true);
        TeacherService.downloadImportExamTemplate()
            .then((response) => {
                const url = window.URL.createObjectURL(new Blob([response]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'import-exam-template.xlsx');
                document.body.appendChild(link);
                link.click();
                setIsLoadingDownload(false);
            })
            .catch((err) => {
                setIsLoadingDownload(false);
                toast({
                    title: err.message,
                    status: 'error',
                    position: 'bottom',
                    duration: 5000,
                    isClosable: true,
                });
            });
    };

    if (!exam) {
        return <Spinner />;
    } else {
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
                        Thông tin bài thi
                    </Text>
                </Box>
                <Box pl={8} pr={8}>
                    <Box display={'flex'} justifyContent={'space-between'}>
                        <FormControl mr={8} isRequired>
                            <FormLabel>Tên</FormLabel>
                            <Input value={name} onChange={(e) => setName(e.target.value)} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Thời gian (phút)</FormLabel>
                            <Input value={time} onChange={(e) => setTime(e.target.value)} />
                        </FormControl>
                    </Box>
                    <Box display={'flex'} justifyContent={'space-between'}>
                        <FormControl mr={8} isRequired>
                            <FormLabel>Thời gian bắt đầu</FormLabel>
                            <Input
                                value={startTime}
                                placeholder="Select start time"
                                type="datetime-local"
                                onChange={(e) => setStartTime(e.target.value)}
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Thời gian kết thúc</FormLabel>
                            <Input
                                value={endTime}
                                placeholder="Select end time"
                                type="datetime-local"
                                onChange={(e) => setEndTime(e.target.value)}
                            />
                        </FormControl>
                    </Box>
                    <FormControl>
                        <FormLabel>Mô tả</FormLabel>
                        <Textarea
                            value={description}
                            placeholder="Exam description (introduction, ...)"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Lớp thi</FormLabel>
                        <Select
                            value={exam.ExamClass.id}
                            onChange={(e) => {
                                setExamClass(e.target.value);
                            }}
                            placeholder="Select exam class code"
                        >
                            {examClasses.map((e, i) => {
                                return (
                                    <option key={i} value={e.id}>
                                        {e.code}
                                    </option>
                                );
                            })}
                        </Select>
                    </FormControl>
                    <Box mt={4}>
                        <Text textColor={'red'}>
                            Nếu bạn tải lên file câu hỏi mới, tất cả các câu hỏi của bài thi này sẽ bị xóa và thay thế
                            bởi câu hỏi trong file mới tải lên của bạn
                        </Text>
                        <Box textAlign={'center'} mt={2}>
                            <Button
                                bgColor={'#54a1e4'}
                                color={'white'}
                                _hover={{ opacity: 0.9 }}
                                onClick={handleDownLoadTemplate}
                                isLoading={isLoadingDownload}
                            >
                                <Icon as={FaFileDownload} mr={2} />
                                <Text>Tải xuống mẫu file</Text>
                            </Button>
                        </Box>
                        <FormControl mt={4} mr={8} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                            <FormLabel
                                display={'flex'}
                                alignItems="center"
                                borderWidth={2}
                                padding={2}
                                borderRadius={5}
                                _hover={{ cursor: 'pointer' }}
                            >
                                <Icon as={FaCloudUploadAlt} mr={2} />
                                Tải lên file câu hỏi
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
                    <Box>
                        <Text fontSize={18} fontWeight={'500'}>
                            Danh sách câu hỏi
                        </Text>
                        <Box>
                            {exam.Questions.length <= 0 ? (
                                <Box>
                                    <Text>Chưa có câu hỏi cho đề thi này</Text>
                                </Box>
                            ) : (
                                <Box>
                                    {exam.Questions.map((question, index) => {
                                        return <Question key={index} data={question} index={index + 1} />;
                                    })}
                                </Box>
                            )}
                        </Box>
                    </Box>
                </Box>
                <Box display={'flex'} justifyContent={'center'} mt={8}>
                    <Button
                        color={'white'}
                        bgColor={'#54A1E4'}
                        _hover={{ opacity: '0.9' }}
                        onClick={handleUpdateExam}
                        isLoading={isLoading}
                    >
                        Cập nhật
                    </Button>
                </Box>
            </Box>
        );
    }
}

export default DetailExam;
