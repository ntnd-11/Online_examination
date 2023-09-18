import { Box, Container, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Login from '../../containers/Login';
import store from '../../store/store';
import { useEffect } from 'react';

function AuthLayout({ children }) {
    const isLoggedIn = store.getState().authReducer.isLoggedIn;
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/');
        }
    }, [isLoggedIn, navigate]);

    return (
        <Container maxW="xl" centerContent>
            <Box
                display={'flex'}
                justifyContent={'center'}
                p={3}
                bg={'white'}
                w="100%"
                m="40px 0 15px 0"
                borderRadius="lg"
                borderWidth="1px"
            >
                <Text fontSize={'4xl'} fontFamily="Inter" color={'black'} fontWeight={600}>
                    Examination System
                </Text>
            </Box>
            <Box bg={'white'} w="100%" p={4} borderRadius="lg" borderWidth="1px">
                <Text fontSize={'4xl'} fontFamily="Inter" color={'black'} textAlign={'center'}>
                    Đăng nhập
                </Text>
                <Login />
            </Box>
        </Container>
    );
}

export default AuthLayout;
