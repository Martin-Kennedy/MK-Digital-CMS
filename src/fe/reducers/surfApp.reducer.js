import { GET_CLOSE_SURFSPOTS, GET_SPOT_FORECAST, GET_SWELL_FORECAST  } from '../helpers/types';

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
                    console.log(date);
                    console.log(forecastDate);

                    return forecastDate >= date;
                })
            }
            const groupByDate = () => {
                function callBack({ localTimestamp }) {
                    let dateObj = new Date(localTimestamp * 1000);
                    let fullDate = `${dateObj.getMonth()+1}/${dateObj.getDate()}`
                    return `${fullDate}`;
                }
                const result = getFutureConditions().groupBy(callBack);
                console.log(result)
                return result;
            }

            let currentConditions = getCurrentConditions()[getCurrentConditions().length - 1];
            let forecastGroupedByDate = groupByDate();
            
            
            return {
                ...state,
                hourlyForecast: forecastGroupedByDate,
                currentConditions: currentConditions
            }
        case GET_SWELL_FORECAST:
           
            return {
                ...state,
                swellForecast: action.payload,
            }
        
        default:
            return state;
    }
}

export default surfAppReducer;

