import {GET_HOMEPAGE} from '../helpers/types';
import {CAROUSEL_CURRENT_SLIDE} from '../helpers/types';
import {CAROUSEL_HOVER_STATE, CAROUSEL_INTERVAL} from '../helpers/types';

const INITIAL_STATE = {
    homepageData: [],
    currentSlide: 0,
    hoverState: false,
    intervalFunc: null
}

const homepageReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_HOMEPAGE:
            return {
                ...state,
                homepageData: action.payload
            }
        case CAROUSEL_CURRENT_SLIDE:
            return {
                ...state,
                currentSlide: action.currentSlide
            }
        case CAROUSEL_HOVER_STATE:
                return {
                    ...state,
                    hoverState: action.hoverState
                }

        case CAROUSEL_INTERVAL:
            switch (true) {
                case(typeof action.intervalID === 'number'):
                    return {
                        ...state,
                        intervalID: action.intervalID
                    }
                default:
                    return state;
            }

        default:
            return state;
    }
}

export default homepageReducer;