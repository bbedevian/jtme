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
        case JobActionTypes.REMOVE_SELECTED_JOB:
            return {
                ...state,
                selectedJob: null
            }
        case JobActionTypes.DELETE_JOB:
            let selectedJobID = action.payload
            return {
                ...state,
                jobs: state.jobs.filter(job => job.id !== selectedJobID),
                selectedJob: null
            }
        case JobActionTypes.UPDATE_JOB:
            let selectedJob = action.modal? {...action.payload, id: action.jobID, lastContacted: action.timeStamp}: null
            return {
                ...state,
                jobs: state.jobs.map(job => job.id === action.jobID ? 
                    {...action.payload, id: action.jobID, lastContacted: action.timeStamp}
                    :
                    job),
                selectedJob: selectedJob
            }
        default: return state
    }
}

export default jobsReducer;