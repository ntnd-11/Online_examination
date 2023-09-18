import { Box, Image, Link, Text, useToast } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import TeacherAdminService from '../services/TeacherAdminService';
import { getDateMonthYear } from '../utils/DateUtils';
import StudentAdminService from '../services/StudentAdminService';

function AdminHome() {
    const [recentAddedTeachers, setRecentAddedTeachers] = useState([]);
    const [recentAddedStudents, setRecentAddedStudents] = useState([]);
    const toast = useToast();

    useEffect(() => {
        TeacherAdminService.getRecentlyAdded()
            .then((response) => {
                setRecentAddedTeachers(response.data);
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

        StudentAdminService.getRecentlyAdded()
            .then((response) => {
                setRecentAddedStudents(response.data);
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
            <Box bg={'white'} mr={4} borderRadius={5} pt={4} pb={4} pl={4} pr={4}>
                <Text color={'#C02424'} fontWeight={600} ml={4} fontSize={24}>
                    Xin chào,
                </Text>
                <Text color={'#C02424'} fontWeight={600} ml={4} fontSize={24}>
                    Chào mừng bạn đến với HES (Hust Examination System)
                </Text>
            </Box>

            <Box mt={4} bg={'white'} mr={4} borderRadius={5} pt={4} pb={4} pl={4} pr={4} display="flex">
                <Box flex={1} borderWidth={2} borderRadius={5} mr={2} p={4}>
                    <Text color={'#C02424'} fontWeight={500} textAlign={'center'} fontSize={18}>
                        Giảng viên được thêm gần đây
                    </Text>
                    <Box>
                        {recentAddedTeachers.map((teacher, index) => {
                            return (
                                <Box
                                    key={index}
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
                                        {teacher.fullname}
                                    </Text>
                                    <Text fontSize={12}>Email: {teacher.email}</Text>
                                    <Text fontSize={12}>Created at: {getDateMonthYear(teacher.createdAt)}</Text>
                                </Box>
                            );
                        })}
                    </Box>
                </Box>
                <Box flex={1} borderWidth={2} borderRadius={5} ml={2} p={4}>
                    <Text color={'#C02424'} fontWeight={500} textAlign={'center'} fontSize={18}>
                        Sinh viên được thêm gần đây
                    </Text>
                    <Box>
                        {recentAddedStudents.map((student, index) => {
                            return (
                                <Box
                                    key={index}
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
                                        {student.fullname}
                                    </Text>
                                    <Text fontSize={12}>MSSV: {student.code}</Text>
                                    <Text fontSize={12}>Ngày tạo mới: {getDateMonthYear(student.createdAt)}</Text>
                                </Box>
                            );
                        })}
                    </Box>
                </Box>
            </Box>
            <Box mt={4} bg={'white'} mr={4} borderRadius={5} pt={4} pb={4} pl={4} pr={4}>
                <Text color={'#C02424'} fontWeight={500} textAlign={'center'} fontSize={18}>
                    Về chúng tôi
                </Text>
                <Box mt={6} mb={6} display={'flex'} justifyContent={'space-evenly'}>
                    <Box
                        display={'flex'}
                        flexDir="column"
                        alignItems={'center'}
                        justifyContent="center"
                        borderWidth={2}
                        borderRadius={5}
                        p={4}
                    >
                        <Image
                            src={process.env.REACT_APP_BACKEND_URL + '/hongson.jpg'}
                            borderRadius="full"
                            boxSize="200px"
                            alt="Dan Abramov"
                        />
                        <Box>
                            <Text fontWeight={500} mt={4} textAlign={'center'}>
                                Nguyễn Hồng Sơn - 20194156
                            </Text>
                            <Box>
                                <Text>Lớp: Khoa học Máy tính 01 - K64</Text>
                                <Text>
                                    Facebook:
                                    <Link href="https://facebook.com/son.nh194156" isExternal>
                                        Sơn Nguyễn <ExternalLinkIcon mx="2px" />
                                    </Link>
                                </Text>
                            </Box>
                        </Box>
                    </Box>

                    <Box
                        display={'flex'}
                        flexDir="column"
                        alignItems={'center'}
                        justifyContent="center"
                        borderWidth={2}
                        borderRadius={5}
                        p={4}
                    >
                        <Image
                            src={process.env.REACT_APP_BACKEND_URL + '/duongtai.jpg'}
                            borderRadius="full"
                            boxSize="200px"
                            alt="Dan Abramov"
                        />
                        <Box>
                            <Text fontWeight={500} mt={4} textAlign={'center'}>
                                Dương Văn Tài - 20194156
                            </Text>
                            <Box>
                                <Text>Lớp: Khoa học Máy tính 01 - K64</Text>
                                <Text>
                                    Facebook:
                                    <Link href="https://www.facebook.com/duongtai1609" isExternal>
                                        Tài Dương <ExternalLinkIcon mx="2px" />
                                    </Link>
                                </Text>
                            </Box>
                        </Box>
                    </Box>

                    <Box
                        display={'flex'}
                        flexDir="column"
                        alignItems={'center'}
                        justifyContent="center"
                        borderWidth={2}
                        borderRadius={5}
                        p={4}
                    >
                        <Image
                            src={process.env.REACT_APP_BACKEND_URL + '/sang.jpg'}
                            borderRadius="full"
                            boxSize="200px"
                            alt="Dan Abramov"
                        />
                        <Box>
                            <Text fontWeight={500} mt={4} textAlign={'center'}>
                                Nguyễn Tống Sang - 20194156
                            </Text>
                            <Box>
                                <Text>Lớp: Khoa học Máy tính 02 - K64</Text>
                                <Text>
                                    Facebook:
                                    <Link href="https://www.facebook.com/ntnd.11" isExternal>
                                        Nguyễn Tống Sang <ExternalLinkIcon mx="2px" />
                                    </Link>
                                </Text>
                            </Box>
                        </Box>
                    </Box>

                    <Box
                        display={'flex'}
                        flexDir="column"
                        alignItems={'center'}
                        justifyContent="center"
                        borderWidth={2}
                        borderRadius={5}
                        p={4}
                    >
                        <Image
                            src={process.env.REACT_APP_BACKEND_URL + '/truongson.jpg'}
                            borderRadius="full"
                            boxSize="200px"
                            alt="Dan Abramov"
                        />
                        <Box>
                            <Text fontWeight={500} mt={4} textAlign={'center'}>
                                Nguyễn Trường Sơn - 20194156
                            </Text>
                            <Box>
                                <Text>Lớp: Khoa học Máy tính 01 - K64</Text>
                                <Text>
                                    Facebook:
                                    <Link href="https://www.facebook.com/nguyentruongson01" isExternal>
                                        Nguyễn Trường Sơn <ExternalLinkIcon mx="2px" />
                                    </Link>
                                </Text>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default AdminHome;
