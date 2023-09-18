import { Box, Text, useToast } from '@chakra-ui/react';
import { Table, Thead, Tbody, Tr, Th, Td, TableCaption } from '@chakra-ui/react';
import store from '../../store/store';
import { useEffect, useState } from 'react';
import StudentService from '../../services/StudentService';
import ApiStatus from '../../constants/ApiStatus';

function ResultList() {
    const { user } = store.getState().authReducer;
    const toast = useToast();
    const [results, setResults] = useState([]);

    useEffect(() => {
        StudentService.getResultList()
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
    }, [toast]);

    return (
        <Box>
            {/* Tên bài thi  */}
            <Box bg={'white'} mr={4} borderRadius={5} pt={4} pb={4} pl={4} pr={4} overflow={'auto'}>
                <Text color={'#C02424'} fontWeight={600} fontSize={24}>
                    Bảng điểm của {user.fullname} - {user.code}
                </Text>
            </Box>

            {/* Mô tả ngắn về môn thi, bài thi, bao gồm nút bắt đầu thi  */}
            <Box bg={'white'} mt={4} mr={4} borderRadius={5} pt={4} pb={4} pl={4} pr={4} overflow={'auto'}>
                <Table variant="simple">
                    <TableCaption>Bảng điểm của {user.fullname}</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Học phần</Th>
                            <Th>Tên bài thi</Th>
                            <Th>Mã lớp thi</Th>
                            <Th>Điểm</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {results.length <= 0 ? (
                            <Tr>
                                <Td colSpan={4}>Sinh viên chưa có kết quả thi</Td>
                            </Tr>
                        ) : (
                            results.map((result, index) => {
                                return (
                                    <Tr key={index}>
                                        <Td>{result.Exam.ExamClass.Course.name}</Td>
                                        <Td>{result.Exam.name}</Td>
                                        <Td>{result.Exam.ExamClass.code}</Td>
                                        <Td>{result.score}</Td>
                                    </Tr>
                                );
                            })
                        )}
                    </Tbody>
                </Table>
            </Box>
        </Box>
    );
}

export default ResultList;
