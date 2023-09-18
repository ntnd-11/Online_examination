import { Box, Text } from '@chakra-ui/react';

function Exam(props) {
    return (
        <Box borderWidth={2} p={4} cursor={'pointer'} borderRadius={5} onClick={props.onClick} mt={4}>
            <Text color={'#C02424'} fontWeight={'500'}>
                {props.data.name}
            </Text>
            <Text>Thời gian bắt đầu: {props.data.startTime}</Text>
            <Text>Thời gian thi: {props.data.time} phút</Text>
        </Box>
    );
}

export default Exam;
