import {
  GET_SURF_API_ENDPOINTS,
  GET_ACTIVE_LOCATION,
  GET_MULTI_VIEW_FORECAST,
  LOAD_VIEW,
  SEARCH_OPEN_STATE,
  LOGIN_OPEN_STATE,
  CLOSE_SPOTS_OPEN_STATE,
  GET_LOCATION_OBJECT,
  GET_SPOT_FORECAST,
  GET_CLOSE_SURFSPOTS,
  GET_MAX_WAVE_HEIGHT,
  GET_SWELL_FORECAST,
  GET_WIND_FORECAST,
  GET_TIDE_FORECAST,
  GET_WATER_TEMP,
  GET_NDBC_STATIONS,
  GET_TIDE_STATIONS,
  GET_WEATHER_STATIONS,
  GET_WEATHER,
  GET_WEATHER_FORECAST,
  GET_CURRENT_SWELL,
  GEO_LOCATION_ERROR,
  GET_MULTI_VIEW_SWELL_FORECAST,
  GET_MAX_WAVE_HEIGHT_MULTI_VIEW,
  GET_LAT,
  GET_LNG,
  GET_ACTIVE_SURF_SPOT,
  GET_SURFLINE_WIND_FORECAST,
  GET_SURFER_CREDENTIALS,
} from '../helpers/types';
import { formatAMPM } from '../helpers/utilities';
import {
  getDistanceFromLatLonInKm,
  getBoundingBox,
  CalculateBreakingWaveHeight,
  MetersToFeet,
} from '../helpers/utilities';
import axios from 'axios';

const surflineApiV2Wind =
  'https://services.surfline.com/kbyg/spots/forecasts/wind?spotId=';
const surflineApiV2Wave =
  'https://services.surfline.com/kbyg/spots/forecasts/wave?spotId=';

export const searchOpenState = (data) => {
  return { type: SEARCH_OPEN_STATE, payload: data };
};

export const loginOpenState = (data) => {
  return { type: LOGIN_OPEN_STATE, payload: data };
};

export const closeSpotsOpenState = (data) => {
  return { type: CLOSE_SPOTS_OPEN_STATE, payload: data };
};

export const loadView = (data) => {
  return { type: LOAD_VIEW, payload: data };
};

export const getActiveLocation = (data) => {
  return { type: GET_ACTIVE_LOCATION, payload: data };
};

export const getActiveSurfSpot = (data) => {
  return { type: GET_ACTIVE_SURF_SPOT, payload: data };
};

export const getLat = (data) => {
  return { type: GET_LAT, payload: data };
};

export const getLng = (data) => {
  return { type: GET_LNG, payload: data };
};

const apiUrl = 'https://mk-digital-cms.herokuapp.com/admin/api';

export const getSurfApiEndPoints = (token) => {
  return (dispatch) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const bodyParameters = {
      query: `query {
                allSurfAppJsonUrls {
                    surfSpotJson,
                    ndbcBuoyData,
                    tideAndCurrentsApiData,
                    tidesAndCurrentsUrl,
                    surfSpotApi,
                    urlProxy
                    }
                }`,
    };
    return axios
      .post(apiUrl, bodyParameters, config)
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        dispatch({ type: GET_SURF_API_ENDPOINTS, payload: data });
      })
      .catch((error) => {
        throw error;
      });
  };
};

export const getSurferCredentials = (token, userName, email) => {
  return (dispatch) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const bodyParameters = {
      query: `query {
                allSurfers(where: { AND: [{ userName: "${userName}" }, { email: "${email}" }] }) {
                    id
                }
                }`,
    };

    return axios
      .post(apiUrl, bodyParameters, config)
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        dispatch({ type: GET_SURFER_CREDENTIALS, payload: data });
      })
      .catch((error) => {
        throw error;
      });
  };
};

export const getLocationsObject = (jsonUrl) => {
  const fullURL = `${jsonUrl.urlProxy}/${jsonUrl.surfSpotJson}`;

  let request = new Promise((resolve) => {
    axios
      .get(fullURL, {
        headers: {
          'Content-type': 'application/json',
        },
      })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        let countriesArr = [];
        const countries = Object.keys(data);
        countries.map((country) => {
          if (country) {
            return data[country].map((item) => {
              item.countryOrState = country;
              item.fullLocation = `${item.town}, ${country}`;
              countriesArr.push(item);
            });
          }
        });
        resolve(countriesArr);
      });
  });
  return (dispatch) => {
    function onSuccess(data) {
      dispatch({ type: GET_LOCATION_OBJECT, payload: data });
      return data;
    }
    request
      .then((data) => {
        onSuccess(data);
      })
      .catch((error) => {
        throw error;
      });
  };
};

