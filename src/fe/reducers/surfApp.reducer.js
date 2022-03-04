import { GET_CLOSE_SURFSPOTS, GET_SPOT_FORECAST } from '../helpers/types';

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
                    closeSurfSpots: action.payload,
                    closestSurfSpot: action.payload[0]
                }
        case GET_SPOT_FORECAST:
            const getCurrentConditions = () => {
                const now = Date.now() / 1000 | 0;
                return action.payload.filter((d) => {
                    return d.localTimestamp < now;
                })
            }

            let currentConditions = getCurrentConditions()[getCurrentConditions().length - 1];
            return {
                ...state,
                surfForecast: action.payload,
                currentConditions: currentConditions
            }
        
        default:
            return state;
    }
}

export default surfAppReducer;