import { GET_GEO_LOCATION, GET_LOCATION_OBJECT, GET_CLOSE_SURFSPOTS } from '../helpers/types';

const INITIAL_STATE = {
    surf: {
        locations: [],
        closeSurfSpots: [],
        forecast: []
    }
}

const surfAppReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_CLOSE_SURFSPOTS:
            console.log(action)
                return{
                    ...state,
                    closeSurfSpots: action.payload
                }
        default:
            return state;
    }
}

export default surfAppReducer;