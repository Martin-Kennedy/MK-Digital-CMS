import { GET_HOMEPAGE } from '../helpers/types';

const INITIAL_STATE = {
    homepageData: []
}

const homepageReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_HOMEPAGE:
            return {
                ...state,
                homepageData: action.payload
            }
        default:
            return state;
    }
}

export default homepageReducer;