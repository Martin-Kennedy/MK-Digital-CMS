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
        case GET_SWELL_FORECAST:
            const getMaxWaveSizeInForecast = async () => {
                Array.prototype.max = function () {
                    return Math.max.apply(null, this);
                };
                const waveHeightsArr = new Promise((resolve) => {
                    let waveHeights = [];
                    forecast.map((hourlyForecast) => [
                        waveHeights.push(hourlyForecast.swell.maxBreakingHeight)
                    ])
                    resolve(waveHeights)
                })
                return waveHeightsArr.then((data) => {
                    console.log(data)
                    console.log(data.max())
                    return data.max();
                })

            } 

            let maxWaveHeightInForecast = getMaxWaveSizeInForecast(action.payload);
           
            return {
                ...state,
                swellForecast: action.payload,
            }
        
        default:
            return state;
    }
}

export default surfAppReducer;

