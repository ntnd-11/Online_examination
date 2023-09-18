import { connect } from 'react-redux';

import Login from '../components/Login';
import { login } from '../redux/action_creators/AuthActions';

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.authReducer.isLoggedIn,
        user: state.authReducer.user,
    };
};

const mapActionsToProps = {
    login,
};

export default connect(mapStateToProps, mapActionsToProps)(Login);
