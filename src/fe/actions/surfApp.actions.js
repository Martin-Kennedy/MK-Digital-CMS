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
    const getCloseLocations = (locationsAndCoords) => {

        const currentLat = locationsAndCoords.coords.latitude;
        const currentLng = locationsAndCoords.coords.longitude;
        const _obj = locationsAndCoords.locations;
        let i = 0;
        
        for (const country in _obj) {
            i++;
            const _objSize = Object.keys(_obj).length;
            let closeSpotArr = [];
             new Promise((res) => { _obj[country].map(surfSpot => {
                 
                const distanceFromLocation = getDistanceFromLatLonInKm(currentLat, currentLng, surfSpot.lat, surfSpot.lng);
                if (distanceFromLocation < 100) {

                    closeSpotArr.push({
                        country: country,
                        town: surfSpot.town,
                        latitude: surfSpot.lat,
                        longitude: surfSpot.lng,
                        spotId: surfSpot.spotId,
                        hasHourlyForecast: surfSpot.hasHourlyForecast,
                        timezone: surfSpot.timesone,
                        isBigWave: surfSpot.isBigWave
                    });
                    
                    
                }
                 res(closeSpotArr)

                 // copy pattern done in spot locator 5 years ago to string together async for parsing arrays of countries for each spot object
            })
           
            
        }).then(data => {
            console.log(data)
            return data
        })
           
        }

    }
    const getCloseSpotForecasts = (closeLocations) => {
        // console.log(closeLocations);
        // closeLocations.map(location => {
        //     console.log(location);
        //     console.log(msUrl + location.spotId);
        //     axios
        //         .get(msUrl + location.spotId)
        //         .then(response => {
        //             return location.forecast = response.data;
        //         })
        //         .catch(error => {
        //             throw(error);
        //         })
        // })
    }

    async function getCloseSpotsandForecast() {
        try {
            const result = await latLng();
            const locationsAndCoords = await getLocations(result);
            const closeLocations = await getCloseLocations(locationsAndCoords);
            const closeSpotForecasts = await getCloseSpotForecasts(closeLocations);

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