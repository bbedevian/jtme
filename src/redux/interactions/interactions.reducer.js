import InteractionsActionTypes from './interactions.types'

const INITIAL_STATE = {
interactions: null,
isFetching: false,
errorMessage: '',
selectedInteraction: null,
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
        case InteractionsActionTypes.RESET_INTERACTIONS:
        return {
            ...state,
            interactions: null
        }
        case InteractionsActionTypes.ADD_INTERACTION:
            return {
                ...state,
                interactions: [...state.interactions, action.payload]
            }
        case InteractionsActionTypes.SELECT_INTERACTION:
            return {
                ...state,
                selectedInteraction: action.payload
            }
        case InteractionsActionTypes.REMOVE_SELECTED_INTERACTION:
            return {
                ...state,
                selectedInteraction: null
            }
        case InteractionsActionTypes.UPDATE_INTERACTION:
            return {
                ...state,
                interactions: state.interactions.map(interaction => interaction.id === action.interactionID ? 
                    action.payload
                    :
                    interaction),
                selectedInteraction: null
            }
        default: return state
    }
}

export default interactionsReducer;