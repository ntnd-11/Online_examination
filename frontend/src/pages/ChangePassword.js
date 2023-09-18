import { Box, Button, FormControl, FormLabel, Input, Text, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import AuthService from '../services/AuthService';
import ApiStatus from '../constants/ApiStatus';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/action_creators/AuthActions';
import { useNavigate } from 'react-router';

function ChangePassword() {
    const [oldPassword, setOldPassword] = useState();
    const [newPassword, setNewPassword] = useState();
    const [retypeNewPassword, setRetypeNewPassword] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const toast = useToast();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChangePassword = () => {
        setIsLoading(true);
        if (newPassword !== retypeNewPassword) {
            toast({
                title: 'Nhập lại mật khẩu mới không chính xác',
                status: 'error',
                position: 'bottom',
                duration: 5000,
                isClosable: true,
            });
            setIsLoading(false);
        } else {
            AuthService.changePassword(oldPassword, newPassword)
                .then((response) => {
                    if (response.status !== ApiStatus.SUCCESS) {
                        toast({
                            title: response.message,
                            status: 'error',
                            position: 'bottom',
                            duration: 5000,
                            isClosable: true,
                        });
                        setIsLoading(false);
                    } else {
                        toast({
                            title: response.message,
                            status: 'success',
                            position: 'bottom',
                            duration: 5000,
                            isClosable: true,
                        });
                        dispatch(logout());
                        setIsLoading(false);
                        navigate('/login');
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
                    setIsLoading(false);
                });
        }
    };

    return (
        <Box bg={'white'} mr={4} borderRadius={5} pt={4} pb={4} pl={4} pr={4} overflow={'auto'}>
            <Box>
                <Text fontSize={20} fontWeight={500} mb={4}>
                    Change password
                </Text>
            </Box>
            <Box pl={20} pr={20}>
                <FormControl>
                    <FormLabel>Mật khẩu cũ</FormLabel>
                    <Input aria-hidden="true" type={'password'} onChange={(e) => setOldPassword(e.target.value)} />
                </FormControl>
                <FormControl>
                    <FormLabel>Mật khẩu mới</FormLabel>
                    <Input aria-hidden="true" type={'password'} onChange={(e) => setNewPassword(e.target.value)} />
                </FormControl>
                <FormControl>
                    <FormLabel>Nhập lại mật khẩu mới</FormLabel>
                    <Input
                        aria-hidden="true"
                        type={'password'}
                        onChange={(e) => setRetypeNewPassword(e.target.value)}
                    />
                </FormControl>
            </Box>
            <Box display={'flex'} justifyContent={'center'} mt={4}>
                <Button
                    bgColor={'#54a1e4'}
                    color={'white'}
                    _hover={{ opacity: 0.9 }}
                    isLoading={isLoading}
                    onClick={handleChangePassword}
                >
                    <Text>Đổi mật khẩu</Text>
                </Button>
            </Box>
        </Box>
    );
}

export default ChangePassword;
