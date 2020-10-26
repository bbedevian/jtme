import JobActionTypes from './jobs.types'

export const fetchJobsStart = (user) => ({
    type: JobActionTypes.FETCH_JOBS_START,
    user
  });

  
export const fetchJobsSuccess = jobs => ({
    type: JobActionTypes.FETCH_JOBS_SUCCESS,
    payload: jobs
  });
  
export const fetchJobsFailure = errorMessage => ({
    type: JobActionTypes.FETCH_JOBS_FAILURE,
    payload: errorMessage
  });

  export const addJobToState = job => ({
    type: JobActionTypes.ADD_JOB,
    payload: job
  });

export const selectJob = job => ({
  type: JobActionTypes.SELECT_JOB,
  payload: job
});

export const removeSelectedJob = () => ({
  type: JobActionTypes.REMOVE_SELECTED_JOB
});

export const showModal = job => ({
  type: JobActionTypes.SHOW_MODAL,
  payload: job
})

export const updateJobInState = (job, jobID, timeStamp, modal) => ({
  type: JobActionTypes.UPDATE_JOB,
  payload: job, 
  jobID,
  timeStamp,
  modal
})