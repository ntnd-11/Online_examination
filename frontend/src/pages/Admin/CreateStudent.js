import { ArrowBackIcon } from '@chakra-ui/icons';
import { Box, FormControl, FormLabel, Input, Text, Button, Select, useToast } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { DATE, MONTH, YEAR } from '../../constants/DateConstant';
import { ETHNIC } from '../../constants/EthnicConstant';
import { GENDER } from '../../constants/GenderConstant';
import { useState } from 'react';
import StudentAdminService from '../../services/StudentAdminService';
import ApiStatus from '../../constants/ApiStatus';

function CreateStudent() {
    const [isLoading, setIsLoading] = useState(false);
    const [code, setCode] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [fullname, setFullname] = useState();
    const [citizenIdentification, setCitizenIdentification] = useState();
    const [email, setEmail] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [date, setDate] = useState();
    const [month, setMonth] = useState();
    const [year, setYear] = useState();
    const [ethnic, setEthnic] = useState();
    const [gender, setGender] = useState();
    const [cpa, setCpa] = useState();
    const [generation, setGeneration] = useState();
    let dateOfBirth;
    const toast = useToast();
    const navigate = useNavigate();

    const handleCreateNewStudent = () => {
        setIsLoading(true);
        dateOfBirth = `${date}/${month}/${year}`;
        StudentAdminService.create(
            code,
            username,
            password,
            fullname,
            citizenIdentification,
            email,
            phoneNumber,
            dateOfBirth,
            ethnic,
            gender,
            cpa,
            generation,
        )
            .then((response) => {
                if (response.status !== ApiStatus.SUCCESS) {
                    setIsLoading(false);
                    toast({
                        title: response.data.message,
                        status: 'error',
                        position: 'bottom',
                        duration: 5000,
                        isClosable: true,
                    });
                } else {
                    setIsLoading(false);
                    toast({
                        title: 'Create new student successfully',
                        status: 'success',
                        position: 'bottom',
                        duration: 5000,
                        isClosable: true,
                    });
                    navigate('/admin/student-management');
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

    return (
        <Box bg={'white'} mr={4} borderRadius={5} pt={4} pb={4} pl={4} pr={4} overflow={'auto'}>
            <Box display={'flex'}>
                <Link to="/admin/student-management">
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
                    Thêm sinh viên
                </Text>
            </Box>
            <Box pl={8} pr={8}>
                <Box display={'flex'} justifyContent={'space-between'}>
                    <FormControl mr={8} isRequired>
                        <FormLabel>Tài khoản</FormLabel>
                        <Input onChange={(e) => setUsername(e.target.value)} />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Mật khẩu</FormLabel>
                        <Input onChange={(e) => setPassword(e.target.value)} />
                    </FormControl>
                </Box>
                <FormControl isRequired>
                    <FormLabel>MSSV</FormLabel>
                    <Input onChange={(e) => setCode(e.target.value)} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Họ và tên</FormLabel>
                    <Input onChange={(e) => setFullname(e.target.value)} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>CMND hoặc CCCD</FormLabel>
                    <Input onChange={(e) => setCitizenIdentification(e.target.value)} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input type={'email'} onChange={(e) => setEmail(e.target.value)} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Số điện thoại</FormLabel>
                    <Input onChange={(e) => setPhoneNumber(e.target.value)} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Ngày sinh</FormLabel>
                    <Box display={'flex'} justifyContent={'space-between'}>
                        <Select onChange={(e) => setDate(e.target.value)} placeholder="Date" mr={8}>
                            {DATE.map((date, index) => (
                                <option value={date} key={index}>
                                    {date}
                                </option>
                            ))}
                        </Select>
                        <Select onChange={(e) => setMonth(e.target.value)} placeholder="Month" mr={8}>
                            {MONTH.map((month, index) => (
                                <option value={month} key={index}>
                                    {month}
                                </option>
                            ))}
                        </Select>
                        <Select onChange={(e) => setYear(e.target.value)} placeholder="Year">
                            {YEAR.map((year, index) => (
                                <option value={year} key={index}>
                                    {year}
                                </option>
                            ))}
                        </Select>
                    </Box>
                </FormControl>
                <Box display={'flex'} justifyContent={'space-between'}>
                    <FormControl mr={8} isRequired>
                        <FormLabel>Dân tộc</FormLabel>
                        <Select onChange={(e) => setEthnic(e.target.value)} placeholder="Ethnic">
                            {ETHNIC.map((ethnic, index) => (
                                <option value={ethnic} key={index}>
                                    {ethnic}
                                </option>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Giới tính</FormLabel>
                        <Select onChange={(e) => setGender(e.target.value)} placeholder="Gender">
                            <option value={GENDER.MALE}>Nam</option>
                            <option value={GENDER.FEMALE}>Nữ</option>
                            <option value={GENDER.CUSTOM}>Khác</option>
                        </Select>
                    </FormControl>
                </Box>
                <FormControl mr={8} isRequired>
                    <FormLabel>CPA</FormLabel>
                    <Input onChange={(e) => setCpa(e.target.value)} />
                </FormControl>
                <FormControl mr={8} isRequired>
                    <FormLabel>Khóa</FormLabel>
                    <Input onChange={(e) => setGeneration(e.target.value)} />
                </FormControl>
            </Box>
            <Box display={'flex'} justifyContent={'center'} mt={8}>
                <Button
                    onClick={handleCreateNewStudent}
                    color={'white'}
                    bgColor={'#54A1E4'}
                    _hover={{ opacity: '0.9' }}
                    isLoading={isLoading}
                >
                    Thêm mới
                </Button>
            </Box>
        </Box>
    );
}

export default CreateStudent;
