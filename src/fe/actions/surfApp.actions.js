import {GET_LOCATION_OBJECT, GET_GEO_LOCATION, GET_SPOT_FORECAST, GET_CLOSE_SURFSPOTS} from '../helpers/types'
import {getDistanceFromLatLonInKm} from '../helpers/utilities'
import axios from 'axios'

const apiUrl = 'http://localhost:9000/Locations';
const msUrl = 'https://magicseaweed.com/api/76b9f172c5acb310986adca80941a8bb/forecast/?spot_id=';

export const getCloseSurfSpots = () => {

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
    const getCountries = (locationsAndCoords) => new Promise((resolve, rej) => {

        const currentLat = locationsAndCoords.coords.latitude;
        const currentLng = locationsAndCoords.coords.longitude;
        const _obj = locationsAndCoords.locations;
        let promises1 = [];
        let promises2 = [];
        Object.keys(_obj).reduce((previousValue, country) => {
            promises1.push(new Promise((resolve, reject) => {
            if (_obj[country]){
                for (let i = 0; i < _obj[country].length; i++) {
                    promises2.push(new Promise((resolve, reject) => {
                        const results = {
                            country: country,
                            data: _obj[country][i],
                            currentLat: currentLat,
                            currentLng: currentLng
                        }
                        console.log(results)
                        resolve(results);
                    }))
                }  
            }
               
        }
    ))
    const data = [promises1, promises2];
            const flat = data.flat();
            console.log(flat)

        resolve(Promise.all(flat))
})
    })
    const getCloseSurfSpots = (closeCountries) => new Promise((resolve, reject) => {
        console.log(closeCountries)
        let promises = []

        // for (let i = 0; i < closeCountries[i].data.length; i++) {
            

        //     const surfSpot = closeCountries[i];
        //     const currentLat = closeCountries[i].currentLat;
        //     const currentLng = closeCountries[i].currentLng;
        //     console.log(currentLat, currentLng, surfSpot)
        //     promises.push(new Promise((resolve, reject) => {
        //         const distanceFromLocation = getDistanceFromLatLonInKm(currentLat, currentLng, surfSpot.lat, surfSpot.lng);
        //         if (distanceFromLocation < 100) {
        //             surfSpot.country = country;
        //             resolve(surfSpot)
        //         }
        //     }))
        // }
        resolve(Promise.all(promises))
    })
    const getCloseSpotForecasts = (closeLocations) => {
        console.log(closeLocations);
        // closeLocations.map(location => {     console.log(location);
        // console.log(msUrl + location.spotId);     axios         .get(msUrl +
        // location.spotId)         .then(response => {             return
        // location.forecast = response.data;         })         .catch(error => {
        //       throw(error);         }) })
    }

  

    async function getCloseSpotsandForecast() {
        try {
            const result = await latLng();
            const locationsAndCoords = await getLocations(result);
            const closeCountries = await getCountries(locationsAndCoords);
            const closeSurfSpots = await getCloseSurfSpots(closeCountries);
            const closeSpotForecasts = await getCloseSpotForecasts(closeSurfSpots);
            

        } catch (error) {
            console.log(error);
        }
    }
    getCloseSpotsandForecast();

};

export const getSurfApiSpotForecast = (spotId) => {
    return (dispatch) => {
        return axios
            .get(msUrl + spotId)
            .then(response => {
                return response.data
            })
            .then(data => {
                dispatch({type: GET_SPOT_FORECAST, payload: data})
            })
            .catch(error => {
                throw(error);
            });
    };
}