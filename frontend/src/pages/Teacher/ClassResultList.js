import { Button } from '@chakra-ui/button';
import { Box, Text } from '@chakra-ui/layout';
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table';
import { useEffect, useState } from 'react';
import TeacherService from '../../services/TeacherService';
import { useToast } from '@chakra-ui/toast';
import ApiStatus from '../../constants/ApiStatus';
import { useNavigate } from 'react-router';

function ClassResultList() {
    const [examClasses, setExamClasses] = useState([]);
    const toast = useToast();
    const navigate = useNavigate();

    const handleDetailClick = (id) => {
        // input: id cua exam class
        navigate(`/class-result/${id}`);
    };

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

    return (
        <Box bg={'white'} mr={4} borderRadius={5} pt={4} pb={4} pl={4} pr={4} overflow={'auto'}>
            <Box>
                <Text fontSize={20} fontWeight={500} mb={4}>
                    Kết quả thi của các lớp
                </Text>
            </Box>
            <Box>
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
        </Box>
    );
}

export default ClassResultList;
