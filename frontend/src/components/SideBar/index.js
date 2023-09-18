import { Box, Button, Icon } from '@chakra-ui/react';
import { FaSignOutAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import './SideBar.css';
import { AdminControl, StudentControl, TeacherControl } from './constants';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/action_creators/AuthActions';
import store from '../../store/store';
import UserRole from '../../constants/UserRole';

function SideBar() {
    const [selectedLink, setSelectedLink] = useState();
    const loggedInUser = store.getState().authReducer.user;
    const [userControl, setUserControl] = useState([]);

    useEffect(() => {
        if (loggedInUser.role === UserRole.ADMIN) {
            setUserControl(AdminControl);
        } else if (loggedInUser.role === UserRole.TEACHER) {
            setUserControl(TeacherControl);
        } else if (loggedInUser.role === UserRole.STUDENT) {
            setUserControl(StudentControl);
        }
    }, [loggedInUser]);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
        navigate('/login');
    };

    return (
        <Box
            display={'flex'}
            flexDir="column"
            alignItems="center"
            p={3}
            bg="white"
            borderRadius="5"
            marginTop="4"
            marginLeft={'4'}
            marginBottom="4"
            width={'25%'}
            height="500"
        >
            <Box
                pb={3}
                px={3}
                fontSize="20"
                fontFamily="Inter"
                display={'flex'}
                w="100%"
                justifyContent={'center'}
                alignItems="center"
                fontWeight={'550'}
                cursor="pointer"
                onClick={() => {
                    if (loggedInUser.role === UserRole.ADMIN) {
                        navigate('/admin');
                    } else {
                        navigate('/');
                    }
                }}
            >
                Examination System
            </Box>

            <Box
                display={'flex'}
                flexDir="column"
                justifyContent={'space-between'}
                p={3}
                w={'100%'}
                h="100%"
                borderRadius="lg"
                overflowY={'hidden'}
            >
                <Box display={'flex'} flexDir="column">
                    {userControl.map((control, index) => {
                        return (
                            <Link
                                key={index}
                                to={control.to}
                                onClick={(e) => {
                                    setSelectedLink(index);
                                }}
                                className={index === selectedLink ? 'Link-Focus' : 'Link'}
                            >
                                <Icon mr={4} as={control.icon} />
                                {control.text}
                            </Link>
                        );
                    })}
                </Box>
                <Box display={'flex'} flexDir="column">
                    <Button onClick={handleLogout}>
                        <Icon mr={4} as={FaSignOutAlt} />
                        Đăng xuất
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

export default SideBar;
