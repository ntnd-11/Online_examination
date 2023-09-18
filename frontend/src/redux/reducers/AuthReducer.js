import { LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT } from '../actions/actions';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = user ? { isLoggedIn: true, user, error: null } : { isLoggedIn: false, user: null, error: null };

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload.data,
                error: null,
            };

        case LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
                error: action.payload,
            };

        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };

        default:
            return state;
    }
};

export default authReducer;
