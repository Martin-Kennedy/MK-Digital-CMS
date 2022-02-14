import { GET_LOCATION_OBJECT, GET_GEO_LOCATION } from '../helpers/types'
import axios from 'axios'

const apiUrl = 'http://localhost:9000/Locations';

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
                dispatch( {
                    type: GET_GEO_LOCATION,
                    latitude: latitude,
                    longitude: longitude,
                });
            });
       
    }

} 