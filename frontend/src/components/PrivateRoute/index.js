import { Outlet, Navigate } from 'react-router-dom';
import store from '../../store/store';

function PrivateRoute() {
    const isLoggedIn = store.getState().authReducer.isLoggedIn;
    return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
