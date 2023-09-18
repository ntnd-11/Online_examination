import { combineReducers } from 'redux';

import authReducer from './AuthReducer';

const reducer = combineReducers({
    authReducer,
});

export default reducer;
