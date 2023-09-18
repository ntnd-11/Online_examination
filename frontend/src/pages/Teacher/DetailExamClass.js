import { ArrowBackIcon, Icon } from '@chakra-ui/icons';
import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Text,
    Button,
    Select,
    useToast,
    Spinner,
    TableContainer,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    useDisclosure,
} from '@chakra-ui/react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import TeacherAdminService from '../../services/TeacherAdminService';
import ApiStatus from '../../constants/ApiStatus';
import TeacherService from '../../services/TeacherService';
import { FaCloudUploadAlt, FaPlus } from 'react-icons/fa';

function DetailExamClass() {
    // const loggedInUser = store.getState().authReducer.user;\
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingDelete, setIsLoadingDelete] = useState(false);
    const { id } = useParams();
    const [courses, setCourses] = useState([]);
    const [code, setCode] = useState();
    const [name, setName] = useState();
    const [courseId, setCourseId] = useState();
    const [examClass, setExamClass] = useState();
    const [students, setStudents] = useState([]);
    const [selectedStudentId, setSelectedStudentId] = useState();
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

        TeacherService.getExamClassById(id)
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
                    setExamClass(response.data);
                    setCode(response.data.code);
                    setName(response.data.name);
                    setCourseId(response.data.courseId);
                    setStudents(response.data.Students);
                    setStartTime(response.data.startTime);
                    setEndTime(response.data.endTime);
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

    const handleUpdateExamClass = () => {
        setIsLoading(true);
        TeacherService.updateExamClass(id, code, name, courseId, startTime, endTime)
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
    };

    const handleDeleteClick = (studentId) => {
        setIsLoadingDelete(true);
        TeacherService.removeStudentFromExamClass(id, studentId)
            .then((response) => {
                if (response.status !== ApiStatus.SUCCESS) {
                    setIsLoadingDelete(false);
                    toast({
                        title: response.message,
                        status: 'error',
                        position: 'bottom',
                        duration: 5000,
                        isClosable: true,
                    });
                } else {
                    setIsLoadingDelete(false);
                    toast({
                        title: response.message,
                        status: 'success',
                        position: 'bottom',
                        duration: 5000,
                        isClosable: true,
                    });
                    window.location.reload();
                }
            })
            .catch((err) => {
                setIsLoadingDelete(false);
                toast({
                    title: err.message,
                    status: 'error',
                    position: 'bottom',
                    duration: 5000,
                    isClosable: true,
                });
            });
    };

    if (!examClass) {
        return <Spinner />;
    } else {
        return (
            <Box bg={'white'} mr={4} borderRadius={5} pt={4} pb={4} pl={4} pr={4} overflow={'auto'}>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Xóa sinh viên</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Text>Bạn có chắc chắn muốn xóa sinh viên khỏi lớp thi</Text>
                        </ModalBody>

                        <ModalFooter>
                            <Button
                                colorScheme="red"
                                mr={3}
                                isLoading={isLoadingDelete}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleDeleteClick(selectedStudentId);
                                    onClose();
                                }}
                            >
                                Xác nhận
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
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
                        Cập nhật
                    </Text>
                </Box>
                <Box pl={8} pr={8}>
                    <Box display={'flex'} justifyContent={'space-between'}>
                        <FormControl mr={8} isRequired>
                            <FormLabel>Mã lớp thi</FormLabel>
                            <Input defaultValue={examClass.code} onChange={(e) => setCode(e.target.value)} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Tên lớp thi</FormLabel>
                            <Input defaultValue={examClass.name} onChange={(e) => setName(e.target.value)} />
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
                    <FormControl isRequired>
                        <FormLabel>Học phần</FormLabel>
                        <Select defaultValue={examClass.Course.id} onChange={(e) => setCourseId(e.target.value)}>
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
                <Box mt={4}>
                    <Box mb={4}>
                        <Text fontWeight={'600'}>Danh sách sinh viên trong lớp thi</Text>
                        <Box display={'flex'}>
                            <Link
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: '8px',
                                    borderRadius: '5px',
                                    marginRight: '8px',
                                    backgroundColor: '#54A1E4',
                                    color: 'white',
                                    fontWeight: '500',
                                }}
                                to={`/exam-class-management/${id}/add-student`}
                            >
                                <Icon mr={2} as={FaPlus} />
                                <Text>Thêm sinh viên vào lớp thi</Text>
                            </Link>
                            <Link
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: '8px',
                                    borderRadius: '5px',
                                    marginRight: '8px',
                                    backgroundColor: '#54A1E4',
                                    color: 'white',
                                    fontWeight: '500',
                                }}
                                to={`/exam-class-management/${id}/import-student`}
                            >
                                <Icon mr={2} as={FaCloudUploadAlt} />
                                <Text>Tải lên file sinh viên</Text>
                            </Link>
                        </Box>
                    </Box>
                    <Box overflow={'auto'}>
                        <TableContainer fontSize={12}>
                            <Table>
                                <Thead>
                                    <Tr>
                                        <Th>STT</Th>
                                        <Th>MSSV</Th>
                                        <Th>Họ và tên</Th>
                                        <Th>Thao tác</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {students.length <= 0 ? (
                                        <Td textAlign={'center'} fontSize={14} fontWeight={'500'} colSpan={4}>
                                            <Text>Chưa có sinh viên trong lớp thi</Text>
                                        </Td>
                                    ) : (
                                        students.map((student, index) => {
                                            return (
                                                <Tr key={index}>
                                                    <Td>{index + 1}</Td>
                                                    <Td>{student.code}</Td>
                                                    <Td>{student.fullname}</Td>
                                                    <Td>
                                                        <Button
                                                            bg={'red'}
                                                            color="white"
                                                            _hover={{ opacity: 0.9 }}
                                                            fontSize={12}
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                setSelectedStudentId(student.id);
                                                                onOpen();
                                                            }}
                                                        >
                                                            Xóa
                                                        </Button>
                                                    </Td>
                                                </Tr>
                                            );
                                        })
                                    )}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Box>
                <Box display={'flex'} justifyContent={'center'} mt={8}>
                    <Button
                        color={'white'}
                        bgColor={'#54A1E4'}
                        _hover={{ opacity: '0.9' }}
                        onClick={handleUpdateExamClass}
                        isLoading={isLoading}
                    >
                        Cập nhật
                    </Button>
                </Box>
            </Box>
        );
    }
}

export default DetailExamClass;
