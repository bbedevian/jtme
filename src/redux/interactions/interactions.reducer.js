import InteractionsActionTypes from './interactions.types'

const INITIAL_STATE = {
interactions: null,
isFetching: false,
errorMessage: ''
}


const interactionsReducer = (state = INITIAL_STATE,  action) => {
    switch(action.type){
        case InteractionsActionTypes.FETCH_INTERACTIONS_START:
            return {
                ...state,
                isFetching: true
            };
        case InteractionsActionTypes.FETCH_INTERACTIONS_SUCCESS: 
            return {
                ...state, 
                isFetching: false,
                interactions: action.payload
            };
        case InteractionsActionTypes.FETCH_INTERACTIONS_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.payload
            };
        case InteractionsActionTypes.ADD_INTERACTION:
            return {
                ...state,
                interactions: [...state.interactions, action.payload]
            }
        default: return state
    }
}

export default interactionsReducer;