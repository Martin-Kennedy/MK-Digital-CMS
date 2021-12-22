
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
                currentSlide: 0,
                totalSlides: 0
            }
        }
    }
}

const store = createStore(rootReducer, initalState, applyMiddleware(thunk));

export default store;