import { Box, Radio, RadioGroup, Text } from '@chakra-ui/react';

function Question(props) {
    return (
        <Box mt={4}>
            <Text fontWeight={'500'}>Câu {props.index}:</Text>
            <Text>{props.data.question}</Text>
            <Box>
                <RadioGroup flexDirection={'column'} display={'flex'} ml={5}>
                    <Radio value="1">
                        <Text
                            color={props.data.Answers[0].isCorrect ? 'green' : ''}
                            fontWeight={props.data.Answers[0].isCorrect ? '500' : ''}
                        >
                            A. {props.data.Answers[0].description}
                        </Text>
                    </Radio>
                    <Radio value="2" mt={3}>
                        <Text
                            color={props.data.Answers[1].isCorrect ? 'green' : ''}
                            fontWeight={props.data.Answers[1].isCorrect ? '500' : ''}
                        >
                            B. {props.data.Answers[1].description}
                        </Text>
                    </Radio>
                    <Radio value="3" mt={3}>
                        <Text
                            color={props.data.Answers[2].isCorrect ? 'green' : ''}
                            fontWeight={props.data.Answers[2].isCorrect ? '500' : ''}
                        >
                            C. {props.data.Answers[2].description}
                        </Text>
                    </Radio>
                    <Radio value="4" mt={3}>
                        <Text
                            color={props.data.Answers[3].isCorrect ? 'green' : ''}
                            fontWeight={props.data.Answers[3].isCorrect ? '500' : ''}
                        >
                            D. {props.data.Answers[3].description}
                        </Text>
                    </Radio>
                </RadioGroup>
            </Box>
        </Box>
    );
}

export default Question;
