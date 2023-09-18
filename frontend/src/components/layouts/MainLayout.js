import { Box } from '@chakra-ui/react';
import SideBar from '../SideBar';

function MainLayout({ children }) {
    return (
        <Box display={'flex'} flex={1} width={'100%'}>
            {/* <Box> */}
            <SideBar />
            <Box marginTop="4" marginLeft={4} marginBottom={4} width={'75%'} bgColor={'ye'}>
                {children}
            </Box>
        </Box>
    );
}

export default MainLayout;
