import InteractionsActionTypes from './interactions.types'

export const fetchInteractionsStart = (user, jobID) => ({
    type: InteractionsActionTypes.FETCH_INTERACTIONS_START,
    user, jobID
  });

  
export const fetchInteractionsSuccess = interactions => ({
    type: InteractionsActionTypes.FETCH_INTERACTIONS_SUCCESS,
    payload: interactions
  });
  
export const fetchInteractionsFailure = errorMessage => ({
    type: InteractionsActionTypes.FETCH_INTERACTIONS_FAILURE,
    payload: errorMessage
  });