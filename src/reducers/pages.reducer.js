import {IS_INTERSECTING} from '../helpers/types';

const INITIAL_STATE = {
    isIntersecting: null
}

const pagesReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case IS_INTERSECTING:
            return {
                ...state,
                isIntersecting: action.isIntersecting
            }
        default:
            return state;
    }
}

export default pagesReducer;