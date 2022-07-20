import { GET_ACTIVE_LOCATION, GET_MULTI_VIEW_FORECAST, LOAD_VIEW, SEARCH_OPEN_STATE, CLOSE_SPOTS_OPEN_STATE, GET_LOCATION_OBJECT, GET_SPOT_FORECAST, GET_CLOSE_SURFSPOTS, GET_MAX_WAVE_HEIGHT, GET_SWELL_FORECAST, GET_WIND_FORECAST, GET_TIDE_FORECAST, GET_WATER_TEMP, GET_NDBC_STATIONS, GET_TIDE_STATIONS, GET_WEATHER_STATIONS, GET_WEATHER, GET_WEATHER_FORECAST, GET_CURRENT_SWELL, GET_SEARCH_CLOSE_SURFSPOTS, GEO_LOCATION_ERROR } from '../helpers/types'
import { formatAMPM } from '../helpers/utilities'
import { getDistanceFromLatLonInKm, getBoundingBox } from '../helpers/utilities'
import axios from 'axios';


const surfSpotsApiUrl = 'https://res.cloudinary.com/mk-digital/raw/upload/v1655572169/MK-Digital-Surf-App/surfSpots_yhjhfc.json';
const tideStationApiUrl = 'https://res.cloudinary.com/mk-digital/raw/upload/v1655134141/MK-Digital-Surf-App/tideStations_vxlwrw.json';
const NDBCStationApiUrl = 'https://res.cloudinary.com/mk-digital/raw/upload/v1655134357/MK-Digital-Surf-App/ndbcBuoys_nguiue.json';
const msUrl = 'https://mk-digital-cors-bypass-proxy.herokuapp.com/https://magicseaweed.com/api/76b9f172c5acb310986adca80941a8bb/forecast/?spot_id=';
const wunderGroundApiKey = `3a51c1f2c325423d91c1f2c325823d80`;


// NOAA web services api token
const ncdcWebServiceToken = 'OZvsDblbJDAGZxTVLIMzZjgWFgWeOPvc';
const tidesAndCurrentsUrl = 'https://mk-digital-cors-bypass-proxy.herokuapp.com/https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?';
const apiUrl2 = 'https://jsonkeeper.com/b/1U1N';

export const searchOpenState = (data) => {
    return {
        type: SEARCH_OPEN_STATE,
        payload: data,
    };
};

export const closeSpotsOpenState = (data) => {
    return {
        type: CLOSE_SPOTS_OPEN_STATE,
        payload: data,
    };
};

export const loadView = (data) => {
    return {
        type: LOAD_VIEW,
        payload: data,
    };
};

export const getActiveLocation = (data) => {
    return {
        type: GET_ACTIVE_LOCATION,
        payload: data
    }
}


export const getLocationsObject = () => {
   
    let request = new Promise((resolve) => {
        axios.get(surfSpotsApiUrl)
        .then(response => {
            return response.data
        }).then(data => {
            
            let countriesArr = []
               const countries =  Object.keys(data);
             countries.map((country) => {
                if (country) {
                    return data[country].map((item) => {
                        item.countryOrState = country;
                        item.fullLocation = `${item.town}, ${country}`
                        countriesArr.push(item);
                    })
                }
            })
            resolve(countriesArr);
        });
    })
    return (dispatch) => {
        function onSuccess(data) {
            dispatch({ type: GET_LOCATION_OBJECT, payload: data });
            return data;
        }
        request.then(data => {
                onSuccess(data);
            })
            .catch(error => {
                throw (error);
            });
    }
}



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
        }, (error) => { 
            const coords = {
                latitude: 39.5316467,
                longitude: -74.2620961,
                error: {code: error.code, message: error.message}
            }
            res(coords);
            
        })
})
const getLocations = (coords) => axios
    .get(surfSpotsApiUrl)
    .then(response => {
        return { locations: response.data, coords: coords }
    })
    .catch(error => {
        throw (error);
    });

