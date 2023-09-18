import { Box, Button, Spinner, Text, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation, Link } from 'react-router-dom';
import StudentService from '../../services/StudentService';
import store from '../../store/store';
import StudentExamClassService from '../../services/StudentExamClassService';
import ApiStatus from '../../constants/ApiStatus';
import { ArrowBackIcon } from '@chakra-ui/icons';

function StartExam() {
    const { user } = store.getState().authReducer;
    const navigate = useNavigate();
    const toast = useToast();
    const { id } = useParams(); // id cua exam
    const { state } = useLocation();
    const [exam, setExam] = useState();
    const [isLoadingStart, setIsLoadingStart] = useState(false);
    const [isExamFinished, setIsExamFinished] = useState(false);

    const { examClass } = state || {};

    const handleStartExam = (id) => {
        setIsLoadingStart(true);

        StudentService.startExam(examClass.id, user.id, id)
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
                    navigate(`/exams/${id}/start`, { state: { examClass } });
                }
                setIsLoadingStart(false);
            })
            .catch((err) => {
                setIsLoadingStart(false);
                toast({
                    title: err.message,
                    status: 'error',
                    position: 'bottom',
                    duration: 5000,
                    isClosable: true,
                });
            });
    };

    useEffect(() => {
        const exam = examClass.Exams.filter((e, index) => {
            return parseInt(e.id) === parseInt(id);
        })[0];

        setExam(exam);
        StudentExamClassService.getByExamClassIdAndStudentId(examClass.id, user.id)
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
                    setIsExamFinished(response.data.isFinish);
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
    }, [examClass.Exams, id, toast, examClass.id, user.id]);

    if (!exam) {
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
                    <Link to={`/exam-class/${examClass.id}/`}>
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
                        Bài thi: {exam.name}
                    </Text>
                </Box>

                {/* Mô tả ngắn về môn thi, bài thi, bao gồm nút bắt đầu thi  */}
                <Box bg={'white'} mt={4} mr={4} borderRadius={5} pt={4} pb={4} pl={4} pr={4} overflow={'auto'}>
                    <Text textAlign={'center'} fontWeight={600} fontSize={24}>
                        Mô tả
                    </Text>
                    <Text>{exam.description}</Text>
                    <Box mt={8} textAlign={'center'}>
                        {isExamFinished ? (
                            <Text fontWeight={'500'}>Bài thi đã kết thúc</Text>
                        ) : (
                            <Button
                                bgColor={'#54A1E4'}
                                color={'white'}
                                _hover={{ opacity: 0.9 }}
                                onClick={() => handleStartExam(id)}
                                isLoading={isLoadingStart}
                            >
                                Bắt đầu bài thi
                            </Button>
                        )}
                    </Box>
                </Box>
            </Box>
        );
    }
}

export default StartExam;
