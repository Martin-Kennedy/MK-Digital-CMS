import {
  GET_SURF_API_ENDPOINTS,
  GET_ACTIVE_LOCATION,
  GEO_LOCATION_ERROR,
  SEARCH_OPEN_STATE,
  LOGIN_OPEN_STATE,
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
  GET_MAX_WAVE_HEIGHT_MULTI_VIEW,
  GET_ACTIVE_SURF_SPOT,
  GET_SURFLINE_WIND_FORECAST,
  GET_LAT,
  GET_LNG,
} from '../helpers/types';
import moment from 'moment';
import {
  formatAMPM,
  CalculateBreakingWaveHeight,
  MetersToFeet,
} from '../helpers/utilities';

const INITIAL_STATE = {
  surf: {
    locations: [],
    closeSurfSpots: [],
    initialSurfForecast: [],
  },
};

const surfAppReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_SURF_API_ENDPOINTS:
      return {
        ...state,
        surfApiEndPoints: action.payload.data.allSurfAppJsonUrls[0],
      };
    case GET_LOCATION_OBJECT:
      return {
        ...state,
        locations: action.payload,
      };

    case GEO_LOCATION_ERROR:
      return {
        ...state,
        geoLocationError: action.payload,
      };
    case GET_CLOSE_SURFSPOTS:
      return {
        ...state,
        closeSurfSpots: action.payload,
        closestSurfSpot: action.payload[0],
      };
    case GET_SPOT_FORECAST:
      const combineAndMutateData = () => {
        let surfForecastArr = [];

        action.payload.data.marineWeather.data.hourly.time.map(
          (t, i) => {
            const localTime = new Date(t * 1000);
            localTime.toLocaleString('en-US', {
              timeZone: action.payload.timeZone,
            });
            const localTimeStamp = new Date(localTime).getTime();
            let breakingWaveHeightBase = CalculateBreakingWaveHeight(
              action.payload.data.marineWeather.data.hourly
                .wave_height[i],
              action.payload.data.marineWeather.data.hourly
                .wave_period[i]
            );
            breakingWaveHeightBase = MetersToFeet(
              breakingWaveHeightBase
            );
            const minBreakingHeight = Math.ceil(
              breakingWaveHeightBase - 1
            );
            const maxBreakingHeight = Math.ceil(
              breakingWaveHeightBase + 1
            );
            surfForecastArr.push({
              time: localTimeStamp,
              waveHeight:
                action.payload.data.marineWeather.data.hourly
                  .wave_height[i],
              waveDirection:
                action.payload.data.marineWeather.data.hourly
                  .wave_direction[i],
              wavePeriod:
                action.payload.data.marineWeather.data.hourly
                  .wave_period[i],
              swellHeight:
                action.payload.data.marineWeather.data.hourly
                  .swell_wave_height[i],
              swellPeriod:
                action.payload.data.marineWeather.data.hourly
                  .swell_wave_period[i],
              swellDirection:
                action.payload.data.marineWeather.data.hourly
                  .swell_wave_direction[i],
              swellPeakPeriod:
                action.payload.data.marineWeather.data.hourly
                  .swell_wave_peak_period[i],
              minBreakingHeight: minBreakingHeight,
              maxBreakingHeight: maxBreakingHeight,
              weatherCode:
                action.payload.data.weather.data.hourly.weathercode[
                  i
                ],
              temperature:
                action.payload.data.weather.data.hourly
                  .temperature_2m[i],

              apparentTemperature:
                action.payload.data.weather.data.hourly
                  .apparent_temperature[i],
              maxTemperature:
                action.payload.data.weather.data.daily
                  .temperature_2m_max[0],
              minTemperature:
                action.payload.data.weather.data.daily
                  .temperature_2m_min[0],
              windDirection:
                action.payload.data.weather.data.hourly
                  .winddirection_10m[i],
              windSpeed:
                action.payload.data.weather.data.hourly.windspeed_10m[
                  i
                ],
              windGusts:
                action.payload.data.weather.data.hourly.windgusts_10m[
                  i
                ],
              uvIndex:
                action.payload.data.weather.data.hourly.uv_index[i],
            });
          }
        );

        return surfForecastArr;
      };
      let data = combineAndMutateData();
      const getCurrentConditions = () => {
        const now = moment.utc().valueOf();
        return data.filter((d) => {
          return d.time < now;
        });
      };
      const getFutureConditions = () => {
        return data.filter((d) => {
          const forecastDateObj = d.time;
          const fullDateToday = Math.floor(Date.now());
          return forecastDateObj >= fullDateToday;
        });
      };

      let currentConditions =
        getCurrentConditions()[getCurrentConditions().length - 1];
      let forecast = getFutureConditions();

      return {
        ...state,
        hourlyForecast: forecast,
        currentConditions: currentConditions,
      };
    case GET_MAX_WAVE_HEIGHT:
      let maxWaveHeight = action.payload;
      if (maxWaveHeight < 8) {
        maxWaveHeight = 8;
      }
      return {
        ...state,
        maxWaveHeight: maxWaveHeight,
      };
    case GET_SWELL_FORECAST:
      return {
        ...state,
        swellForecast: action.payload,
      };

    case GET_WIND_FORECAST:
      return {
        ...state,
        windForecast: action.payload,
      };
    case GET_TIDE_STATIONS:
      return {
        ...state,
        tideStations: action.payload,
      };
    case GET_NDBC_STATIONS:
      return {
        ...state,
        ndbcStations: action.payload,
      };
    case GET_WEATHER_STATIONS:
      return {
        ...state,
        weatherStations: action.payload,
      };
    case GET_TIDE_FORECAST:
      // time: formatAMPM(new Date(hourlyForecast.localTimestamp * 1000)),

      if (action.payload.predictions) {
        action.payload.predictions.map((item, index) => {
          const toTimestamp = (strDate) => {
            const dt = new Date(strDate).getTime();
            return dt / 1000;
          };
          const formatedTime = formatAMPM(
            new Date(item.t.replace(/-/g, '/'))
          );
          item.time = formatedTime;
        });
        return {
          ...state,
          tideForecast: action.payload,
        };
      }

    case GET_WATER_TEMP:
      const waterTempF = (action.payload * 9) / 5 + 32;

      return {
        ...state,
        waterTemp: waterTempF,
      };
    case GET_CURRENT_SWELL:
      const waveHeight = action.payload.waveHeight * 3.28084;
      return {
        ...state,
        currentSwell: {
          waveHeight: waveHeight,
          dominantPeriod: action.payload.dominantPeriod,
          swellDirection: action.payload.swellDirection,
        },
      };
    case GET_WEATHER:
      return {
        ...state,
        weather: action.payload,
      };
    case GET_WEATHER_FORECAST:
      return {
        ...state,
        weatherForecast: action.payload,
      };
    case SEARCH_OPEN_STATE:
      return {
        ...state,
        isSearchOpen: !action.payload,
      };
    case LOGIN_OPEN_STATE:
      return {
        ...state,
        isLoginOpen: !action.payload,
      };
    case CLOSE_SPOTS_OPEN_STATE:
      return {
        ...state,
        isCloseSpotsOpen: !action.payload,
      };
    case LOAD_VIEW:
      return {
        ...state,
        isView: action.payload,
      };
    case GET_ACTIVE_LOCATION:
      return {
        ...state,
        activeLocation: action.payload,
      };
    case GET_MULTI_VIEW_FORECAST:
      return {
        ...state,
        multiViewForecast: action.payload,
      };
    case GET_MULTI_VIEW_SWELL_FORECAST:
      return {
        ...state,
        multiViewSwellForecast: action.payload,
      };

    case GET_MAX_WAVE_HEIGHT_MULTI_VIEW:
      let maxMultiViewWaveHeight = action.payload;
      if (maxMultiViewWaveHeight < 8) {
        maxMultiViewWaveHeight = 8;
      } else {
        maxMultiViewWaveHeight = maxMultiViewWaveHeight + 6;
      }
      return {
        ...state,
        maxMultiViewWaveHeight: maxMultiViewWaveHeight,
      };
    case GET_ACTIVE_SURF_SPOT:
      return {
        ...state,
        activeSurfSpot: action.payload,
      };
    case GET_SURFLINE_WIND_FORECAST:
      return {
        ...state,
        surflineWindForecast: action.payload,
      };
    case GET_LAT:
      return {
        ...state,
        lat: action.payload,
      };
    case GET_LNG:
      return {
        ...state,
        lng: action.payload,
      };

    default:
      return state;
  }
};

export default surfAppReducer;
