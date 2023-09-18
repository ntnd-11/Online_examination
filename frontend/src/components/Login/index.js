import {
    Button,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Radio,
    RadioGroup,
    VStack,
    useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/action_creators/AuthActions';
import store from '../../store/store';
import UserRole from '../../constants/UserRole';

function Login() {
    const [show, setShow] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [isLoadingLogin, setIsLoadingLogin] = useState(false);

    const toast = useToast();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleShowClick = () => {
        setShow(!show);
    };

    const submitLoginForm = async (e) => {
        e.preventDefault();
        setIsLoadingLogin(true);
        dispatch(login(username, password, role)).then(() => {
            if (store.getState().authReducer.isLoggedIn) {
                if (store.getState().authReducer.user.role === UserRole.ADMIN) {
                    navigate('/admin');
                } else {
                    navigate('/');
                }
                setIsLoadingLogin(false);
                // window.location.reload();
            } else {
                toast({
                    title: store.getState().authReducer.error.message,
                    status: 'error',
                    position: 'bottom',
                    duration: 5000,
                    isClosable: true,
                });
                setIsLoadingLogin(false);
            }
        });
    };

    return (
        <VStack spacing="15px" color="black">
            <FormControl id="username" isRequired>
                <FormLabel>Tài khoản</FormLabel>
                <Input placeholder="Enter your email" onChange={(e) => setUsername(e.target.value)} />
            </FormControl>

            <FormControl id="password" isRequired>
                <FormLabel>Mật khẩu</FormLabel>
                <InputGroup>
                    <Input
                        type={show ? 'text' : 'password'}
                        placeholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                            {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <FormControl id="role" isRequired>
                <FormLabel>Vai trò</FormLabel>
                <RadioGroup
                    display={'flex'}
                    flexDirection={'row'}
                    justifyContent={'space-evenly'}
                    name="role"
                    onChange={(value) => setRole(value)}
                >
                    <Radio value="1">Quản trị viên</Radio>
                    <Radio value="2">Giảng viên</Radio>
                    <Radio value="3">Sinh viên</Radio>
                </RadioGroup>
            </FormControl>

            <Button colorScheme="blue" width="100%" onClick={submitLoginForm} isLoading={isLoadingLogin}>
                Đăng nhập
            </Button>
        </VStack>
    );
}

export default Login;
