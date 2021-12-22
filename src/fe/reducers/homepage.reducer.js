import { CAROUSEL_STOP_AUTOPLAY, CAROUSEL_START_AUTOPLAY, GET_HOMEPAGE, CAROUSEL_CURRENT_SLIDE } from '../helpers/types';

const INITIAL_STATE = {
    homepageData: [],
    currentSlide: 0,
    autoPlay: true
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
        case CAROUSEL_STOP_AUTOPLAY:
            console.log('stop running')
          
            return {
                ...state,
                autoPlay: false
            }
        case CAROUSEL_START_AUTOPLAY:
            return {
                ...state,
                autoPlay: true
            }
        default:
            return state;
    }
}

export default homepageReducer;