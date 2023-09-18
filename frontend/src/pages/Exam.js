import { Box, Text, RadioGroup, Radio, Button, ButtonGroup } from '@chakra-ui/react';
import { Avatar } from '@chakra-ui/avatar';
function Exam() {
    return (
        <Box>
            {/*User name */}
            <Box mr={4}>
                <Box bg={'white'} borderRadius={5} pt={4} pb={4} pl={4} pr={4} display={'flex'} alignItems={'center'}>
                    <Avatar size={'md'} name="Duong Van Tai" />
                    <Text color={'#C02424'} fontWeight={600} ml={4} fontSize={24}>
                        Duong Van Tai 20194366
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
                >
                    {/*Name course */}
                    <Box borderWidth={2} padding={'3'} m={-4} mb={10}>
                        <Text color={'#C02424'} fontWeight={600} ml={4} fontSize={24} align={'center'}>
                            Công nghệ Web
                        </Text>
                    </Box>
                    {/**List questions */}
                    <Box flexDirection={'colum'} justifyContent={'center'} align={'center'}>
                        <ButtonGroup flexDirection={'row'}>
                            <Button w={'12'} h={'12'}>
                                1
                            </Button>
                            <Button w={'12'} h={'12'}>
                                2
                            </Button>
                            <Button w={'12'} h={'12'}>
                                3
                            </Button>
                            <Button w={'12'} h={'12'}>
                                4
                            </Button>
                            <Button w={'12'} h={'12'}>
                                5
                            </Button>
                        </ButtonGroup>
                        <ButtonGroup flexDirection={'row'} mt={2}>
                            <Button w={'12'} h={'12'}>
                                6
                            </Button>
                            <Button w={'12'} h={'12'}>
                                7
                            </Button>
                            <Button w={'12'} h={'12'}>
                                8
                            </Button>
                            <Button w={'12'} h={'12'}>
                                9
                            </Button>
                            <Button w={'12'} h={'12'}>
                                10
                            </Button>
                        </ButtonGroup>
                        <ButtonGroup flexDirection={'row'} mt={2}>
                            <Button w={'12'} h={'12'}>
                                11
                            </Button>
                            <Button w={'12'} h={'12'}>
                                12
                            </Button>
                            <Button w={'12'} h={'12'}>
                                13
                            </Button>
                            <Button w={'12'} h={'12'}>
                                14
                            </Button>
                            <Button w={'12'} h={'12'}>
                                15
                            </Button>
                        </ButtonGroup>
                        <ButtonGroup flexDirection={'row'} mt={2}>
                            <Button w={'12'} h={'12'}>
                                16
                            </Button>
                            <Button w={'12'} h={'12'}>
                                17
                            </Button>
                            <Button w={'12'} h={'12'}>
                                18
                            </Button>
                            <Button w={'12'} h={'12'}>
                                19
                            </Button>
                            <Button w={'12'} h={'12'}>
                                20
                            </Button>
                        </ButtonGroup>
                        <ButtonGroup flexDirection={'row'} mt={2}>
                            <Button w={'12'} h={'12'}>
                                21
                            </Button>
                            <Button w={'12'} h={'12'}>
                                22
                            </Button>
                            <Button w={'12'} h={'12'}>
                                23
                            </Button>
                            <Button w={'12'} h={'12'}>
                                24
                            </Button>
                            <Button w={'12'} h={'12'}>
                                25
                            </Button>
                        </ButtonGroup>
                        <ButtonGroup flexDirection={'row'} mt={2}>
                            <Button w={'12'} h={'12'}>
                                26
                            </Button>
                            <Button w={'12'} h={'12'}>
                                27
                            </Button>
                            <Button w={'12'} h={'12'}>
                                28
                            </Button>
                            <Button w={'12'} h={'12'}>
                                29
                            </Button>
                            <Button w={'12'} h={'12'}>
                                30
                            </Button>
                        </ButtonGroup>
                        <ButtonGroup flexDirection={'row'} mt={2}>
                            <Button w={'12'} h={'12'}>
                                31
                            </Button>
                            <Button w={'12'} h={'12'}>
                                32
                            </Button>
                            <Button w={'12'} h={'12'}>
                                33
                            </Button>
                            <Button w={'12'} h={'12'}>
                                34
                            </Button>
                            <Button w={'12'} h={'12'}>
                                35
                            </Button>
                        </ButtonGroup>
                        <ButtonGroup flexDirection={'row'} mt={2}>
                            <Button w={'12'} h={'12'}>
                                36
                            </Button>
                            <Button w={'12'} h={'12'}>
                                37
                            </Button>
                            <Button w={'12'} h={'12'}>
                                37
                            </Button>
                            <Button w={'12'} h={'12'}>
                                39
                            </Button>
                            <Button w={'12'} h={'12'}>
                                40
                            </Button>
                        </ButtonGroup>
                    </Box>
                    {/** Finish attempt */}
                    <Box>
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
                    <Box>
                        {/** Countdown */}
                        <Box
                            borderWidth={1.5}
                            borderColor={'red'}
                            borderRadius={10}
                            position={'absolute'}
                            display={'flex'}
                            padding={1.5}
                            right={8}
                        >
                            <Text fontWeight={600} fontSize={18} color={'red'}>
                                35:14:45
                            </Text>
                        </Box>
                        {/**Number of question */}
                        <Box>
                            <Text color={'#C02424'} fontWeight={600} fontSize={20} mt={10}>
                                Question 1:
                            </Text>
                        </Box>
                        <Box borderWidth={2} padding={'3'} borderRadius={10} mt={4} mb={2}>
                            {/** Contet of Question */}
                            <Text>
                                Trong các kiểu kiến trúc server đa luồng, kiến trúc luồng cho mỗi kết nối
                                (thread-per-connection) có ưu điểm gì? Trong các kiểu kiến trúc server đa luồng, kiến
                                trúc luồng cho mỗi kết nối (thread-per-connection) có ưu điểm gì? Trong các kiểu kiến
                                trúc server đa luồng, kiến trúc luồng cho mỗi kết nối (thread-per-connection) , kiến
                                trúc luồng cho mỗi kết nối (thread-per-connection) có ưu điểm gì?
                            </Text>
                        </Box>
                        {/**choises */}
                        <Box mt={5}>
                            <Text fontWeight={600}>Select one:</Text>
                            <RadioGroup flexDirection={'column'} display={'flex'} ml={10} mt={5}>
                                <Radio value="1">A. Không cần có hàng đợi </Radio>
                                <Radio value="2" mt={3}>
                                    B. Không tốn nhiều overhead để hủy vdtbjoh elghrtà tạo luồng
                                </Radio>
                                <Radio value="3" mt={3}>
                                    C. Thực hiện cân bằng tải giữa các luồng worker tốt
                                </Radio>
                                <Radio value="4" mt={3}>
                                    D. Băng thông có thể đạt mức tối đa
                                </Radio>
                                <Radio value="5" mt={3}>
                                    E. Băng thông có thể đạt mức tối đa
                                </Radio>
                            </RadioGroup>
                        </Box>
                    </Box>
                    <Box flexDirection={'row'} display={'flex'} position={'relative'} mt={40} mb={2}>
                        {/**Pervious page */}
                        <Box
                            pl={4}
                            _hover={{
                                background: 'white',
                                opacity: '0.8',
                                cursor: 'pointer',
                            }}
                        >
                            <Text color={'#C02424'} fontWeight={600} pd={4} mt={4}>
                                Pervious page
                            </Text>
                        </Box>
                        {/**Next page */}
                        <Box
                            pr={4}
                            position={'absolute'}
                            right={4}
                            _hover={{
                                background: 'white',
                                opacity: '0.8',
                                cursor: 'pointer',
                            }}
                        >
                            <Text color={'#C02424'} fontWeight={600} pd={4} mt={4}>
                                Next page
                            </Text>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box bg={'white'} borderRadius={5} mt={4} pt={4} pl={4} pb={4} mr={4}>
                <Text color={'#C02424'} fontWeight={600} fontSize={24}>
                    Công nghệ Web
                </Text>
                <Box>
                    <Box mt={2} mb={2}>
                        <Text fontWeight={550}>Date: Monday, 9 January 2023</Text>
                        <Text ml={5}>Time: 60 minutes</Text>
                        <Text ml={5}>Questions: 45</Text>
                        <Text ml={5}>Time Start: 13:30:00</Text>
                        <Text ml={5}>Time Finish: 14:30:00</Text>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default Exam;
