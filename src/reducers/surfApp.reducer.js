import { SEARCH_OPEN_STATE, CLOSE_SPOTS_OPEN_STATE, GET_LOCATION_OBJECT, GET_CLOSE_SURFSPOTS, GET_SPOT_FORECAST, GET_MAX_WAVE_HEIGHT, GET_SWELL_FORECAST, GET_WIND_FORECAST, GET_TIDE_FORECAST, GET_WATER_TEMP, GET_WEATHER_STATIONS, GET_TIDE_STATIONS, GET_NDBC_STATIONS, GET_WEATHER, GET_WEATHER_FORECAST, GET_CURRENT_SWELL } from '../helpers/types';
import { formatAMPM } from '../helpers/utilities';

const INITIAL_STATE = {
    surf: {
        locations: [],
        closeSurfSpots: [],
        initialSurfForecast: []
    }
}

const surfAppReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_LOCATION_OBJECT:
            
            return {
                ...state,
                locations: action.payload
            }
        case GET_CLOSE_SURFSPOTS:
            return {
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
                
                return action.payload.filter((d) => {
                    const forecastDateObj = new Date(d.localTimestamp * 1000).getTime();
                    const fullDateToday = Math.floor(Date.now() / 1000) * 1000;
                    return forecastDateObj >= fullDateToday;
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
            if (maxWaveHeight < 8) {
                maxWaveHeight = 8;
            }
            return {
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
        case GET_TIDE_STATIONS:
            return {
                ...state,
                tideStations: action.payload,
            }
        case GET_NDBC_STATIONS:
            return {
                ...state,
                ndbcStations: action.payload,
            }
        case GET_WEATHER_STATIONS:

            return {
                ...state,
                weatherStations: action.payload
            }
        case GET_TIDE_FORECAST:
            // time: formatAMPM(new Date(hourlyForecast.localTimestamp * 1000)),
            action.payload.predictions.map((item, index) => {
                const toTimestamp = (strDate) => {
                    const dt = new Date(strDate).getTime();
                    return dt / 1000;
                }
                const formatedTime = formatAMPM(new Date(item.t));
                item.time = formatedTime;
            })


            return {
                ...state,
                tideForecast: action.payload
            }
        case GET_WATER_TEMP:

        const waterTempF = (action.payload * 9) / 5 + 32;

            return {
                ...state,
                waterTemp: waterTempF
            }
        case GET_CURRENT_SWELL:
            console.log(action.payload)
            const waveHeight = action.payload.waveHeight * 3.28084;
            return {
                ...state,
                currentSwell: {
                    waveHeight: waveHeight,
                    dominantPeriod: action.payload.dominantPeriod,
                    swellDirection: action.payload.swellDirection
                }
            }
        case GET_WEATHER:

            return {
                ...state,
                weather: action.payload,
            }
        case GET_WEATHER_FORECAST:

            return {
                ...state,
                weatherForecast: action.payload,
            }
        case SEARCH_OPEN_STATE:
            return {
                ...state,
                isSearchOpen: !action.payload,
            }
        case CLOSE_SPOTS_OPEN_STATE:
            console.log(!action.payload)
            return {
                ...state,
                isCloseSpotsOpen: !action.payload,
            }

        default:
            return state;
    }
}

export default surfAppReducer;

