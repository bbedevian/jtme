import InteractionsActionTypes from './interactions.types'

export const fetchInteractionsStart = () => ({
    type: InteractionsActionTypes.FETCH_INTERACTIONS_START,
  });

  
export const fetchInteractionsSuccess = interactions => ({
    type: InteractionsActionTypes.FETCH_INTERACTIONS_SUCCESS,
    payload: interactions
  });
  
export const fetchInteractionsFailure = errorMessage => ({
    type: InteractionsActionTypes.FETCH_INTERACTIONS_FAILURE,
    payload: errorMessage
  });

  export const addInteractionToState = interaction => ({
    type: InteractionsActionTypes.ADD_INTERACTION,
    payload: interaction
  });

  export const selectInteraction = interaction => ({
    type: InteractionsActionTypes.SELECT_INTERACTION,
    payload: interaction
  })

  export const removeSelectedInteraction = () => ({
    type: InteractionsActionTypes.REMOVE_SELECTED_INTERACTION
  });

  export const updateInteractionInState = (interaction, interactionID) => ({
    type: InteractionsActionTypes.UPDATE_INTERACTION,
    payload: interaction,
    interactionID
  })