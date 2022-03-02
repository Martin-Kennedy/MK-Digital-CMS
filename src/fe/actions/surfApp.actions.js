import { GET_LOCATION_OBJECT, GET_GEO_LOCATION, GET_INITIAL_SPOT_FORECAST, GET_CLOSE_SURFSPOTS} from '../helpers/types'
import {getDistanceFromLatLonInKm} from '../helpers/utilities'
import axios from 'axios'

const apiUrl = 'http://localhost:9000/Locations';
const msUrl = 'https://magicseaweed.com/api/76b9f172c5acb310986adca80941a8bb/forecast/?spot_id=';

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
    .get(apiUrl)
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

export const getInitialSurfForecast = (spotId) => {
    return (dispatch) => {
        return axios.get(msUrl + spotId)
            .then(response => {
                return response.data
            }).then(data => {
                const now = Date.now() / 1000 | 0;
                return data.filter((d) => {
                    return d.localTimestamp >= now;
                })
            }).then(data => {
                dispatch({
                    type: GET_INITIAL_SPOT_FORECAST,
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
            dispatch({type: GET_CLOSE_SURFSPOTS, payload: data});
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
