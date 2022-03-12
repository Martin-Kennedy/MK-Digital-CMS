import { GET_CLOSE_SURFSPOTS, GET_SPOT_FORECAST, GET_MAX_WAVE_HEIGHT, GET_SWELL_FORECAST, GET_WIND_FORECAST  } from '../helpers/types';

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
            const getFutureConditions = () => {
                const now = Date.now();
                const date = new Date(now).getDate();
                return action.payload.filter((d) => {
                    const forecastDate = new Date(d.localTimestamp * 1000).getDate()
                    return forecastDate >= date;
                })
            }
            
            let currentConditions = getCurrentConditions()[getCurrentConditions().length - 1];
            let forecast = getFutureConditions();
            

            
            
            
            return {
                ...state,
                hourlyForecast: forecast,
                currentConditions: currentConditions
                
            }
        case GET_MAX_WAVE_HEIGHT:
            let maxWaveHeight = action.payload;
            if (maxWaveHeight < 8){
                maxWaveHeight = 8;
            }
            return{
                ...state,
                maxWaveHeight: maxWaveHeight
            }
        case GET_SWELL_FORECAST:
           
            return {
                ...state,
                swellForecast: action.payload,
            }

        case GET_WIND_FORECAST:

            return {
                ...state,
                windForecast: action.payload,
            }
        
        default:
            return state;
    }
}

export default surfAppReducer;

