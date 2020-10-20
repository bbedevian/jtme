import JobActionTypes from './jobs.types'

const INITIAL_STATE = {
jobs: null,
isFetching: false,
errorMessage: '',
modalShow: false,
selectedJob: null
}


const jobsReducer = (state = INITIAL_STATE,  action) => {
    switch(action.type){
        case JobActionTypes.FETCH_JOBS_START:
            return {
                ...state,
                isFetching: true
            };
        case JobActionTypes.FETCH_JOBS_SUCCESS: 
            return {
                ...state, 
                isFetching: false,
                jobs: action.payload
            };
        case JobActionTypes.FETCH_JOBS_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.payload
            };
        case JobActionTypes.ADD_JOB:
            return {
                ...state,
                jobs: [...state.jobs, action.payload]
            };
        case JobActionTypes.SELECT_JOB:
            return {
                ...state,
                selectedJob: {...action.payload}
            }
        default: return state
    }
}

export default jobsReducer;