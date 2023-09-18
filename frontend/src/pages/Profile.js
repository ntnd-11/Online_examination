import { Box, Button, Text, useToast } from '@chakra-ui/react';
import { Avatar } from '@chakra-ui/avatar';
import store from '../store/store';
import UserRole from '../constants/UserRole';
import { useEffect, useState } from 'react';
import TeacherService from '../services/TeacherService';
import ApiStatus from '../constants/ApiStatus';
import { getDateMonthYear, getTime } from '../utils/DateUtils';
import { useNavigate } from 'react-router';

function Profile() {
    const { user } = store.getState().authReducer;
    const [upcomingExamClass, setUpcomingExamClass] = useState();
    const toast = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        TeacherService.getUpcomingExamClasses()
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
    }, [toast]);

    const handleChangePasswordClick = () => {
        navigate('/change-password');
    };

    return (
        <Box>
            {/* User name */}
            <Box mr={4}>
                {/* <Avatar name="Kola Tioluwani" src="https://bit.ly/tioluwani-kolawole" /> */}
                <Box
                    bg={'white'}
                    borderRadius={5}
                    pt={4}
                    pb={4}
                    pl={4}
                    pr={4}
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                >
                    <Box display={'flex'} alignItems={'center'}>
                        <Avatar size={'md'} name={user.fullname} />
                        <Text color={'#C02424'} fontWeight={600} ml={4} fontSize={24}>
                            {user.fullname}
                        </Text>
                    </Box>
                    <Box>
                        <Button bgColor={'transparent'} _hover={{}} onClick={handleChangePasswordClick}>
                            <Text>Đổi mật khẩu</Text>
                        </Button>
                    </Box>
                </Box>
                <Box display={'flex'} justifyContent={'space-between'} flex={1}>
                    {/* User detail */}
                    <Box bg={'white'} borderRadius={5} pt={4} pb={4} pl={4} pr={4} mt={4} flex={0.49}>
                        <Text color={'#C02424'} fontWeight={600} ml={4} fontSize={24} textAlign="center">
                            Thông tin chi tiết
                        </Text>
                        {user.role === UserRole.STUDENT ? (
                            <Box>
                                <Text pt={2} pb={2}>
                                    Họ và tên: {user.fullname}
                                </Text>
                                <Text pt={2} pb={2}>
                                    MSSV: {user.code}
                                </Text>
                                <Text pt={2} pb={2}>
                                    Email: {user.email}
                                </Text>
                                <Text pt={2} pb={2}>
                                    Số điện thoại: {user.phoneNumber}
                                </Text>
                                <Text pt={2} pb={2}>
                                    Ngày sinh: {user.dateOfBirth}
                                </Text>
                                <Text pt={2} pb={2}>
                                    Giới tính: {user.gender}
                                </Text>
                                <Text pt={2} pb={2}>
                                    Dân tộc: {user.ethnic}
                                </Text>
                            </Box>
                        ) : (
                            <Box>
                                <Text pt={2} pb={2}>
                                    Họ và tên: {user.fullname}
                                </Text>
                                <Text pt={2} pb={2}>
                                    Email: {user.email}
                                </Text>
                                <Text pt={2} pb={2}>
                                    Số điện thoại: {user.phoneNumber}
                                </Text>
                                <Text pt={2} pb={2}>
                                    Ngày sinh: {user.dateOfBirth}
                                </Text>
                                <Text pt={2} pb={2}>
                                    Giới tính: {user.gender}
                                </Text>
                                <Text pt={2} pb={2}>
                                    Dân tộc: {user.ethnic}
                                </Text>
                            </Box>
                        )}
                    </Box>
                    {/* Course */}
                    <Box bg={'white'} borderRadius={5} pt={4} pb={4} pl={4} pr={4} mt={4} flex={0.49}>
                        <Text color={'#C02424'} fontWeight={600} ml={4} fontSize={24} textAlign="center" mb={2}>
                            Lớp thi sắp tới
                        </Text>
                        <Box>
                            {upcomingExamClass && (
                                <Box
                                    borderWidth={2}
                                    padding="4"
                                    borderRadius={10}
                                    _hover={{
                                        background: 'white',
                                        opacity: '0.8',
                                        cursor: 'pointer',
                                    }}
                                    mt={2}
                                    mb={2}
                                >
                                    <Text color={'#C02424'} fontWeight={600}>
                                        {upcomingExamClass.name}
                                    </Text>
                                    <Text fontSize={12}>
                                        Ngày thi: {getTime(upcomingExamClass.startTime)} ngày{' '}
                                        {getDateMonthYear(upcomingExamClass.startTime)}
                                    </Text>
                                </Box>
                            )}
                        </Box>
                    </Box>
                </Box>
                <Box bg={'white'} borderRadius={5} mt={4} pt={4} pl={4} pb={4}>
                    <Text color={'#C02424'} fontWeight={600} fontSize={24}>
                        Thông tin login
                    </Text>
                    <Box>
                        <Box mt={2} mb={2}>
                            <Text fontWeight={550}>Lần đầu tiên truy cập vào trang</Text>
                            <Text>Sunday, 8 August 2021, 3:09 PM (1 year 135 days)</Text>
                        </Box>
                        <Box mt={2} mb={2}>
                            <Text fontWeight={550}>Lần gần nhất truy cập vào trang</Text>
                            <Text>Thursday, 22 December 2022, 1:48 PM (now)</Text>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default Profile;
