import { Box, Button, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import ExamClass from '../../components/ExamClass';
import { useEffect, useState } from 'react';
import store from '../../store/store';
import StudentAdminService from '../../services/StudentAdminService';
import ApiStatus from '../../constants/ApiStatus';
import StudentService from '../../services/StudentService';
import { getDateMonthYear, getTime } from '../../utils/DateUtils';

function ExamClassList() {
    const navigate = useNavigate();
    const toast = useToast();
    const [addedExamClasses, setAddedExamClasses] = useState([]);
    const [upcomingExamClass, setUpcomingExamClass] = useState();

    const { user } = store.getState().authReducer;

    const handleExamClassClick = (id) => {
        navigate(`/exam-class/${id}`);
    };

    // Lấy ra danh sách lớp thi mà sinh viên được add vào

    const handleClickExamClass = (examClassId) => {
        navigate(`/exam-class/${examClassId}`);
    };
    useEffect(() => {
        StudentService.getUpcomingExamClass()
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
                    setUpcomingExamClass(response.data);
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
        StudentAdminService.getById(user.id)
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
                    setAddedExamClasses(response.data.ExamClasses);
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
    }, [toast, user.id]);

    return (
        <Box>
            {/* Tên bài thi  */}
            <Box bg={'white'} mr={4} borderRadius={5} pt={4} pb={4} pl={4} pr={4} overflow={'auto'}>
                <Text color={'#C02424'} fontWeight={600} fontSize={24}>
                    Danh sách lớp thi
                </Text>
            </Box>

            {/* Mô tả ngắn về môn thi, bài thi, bao gồm nút bắt đầu thi  */}
            <Box bg={'white'} mt={4} mr={4} borderRadius={5} pt={4} pb={4} pl={4} pr={4} overflow={'auto'}>
                <Box mb={4}>
                    <Text color={'#C02424'} fontWeight={600} fontSize={24}>
                        Lớp thi sắp diễn ra
                    </Text>
                    {upcomingExamClass && (
                        <ExamClass
                            data={upcomingExamClass}
                            onClick={() => handleExamClassClick(upcomingExamClass.id)}
                        />
                    )}
                </Box>
                <Box>
                    <Text color={'#C02424'} fontWeight={600} fontSize={24}>
                        Danh sách lớp thi
                    </Text>
                    {/* <Grid templateColumns="repeat(1, 1fr)" gap={4}>
                        <ExamClass />
                        <ExamClass />
                        <ExamClass />
                        <ExamClass />
                        <ExamClass />
                        <ExamClass />
                        <ExamClass />
                        <ExamClass />
                    </Grid> */}
                    <Box overflow={'auto'}>
                        <TableContainer fontSize={12}>
                            <Table>
                                <Thead>
                                    <Tr>
                                        <Th>STT</Th>
                                        <Th>Mã lớp thi</Th>
                                        <Th>Tên lớp thi</Th>
                                        <Th>Thời gian bắt đầu</Th>
                                        <Th>Thời gian kết thúc</Th>
                                        <Th>Học phần</Th>
                                        <Th>Giảng viên</Th>
                                        <Th>Thao tác</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {addedExamClasses.length <= 0 ? (
                                        <Td textAlign={'center'} fontSize={14} fontWeight={'500'} colSpan={8}>
                                            <Text>Chưa có sinh viên trong lớp thi</Text>
                                        </Td>
                                    ) : (
                                        addedExamClasses.map((examClass, index) => {
                                            return (
                                                <Tr key={index}>
                                                    <Td>{index + 1}</Td>
                                                    <Td>{examClass.code}</Td>
                                                    <Td>{examClass.name}</Td>
                                                    <Td>
                                                        {getTime(examClass.startTime)} ngày{' '}
                                                        {getDateMonthYear(examClass.startTime)}
                                                    </Td>
                                                    <Td>
                                                        {getTime(examClass.endTime)} ngày{' '}
                                                        {getDateMonthYear(examClass.endTime)}
                                                    </Td>
                                                    <Td>{examClass.Course.name}</Td>
                                                    <Td>{examClass.Teacher.fullname}</Td>
                                                    <Td>
                                                        <Button
                                                            bg={'#54A1E4'}
                                                            color="white"
                                                            mr={4}
                                                            _hover={{ opacity: 0.9 }}
                                                            fontSize={12}
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                handleClickExamClass(examClass.id);
                                                            }}
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
        </Box>
    );
}

export default ExamClassList;