const latLng = (fullURL) =>
  new Promise((res, rej) => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;

        const coords = {
          latitude: latitude,
          longitude: longitude,
          jsonURL: fullURL,
        };

        res(coords);
      },
      (error) => {
        const coords = {
          latitude: 39.5316467,
          longitude: -74.2620961,
          jsonURL: fullURL,
          error: {
            code: error.code,
            message: error.message,
          },
        };
        res(coords);
      }
    );
  });
const getLocations = (coords) =>
  axios
    .get(coords.jsonURL)
    .then((response) => {
      return { locations: response.data, coords: coords };
    })
    .catch((error) => {
      throw error;
    });

const getCloseSurfSpotsArr = (locationsAndCoords) => {
  const currentLat = locationsAndCoords.coords.latitude;
  const currentLng = locationsAndCoords.coords.longitude;
  const defaultLat = 39.5316467;
  const defaultLng = -74.2620961;
  const _obj = locationsAndCoords.locations;
  return new Promise((resolve) => {
    const data = Object.keys(_obj);
    resolve(data);
  }).then((data) => {
    return data.map((country) => {
      if (country) {
        return _obj[country].map((item) => {
          const distanceFromLocation = getDistanceFromLatLonInKm(
            currentLat,
            currentLng,
            item.lat,
            item.lng
          );
          const distanceDefaultLocation = getDistanceFromLatLonInKm(
            defaultLat,
            defaultLng,
            item.lat,
            item.lng
          );

          item.countryOrState = country;
          item.distanceFromLocation = distanceFromLocation;
          return item;
        });
      }
    });
  });
};

const closeSurfSpotArrayFiltering = (closeLocations) => {
  return new Promise((resolve) => {
    resolve(
      closeLocations.map((location) => {
        return location;
      })
    );
  })
    .then((item) =>
      item.filter((location) => {
        if (location.length > 0) {
          return location;
        }
      })
    )
    .then((data) => {
      const flatArr = data.flat();
      const distanceLimitedArr = [];
      const closeSpotArr = new Promise((resolve) => {
        flatArr.map((item) => {
          if (item.distanceFromLocation < 2000) {
            distanceLimitedArr.push(item);
          }
          resolve(distanceLimitedArr);
        });
      });
      return closeSpotArr.then((data) => {
        const sortedArr = data.sort((a, b) => {
          return a.distanceFromLocation - b.distanceFromLocation;
        });
        return sortedArr.slice(0, 20);
      });
    });
};

