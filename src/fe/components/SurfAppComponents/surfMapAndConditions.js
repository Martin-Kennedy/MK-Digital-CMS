import React, {Fragment, useEffect} from 'react';
import {Row, Col} from 'react-bootstrap';
import styled from 'styled-components';
import {connect} from 'react-redux'
import SunriseSunsetGraph from './sunriseSunsetGraph';
import { formatAMPMwMins } from '../../helpers/utilities';
import { useDispatch } from 'react-redux';
var SunCalc = require('suncalc');

const StyledMapImg = styled.div`
border-radius: 7px;
background: rgba(255, 255, 255, 0.04);
border: 1px solid rgba(255, 255, 255, 0.15);
border-right-color: rgba(255, 255, 255, 0.07);
border-bottom-color: rgba(255, 255, 255, 0.07);
z-index: 1;
box-shadow:
0 2.8px 2.2px rgba(0, 0, 0, 0.034),
0 6.7px 5.3px rgba(0, 0, 0, 0.048),
0 12.5px 10px rgba(0, 0, 0, 0.06),
0 22.3px 17.9px rgba(0, 0, 0, 0.072),
0 41.8px 33.4px rgba(0, 0, 0, 0.086),
0 50px 40px rgba(0, 0, 0, 0.062);
width: 100%;
height: 25vh;
background-size: cover;
background-repeat: no-repeat;
background-image: ${props => props.coords ? `url(https://maps.googleapis.com/maps/api/staticmap?center=${props.coords.lat},${props.coords.lng}&zoom=11&size=800x250&style=feature:water|element:all|color:0x55a8e5&key=AIzaSyBj-Wc8m2pdQxlR-YBJLMcgda-3HLJiERw)` : null};
`


const WaterTemp = styled(Col)`
border-radius: 5px;
background: rgba(255,255,255,0.04);
border: 1px solid rgba(255,255,255,0.15);
border-right-color: rgba(255,255,255,0.07);
border-bottom-color: rgba(255,255,255,0.07);
box-shadow: 0 20px 30px rgb(0 0 0 / 7%);
width: 25%;
padding: 1vh;
height: 14vh;
margin: 1.5vh 0 1.5vh 1.5vh;
`;

const Title = styled.p`
text-transform: uppercase;
color: var(--white);
opacity: .6;
margin-left: 0;
margin-top: 0;
display: block;
margin-bottom: 1vh;
width: auto;
line-height: normal;
font-size: 1.5vh;
`

const Data = styled.p`
color: var(--white);
opacity: .75;
margin-left: 0;
margin-top: 0;
display: block;
margin-bottom: 1vh;
line-height: normal;
font-size: 1.75vh;
`

const Temp = styled(Data)`
font-size: 1.2vw;
font-weight: 500;
letter-spacing: .5px;
color: rgba(255,255,255, 0.8);
`

const Description = styled(Data)`

`
const Weather = styled(WaterTemp)`

`

const Conditions = styled(WaterTemp)`
p {
color: var(--white);
opacity: .5;
margin-left: 15px;
display: inline-block;
margin-bottom: 0;
line-height: normal;
}

`



const ConditionsContainer = styled(Row)`
height: 17vh;
>div:first-child {
    margin-left: 2.5vh;
}
>div:last-child {
    margin-right: 2.5vh;
}
`;

const WeatherIcon = styled.div`
width: 5vh;
height: 5vh;
position: relative;
top: -5px;
right: -5px;
background-size: cover;
background-repeat: no-repeat;
background-image: ${props => props.icon ? `url(https://www.weatherbit.io/static/img/icons/${props.icon}.png)` : null };
`

const UnitType = styled.span`
width: 100%;
text-align: center;
font-size: 1vw;
font-weight: 200;
color: var(--white);
margin: 3px 0 10px 0;
padding: 0;
opacity: .5;
letter-spacing: 1.25px;
margin-left: 3px;
` 

const mapStateToProps = state => {
    return {
        surf: {
            locations: state.surf.locations,
            closeSurfSpots: state.surf.closeSurfSpots,
            closestSurfSpot: state.surf.closestSurfSpot,
            hourlyForecast: state.surf.hourlyForecast,
            maxWaveHeight: state.surf.maxWaveHeight,
            currentConditions: state.surf.currentConditions,
            swellForecast: state.surf.swellForecast,
            windForecast: state.surf.windForecast,
            tideStations: state.surf.tideStations,
            ndbcStations: state.surf.ndbcStations,
            weatherStations: state.surf.weatherStations,
            tideForecast: state.surf.tideForecast,
            waterTemp: state.surf.waterTemp,
            weather: state.surf.weather,
            weatherForecast: state.surf.weatherForecast,
            uvForecast: state.surf.uvForecast

        }
    }
}

let degree = String.fromCodePoint(176)

 const SurfMapAndConditions = (props) => {
    
     const getSolarDatums = (sunset, sunrise) => {

         const formatTime = (time) => {
             const date = new Date();
             date.setHours(time.split(':')[0]);
             date.setMinutes(time.split(':')[1])
             const dateStr = date.toString();
             const timeStamp = new Date(dateStr).getTime();
             const formatted = formatAMPMwMins(new Date(timeStamp));
             return formatted;
         }
         
        const times = SunCalc.getTimes(new Date(), props.coords.lat, props.coords.lng);

        // format sunrise time from the Date object

         const nightEndTime = formatTime(times.nightEnd.getHours() + ':' + times.nightEnd.getMinutes());
         const sunriseTime = formatTime(times.sunrise.getHours() + ':' + times.sunrise.getMinutes());
         const goldenHourEndTime = formatTime(times.goldenHourEnd.getHours() + ':' + times.goldenHourEnd.getMinutes());
         const solarNoonTime = formatTime(times.solarNoon.getHours() + ':' + times.solarNoon.getMinutes());
         const goldenHourTime = formatTime(times.goldenHour.getHours() + ':' + times.goldenHour.getMinutes());
         const sunsetTime = formatTime(times.sunset.getHours() + ':' + times.sunset.getMinutes());
         const duskTime = formatTime(times.dusk.getHours() + ':' + times.dusk.getMinutes());
         const nightTime = formatTime(times.night.getHours() + ':' + times.night.getMinutes());

        // get position of the sun (azimuth and altitude) at today's sunrise
        const convertToSec = (time) => {
            return time * 60 * 60;
        }

        const nightEndPos = SunCalc.getPosition(times.nightEnd, props.coords.lat, props.coords.lng);
        const sunrisePos = SunCalc.getPosition(times.sunrise, props.coords.lat, props.coords.lng);
        const goldenHourEndPos = SunCalc.getPosition(times.goldenHourEnd, props.coords.lat, props.coords.lng);
        const solarNoonPos = SunCalc.getPosition(times.solarNoon, props.coords.lat, props.coords.lng);
        const goldenHourPos = SunCalc.getPosition(times.goldenHour, props.coords.lat, props.coords.lng);
        const sunsetPos = SunCalc.getPosition(times.sunset, props.coords.lat, props.coords.lng);
         const duskPos = SunCalc.getPosition(times.dusk, props.coords.lat, props.coords.lng);
        const nightPos = SunCalc.getPosition(times.night, props.coords.lat, props.coords.lng);

             return [
                 {
                     event: 'Night End',
                     time: nightEndTime,
                     timeTick: convertToSec(times.nightEnd.getHours()),
                     position: nightEndPos.altitude
                 },
                 {
                     event: 'Sunrise',
                     time: sunriseTime,
                     timeTick: convertToSec(times.sunrise.getHours()),
                     position: sunrisePos.altitude
                 },
                 {
                     event: 'Golden Hour End',
                     time: goldenHourEndTime,
                     timeTick: convertToSec(times.goldenHourEnd.getHours()),
                     position: goldenHourEndPos.altitude
                 },
                 {
                     event: 'Solar Noon',
                     time: solarNoonTime,
                     timeTick: convertToSec(times.solarNoon.getHours()),
                     position: solarNoonPos.altitude
                 },
                 {
                     event: 'Golden Hour',
                     time: goldenHourTime,
                     timeTick: convertToSec(times.goldenHour.getHours()),
                     position: goldenHourPos.altitude
                 },
                 {
                     event: 'Sunset',
                     time: sunsetTime,
                     timeTick: convertToSec(times.sunset.getHours()),
                     position: sunsetPos.altitude
                 },
                 {
                     event: 'Dusk',
                     time: duskTime,
                     timeTick: convertToSec(times.dusk.getHours()),
                     position: duskPos.altitude
                 },
                 {
                     event: 'Night',
                     time: nightTime,
                     timeTick: convertToSec(times.night.getHours()),
                     position: nightPos.altitude
                 }
                 
             ]


     }
    return (
        <Fragment>
            <StyledMapImg coords={props.coords}  ></StyledMapImg>
        <ConditionsContainer>
                <Weather>
                    {!Array.isArray(props.surf.weather) ? 
                    <Fragment>
                        <Row>
                        <Title>Weather</Title>
                        <WeatherIcon icon={props.surf.weather.data[0].weather.icon}></WeatherIcon>
                    </Row>
                    <Row>
                       
                            <Temp>{parseInt(props.surf.weather.data[0].app_temp)}{degree} <UnitType>f</UnitType></Temp>
                        
                    </Row>
                            <Row>
                                <Description>{props.surf.weather.data[0].weather.description}</Description>
                            </Row>
                    </Fragment>
                        : null}
                </Weather>
                <WaterTemp>
                    <Title>Sun Position</Title>
                    {!Array.isArray(props.surf.weather) ? <SunriseSunsetGraph data={getSolarDatums()}  /> : null }
                </WaterTemp>
                <WaterTemp>
                    <Title>Water Temperature</Title>
                    <Data>{parseInt(props.surf.waterTemp) - 2}{degree} - {parseInt(props.surf.waterTemp) + 1}{degree} <UnitType>f</UnitType></Data>
                </WaterTemp>
                {!Array.isArray(props.surf.uvForecast) ?  
                <WaterTemp>
                    <Title>UV Index</Title>
                        <Data>{console.log(props.surf.uvForecast)}</Data>
                </WaterTemp>
                    : null}
        </ConditionsContainer>
        </Fragment>
        
    )
};

export default connect(mapStateToProps)(SurfMapAndConditions)
