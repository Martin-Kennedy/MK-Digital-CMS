import { GET_CLOSE_SURFSPOTS, GET_INITIAL_SPOT_FORECAST } from '../helpers/types';

const INITIAL_STATE = {
    surf: {
        locations: [],
        closeSurfSpots: [],
        initialSurfForecast: []
    }
}

const surfAppReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_CLOSE_SURFSPOTS:
                return{
                    ...state,
                    closeSurfSpots: action.payload
                }
        case GET_INITIAL_SPOT_FORECAST:
            return {
                ...state,
                initialSurfForecast: action.payload

            }
        
        default:
            return state;
    }
}

export default surfAppReducer;