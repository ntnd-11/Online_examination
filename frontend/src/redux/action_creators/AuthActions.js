import AuthService from '../../services/AuthService';
import { LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT } from '../actions/actions';

export const login = (username, password, role) => (dispatch) => {
    return AuthService.login(username, password, role).then((response) => {
        if (response.status === 0) {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: response,
            });
        } else {
            dispatch({
                type: LOGIN_FAIL,
                payload: response,
            });
        }
    });
};

export const logout = () => (dispatch) => {
    AuthService.logout();

    dispatch({
        type: LOGOUT,
    });
};
