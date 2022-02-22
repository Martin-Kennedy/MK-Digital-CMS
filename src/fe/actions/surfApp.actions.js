import { GET_LOCATION_OBJECT, GET_GEO_LOCATION, GET_SPOT_FORECAST, GET_CLOSE_SURFSPOTS } from '../helpers/types'
import axios from 'axios'

const apiUrl = 'http://localhost:9000/Locations';
const msUrl = 'https://magicseaweed.com/api/76b9f172c5acb310986adca80941a8bb/forecast/?spot_id=';

export const getLocationObject = () => {
    return (dispatch) => {
        return axios.get(apiUrl)
            .then(response => {
                return response.data
            })
            .then(data => {
                dispatch({
                    type: GET_LOCATION_OBJECT,
                    payload: data
                })
            })
            .catch(error => {
                throw (error);
            });
    };
};

export const getGeoLocation = () => {
    return (dispatch) => {
        navigator.geolocation.getCurrentPosition(function (position) {
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;
                dispatch({
                    type: GET_GEO_LOCATION,
                    latitude: latitude,
                    longitude: longitude,
                });
            });
    }
}

export const getCloseSurfSpots = (lat = 0, lng = 0, locations) => {
    console.log(locations)
    Object.keys(locations).map(country => {
        console.log(country)})
    // .where('[lat+lng]')
    // .between([currentLat - 2, currentLng], [currentLat + 2])
    // .and(x => (x.lng > currentLng - 2) && (x.lng < currentLng + 2))
    // .toArray()
    // .then(handleData)
    return (dispatch) => {
        dispatch({
            type: GET_CLOSE_SURFSPOTS,
            payload: locations
        })
    }
}

export const getSurfApiSpotForecast = (spotId) => {
    return (dispatch) => {
        return axios.get(msUrl+spotId)
            .then(response => {
                return response.data
            })
            .then(data => {
                dispatch({
                    type: GET_SPOT_FORECAST,
                    payload: data
                })
            })
            .catch(error => {
                throw (error);
            });
    };
}