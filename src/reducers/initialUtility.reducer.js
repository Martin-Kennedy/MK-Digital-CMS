import { GET_TOKEN, ESTABLISH_SESSION } from '../helpers/types'

const INITIAL_STATE = {
    keystoneToken: '',
    session: false
}

const initialUtilityReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case GET_TOKEN:
            
            return {
                ...state,
                keystoneToken: action.payload.data.authenticate.token
            }
        case ESTABLISH_SESSION:

            return {
                ...state,
                session: action.payload
            }
        default:
            return state;
    }
}

export default initialUtilityReducer;