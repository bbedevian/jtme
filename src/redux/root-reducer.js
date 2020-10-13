import { combineReducers } from 'redux';
import userReducer from './user/user.reducer';
import jobsReducer from './jobs/jobs.reducer';


export default combineReducers({
    user: userReducer,
    jobs: jobsReducer,
})