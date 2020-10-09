import JobsActionTypes from './jobs.types'

const INITIAL_STATE = {
jobs: null,
isFetching: false,
errorMessage: ''
}


const jobsReducer = (state = INITIAL_STATE,  action) => {
    switch(action.type){
        case JobsActionTypes.FETCH_JOBS_START:
            return {
                ...state,
                isFetching: true
            };
        case JobsActionTypes.FETCH_JOBS_SUCCESS: 
            return {
                ...state, 
                isFetching: false,
                jobs: action.payload
            };
        case JobsActionTypes.FETCH_JOBS_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.payload
            };
        case JobsActionTypes.ADD_JOB:
            return {
                ...state,
                jobs: [...state.jobs, action.payload]
            }
        default: return state
    }
}

export default jobsReducer;