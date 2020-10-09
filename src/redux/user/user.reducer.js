import {UserActionTypes} from './user.types'

const INITIAL_STATE = {
    currentUser: {
        id: 'WMTVTNnsPwGiEmQvzXF8',
        name: 'Brett Bedevian',
        email: 'brettbedevian@gmail.com'
    }
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.SET_CURRENT_USER: 
            return {...state, currentUser: action.payload}
        default: 
        return state;
    }
}

export default userReducer;