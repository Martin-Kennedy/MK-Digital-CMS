import {GET_LOCATION_OBJECT, GET_GEO_LOCATION, GET_SPOT_FORECAST, GET_CLOSE_SURFSPOTS} from '../helpers/types'
import {getDistanceFromLatLonInKm, processAsync} from '../helpers/utilities'
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

    const getCloseSurfSpots = (locationsAndCoords) => {

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

                            return item;
                        }
                    })
                }
            })

        })

    }
    const getCloseSpotForecasts = (closeLocations) => {
        return new Promise((resolve) => {
            resolve(closeLocations.map((location) => {
                return location.filter( Boolean )
        }))
        }).then((item) => item.map((location) => {
            if (location.length > 0) {
                return location.map((surfSpot) => {
                    console.log(msUrl + surfSpot.spotId);
                    axios
                        .get(msUrl + surfSpot.spotId)
                        .then(response => {
                             surfSpot.forecast = response.data;
                             console.log(surfSpot)
                             return surfSpot;
                        })
                        .catch(error => {
                            throw (error);
                        })
                })
            }
        }))
    }
    

    async function getCloseSpotsandForecast() {
        try {
            const result = await latLng();
            const locationsAndCoords = await getLocations(result);
            const closeSurfSpots = await getCloseSurfSpots(locationsAndCoords);
            const closeSpotForecasts = await getCloseSpotForecasts(closeSurfSpots);

        } catch (error) {
            console.log(error);
        }
    }
    getCloseSpotsandForecast();

};