const getCloseSurfSpotsArr = (locationsAndCoords) => {

    const currentLat = locationsAndCoords.coords.latitude;
    const currentLng = locationsAndCoords.coords.longitude;
    const defaultLat = 39.5316467;
    const defaultLng = -74.2620961;
    const _obj = locationsAndCoords.locations;

    return new Promise((resolve) => {
        const data = Object.keys(_obj);
        resolve(data)
    }).then((data) => {
        return data.map((country) => {
            if (country) {
                return _obj[country].map((item) => {
                    const distanceFromLocation = getDistanceFromLatLonInKm(currentLat, currentLng, item.lat, item.lng);
                    const distanceDefaultLocation = getDistanceFromLatLonInKm(defaultLat, defaultLng, item.lat, item.lng);
                    if (distanceFromLocation < 100) {
                        item.countryOrState = country;
                        item.distanceFromLocation = distanceFromLocation;
                        return item;
                    } else if (distanceFromLocation < 500) {
                        item.countryOrState = country;
                        item.distanceFromLocation = distanceFromLocation;
                        return item;
                    } else if (distanceFromLocation < 1000) {
                        item.countryOrState = country;
                        item.distanceFromLocation = distanceFromLocation;
                        return item;
                    } else {
                        item.countryOrState = country;
                        item.distanceFromLocation = distanceDefaultLocation;
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

export const getMultiViewSurfForecast = (data) => {
    return (dispatch) => {
         data.map((item) => {
             return axios.get(msUrl + item.spotId)
                .then(response => {
                    return response.data
                }).then(data => {
                    dispatch({ type: GET_MULTI_VIEW_FORECAST, payload: data, country: item.countryOrState, town: item.town });
                })
                .catch(error => {
                    throw (error);
                });
        })
    }
    };


export const getCloseSurfSpots = () => {

    const request = new Promise((res) => {
        res(latLng())
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

        request.then(result => {
            return getLocations(result)
        }).then((locationsAndCoords) => {
            locationsAndCoords.coords.error != undefined ? onError(locationsAndCoords.coords.error) : null;
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


export const searchActionCloseSurfSpots = (value) => {

    return (dispatch) => {
        function onSuccess(data) {
            dispatch({ type: GET_CLOSE_SURFSPOTS, payload: data });
            return data;
        }
        
        
            axios.get(surfSpotsApiUrl)
            .then(response => {
                const coords = {
                    latitude: value.latitude,
                    longitude: value.longitude
                }
                return { locations: response.data, coords: coords }
            }).then((locationsAndCoords) => {
                return getCloseSurfSpotsArr(locationsAndCoords)
            }).then((closeSurfSpotsRaw) => {
                return closeSurfSpotArrayFiltering(closeSurfSpotsRaw)
            }).then(data => {
                onSuccess(data)
            }).catch((error) => {
                console.log(error);
            });
    };
}

export const getTideStations = (latLon) => {
    let request = new Promise((resolve) => {
        axios.get(tideStationApiUrl)
        .then(response => {
            return response.data
        }).then(data => {
            let stationsArr = [];
            data.tideStations.map((station) => {
                const distanceFromLocation = getDistanceFromLatLonInKm(latLon.lat, latLon.lng, station.lat, station.lng);
                stationsArr.push({
                    distanceFromLocation: distanceFromLocation,
                    lat: station.lat,
                    lng: station.lng,
                    id: station.id,
                    name: station.name,
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
            onSuccess(sortedArr.slice(0, 20));
        })
    };

}

export const getTideForecast = (data) => {
    const tideApiUrlMlw = `${tidesAndCurrentsUrl}date=today&station=${data[0].id}&product=predictions&datum=MLLW&time_zone=lst_ldt&interval=h&units=english&format=json`;
    const tideApiUrlMlw2 = `${tidesAndCurrentsUrl}date=today&station=${data[1].id}&product=predictions&datum=MLLW&time_zone=lst_ldt&interval=h&units=english&format=json`;


    return (dispatch) => {
        axios.get(tideApiUrlMlw)
            .then(response => {
                return response.data
            }).then(data => {
                dispatch({
                    type: GET_TIDE_FORECAST,
                    payload: data,
                });
            })
            .catch(error => {
                axios.get(tideApiUrlMlw2)
                    .then(response => {
                        return response.data
                    }).then(data => {
                        dispatch({
                            type: GET_TIDE_FORECAST,
                            payload: data,
                        });
                    })
                throw (error);
            });

    }
}

export const getWaterTemp = (data) => {

    // ----------- function to break down columns of txt in ndbc txt file return ----------

    const NdbcWaterTemp = `https://mk-digital-cors-bypass-proxy.herokuapp.com/https://www.ndbc.noaa.gov/data/realtime2/${data.buoyId}.txt`;



    return (dispatch) => {
        axios.get(NdbcWaterTemp)
            .then(response => {
                return response.data
            }).then(data => {
                
                const cells = data.split('\n').map(function (el) { return el.split(/\s+/); });
                const headings = cells.shift();
                let arr = [];
                var out = cells.map(function (el) {
                    var obj = {};
                    for (var i = 0, l = el.length; i < l; i++) {
                        obj[headings[i]] = isNaN(Number(el[i])) ? el[i] : + el[i];
                    }
                    return obj;
                })

                var json = JSON.stringify(out, null, 2);
                return json;


            }).then((data) => {
                const parsedData = JSON.parse(data);
                parsedData[1].WTMP != "MM" ?
                dispatch({
                    type: GET_WATER_TEMP,
                    payload: parsedData[1].WTMP,
                }) : parsedData[2].WTMP != "MM" ? dispatch({
                            type: GET_WATER_TEMP,
                            payload: parsedData[2].WTMP,
                }) : dispatch({
                    type: GET_WATER_TEMP,
                    payload: parsedData[3].WTMP,
                }) 
            })

            .catch(error => {
                throw (error);
            });

    }
}

export const getCurrentSwell = (data) => {


    // ----------- function to break down columns of txt in ndbc txt file return ----------

    const NdbcSwell = `https://mk-digital-cors-bypass-proxy.herokuapp.com/https://www.ndbc.noaa.gov/data/realtime2/${data.buoyId}.txt`;



    return (dispatch) => {
        axios.get(NdbcSwell)
            .then(response => {
                return response.data
            }).then(data => {

                const cells = data.split('\n').map(function (el) { return el.split(/\s+/); });
                const headings = cells.shift();
                let arr = [];
                var out = cells.map(function (el) {
                    var obj = {};
                    for (var i = 0, l = el.length; i < l; i++) {
                        obj[headings[i]] = isNaN(Number(el[i])) ? el[i] : + el[i];
                    }
                    return obj;
                })

                var json = JSON.stringify(out, null, 2);
                return json;


            }).then((data) => {
                const parsedData = JSON.parse(data);
                parsedData[1].WVHT != "MM" ?
                    dispatch({
                        type: GET_CURRENT_SWELL,
                        payload: {
                            waveHeight: parsedData[1].WVHT,
                            dominantPeriod: parsedData[1].DPD,
                            swellDirection: parsedData[1].MWD,
                        }
                    }) : parsedData[2].WVHT != "MM" ? dispatch({
                        type: GET_CURRENT_SWELL,
                        payload: {
                            waveHeight: parsedData[2].WVHT,
                            dominantPeriod: parsedData[2].DPD,
                            swellDirection: parsedData[2].MWD,
                        }
                    }) : parsedData[3].WVHT != "MM" ? dispatch({
                        type: GET_CURRENT_SWELL,
                        payload: {
                            waveHeight: parsedData[3].WVHT,
                            dominantPeriod: parsedData[3].DPD,
                            swellDirection: parsedData[3].MWD,
                        }
                    }) : parsedData[4].WVHT != "MM" ? dispatch({
                        type: GET_CURRENT_SWELL,
                        payload: {
                            waveHeight: parsedData[4].WVHT,
                            dominantPeriod: parsedData[4].DPD,
                            swellDirection: parsedData[4].MWD,
                        }
                    }) : parsedData[5].WVHT != "MM" ? dispatch({
                        type: GET_CURRENT_SWELL,
                        payload: {
                            waveHeight: parsedData[5].WVHT,
                            dominantPeriod: parsedData[5].DPD,
                            swellDirection: parsedData[5].MWD,
                        }
                    }) : parsedData[6].WVHT != "MM" ? dispatch({
                        type: GET_CURRENT_SWELL,
                        payload: {
                            waveHeight: parsedData[6].WVHT,
                            dominantPeriod: parsedData[6].DPD,
                            swellDirection: parsedData[6].MWD,
                        }
                    }) : dispatch({
                        type: GET_CURRENT_SWELL,
                        payload: {
                            waveHeight: parsedData[7].WVHT,
                            dominantPeriod: parsedData[7].DPD,
                            swellDirection: parsedData[7].MWD,
                        }
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
            let day = new Date(dateObj).toLocaleString(
                'default', { weekday: 'long' }
            );

            arr.push(
                {
                    date: fullDate,
                    dayOfWeek: day,
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


// Determines number of feet of forecast chart interval spacing for wave height by getting max wave height in the forecast period then equally dividing number of feet for intervals.

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
            let fullDate = `${dateObj.getMonth() + 1}/${dateObj.getDate()}`;
            let day = new Date(dateObj).toLocaleString(
                'default', { weekday: 'long' }
            );

            arr.push(
                {
                    date: fullDate,
                    dayOfWeek: day,
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

// ndbc station list and api call
// https://sdf.ndbc.noaa.gov/sos/server.php?request=GetObservation&service=SOS&version=1.0.0&offering=urn:ioos:station:wmo:41012&observedproperty=sea_water_temperature&responseformat=text/csv&eventtime=latest
//  DIRECTIONS FOR NEXT DEV -------------- change function below to call to api list to get buoys with num values then call api endpoint with closest id at the above enpoint
export const getWeatherStations = (data) => {
    const boundingBox = getBoundingBox([data.lat, data.lng], 10);
    let config = {
        headers: {
            token: 'OZvsDblbJDAGZxTVLIMzZjgWFgWeOPvc'
        }
    }
    const closeWeatherStationsUrl = `https://mk-digital-cors-bypass-proxy.herokuapp.com/https://www.ncdc.noaa.gov/cdo-web/api/v2/stations?extent=${boundingBox.minLat},${boundingBox.minLng},${boundingBox.maxLat},${boundingBox.maxLng}`
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
    let apiKey = '5de113a38fff4837919307fd505473e1';
    const weatherUrl = `https://api.weatherbit.io/v2.0/current?lat=${data.lat}6&lon=${data.lng}&key=${apiKey}&units=I`
    return (dispatch) => {
        return axios.get(weatherUrl)
            .then(response => {
                return response.data
            }).then(data => {
                dispatch({
                    type: GET_WEATHER,
                    payload: data
                })
            })
            .catch(error => {
                throw (error);
            });
    }
}



export const getWeatherForecast = (data) => {
    const openWeatherApiKey = 'bc487a6d87516d1d2546ceb1c78a6fa4';
    const weatherForecastApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.lat}&lon=${data.lng}&exclude=minutely,alerts&units=imperial&appid=${openWeatherApiKey}`
    return (dispatch) => {
        return axios.get(weatherForecastApiUrl)
            .then(response => {
                return response.data
            }).then(data => {
                dispatch({
                    type: GET_WEATHER_FORECAST,
                    payload: data
                })
            })
            .catch(error => {
                throw (error);
            });
    }
}



export const getNdbcStations = (latLon) => {
    const request = axios.get(NDBCStationApiUrl)
        .then(response => {
            return response.data
        }).then(data => {

            return data;
        }).catch(error => {
            throw (error);
        });
    return (dispatch) => {
        request.then((data) => {
            
            return new Promise((resolve) => {
                let stationsArr = [];
                for (const [key, value] of Object.entries(data.ndbcBouys)) {
                    const distanceFromLocation = getDistanceFromLatLonInKm(latLon.lat, latLon.lng, value.SpatialExtent.coordinates[1], value.SpatialExtent.coordinates[0]);
                    Number.isInteger(parseInt(key)) ? stationsArr.push({
                        buoyId: parseInt(key),
                        distanceFromLocation: distanceFromLocation
                    }) : null;
                }
                resolve(stationsArr)
            })
        }).then((data) => {
            const sortedArr = data.sort((a, b) => {
                if (a.distanceFromLocation > b.distanceFromLocation)
                    return 1;
                if (a.distanceFromLocation < b.distanceFromLocation)
                    return -1;
                return 0;
            })
            const finalDataArr = sortedArr.slice(0, 20)
            dispatch({
                type: GET_NDBC_STATIONS,
                payload: finalDataArr
            })
        })
    }
}





 // const distanceFromLocation = getDistanceFromLatLonInKm(latLon.lat, latLon.lng, station.lat, station.lng);
                // stationsArr.push({
                //     distanceFromLocation: distanceFromLocation,
                //     lat: station.lat,
                //     lng: station.lng,
                //     id: station.id,
                //     state: station.state
                // })