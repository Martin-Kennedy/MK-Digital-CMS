import { GET_TOKEN } from '../helpers/types'

const INITIAL_STATE = {
    keystoneToken: null
}

const initialUtilityReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case GET_TOKEN:
            console.log(action.payload.data.authenticate.token);
            return {
                ...state,
                keystoneToken: action.payload.data.authenticate.token
            }
        default:
            return state;
    }
}

export default initialUtilityReducer;