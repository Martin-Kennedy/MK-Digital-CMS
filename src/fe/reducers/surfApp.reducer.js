import { GET_GEO_LOCATION, GET_LOCATION_OBJECT, GET_CLOSE_SURFSPOTS } from '../helpers/types';

const INITIAL_STATE = {
    surf: {
        locations: [],
        geoLocation: {},
        towns: [],
        countries: [],
        forecast: []
    }
}

const surfAppReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_LOCATION_OBJECT:
            return {
                ...state,
                locations: action.payload
            }
        case GET_GEO_LOCATION:
            return {
                ...state,
                geoLocation: {
                    latitude: action.latitude,
                    longitude: action.longitude
                }
            }
        case GET_CLOSE_SURFSPOTS:
                return{
                    ...state,
                    closeSurfSpots: {

                    }
                }
        default:
            return state;
    }
}

export default surfAppReducer;