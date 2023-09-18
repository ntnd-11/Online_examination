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
import { FaFileImport, FaPlus, FaAngleRight, FaAngleLeft } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import StudentAdminService from '../../services/StudentAdminService';
import ApiStatus from '../../constants/ApiStatus';

function StudentManagement() {
    /*return (
        <Box bg={'white'} mr={4} borderRadius={5} pt={4} pb={4} pl={4} pr={4} overflow={'auto'}>
            <Box marginBottom={4}>
                <Text fontSize={20} fontWeight={500} mb={4}>
                    Student management
                </Text>
                <Box>
                    <Button bg={'#54A1E4'} color="white" mr={4} _hover={{ opacity: 0.9 }}>
                        <Icon mr={2} as={FaPlus} />
                        Add new student
                    </Button>
                    <Button
                        bg={'white'}
                        borderWidth={2}
                        borderColor={'#54A1E4'}
                        color={'#54A1E4'}
                        _hover={{ opacity: 0.9 }}
                    >
                        <Icon mr={2} as={FaFileImport} />
                        Import excel file
                    </Button>
                </Box>
            </Box>
            <Box marginBottom={4}>
                <Box overflow={'auto'}>
                    <TableContainer fontSize={12}>
                        <Table>
                            <Thead>
                                <Tr>
                                    <Th>STT</Th>
                                    <Th>Code</Th>
                                    <Th>Fullname</Th>
                                    <Th>D.O.B</Th>
                                    <Th>Ethnic</Th>
                                    <Th>Gender</Th>
                                    <Th>Email</Th>
                                    <Th>Phone number</Th>
                                    <Th>CPA</Th>
                                    <Th>Action</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Tr>
                                    <Td>1</Td>
                                    <Td>20194156</Td>
                                    <Td>Nguyen Hong Son</Td>
                                    <Td>29/01/2001</Td>
                                    <Td>Kinh</Td>
                                    <Td>Male</Td>
                                    <Td>sonnguyenhong291@gmail.com</Td>
                                    <Td>0967874928</Td>
                                    <Td>4.0</Td>
                                    <Td>
                                        <Button
                                            bg={'#54A1E4'}
                                            color="white"
                                            mr={4}
                                            _hover={{ opacity: 0.9 }}
                                            fontSize={12}
                                        >
                                            Detail
                                        </Button>
                                        <Button bg={'red'} color="white" _hover={{ opacity: 0.9 }} fontSize={12}>
                                            Delete
                                        </Button>
                                    </Td>
                                </Tr>
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </Box>
    );*/
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isLoading, setIsLoading] = useState(false);
    const [students, setStudents] = useState([]);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const [numPages, setNumPages] = useState([]);
    const navigate = useNavigate();
    const toast = useToast();
    const [selectedStudentId, setSelectedStudentId] = useState();

    const handleDetailClick = async (id) => {
        navigate(`/admin/student-management/${id}`);
    };

    const handleDeleteClick = async (id) => {
        setIsLoading(true);
        StudentAdminService.remove(id)
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
        StudentAdminService.getAll(page, perPage)
            .then((response) => {
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
                setStudents(response.data.students);
            })
            .catch((err) => {
                setStudents([]);
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
                    <ModalHeader>Xóa sinh viên</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>Bạn có chắc chắn muốn xóa sinh viên?</Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme="red"
                            mr={3}
                            isLoading={isLoading}
                            onClick={(e) => {
                                e.preventDefault();
                                handleDeleteClick(selectedStudentId);
                            }}
                        >
                            Xác nhận
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Box marginBottom={4}>
                <Text fontSize={20} fontWeight={500} mb={4}>
                    Quản lý sinh viên
                </Text>
                <Box display={'flex'}>
                    <Link
                        to="/admin/student-management/create-student"
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
                        <Text>Thêm mới</Text>
                    </Link>
                    <Link
                        to="/admin/student-management/import-file"
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderColor: '#54A1E4',
                            borderWidth: '2px',
                            padding: '8px',
                            borderRadius: '5px',
                            color: '#54A1E4',
                            fontWeight: '500',
                        }}
                    >
                        <Icon mr={2} as={FaFileImport} />
                        <Text>Tải lên file excel</Text>
                    </Link>
                </Box>
                <Box mt={4}>
                    <Text>Số lượng sinh viên trong 1 trang</Text>
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
                                    <Th>MSSV</Th>
                                    <Th>Họ và tên</Th>
                                    <Th>Ngày sinh</Th>
                                    <Th>Dân tộc</Th>
                                    <Th>Giới tính</Th>
                                    <Th>Email</Th>
                                    <Th>Số điện thoại</Th>
                                    <Th>CPA</Th>
                                    <Th>Khóa</Th>
                                    <Th>Thao tác</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {students.map((student, index) => {
                                    return (
                                        <Tr key={index}>
                                            <Td>{index + 1}</Td>
                                            <Td>{student.code}</Td>
                                            <Td>{student.fullname}</Td>
                                            <Td>{student.dateOfBirth}</Td>
                                            <Td>{student.ethnic}</Td>
                                            <Td>{student.gender}</Td>
                                            <Td>{student.email}</Td>
                                            <Td>{student.phoneNumber}</Td>
                                            <Td>{student.cpa}</Td>
                                            <Td>{student.generation}</Td>
                                            <Td>
                                                <Button
                                                    bg={'#54A1E4'}
                                                    color="white"
                                                    mr={4}
                                                    _hover={{ opacity: 0.9 }}
                                                    fontSize={12}
                                                    onClick={() => handleDetailClick(student.id)}
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
                                                        setSelectedStudentId(student.id);
                                                        onOpen();
                                                    }}
                                                >
                                                    Xóa
                                                </Button>
                                            </Td>
                                        </Tr>
                                    );
                                })}
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

export default StudentManagement;
