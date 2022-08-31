import {
    GET_ACTIVE_LOCATION,
    GEO_LOCATION_ERROR,
    SEARCH_OPEN_STATE,
    CLOSE_SPOTS_OPEN_STATE,
    LOAD_VIEW,
    GET_LOCATION_OBJECT,
    GET_CLOSE_SURFSPOTS,
    GET_SPOT_FORECAST,
    GET_MAX_WAVE_HEIGHT,
    GET_SWELL_FORECAST,
    GET_WIND_FORECAST,
    GET_TIDE_FORECAST,
    GET_WATER_TEMP,
    GET_WEATHER_STATIONS,
    GET_TIDE_STATIONS,
    GET_NDBC_STATIONS,
    GET_WEATHER,
    GET_WEATHER_FORECAST,
    GET_CURRENT_SWELL,
    GET_MULTI_VIEW_FORECAST,
    GET_MULTI_VIEW_SWELL_FORECAST,
    GET_MAX_WAVE_HEIGHT_MULTI_VIEW
} from '../helpers/types';
import {formatAMPM} from '../helpers/utilities';

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
        case GEO_LOCATION_ERROR:

            return {
                ...state,
                geoLocationError: action.payload
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
                return action
                    .payload
                    .filter((d) => {
                        return d.localTimestamp < now;
                    })
            }
            const getFutureConditions = () => {

                return action
                    .payload
                    .filter((d) => {
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
                swellForecast: action.payload
            }

        case GET_WIND_FORECAST:

            return {
                ...state,
                windForecast: action.payload
            }
        case GET_TIDE_STATIONS:
            return {
                ...state,
                tideStations: action.payload
            }
        case GET_NDBC_STATIONS:
            return {
                ...state,
                ndbcStations: action.payload
            }
        case GET_WEATHER_STATIONS:

            return {
                ...state,
                weatherStations: action.payload
            }
        case GET_TIDE_FORECAST:
            // time: formatAMPM(new Date(hourlyForecast.localTimestamp * 1000)),

            if (action.payload.predictions) {
                action
                    .payload
                    .predictions
                    .map((item, index) => {
                        const toTimestamp = (strDate) => {
                            const dt = new Date(strDate).getTime();
                            return dt / 1000;
                        }
                        const formatedTime = formatAMPM(new Date(item.t.replace(/-/g, "/")));
                        item.time = formatedTime;
                    });
                return {
                    ...state,
                    tideForecast: action.payload
                }
            }
          
        case GET_WATER_TEMP:

            const waterTempF = (action.payload * 9) / 5 + 32;

            return {
                ...state,
                waterTemp: waterTempF
            }
        case GET_CURRENT_SWELL:
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
                weather: action.payload
            }
        case GET_WEATHER_FORECAST:

            return {
                ...state,
                weatherForecast: action.payload
            }
        case SEARCH_OPEN_STATE:
            return {
                ...state,
                isSearchOpen: !action.payload
            }
        case CLOSE_SPOTS_OPEN_STATE:
            return {
                ...state,
                isCloseSpotsOpen: !action.payload
            }
        case LOAD_VIEW:
            return {
                ...state,
                isView: action.payload
            }
        case GET_ACTIVE_LOCATION:
            return {
                ...state,
                activeLocation: action.payload
            }
        case GET_MULTI_VIEW_FORECAST:
            return {
                ...state,
                multiViewForecast: action.payload
            }
        case GET_MULTI_VIEW_SWELL_FORECAST:
            return {
                ...state,
                multiViewSwellForecast: action.payload
            }

        case GET_MAX_WAVE_HEIGHT_MULTI_VIEW: 
            let maxMultiViewWaveHeight = action.payload;
            if (maxMultiViewWaveHeight < 8) {
                maxMultiViewWaveHeight = 8;
            } else {
                maxMultiViewWaveHeight = maxMultiViewWaveHeight + 6;
            }
            return {
                ...state,
                maxMultiViewWaveHeight: maxMultiViewWaveHeight
            }

        default:
            return state;
    }
}

export default surfAppReducer;
