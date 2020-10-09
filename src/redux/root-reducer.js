import { useReducer } from 'react';
import { combineReducers } from 'redux';
import userReducer from './user/user.reducer';


export default combineReducers({
    user: userReducer,
    // jobs: jobsReducer,
})