import {
    Box,
    Button,
    Icon,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useDisclosure,
    useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FaPlus, FaAngleRight, FaAngleLeft } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import TeacherService from '../../services/TeacherService';
import ApiStatus from '../../constants/ApiStatus';

function ExamClassManagement() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [examClasses, setExamClasses] = useState([]);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const [numPages, setNumPages] = useState([]);
    const [selectedExamClassId, setSelectedExamClassId] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();

    const handleDetailClick = (id) => {
        navigate(`/exam-class-management/${id}`);
    };

    const handleDeleteClick = async (id) => {
        setIsLoading(true);
        TeacherService.removeExamClass(id)
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
                    // setTeachers(teachers.filter((t) => t.id !== id));
                    window.location.reload();
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
        onClose();
    };

    useEffect(() => {
        TeacherService.getAllExamClasses(page, perPage)
            .then((response) => {
                if (response.status === ApiStatus.SUCCESS) {
                    let countPages;
                    if (response.data.count % perPage === 0) {
                        countPages = parseInt(response.data.count / perPage);
                    } else {
                        countPages = parseInt(response.data.count / perPage) + 1;
                    }
                    setNumPages(
                        Array(countPages)
                            .fill()
                            .map((_, i) => i + 1),
                    );
                    setExamClasses(response.data.examClasses);
                } else {
                    throw new Error('Can not fetch all exam classes');
                }
            })
            .catch((err) => {
                setExamClasses([]);
                toast({
                    title: err.message,
                    status: 'error',
                    position: 'bottom',
                    duration: 5000,
                    isClosable: true,
                });
            });
    }, [page, perPage, toast]);

    return (
        <Box bg={'white'} mr={4} borderRadius={5} pt={4} pb={4} pl={4} pr={4} overflow={'auto'}>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Xóa lớp thi</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>Bạn có chắc chắn muốn xóa lớp thi này?</Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme="red"
                            mr={3}
                            isLoading={isLoading}
                            onClick={(e) => {
                                e.preventDefault();
                                handleDeleteClick(selectedExamClassId);
                            }}
                        >
                            Xác nhận
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Box marginBottom={4}>
                <Text fontSize={20} fontWeight={500} mb={4}>
                    Quản lý lớp thi
                </Text>
                <Box display={'flex'}>
                    <Link
                        to="/create-exam-class"
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
                    >
                        <Icon mr={2} as={FaPlus} />
                        <Text>Thêm lớp thi</Text>
                    </Link>
                </Box>
                <Box mt={4}>
                    <Text>Số lượng lớp thi trong 1 trang</Text>
                    <Select onChange={(e) => setPerPage(e.target.value)}>
                        <option value={5} defaultValue>
                            5
                        </option>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                        <option value={20}>20</option>
                    </Select>
                </Box>
            </Box>
            <Box marginBottom={4}>
                <Box overflow={'auto'}>
                    <TableContainer fontSize={12}>
                        <Table>
                            <Thead>
                                <Tr>
                                    <Th>STT</Th>
                                    <Th>Mã lớp</Th>
                                    <Th>Tên lớp</Th>
                                    <Th>Học phần</Th>
                                    <Th>Giảng viên</Th>
                                    <Th>Thao tác</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {examClasses.length <= 0 ? (
                                    <Tr>
                                        <Td colSpan={6} textAlign={'center'} fontWeight={'500'} fontSize={14}>
                                            Chưa có lớp thi nào
                                        </Td>
                                    </Tr>
                                ) : (
                                    examClasses.map((examClass, index) => {
                                        return (
                                            <Tr key={index}>
                                                <Td>{index + 1}</Td>
                                                <Td>{examClass.code}</Td>
                                                <Td>{examClass.name}</Td>
                                                <Td>{examClass.Course.name}</Td>
                                                <Td>{examClass.Teacher ? examClass.Teacher.fullname : ''}</Td>
                                                <Td>
                                                    <Button
                                                        bg={'#54A1E4'}
                                                        color="white"
                                                        mr={4}
                                                        _hover={{ opacity: 0.9 }}
                                                        fontSize={12}
                                                        onClick={() => handleDetailClick(examClass.id)}
                                                    >
                                                        Chi tiết
                                                    </Button>
                                                    <Button
                                                        bg={'red'}
                                                        color="white"
                                                        _hover={{ opacity: 0.9 }}
                                                        fontSize={12}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            setSelectedExamClassId(examClass.id);
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
            <Box display={'flex'} justifyContent={'center'}>
                <Button mr={4} display={page > 1 ? '' : 'none'} onClick={(e) => setPage(page - 1)}>
                    <Icon as={FaAngleLeft} />
                </Button>
                {numPages.map((p, i) => (
                    <Button key={i} mr={4} onClick={(e) => setPage(p)} className={page === p ? 'Page-Seleted' : ''}>
                        {p}
                    </Button>
                ))}
                <Button display={page < numPages.length ? '' : 'none'} onClick={(e) => setPage(page + 1)}>
                    <Icon as={FaAngleRight} />
                </Button>
            </Box>
        </Box>
    );
}

export default ExamClassManagement;
