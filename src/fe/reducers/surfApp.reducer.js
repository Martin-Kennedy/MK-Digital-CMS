import { GET_GEO_LOCATION, GET_LOCATION_OBJECT } from '../helpers/types';

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
            console.log('making it to geo locatoin reducer', action)
            return {
                ...state,
                geoLocation: {
                    latitude: action.latitude,
                    longitude: action.longitude
                }
                
            }
        default:
            return state;
    }
}

export default surfAppReducer;