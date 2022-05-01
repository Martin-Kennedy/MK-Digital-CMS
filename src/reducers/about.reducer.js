import { GET_ABOUT } from '../helpers/types'

const INITIAL_STATE = {
    aboutData: [],
}

const aboutReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_ABOUT:
            return {
                ...state,
                aboutData: action.payload.data.allAbouts
            }
        default:
            return state;
    }
}

export default aboutReducer;