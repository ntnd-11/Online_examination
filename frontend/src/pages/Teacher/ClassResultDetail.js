import { Box, Text } from '@chakra-ui/layout';
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table';
import { useToast } from '@chakra-ui/toast';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import TeacherService from '../../services/TeacherService';
import ApiStatus from '../../constants/ApiStatus';
import { Link } from 'react-router-dom';
import { ArrowBackIcon } from '@chakra-ui/icons';

function ClassResultDetail() {
    const [results, setResults] = useState([]);
    const toast = useToast();
    const { id } = useParams(); // id cua exam class

    useEffect(() => {
        TeacherService.getClassResult(id)
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
                    setResults(response.data);
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

    return (
        <Box bg={'white'} mr={4} borderRadius={5} pt={4} pb={4} pl={4} pr={4} overflow={'auto'}>
            <Box display={'flex'} flexDir={'row'}>
                <Link to="/class-result">
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
                                    <Th>Họ và tên</Th>
                                    <Th>MSSV</Th>
                                    <Th>Tên bài thi</Th>
                                    <Th>Điểm</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {results.length <= 0 ? (
                                    <Tr>
                                        <Td colSpan={6} textAlign={'center'} fontWeight={'500'} fontSize={14}>
                                            Chưa có lớp thi nào
                                        </Td>
                                    </Tr>
                                ) : (
                                    results.map((result, index) => {
                                        return (
                                            <Tr key={index}>
                                                <Td>{index + 1}</Td>
                                                <Td>{result.Student.fullname}</Td>
                                                <Td>{result.Student.code}</Td>
                                                <Td>{result.Exam.name}</Td>
                                                <Td>{result.score}</Td>
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

export default ClassResultDetail;
