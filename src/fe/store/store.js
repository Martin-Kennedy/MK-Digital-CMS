
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers/root.reducer'

const initalState = {
    blogs: {
        blogData: [],
        filteredData: [],
        sortBy: '',
        activeButton: 1
    },
    homepage: {
        homepageData: {
            homepageCarousel: {
                homepageCarouselArray: [],
                
            }
        },
        previousSlide: 0,
        currentSlide: 0,
        totalSlides: 0,
        hoverState: false,
        intervalID: 0,
        carouselText: [],
        bkgColor: [],
        imgWidth: 200
    },
    pages: {
        isIntersecting: false
    }
}

const store = createStore(rootReducer, initalState, applyMiddleware(thunk));

export default store;