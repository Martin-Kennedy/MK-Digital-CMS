import {GET_CONTACT} from '../helpers/types'

const INITIAL_STATE = {
    contactData: []
}

const aboutReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_CONTACT:
            return {
                ...state,
                contactData: action.payload.data.allContacts
            }
        default:
            return state;
    }
}

export default aboutReducer;