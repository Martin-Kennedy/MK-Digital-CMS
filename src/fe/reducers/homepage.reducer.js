import { GET_HOMEPAGE } from '../helpers/types';
import { CAROUSEL_CURRENT_SLIDE } from '../helpers/types';

const INITIAL_STATE = {
    homepageData: [],
    currentSlide: 0
}

const homepageReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_HOMEPAGE:
            return {
                ...state,
                homepageData: action.payload
            }
        case CAROUSEL_CURRENT_SLIDE:
             const playSlideShow = () => {
                setInterval(() => {
                let currentSlide = action.currentSlide;
                let totalSlides = action.totalSlides;
                if (currentSlide === totalSlides) currentSlide = 0;
                console.log(state)
                return currentSlide ++;
            }, 5000)}
            return {
                ...state,
                currentSlide: playSlideShow(),
            }
        default:
            return state;
    }
}

export default homepageReducer;