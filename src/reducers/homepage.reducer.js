import { GET_HOMEPAGE, GET_HOMEPAGE_CAROUSEL_ITEMS, CAROUSEL_IMG_WIDTH, CAROUSEL_TEXT, CAROUSEL_CURRENT_SLIDE, CAROUSEL_BKG_COLOR, CAROUSEL_TOTAL_SLIDES} from '../helpers/types';

const INITIAL_STATE = {
    pageData: [],
    homepageCarouselItem: [],
    homepageCarouselArrayProjects: [],
    currentSlide: 0,
    hoverState: false,
    intervalFunc: null,
    carouselText: [],
    bkgColor: [],
    carouselImgWidth: null
}

const homepageReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_HOMEPAGE:
            return {
                ...state,
                pageData: action.payload
            }
        case GET_HOMEPAGE_CAROUSEL_ITEMS:
            return {
                ...state,
                homepageCarouselItems: action.payload
            }
        case CAROUSEL_CURRENT_SLIDE:
            return {
                ...state,
                previousSlide: action.previousSlide,
                currentSlide: action.currentSlide
                }
            
        case CAROUSEL_IMG_WIDTH:
            
            const imgWidth = action.imgWidth != undefined ? action.imgWidth.getBoundingClientRect().width : 200;
            return {
                ...state,
                imgWidth: imgWidth
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
        case CAROUSEL_BKG_COLOR:
            switch (true) {
                case (typeof action.bkgColor === 'string'):
                    state
                        .bkgColor
                        .push(action.bkgColor);
                    return {
                        ...state,
                        bkgColor: state.bkgColor
                    }
                default:
                    return state;
            }
            case CAROUSEL_TOTAL_SLIDES:
            return {  
                ...state,
                totalSlides: action.totalSlide
            }

        default:
            return state;
    }
}

export default homepageReducer;