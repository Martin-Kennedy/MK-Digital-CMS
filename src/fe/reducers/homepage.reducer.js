import { GET_HOMEPAGE, CAROUSEL_HOVER_STATE, CAROUSEL_INTERVAL, CAROUSEL_TEXT, CAROUSEL_CURRENT_SLIDE} from '../helpers/types';

const INITIAL_STATE = {
    homepageData: [],
    carouselCurrentState: {
        currentSlide: 0
    },
    hoverState: false,
    intervalFunc: null,
    carouselText: []
}

const homepageReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_HOMEPAGE:
            return {
                ...state,
                homepageData: action.payload
            }
        case CAROUSEL_CURRENT_SLIDE:
            console.log(action)
            return {
                ...state,
                previousSlide: action.previousSlide,
                currentSlide: action.currentSlide
                }
            
        case CAROUSEL_HOVER_STATE:
            return {
                ...state,
                hoverState: action.hoverState
            }

        case CAROUSEL_TEXT:
            switch (true) {
                case(typeof action.carouselText === 'string'):
                    state
                        .carouselText
                        .push(action.carouselText);
                        return {
                            ...state,
                            carouselText: state.carouselText
                        }
                default:
                    return state;
            }

        default:
            return state;
    }
}

export default homepageReducer;