export const getSurfForecast = (value) => {
  // const fullURL = `${value.apiEndpoints.urlProxy}/${value.apiEndpoints.surfSpotApi}`;
  const marineForecastUrl =
    'https://marine-api.open-meteo.com/v1/marine';
  const weatherForecastUrl = 'https://api.open-meteo.com/v1/forecast';

  return (dispatch) => {
    return axios
      .get(
        marineForecastUrl +
          '?latitude=' +
          value.lat +
          '&longitude=' +
          value.lng +
          '&hourly=wave_height,wave_direction,wave_period,swell_wave_height,swell_wave_direction,swell_wave_period,swell_wave_peak_period&timezone=GMT&timeformat=unixtime&length_unit=metric'
      ) //https://marine-api.open-meteo.com/v1/marine?latitude=54.3213&longitude=10.1348&hourly=wave_height,wave_direction,wave_period&timezone=GMT
      .then((responseMarine) => {
        //https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,weathercode,windspeed_10m,winddirection_10m,windgusts_10m,uv_index&daily=sunrise,sunset&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timeformat=unixtime&timezone=GMT&models=best_match
        return axios
          .get(
            weatherForecastUrl +
              '?latitude=' +
              value.lat +
              '&longitude=' +
              value.lng +
              '&hourly=temperature_2m,apparent_temperature,weathercode,windspeed_10m,winddirection_10m,windgusts_10m,uv_index&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&temperature_unit=fahrenheit&windspeed_unit=mph&timeformat=unixtime&timezone=GMT&models=best_match'
          )
          .then((responseWeather) => {
            return {
              marineWeather: responseMarine,
              weather: responseWeather,
            };
          });
      })
      .then((data) => {
        dispatch({
          type: GET_SPOT_FORECAST,
          payload: {
            data: data,
            timeZone: value.timeZone,
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getSurflineWindForecast = (value) => {
  const fullURL = surflineApiV2Wind;
  return (dispatch) => {
    return axios
      .get(fullURL + value, {
        headers: {
          'Content-type': 'application/json',
        },
      })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        dispatch({ type: GET_SURFLINE_WIND_FORECAST, payload: data });
      })
      .catch((error) => {
        console.log(error.toJSON());
      });
  };
};

export const getMultiViewForecast = (value) => {
  const marineForecastUrl =
    'https://marine-api.open-meteo.com/v1/marine';
  const weatherForecastUrl = 'https://api.open-meteo.com/v1/forecast';
  const surfSpotsSliced = value.surfSpots.slice(0, 9);
  const arr = [];
  new Promise((res) => {
    surfSpotsSliced.map((item) => {
      arr.push({
        country: item.countryOrState,
        town: item.town,
        distanceFromLocation: item.distanceFromLocation,
        lat: item.lat,
        lng: item.lng,
        spotId: item.spotId,
        timeZone: item.timeZone,
      });
    });
    res(arr);
  });

  function getDataLoopOne() {
    const array = surfSpotsSliced.map((item, index) => {
      const axiosDataPromise = new Promise((resolve) => {
        resolve(
          (item.forecast = axios
            .get(
              marineForecastUrl +
                '?latitude=' +
                item.lat +
                '&longitude=' +
                item.lng +
                '&hourly=wave_height,wave_direction,wave_period,swell_wave_height,swell_wave_direction,swell_wave_period,swell_wave_peak_period&timezone=GMT&timeformat=unixtime&length_unit=metric'
            )
            .then((res) => {
              return res.data;
            })
            .then((data) => {
              return (arr[index].forecast = data);
            }))
        );
      });
      return axiosDataPromise;
    });
    return Promise.all(array);
  }
  function getDataLoopTwo(results) {
    const slicedResults = results.slice(0, 9);
    const array = slicedResults.map((item, index) => {
      const openWeatherApiKey = 'bc487a6d87516d1d2546ceb1c78a6fa4';
      const weatherForecastApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${item.lat}&lon=${item.lng}&exclude=minutely,alerts&units=imperial&appid=${openWeatherApiKey}`;
      const axiosDataPromise = new Promise((resolve) => {
        resolve(
          (item.currentWeather = axios
            .get(
              weatherForecastUrl +
                '?latitude=' +
                item.lat +
                '&longitude=' +
                item.lng +
                '&hourly=temperature_2m,apparent_temperature,weathercode,windspeed_10m,winddirection_10m,windgusts_10m,uv_index&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&temperature_unit=fahrenheit&windspeed_unit=mph&timeformat=unixtime&timezone=GMT&models=best_match'
            )
            .then((res) => {
              return res.data;
            })
            .then((data) => {
              return (arr[index].currentWeather = data);
            })
            .catch((error) => {
              console.log(error);
              return (arr[index].currentWeather = null);
            }))
        );
      });
      return axiosDataPromise;
    });
    return Promise.all(array);
  }
  return (dispatch) => {
    function onSuccess(data) {
      dispatch({ type: GET_MULTI_VIEW_FORECAST, payload: data });
      return data;
    }
    getDataLoopOne()
      .then((res) => {
        const arr = [];
        const finalArray = new Promise((resolve) => {
          surfSpotsSliced.map((item, i) => {
            arr.push({
              countryOrState: item.countryOrState,
              town: item.town,
              distanceFromLocation: item.distanceFromLocation,
              lat: item.lat,
              lng: item.lng,
              spotId: item.spotId,
              timeZone: item.timeZone,
              forecast: res[i],
            });
          });
          resolve(arr);
        });

        return finalArray;
      })
      .then((results) => {
        getDataLoopTwo(results)
          .then((res) => {
            const arr = [];
            const finalArray = new Promise((resolve) => {
              results.map((item, i) => {
                arr.push({
                  countryOrState: item.countryOrState,
                  town: item.town,
                  distanceFromLocation: item.distanceFromLocation,
                  lat: item.lat,
                  lng: item.lng,
                  spotId: item.spotId,
                  timeZone: item.timeZone,
                  forecast: item.forecast,
                  currentWeather: res[i],
                });
              });
              resolve(arr);
            });
            return finalArray;
          })
          .then((data) => onSuccess(data))
          .catch((error) => {
            console.log(error);
          });
      });
  };
};

export const getMultiViewSwellForecast = (data) => {
  const request = new Promise((res) => {
    const results = Promise.all(
      data.map((item) => {
        const combineAndMutateData = () => {
          let surfForecastArr = [];
          item.forecast.hourly.time.map((t, i) => {
            const localTime = new Date(t * 1000);
            localTime.toLocaleString('en-US', {
              timeZone: item.timeZone,
            });
            const localTimeStamp = new Date(localTime).getTime();
            let breakingWaveHeightBase = CalculateBreakingWaveHeight(
              item.forecast.hourly.wave_height[i],
              item.forecast.hourly.wave_period[i]
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
              waveHeight: item.forecast.hourly.wave_height[i],
              waveDirection: item.forecast.hourly.wave_direction[i],
              wavePeriod: item.forecast.hourly.wave_period[i],
              swellHeight: item.forecast.hourly.swell_wave_height[i],
              swellPeriod: item.forecast.hourly.swell_wave_period[i],
              swellDirection:
                item.forecast.hourly.swell_wave_direction[i],
              swellPeakPeriod:
                item.forecast.hourly.swell_wave_peak_period[i],
              minBreakingHeight: minBreakingHeight,
              maxBreakingHeight: maxBreakingHeight,
              weatherCode: item.currentWeather.hourly.weathercode[i],
              temperature:
                item.currentWeather.hourly.temperature_2m[i],

              apparentTemperature:
                item.currentWeather.hourly.apparent_temperature[i],
              maxTemperature:
                item.currentWeather.daily.temperature_2m_max[0],
              minTemperature:
                item.currentWeather.daily.temperature_2m_min[0],
              windDirection:
                item.currentWeather.hourly.winddirection_10m[i],
              windSpeed: item.currentWeather.hourly.windspeed_10m[i],
              windGusts: item.currentWeather.hourly.windgusts_10m[i],
              uvIndex: item.currentWeather.hourly.uv_index[i],
            });
          });

          return surfForecastArr;
        };
        const mutatedForecast = new Promise((resolve) => {
          resolve(combineAndMutateData());
        });

        // const hourlySwellForecast = new Promise((resolve) => {
        //   item.forecast.map((hourlyForecast) => {
        //     let dateObj = new Date(
        //       hourlyForecast.localTimestamp * 1000
        //     );
        //     let fullDate = `${
        //       dateObj.getMonth() + 1
        //     }/${dateObj.getDate()}`;
        //     let day = new Date(dateObj).toLocaleString('default', {
        //       weekday: 'long',
        //     });
        //     arr.push({
        //       date: fullDate,
        //       dayOfWeek: day,
        //       time: formatAMPM(
        //         new Date(hourlyForecast.localTimestamp * 1000)
        //       ),
        //       timeZone: item.timeZone,
        //       windDirection: hourlyForecast.wind.direction,
        //       windCompassDirection:
        //         hourlyForecast.wind.compassDirection,
        //       windGusts: hourlyForecast.wind.gusts,
        //       windSpeed: hourlyForecast.wind.speed,
        //       windUnit: hourlyForecast.wind.unit,
        //       fadedRating: hourlyForecast.fadedRating,
        //       solidRating: hourlyForecast.solidRating,
        //       localTime: hourlyForecast.localTimestamp * 1000,
        //       timeUTC: hourlyForecast.timestamp * 1000,
        //       minBreakingHeight:
        //         hourlyForecast.swell.minBreakingHeight,
        //       maxBreakingHeight:
        //         hourlyForecast.swell.maxBreakingHeight,
        //       combinedSwellDirection:
        //         hourlyForecast.swell.components.combined
        //           .compassDirection,
        //       combinedHeight:
        //         hourlyForecast.swell.components.combined.height,
        //       combinedPeriod:
        //         hourlyForecast.swell.components.combined.period,
        //       primarySwellDirection: hourlyForecast.swell.components
        //         .primary
        //         ? hourlyForecast.swell.components.primary
        //             .compassDirection
        //         : null,
        //       primaryHeight: hourlyForecast.swell.components.primary
        //         ? hourlyForecast.swell.components.primary.height
        //         : null,
        //       primaryPeriod: hourlyForecast.swell.components.primary
        //         ? hourlyForecast.swell.components.primary.period
        //         : null,
        //       secondarySwellDirection: hourlyForecast.swell.components
        //         .secondary
        //         ? hourlyForecast.swell.components.secondary
        //             .compassDirection
        //         : null,
        //       secondaryHeight: hourlyForecast.swell.components
        //         .secondary
        //         ? hourlyForecast.swell.components.secondary.height
        //         : null,
        //       secondaryPeriod: hourlyForecast.swell.components
        //         .secondary
        //         ? hourlyForecast.swell.components.secondary.period
        //         : null,
        //     });
        //     resolve(arr);
        //   });
        // });

        return mutatedForecast.then((data) => {
          const spotSwellForecast = {
            countryOrState: item.countryOrState,
            town: item.town,
            distanceFromLocation: item.distanceFromLocation,
            lat: item.lat,
            lng: item.lng,
            spotId: item.spotId,
            timeZone: item.timeZone,
            forecast: data,
          };

          return spotSwellForecast;
        });
      })
    );
    res(results);
  });

  return (dispatch) => {
    function onSuccess(data) {
      dispatch({
        type: GET_MULTI_VIEW_SWELL_FORECAST,
        payload: data,
      });
      return data;
    }
    request
      .then((data) => onSuccess(data))
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getCloseSurfSpots = (jsonUrl) => {
  const fullURL = `${jsonUrl.urlProxy}/${jsonUrl.surfSpotJson}`;

  const request = new Promise((res) => {
    res(latLng(fullURL));
  });
  return (dispatch) => {
    function onError(error) {
      dispatch({ type: GEO_LOCATION_ERROR, payload: error });
      return error;
    }
    function onSuccess(data) {
      dispatch({ type: GET_CLOSE_SURFSPOTS, payload: data });
      return data;
    }

    request
      .then((result) => {
        return getLocations(result);
      })
      .then((locationsAndCoords) => {
        locationsAndCoords.coords.error != undefined
          ? onError(locationsAndCoords.coords.error)
          : null;
        return getCloseSurfSpotsArr(locationsAndCoords);
      })
      .then((closeSurfSpotsRaw) => {
        return closeSurfSpotArrayFiltering(closeSurfSpotsRaw);
      })
      .then((data) => {
        onSuccess(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const searchActionCloseSurfSpots = (value) => {
  const fullURL = `${value.jsonUrl.urlProxy}/${value.jsonUrl.surfSpotJson}`;
  return (dispatch) => {
    function onSuccess(data) {
      dispatch({ type: GET_CLOSE_SURFSPOTS, payload: data });
      return data;
    }

    axios
      .get(fullURL)
      .then((response) => {
        const coords = {
          latitude: value.latitude,
          longitude: value.longitude,
        };
        return { locations: response.data, coords: coords };
      })
      .then((locationsAndCoords) => {
        return getCloseSurfSpotsArr(locationsAndCoords);
      })
      .then((closeSurfSpotsRaw) => {
        return closeSurfSpotArrayFiltering(closeSurfSpotsRaw);
      })
      .then((data) => {
        onSuccess(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getTideStations = (value) => {
  const fullURL = `${value.apiEndpoints.urlProxy}/${value.apiEndpoints.tideAndCurrentsApiData}`;

  let request = new Promise((resolve) => {
    axios
      .get(fullURL)
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        let stationsArr = [];
        data.tideStations.map((station) => {
          const distanceFromLocation = getDistanceFromLatLonInKm(
            value.surfSpot.lat,
            value.surfSpot.lng,
            station.lat,
            station.lng
          );
          stationsArr.push({
            distanceFromLocation: distanceFromLocation,
            lat: station.lat,
            lng: station.lng,
            id: station.id,
            name: station.name,
            state: station.state,
          });

          resolve(stationsArr);
        });
      })
      .catch((error) => {
        throw error;
      });
  });

  return (dispatch) => {
    function onSuccess(data) {
      dispatch({ type: GET_TIDE_STATIONS, payload: data });
      return data;
    }

    request.then((data) => {
      const sortedArr = data.sort((a, b) => {
        if (a.distanceFromLocation > b.distanceFromLocation) return 1;
        if (a.distanceFromLocation < b.distanceFromLocation)
          return -1;
        return 0;
      });
      onSuccess(sortedArr.slice(0, 20));
    });
  };
};

export const getTideForecast = (data) => {
  const fullURL = `${data.apiEndpoints.urlProxy}/${data.apiEndpoints.tidesAndCurrentsUrl}`;
  const tideApiUrlMlw = `${fullURL}date=today&station=${data.tideStations[0].id}&product=predictions&datum=MLLW&time_zone=lst_ldt&interval=h&units=english&format=json`;
  const tideApiUrlMlw2 = `${fullURL}date=today&station=${data.tideStations[1].id}&product=predictions&datum=MLLW&time_zone=lst_ldt&interval=h&units=english&format=json`;
  const tideApiUrlMlw3 = `${fullURL}date=today&station=${data.tideStations[2].id}&product=predictions&datum=MLLW&time_zone=lst_ldt&interval=h&units=english&format=json`;

  const headers = {
    'X-Requested-With': 'XMLHttpReques',
  };
  return (dispatch) => {
    axios
      .get(tideApiUrlMlw, headers)
      .then((response) => {
        if (response.data.error) {
          axios
            .get(tideApiUrlMlw2)
            .then((response) => {
              if (response.data.error) {
                axios
                  .get(tideApiUrlMlw3)
                  .then((response) => {
                    return response.data;
                  })
                  .then((data) => {
                    dispatch({
                      type: GET_TIDE_FORECAST,
                      payload: data,
                    });
                  });
              }

              return response.data;
            })
            .then((data) => {
              dispatch({ type: GET_TIDE_FORECAST, payload: data });
            });
        }
        return response.data;
      })
      .then((data) => {
        dispatch({ type: GET_TIDE_FORECAST, payload: data });
      });
  };
};

export const getWaterTemp = (data) => {
  // ----------- function to break down columns of txt in ndbc txt file return

  const NdbcWaterTemp = `${data.apiEndpoints.urlProxy}/https://www.ndbc.noaa.gov/data/realtime2/${data.ndbcStations.buoyId}.txt`;

  return (dispatch) => {
    axios
      .get(NdbcWaterTemp)
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        const cells = data.split('\n').map(function (el) {
          return el.split(/\s+/);
        });
        const headings = cells.shift();
        let arr = [];
        var out = cells.map(function (el) {
          var obj = {};
          for (var i = 0, l = el.length; i < l; i++) {
            obj[headings[i]] = isNaN(Number(el[i])) ? el[i] : +el[i];
          }
          return obj;
        });

        var json = JSON.stringify(out, null, 2);
        return json;
      })
      .then((data) => {
        const parsedData = JSON.parse(data);
        parsedData[1].WTMP != 'MM'
          ? dispatch({
              type: GET_WATER_TEMP,
              payload: parsedData[1].WTMP,
            })
          : parsedData[2].WTMP != 'MM'
          ? dispatch({
              type: GET_WATER_TEMP,
              payload: parsedData[2].WTMP,
            })
          : dispatch({
              type: GET_WATER_TEMP,
              payload: parsedData[3].WTMP,
            });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getCurrentSwell = (data) => {
  // ----------- function to break down columns of txt in ndbc txt file return
  // ----------

  const NdbcSwell = `${data.apiEndpoints.urlProxy}/https://www.ndbc.noaa.gov/data/realtime2/${data.ndbcStations.buoyId}.txt`;

  return (dispatch) => {
    axios
      .get(NdbcSwell)
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        const cells = data.split('\n').map(function (el) {
          return el.split(/\s+/);
        });
        const headings = cells.shift();
        let arr = [];
        var out = cells.map(function (el) {
          var obj = {};
          for (var i = 0, l = el.length; i < l; i++) {
            obj[headings[i]] = isNaN(Number(el[i])) ? el[i] : +el[i];
          }
          return obj;
        });

        var json = JSON.stringify(out, null, 2);
        return json;
      })
      .then((data) => {
        const parsedData = JSON.parse(data);
        parsedData[1].WVHT != 'MM'
          ? dispatch({
              type: GET_CURRENT_SWELL,
              payload: {
                waveHeight: parsedData[1].WVHT,
                dominantPeriod: parsedData[1].DPD,
                swellDirection: parsedData[1].MWD,
              },
            })
          : parsedData[2].WVHT != 'MM'
          ? dispatch({
              type: GET_CURRENT_SWELL,
              payload: {
                waveHeight: parsedData[2].WVHT,
                dominantPeriod: parsedData[2].DPD,
                swellDirection: parsedData[2].MWD,
              },
            })
          : parsedData[3].WVHT != 'MM'
          ? dispatch({
              type: GET_CURRENT_SWELL,
              payload: {
                waveHeight: parsedData[3].WVHT,
                dominantPeriod: parsedData[3].DPD,
                swellDirection: parsedData[3].MWD,
              },
            })
          : parsedData[4].WVHT != 'MM'
          ? dispatch({
              type: GET_CURRENT_SWELL,
              payload: {
                waveHeight: parsedData[4].WVHT,
                dominantPeriod: parsedData[4].DPD,
                swellDirection: parsedData[4].MWD,
              },
            })
          : parsedData[5].WVHT != 'MM'
          ? dispatch({
              type: GET_CURRENT_SWELL,
              payload: {
                waveHeight: parsedData[5].WVHT,
                dominantPeriod: parsedData[5].DPD,
                swellDirection: parsedData[5].MWD,
              },
            })
          : parsedData[6].WVHT != 'MM'
          ? dispatch({
              type: GET_CURRENT_SWELL,
              payload: {
                waveHeight: parsedData[6].WVHT,
                dominantPeriod: parsedData[6].DPD,
                swellDirection: parsedData[6].MWD,
              },
            })
          : dispatch({
              type: GET_CURRENT_SWELL,
              payload: {
                waveHeight: parsedData[7].WVHT,
                dominantPeriod: parsedData[7].DPD,
                swellDirection: parsedData[7].MWD,
              },
            });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getSwellForecast = (data) => {
  let request = new Promise((resolve) => {
    let arr = [];
    data.map((hourlyForecast) => {
      let dateObj = new Date(hourlyForecast.time);
      let fullDate = `${dateObj.getMonth() + 1}/${dateObj.getDate()}`;
      let day = new Date(dateObj).toLocaleString('default', {
        weekday: 'long',
      });

      arr.push({
        date: fullDate,
        dayOfWeek: day,
        time: formatAMPM(new Date(hourlyForecast.time)),
        localTime: hourlyForecast.time,
        minBreakingHeight: hourlyForecast.minBreakingHeight,
        maxBreakingHeight: hourlyForecast.maxBreakingHeight,
        primarySwellDirection: hourlyForecast.swellDirection,
        primaryHeight: hourlyForecast.swellHeight,
        primaryPeriod: hourlyForecast.swellPeriod,
      });
    });
    resolve(arr);
  });
  return (dispatch) => {
    function onSuccess(data) {
      dispatch({ type: GET_SWELL_FORECAST, payload: data });
      return data;
    }

    request
      .then((data) => {
        onSuccess(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// Determines number of feet of forecast chart interval spacing for wave height
// by getting max wave height in the forecast period then equally dividing
// number of feet for intervals.

export const getMaxWaveHeight = (data) => {
  let maxWaveHeightArr = [];
  const request = new Promise((resolve) => {
    for (const [key, value] of Object.entries(data)) {
      maxWaveHeightArr.push(value.waveHeight);
    }

    resolve(maxWaveHeightArr);
  });
  return (dispatch) => {
    function onSuccess(data) {
      dispatch({ type: GET_MAX_WAVE_HEIGHT, payload: data });
      return data;
    }

    request
      .then((data) => {
        const sortedArr = data.sort((a, b) => {
          if (a > b) return 1;
          if (a < b) return -1;
          return 0;
        });
        onSuccess(Math.ceil(sortedArr[sortedArr.length - 1]));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getMaxWaveHeightMultiView = (data) => {
  let maxWaveHeightArr = [];
  const request = new Promise((resolve) => {
    data.map((item) => {
      item.forecast.map((i) => {
        maxWaveHeightArr.push(i.maxBreakingHeight);
      });
    });
    resolve(maxWaveHeightArr);
  });
  return (dispatch) => {
    function onSuccess(data) {
      dispatch({
        type: GET_MAX_WAVE_HEIGHT_MULTI_VIEW,
        payload: data,
      });
      return data;
    }

    request
      .then((data) => {
        const sortedArr = data.sort((a, b) => {
          if (a > b) return 1;
          if (a < b) return -1;
          return 0;
        });
        onSuccess(sortedArr[sortedArr.length - 1]);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getWindForecast = (data) => {
  let request = new Promise((resolve) => {
    let arr = [];
    data.map((hourlyForecast) => {
      let dateObj = new Date(hourlyForecast.time);
      let fullDate = `${dateObj.getMonth() + 1}/${dateObj.getDate()}`;
      let day = new Date(dateObj).toLocaleString('default', {
        weekday: 'long',
      });

      arr.push({
        date: fullDate,
        dayOfWeek: day,
        time: formatAMPM(new Date(hourlyForecast.time)),
        localTime: hourlyForecast.time,
        direction: hourlyForecast.windDirection,
        gusts: hourlyForecast.windGusts,
        speed: hourlyForecast.windSpeed,
        unit: 'mph',
      });
    });
    resolve(arr);
  });
  return (dispatch) => {
    function onSuccess(data) {
      dispatch({ type: GET_WIND_FORECAST, payload: data });
      return data;
    }

    request
      .then((data) => {
        onSuccess(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// ndbc station list and api call
// https://sdf.ndbc.noaa.gov/sos/server.php?request=GetObservation&service=SOS&v
// e
// rsion=1.0.0&offering=urn:ioos:station:wmo:41012&observedproperty=sea_water_te
// m perature&responseformat=text/csv&eventtime=latest  DIRECTIONS FOR NEXT DEV
// -------------- change function below to call to api list to get buoys with
// num values then call api endpoint with closest id at the above enpoint
export const getWeatherStations = (data) => {
  const boundingBox = getBoundingBox([data.lat, data.lng], 10);
  let config = {
    headers: {
      token: 'OZvsDblbJDAGZxTVLIMzZjgWFgWeOPvc',
    },
  };
  const closeWeatherStationsUrl = `https://mk-digital-cors-bypass-proxy.herokuapp.com/https://www.ncdc.noaa.gov/cdo-web/api/v2/stations?extent=${boundingBox.minLat},${boundingBox.minLng},${boundingBox.maxLat},${boundingBox.maxLng}`;
  return (dispatch) => {
    return axios
      .get(closeWeatherStationsUrl, config)
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        dispatch({ type: GET_WEATHER_STATIONS, payload: data });
      })
      .catch((error) => {
        throw error;
      });
  };
};

export const getWeather = (data) => {
  let apiKey = '5c8c6a2c60f2435f80829630c352643b';
  const weatherUrl = `https://api.weatherbit.io/v2.0/current?lat=${data.lat}&lon=${data.lng}&key=${apiKey}&units=I`;
  return (dispatch) => {
    return axios
      .get(weatherUrl)
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        dispatch({ type: GET_WEATHER, payload: data });
      })
      .catch((error) => {
        throw error;
      });
  };
};

export const getWeatherForecast = (data) => {
  const openWeatherApiKey = 'bc487a6d87516d1d2546ceb1c78a6fa4';
  const weatherForecastApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.lat}&lon=${data.lng}&exclude=minutely,alerts&units=imperial&appid=${openWeatherApiKey}`;
  return (dispatch) => {
    return axios
      .get(weatherForecastApiUrl)
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        dispatch({ type: GET_WEATHER_FORECAST, payload: data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getNdbcStations = (val) => {
  const fullURL = `${val.apiEndpoints.urlProxy}/${val.apiEndpoints.ndbcBuoyData}`;
  const request = axios
    .get(fullURL)
    .then((response) => {
      return response.data;
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      throw error;
    });
  return (dispatch) => {
    request
      .then((data) => {
        return new Promise((resolve) => {
          let stationsArr = [];
          for (const [key, value] of Object.entries(data.ndbcBouys)) {
            const distanceFromLocation = getDistanceFromLatLonInKm(
              val.surfSpot.lat,
              val.surfSpot.lng,
              value.SpatialExtent.coordinates[1],
              value.SpatialExtent.coordinates[0]
            );
            Number.isInteger(parseInt(key))
              ? stationsArr.push({
                  buoyId: parseInt(key),
                  distanceFromLocation: distanceFromLocation,
                })
              : null;
          }
          resolve(stationsArr);
        });
      })
      .then((data) => {
        const sortedArr = data.sort((a, b) => {
          if (a.distanceFromLocation > b.distanceFromLocation)
            return 1;
          if (a.distanceFromLocation < b.distanceFromLocation)
            return -1;
          return 0;
        });
        const finalDataArr = sortedArr.slice(0, 20);
        dispatch({ type: GET_NDBC_STATIONS, payload: finalDataArr });
      });
  };
};

// const distanceFromLocation = getDistanceFromLatLonInKm(latLon.lat,
// latLon.lng, station.lat, station.lng); stationsArr.push({
// distanceFromLocation: distanceFromLocation,     lat: station.lat,     lng:
// station.lng,     id: station.id,     state: station.state })
