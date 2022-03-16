import { GET_SPOT_FORECAST, GET_CLOSE_SURFSPOTS, GET_MAX_WAVE_HEIGHT, GET_SWELL_FORECAST, GET_WIND_FORECAST, GET_TIDE_FORECAST, GET_TIDE_STATIONS, GET_WEATHER_STATIONS } from '../helpers/types'
import { formatAMPM } from '../helpers/utilities'
import { getDistanceFromLatLonInKm, getBoundingBox} from '../helpers/utilities'
import axios from 'axios'

const surfSpotsApiUrl = 'http://localhost:9000/Locations';
const tideStationApiUrl = 'http://localhost:8888/tideStations';
const msUrl = 'https://magicseaweed.com/api/76b9f172c5acb310986adca80941a8bb/forecast/?spot_id=';

// NOAA web services api token

const ncdcWebServiceToken = 'OZvsDblbJDAGZxTVLIMzZjgWFgWeOPvc'; 

const tidesAndCurrentsUrl = 'https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?';
// "20130808%2001:00&end_date=20130808%2023:06&station=8454000&product=water_level&datum=mllw&units=english&time_zone=gmt&application=Martin_Kennedy&format=json'

const latLng = () => new Promise((res, rej) => {
    navigator
        .geolocation
        .getCurrentPosition(function (position) {
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;
            const coords = {
                latitude: latitude,
                longitude: longitude
            }
            res(coords);
        })
})
const getLocations = (coords) => axios
    .get(surfSpotsApiUrl)
    .then(response => {
        return {locations: response.data, coords: coords}
    })
    .catch(error => {
        throw(error);
    });

const getCloseSurfSpotsArr = (locationsAndCoords) => {

    const currentLat = locationsAndCoords.coords.latitude;
    const currentLng = locationsAndCoords.coords.longitude;
    const _obj = locationsAndCoords.locations;

    return new Promise((resolve) => {
        const data = Object.keys(_obj);
        resolve(data)
    }).then((data) => {
        return data.map((country) => {
            if (country) {
                return _obj[country].map((item) => {
                    const distanceFromLocation = getDistanceFromLatLonInKm(currentLat, currentLng, item.lat, item.lng);
                    if (distanceFromLocation < 100) {
                        item.countryOrState = country;
                        item.distanceFromLocation = distanceFromLocation;
                        return item;
                    }
                })
            }
        })

    })

}
const closeSurfSpotArrayFiltering = (closeLocations) => {
    return new Promise((resolve) => {
        resolve(closeLocations.map((location) => {
            return location.filter(Boolean)
        }))
    }).then((item) => item.filter((location) => {
        if (location.length > 0) {
            return location
        }
    })).then((data) => {
        const flatArr = data.flat();
        const sortedArr = flatArr.sort((a, b) => {
            if (a.distanceFromLocation > b.distanceFromLocation) 
                return 1;
            if (a.distanceFromLocation < b.distanceFromLocation) 
                return -1;
            return 0;
        });
        return sortedArr.slice(0, 20);
    })
}

export const getSurfForecast = (spotId) => {
    return (dispatch) => {
        return axios.get(msUrl + spotId)
            .then(response => {
                return response.data
            }).then(data => {
                dispatch({
                    type: GET_SPOT_FORECAST,
                    payload: data
                })
            })
            .catch(error => {
                throw (error);
            });
        }
};


export const getCloseSurfSpots = () => {

    const request = new Promise((res) => {
        res(latLng())
    });
    return (dispatch) => {
        function onSuccess(data) {
            dispatch({ type: GET_CLOSE_SURFSPOTS, payload: data});
            return data;
        }

        request.then(result => {
            return getLocations(result)
        }).then((locationsAndCoords) => {
            return getCloseSurfSpotsArr(locationsAndCoords)
        }).then((closeSurfSpotsRaw) => {
            return closeSurfSpotArrayFiltering(closeSurfSpotsRaw)
        }).then(data => {
            onSuccess(data)
        }).catch((error) => {
            console.log(error);
        })
    };
}

export const getTideStations = (latLon) => {
    let request = new Promise((resolve) => { axios.get(tideStationApiUrl)
        .then(response => {
            return response.data
        }).then(data => {
            let stationsArr = [];
            data.stations.map((station) => {
            const distanceFromLocation = getDistanceFromLatLonInKm(latLon.lat, latLon.lng, station.lat, station.lng);
                stationsArr.push({
                    distanceFromLocation: distanceFromLocation,
                    lat: station.lat,
                    lng: station.lng,
                    id: station.id,
                    state: station.state
                })
                
                resolve(stationsArr);
            
        })
       
        }).catch(error => {
            throw (error);
        });
})
   

        return (dispatch) => {
            function onSuccess(data) {
                dispatch({ type: GET_TIDE_STATIONS, payload: data });
                return data;
            }

            request.then((data) => {
                const sortedArr = data.sort((a, b) => {
                    if (a.distanceFromLocation > b.distanceFromLocation)
                        return 1;
                    if (a.distanceFromLocation < b.distanceFromLocation)
                        return -1;
                    return 0;
                })
                 onSuccess(sortedArr.slice(0,20));
            })
        };

}

