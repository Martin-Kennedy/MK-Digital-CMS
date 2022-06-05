import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers/root.reducer'

const initalState = {
    initialUtility: {
        keystoneToken: null,
        session: false
    },
    homepage: {
        homepageCarouselItems: [],
        pageData: null,
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
        activeButton: 0,
        projectLandingData: []
    },
    blogs: {
        blogData: [],
        filteredData: [],
        blogItem: [],
        nextBlogItem: [],
        nextBlogItemPathname: '',
        filteredData: [],
        sortByItem: '',
        activeButton: 0,
        blogLandingData: []
    },
    about: {
        aboutData: []
    },
    contact: {
        contactData: []
    },
    surf: {
        locations: [],
        closeSurfSpots: [],
        closestSurfSpot: [],
        hourlyForecast: [],
        swellForecast: [],
        windForecast: [],
        currentConditions: [],
        maxWaveHeight: [],
        tideStations: [],
        ndbcStations: [],
        weatherStations: [],
        tideForecast: [],
        waterTemp: [],
        weather: [],
        weatherForecast: [],
        uvForecast: [],
        currentSwell: [],
        isSearchOpen: false,
        isCloseSpotsOpen: false,
        activeLocation: null,
    },

    pages: {
        isIntersecting: false
    }
}

const store = createStore(rootReducer, initalState, applyMiddleware(thunk));

export default store;