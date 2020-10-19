import { combineReducers } from 'redux';
import userReducer from './user/user.reducer';
import jobsReducer from './jobs/jobs.reducer';
import interactionsReducer from './interactions/interactions.reducer';


export default combineReducers({
    user: userReducer,
    jobs: jobsReducer,
    interactions: interactionsReducer
})