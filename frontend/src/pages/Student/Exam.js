import {
    Box,
    Text,
    RadioGroup,
    Radio,
    Button,
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
import { Avatar } from '@chakra-ui/avatar';
import store from '../../store/store';
import { useEffect, useState } from 'react';
import StudentService from '../../services/StudentService';
import { useNavigate, useParams } from 'react-router-dom';
import ApiStatus from '../../constants/ApiStatus';
import TeacherService from '../../services/TeacherService';
import Countdown from 'react-countdown';
function Exam() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [exam, setExam] = useState();
    const toast = useToast();
    const { id } = useParams(); // id cua exam
    const { user } = store.getState().authReducer;
    const [answers, setAnswers] = useState([]);
    const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
    const [time, setTime] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        TeacherService.getExamById(id)
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
                    const currentTime = new Date().getTime();
                    const startTime = new Date(response.data.startTime).getTime();
                    const endTime = new Date(response.data.endTime).getTime();
                    if (currentTime < startTime) {
                        navigate('/exam-class');
                        toast({
                            title: 'Chưa đến thời gian làm bài',
                            status: 'error',
                            position: 'bottom',
                            duration: 5000,
                            isClosable: true,
                        });
                    } else if (currentTime > endTime) {
                        navigate('/exam-class');
                        toast({
                            title: 'Đã kết thúc thời gian làm bài',
                            status: 'error',
                            position: 'bottom',
                            duration: 5000,
                            isClosable: true,
                        });
                    } else {
                        setExam(response.data);
                        setTime(parseInt(response.data.time) * 60 * 1000);
                        setAnswers(
                            response.data.Questions.map((q, i) => {
                                return [q.id, ''];
                            }),
                        );
                    }
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
    }, [user, toast, id]);

    const handleSelectAnswer = (questionId, value) => {
        const updatedAns = [...answers].map((ans) => {
            if (ans[0] === questionId) {
                return [ans[0], value];
            } else {
                return ans;
            }
        });
        setAnswers(updatedAns);
    };

    const handleFinishAttempt = () => {
        setIsLoadingSubmit(true);
        StudentService.submitExam(answers, id)
            .then((response) => {
                setIsLoadingSubmit(false);
                if (response.status !== ApiStatus.SUCCESS) {
                    toast({
                        title: response.message,
                        status: 'error',
                        position: 'bottom',
                        duration: 5000,
                        isClosable: true,
                    });
                } else {
                    toast({
                        title: response.message,
                        status: 'success',
                        position: 'bottom',
                        duration: 5000,
                        isClosable: true,
                    });
                    navigate('/result');
                }
            })
            .catch((err) => {
                setIsLoadingSubmit(false);
                toast({
                    title: err.message,
                    status: 'error',
                    position: 'bottom',
                    duration: 5000,
                    isClosable: true,
                });
            });
    };

    const handleTimeFinish = () => {
        StudentService.submitExam(answers, id)
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
                    toast({
                        title: response.message,
                        status: 'success',
                        position: 'bottom',
                        duration: 5000,
                        isClosable: true,
                    });
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
            })
            .finally(() => {
                navigate('/result');
            });
    };

    if (!exam) {
        return <Spinner />;
    } else {
        return (
            <Box>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Nộp bài thi</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Text>Bạn có chắc chắn muốn nộp bài thi?</Text>
                        </ModalBody>

                        <ModalFooter>
                            <Button
                                colorScheme="blue"
                                mr={3}
                                isLoading={isLoadingSubmit}
                                onClick={() => handleFinishAttempt()}
                            >
                                Nộp bài
                            </Button>
                            <Button colorScheme="red" mr={3} onClick={onClose}>
                                Hủy
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
                {/*User name */}
                <Box mr={4}>
                    <Box
                        bg={'white'}
                        borderRadius={5}
                        pt={4}
                        pb={4}
                        pl={4}
                        pr={4}
                        display={'flex'}
                        alignItems={'center'}
                    >
                        <Avatar size={'md'} name={user.fullname} />
                        <Text color={'#C02424'} fontWeight={600} ml={4} fontSize={24}>
                            {user.fullname} {user.code}
                        </Text>
                    </Box>
                </Box>

                <Box flexDirection={'row'} display={'flex'} pt={4} flex={1}>
                    {/*List questions and name course */}
                    <Box
                        bg={'#ffffff'}
                        borderRadius={5}
                        pt={4}
                        pb={4}
                        pl={4}
                        pr={4}
                        mr={4}
                        display={'flex'}
                        flex={0.25}
                        flexDirection={'column'}
                        h={'500px'}
                    >
                        {/*Name course */}
                        <Box borderWidth={2} padding={'3'} m={-4} mb={10}>
                            <Text color={'#C02424'} fontWeight={600} ml={4} fontSize={24} align={'center'}>
                                {exam.ExamClass.name}
                            </Text>
                            <Text color={'#C02424'} fontWeight={600} ml={4} fontSize={24} align={'center'}>
                                {exam.name}
                            </Text>
                        </Box>
                        <Box>
                            <Box
                                borderWidth={1.5}
                                borderColor={'red'}
                                borderRadius={10}
                                display={'flex'}
                                padding={1.5}
                                right={8}
                                justifyContent={'center'}
                            >
                                {/* {CountdownTimer} */}
                                <Countdown
                                    date={Date.now() + time}
                                    onTick={(e) => {
                                        setTime(e.total);
                                    }}
                                    onComplete={(e) => handleTimeFinish()}
                                />
                            </Box>
                        </Box>
                        {/** Finish attempt */}
                        <Box onClick={() => onOpen()}>
                            <Text
                                color={'#C02424'}
                                fontWeight={600}
                                pd={4}
                                mt={4}
                                mb={4}
                                _hover={{
                                    background: 'white',
                                    opacity: '0.8',
                                    cursor: 'pointer',
                                }}
                            >
                                Finish attempt...
                            </Text>
                        </Box>
                    </Box>

                    {/**Question detail */}
                    <Box
                        bg={'#ffffff'}
                        borderRadius={5}
                        padding={'4'}
                        mr={4}
                        display={'flex'}
                        flex={0.75}
                        flexDirection={'column'}
                    >
                        {exam.Questions.map((question, index) => {
                            return (
                                <Box key={index}>
                                    {/**Number of question */}
                                    <Box>
                                        <Text color={'#C02424'} fontWeight={600} fontSize={20} mt={10}>
                                            Câu {index + 1}:
                                        </Text>
                                    </Box>
                                    <Box borderWidth={2} padding={'3'} borderRadius={10} mt={4} mb={2}>
                                        {/** Contet of Question */}
                                        <Text>{question.question}</Text>
                                    </Box>
                                    {/**choises */}
                                    <Box mt={5}>
                                        <Text fontWeight={600}>Chọn 1 đáp án:</Text>
                                        <RadioGroup
                                            onChange={(value) => {
                                                handleSelectAnswer(question.id, value);
                                            }}
                                            flexDirection={'column'}
                                            display={'flex'}
                                            ml={10}
                                            mt={5}
                                        >
                                            <Radio value={question.Answers[0].id.toString()}>
                                                A. {question.Answers[0].description}{' '}
                                            </Radio>
                                            <Radio value={question.Answers[1].id.toString()} mt={3}>
                                                B. {question.Answers[1].description}
                                            </Radio>
                                            <Radio value={question.Answers[2].id.toString()} mt={3}>
                                                C. {question.Answers[2].description}
                                            </Radio>
                                            <Radio value={question.Answers[3].id.toString()} mt={3}>
                                                D. {question.Answers[3].description}
                                            </Radio>
                                        </RadioGroup>
                                    </Box>
                                </Box>
                            );
                        })}
                    </Box>
                </Box>
                <Box bg={'white'} borderRadius={5} mt={4} pt={4} pl={4} pb={4} mr={4}>
                    <Text color={'#C02424'} fontWeight={600} fontSize={24}>
                        {exam.ExamClass.name}
                    </Text>
                    <Box>
                        <Box mt={2} mb={2}>
                            <Text fontWeight={550}>Ngày thi: {exam.startTime}</Text>
                            <Text ml={5}>Thời gian thi: {exam.time} minutes</Text>
                            <Text ml={5}>Số câu hỏi: {exam.Questions.length}</Text>
                            <Text ml={5}>Thời gian bắt đầu: {exam.startTime}</Text>
                            <Text ml={5}>Thời gian kết thúc: {exam.endTime}</Text>
                        </Box>
                    </Box>
                </Box>
            </Box>
        );
    }
}

export default Exam;
