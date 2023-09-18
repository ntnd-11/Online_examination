import { Box } from '@chakra-ui/react';

function ExamLayout({ children }) {
    return (
        <Box marginTop="4" marginLeft={4} marginBottom={4} bgColor={'ye'} w={'100%'}>
            {children}
        </Box>
    );
}

export default ExamLayout;
