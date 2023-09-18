import { Box, Spinner, Text, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import StudentService from '../../services/StudentService';
import ApiStatus from '../../constants/ApiStatus';
import Exam from '../../components/Exam';
import { ArrowBackIcon } from '@chakra-ui/icons';
function StudentDetailExamClass() {
    const { id } = useParams();
    const toast = useToast();
    const navigate = useNavigate();
    const [examClass, setExamClass] = useState();

    const handleClickExam = (id) => {
        navigate(`/exams/${id}/start-exam`, { state: { examClass } });
    };

    useEffect(() => {
        StudentService.getExamClassById(id)
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
                    setExamClass(response.data);
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
    }, [id, toast]);

    if (!examClass) {
        return <Spinner />;
    } else {
        return (
            <Box>
                {/* Tên bài thi  */}
                <Box
                    display={'flex'}
                    flexDir={'row'}
                    alignItems={'center'}
                    bg={'white'}
                    mr={4}
                    borderRadius={5}
                    pt={4}
                    pb={4}
                    pl={4}
                    pr={4}
                    overflow={'auto'}
                >
                    <Link to="/exam-class">
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
                    <Text fontWeight={600} fontSize={24}>
                        Lớp thi: {examClass.name}
                    </Text>
                </Box>

                {/* Mô tả ngắn về môn thi, bài thi, bao gồm nút bắt đầu thi  */}
                <Box bg={'white'} mt={4} mr={4} borderRadius={5} pt={4} pb={4} pl={4} pr={4} overflow={'auto'}>
                    <Box mb={4}>
                        <Text fontWeight={600} fontSize={24}>
                            Danh sách bài thi
                        </Text>
                    </Box>
                    <Box>
                        {examClass.Exams.map((exam, index) => {
                            return <Exam key={index} data={exam} onClick={() => handleClickExam(exam.id)} />;
                        })}
                    </Box>
                </Box>
            </Box>
        );
    }
}

export default StudentDetailExamClass;
