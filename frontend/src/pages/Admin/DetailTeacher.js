import { ArrowBackIcon } from '@chakra-ui/icons';
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
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
} from '@chakra-ui/react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { DATE, MONTH, YEAR } from '../../constants/DateConstant';
import { ETHNIC } from '../../constants/EthnicConstant';
import { GENDER } from '../../constants/GenderConstant';
import { useEffect, useState } from 'react';
import TeacherAdminService from '../../services/TeacherAdminService';
import ApiStatus from '../../constants/ApiStatus';

function CreateTeacher() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { id } = useParams();
    const [teacher, setTeacher] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState();
    const [fullname, setFullname] = useState();
    const [citizenIdentification, setCitizenIdentification] = useState();
    const [email, setEmail] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [date, setDate] = useState();
    const [month, setMonth] = useState();
    const [year, setYear] = useState();
    const [ethnic, setEthnic] = useState();
    const [gender, setGender] = useState();
    let dateOfBirth;
    const toast = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        TeacherAdminService.getById(id)
            .then((response) => {
                setTeacher(response.data);
                setUsername(response.data.username);
                setFullname(response.data.fullname);
                setCitizenIdentification(response.data.citizenIdentification);
                setEmail(response.data.email);
                setPhoneNumber(response.data.phoneNumber);
                setDate(response.data.dateOfBirth.split('/')[0]);
                setMonth(response.data.dateOfBirth.split('/')[1]);
                setYear(response.data.dateOfBirth.split('/')[2]);
                setEthnic(response.data.ethnic);
                setGender(response.data.gender);
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
    }, [id, toast]);

    const handleEdit = () => {
        setIsLoading(true);
        dateOfBirth = `${date}/${month}/${year}`;
        TeacherAdminService.update(
            id,
            username,
            fullname,
            citizenIdentification,
            email,
            phoneNumber,
            dateOfBirth,
            ethnic,
            gender,
        )
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
                        title: 'Update teacher successfully',
                        status: 'success',
                        position: 'bottom',
                        duration: 5000,
                        isClosable: true,
                    });
                    navigate('/admin/teacher-management');
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

    if (!teacher) {
        return <Spinner />;
    } else {
        return (
            <Box bg={'white'} mr={4} borderRadius={5} pt={4} pb={4} pl={4} pr={4} overflow={'auto'}>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Sửa thông tin</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Text>Bạn có chắc chắn muốn sửa thông tin của giảng viên?</Text>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} onClick={handleEdit} isLoading={isLoading}>
                                Xác nhận
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
                <Box display={'flex'}>
                    <Link to="/admin/teacher-management">
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
                        Thông tin chi tiết giảng viên {teacher.fullname}
                    </Text>
                </Box>
                <Box pl={8} pr={8}>
                    {/* <Box display={'flex'} justifyContent={'space-between'}> */}
                    <FormControl mr={8} isRequired>
                        <FormLabel>Tài khoản</FormLabel>
                        <Input defaultValue={teacher.username} onChange={(e) => setUsername(e.target.value)} />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Họ và tên</FormLabel>
                        <Input defaultValue={teacher.fullname} onChange={(e) => setFullname(e.target.value)} />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>CMND hoặc CCCD</FormLabel>
                        <Input
                            defaultValue={teacher.citizenIdentification}
                            onChange={(e) => setCitizenIdentification(e.target.value)}
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input defaultValue={teacher.email} type={'email'} onChange={(e) => setEmail(e.target.value)} />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Số điện thoại</FormLabel>
                        <Input defaultValue={teacher.phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Ngày sinh</FormLabel>
                        <Box display={'flex'} justifyContent={'space-between'}>
                            <Select
                                defaultValue={teacher.dateOfBirth ? teacher.dateOfBirth.split('/')[0] : date}
                                onChange={(e) => setDate(e.target.value)}
                                placeholder="Date"
                                mr={8}
                            >
                                {DATE.map((date, index) => (
                                    <option value={date} key={index}>
                                        {date}
                                    </option>
                                ))}
                            </Select>
                            <Select
                                defaultValue={teacher.dateOfBirth ? teacher.dateOfBirth.split('/')[1] : month}
                                onChange={(e) => setMonth(e.target.value)}
                                placeholder="Month"
                                mr={8}
                            >
                                {MONTH.map((month, index) => (
                                    <option value={month} key={index}>
                                        {month}
                                    </option>
                                ))}
                            </Select>
                            <Select
                                defaultValue={teacher.dateOfBirth ? teacher.dateOfBirth.split('/')[2] : year}
                                onChange={(e) => setYear(e.target.value)}
                                placeholder="Year"
                            >
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
                            <Select
                                defaultValue={teacher.ethnic || ''}
                                onChange={(e) => setEthnic(e.target.value)}
                                placeholder="Ethnic"
                            >
                                {ETHNIC.map((ethnic, index) => (
                                    <option value={ethnic} key={index}>
                                        {ethnic}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Giới tính</FormLabel>
                            <Select
                                defaultValue={teacher.gender || ''}
                                onChange={(e) => setGender(e.target.value)}
                                placeholder="Gender"
                            >
                                <option value={GENDER.MALE}>Nam</option>
                                <option value={GENDER.FEMALE}>Nữ</option>
                                <option value={GENDER.CUSTOM}>Khác</option>
                            </Select>
                        </FormControl>
                    </Box>
                </Box>
                <Box display={'flex'} justifyContent={'center'} mt={8}>
                    <Button color={'white'} bgColor={'#54A1E4'} _hover={{ opacity: '0.9' }} onClick={onOpen}>
                        Sửa thông tin
                    </Button>
                </Box>
            </Box>
        );
    }
}

export default CreateTeacher;
