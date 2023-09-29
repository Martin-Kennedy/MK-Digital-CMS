import { createStore, applyMiddleware } from 'redux';
import { MULTI_VIEW, SINGLE_VIEW } from '../helpers/types';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/root.reducer';

const initalState = {
  initialUtility: {
    keystoneToken: null,
    session: false,
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
    imgWidth: 200,
    orderedSlides: [],
  },
  projects: {
    projectData: [],
    nextProjectItem: [],
    nextProjectItemPathname: '',
    filteredData: [],
    projectItem: [],
    sortByItem: '',
    activeButton: 0,
    projectLandingData: [],
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
    blogLandingData: [],
  },
  about: {
    aboutData: [],
  },
  contact: {
    contactData: [],
  },
  surf: {
    surfApiEndPoints: null,
    locations: [],
    geoLocationError: [],
    closeSurfSpots: [],
    closestSurfSpot: [],
    hourlyForecast: [],
    swellForecast: [],
    windForecast: [],
    surflineWindForecast: [],
    currentConditions: [],
    maxWaveHeight: [],
    maxMultiViewWaveHeight: [],
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
    isLoginOpen: false,
    isCloseSpotsOpen: false,
    multiViewForecast: [],
    multiViewSwellForecast: [],
    isView: MULTI_VIEW,
    activeLocation: null,
    activeSurfSpot: null,
    lat: null,
    lng: null,
    surferUserCredentials: [],
  },

  pages: {
    isIntersecting: false,
  },
};

const store = createStore(
  rootReducer,
  initalState,
  applyMiddleware(thunk)
);

export default store;