export const getTideForecast = (data) => {
    console.log(data)
    const tideApiUrl = `${tidesAndCurrentsUrl}date=today&station=${data.id}&product=predictions&datum=STND&time_zone=gmt&interval=hilo&units=english&format=json`
    return (dispatch) => {
        return axios.get(tideApiUrl)
            .then(response => {
                return response.data
            }).then(data => {
                dispatch({
                    type: GET_TIDE_FORECAST,
                    payload: data
                })
            })
            .catch(error => {
                throw (error);
            });
    }
}

 export const getSwellForecast = (data) => {
     let request = new Promise((resolve) => {
        let arr = [];
         data.map((hourlyForecast) => {
             let dateObj = new Date(hourlyForecast.localTimestamp * 1000);
             let fullDate = `${dateObj.getMonth() + 1}/${dateObj.getDate()}`
            
                 arr.push(
                     {
                         date: fullDate,
                         time: formatAMPM(new Date(hourlyForecast.localTimestamp * 1000)),
                         localTime: hourlyForecast.localTimestamp * 1000,
                         minBreakingHeight: hourlyForecast.swell.minBreakingHeight,
                         maxBreakingHeight: hourlyForecast.swell.maxBreakingHeight,
                         primarySwellDirection: hourlyForecast.swell.components.primary.compassDirection,
                         primaryHeight: hourlyForecast.swell.components.primary.height,
                         primaryPeriod: hourlyForecast.swell.components.primary.period,
                         secondarySwellDirection: hourlyForecast.swell.components.secondary ? hourlyForecast.swell.components.secondary.compassDirection : '',
                         secondaryHeight: hourlyForecast.swell.components.secondary ? hourlyForecast.swell.components.secondary.height : '',
                         secondaryPeriod: hourlyForecast.swell.components.secondary ? hourlyForecast.swell.components.secondary.period : '',
                     }
                 )
             })
             resolve(arr);
         })
     return (dispatch) => {
         function onSuccess(data) {
             dispatch({ type: GET_SWELL_FORECAST, payload: data });
             return data;
         }

         request.then(data => {
             onSuccess(data)
         }).catch((error) => {
             console.log(error);
         })
     };
 }

 export const getMaxWaveHeight = (data) => {
     let maxWaveHeightArr = [];
     const request = new Promise((resolve) => {
         data.map((item) => {
             maxWaveHeightArr.push(item.swell.maxBreakingHeight);
         })
         resolve(maxWaveHeightArr)
     })
     return (dispatch) => {
         function onSuccess(data) {
             dispatch({ type: GET_MAX_WAVE_HEIGHT, payload: data });
             return data;
         }

         request.then(data => {
             const sortedArr = data.sort((a, b) => {
                 if (a > b)
                     return 1;
                 if (a < b)
                     return -1;
                 return 0;
             });
             onSuccess(sortedArr[sortedArr.length - 1])
         
         }).catch((error) => {
             console.log(error);
         })
     };
 }


export const getWindForecast = (data) => {
    let request = new Promise((resolve) => {
        let arr = [];
        data.map((hourlyForecast) => {
            let dateObj = new Date(hourlyForecast.localTimestamp * 1000);
            let fullDate = `${dateObj.getMonth() + 1}/${dateObj.getDate()}`

            arr.push(
                {
                    date: fullDate,
                    time: formatAMPM(new Date(hourlyForecast.localTimestamp * 1000)),
                    localTime: hourlyForecast.localTimestamp * 1000,
                    chill: hourlyForecast.wind.chill,
                    compassDirection: hourlyForecast.wind.compassDirection,
                    direction: hourlyForecast.wind.direction,
                    gusts: hourlyForecast.wind.gusts,
                    speed: hourlyForecast.wind.speed,
                    unit: hourlyForecast.wind.unit
                }
            )
        })
        resolve(arr);
    })
    return (dispatch) => {
        function onSuccess(data) {
            dispatch({ type: GET_WIND_FORECAST, payload: data });
            return data;
        }

        request.then(data => {
            onSuccess(data)
        }).catch((error) => {
            console.log(error);
        })
    };
}

export const getWeatherStations = (data) => {
    const boundingBox = getBoundingBox([data.lat, data.lng], 10);
    let config = {
        headers: {
            token: 'OZvsDblbJDAGZxTVLIMzZjgWFgWeOPvc'
        }
    }
    const closeWeatherStationsUrl = `https://www.ncdc.noaa.gov/cdo-web/api/v2/stations?extent=${boundingBox.minLat},${boundingBox.minLng},${boundingBox.maxLat},${boundingBox.maxLng}`
    return (dispatch) => {
        return axios.get(closeWeatherStationsUrl, config)
            .then(response => {
                return response.data
            }).then(data => {
                dispatch({
                    type: GET_WEATHER_STATIONS,
                    payload: data
                })
            })
            .catch(error => {
                throw (error);
            });
    }

}

export const getWeather = (data) => {
    let config = {
        headers: {
            token: 'OZvsDblbJDAGZxTVLIMzZjgWFgWeOPvc'
        }
    }
    const closeWeatherStationsUrl = `https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datatypeid=TOBS&stationid=${data.id}`
    return (dispatch) => {
        return axios.get(closeWeatherStationsUrl, config)
            .then(response => {
                return response.data
            }).then(data => {
                dispatch({
                    type: GET_WEATHER_STATIONS,
                    payload: data
                })
            })
            .catch(error => {
                throw (error);
            });
    }
}




// https://www.ncdc.noaa.gov/cdo-web/api/v2/data?stationid=



