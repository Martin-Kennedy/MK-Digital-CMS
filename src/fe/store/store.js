import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers/root.reducer'

const initalState = {
    homepage: {
        homepageData: {
            homepageCarousel: {
                homepageCarouselArray: []
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
    projects: {
        projectData: [],
        nextProjectItem: [],
        nextProjectItemPathname: '',
        filteredData: [],
        projectItem: [],
        sortByItem: '',
        activeButton: 1
    },
    blogs: {
        blogData: [],
        filteredData: [],
        blogItem: [],
        nextBlogItem: [],
        nextBlogItemPathname: '',
        filteredData: [],
        sortByItem: '',
        activeButton: 1
    },
    surf: {
        closeSurfSpots: [],
        closestSurfSpot: [],
        hourlyForecast: [],
        swellForecast: [],
        windForecast: [],
        currentConditions: [],
        maxWaveHeight: [],
        tideStations: [],
        weatherStations: [],
        tideForecast: [],
        waterTemp: [],
        weather: []
    },

    pages: {
        isIntersecting: false
    }
}

const store = createStore(rootReducer, initalState, applyMiddleware(thunk));

export default store;