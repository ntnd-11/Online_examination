import { Box, Text } from '@chakra-ui/react';
import { getDateMonthYear, getTime } from '../../utils/DateUtils';

function ExamClass(props) {
    return (
        <Box borderWidth={2} p={4} cursor={'pointer'} borderRadius={5} onClick={props.onClick}>
            <Text color={'#C02424'} fontWeight={'500'}>
                Tên lớp: {props.data.name}
            </Text>
            <Text>Mã lớp: {props.data.code}</Text>
            <Text>
                Thời gian bắt đầu: {getTime(props.data.startTime)} ngày {getDateMonthYear(props.data.startTime)}
            </Text>
        </Box>
    );
}

export default ExamClass;
