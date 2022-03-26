import React, {Fragment} from 'react';
import {Row, Col} from 'react-bootstrap';
import styled from 'styled-components';
import {connect} from 'react-redux'
import SunriseSunsetGraph from './sunriseSunsetGraph';
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
p {
color: var(--white);
opacity: .5;
margin-left: 15px;
display: inline-block;
margin-bottom: 0;
line-height: normal;
}
span {
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
}
`;

const Title = styled.p`
text-transform: uppercase;
opacity: .8;
color: var(--white);
margin-bottom: 1vh;
text-align: left;
font-size: .8vw;

`

const Weather = styled(WaterTemp)`
${Title} {
    padding-left: 0;
}
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
span {
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
 width: 7vh;
 height: 7vh;
 background-size: cover;
 background-repeat: no-repeat;
background-image: ${props => props.icon ? `url(https://www.weatherbit.io/static/img/icons/${props.icon}.png)` : null };
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
            weather: state.surf.weather

        }
    }
}

let degree = String.fromCodePoint(176)

 const SurfMapAndConditions = (props) => {
     

     const getSolarDatums = (sunset, sunrise) => {
         let today = new Date();
         let dd = String(today.getDate()).padStart(2, '0');
         let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
         let yyyy = today.getFullYear();
         today = `${mm}/${dd}/${yyyy}`;
         const d1 = `${today} ${sunset}:00 GMT`;
         const d2 = `${today} ${sunrise}:00 GMT`;
         const dateAndSunset = new Date(d1);
         const dateAndSunrise = new Date(d2);
         const convertedSunset = dateAndSunset.toLocaleTimeString('en-GB');
         const convertedSunrise = dateAndSunrise.toLocaleTimeString('en-GB');
         function strToMins(t) {
             let s = t.split(":");
             return Number(s[0]) * 60 + Number(s[1]);
         }

         function minsToStr(t) {
             return Math.trunc(t / 60) + ':' + ('00' + t % 60).slice(-2);
         }

         function strToMinsDiv2(t) {
             let s = t.split(":");
             return (Number(s[0]) / 2) * 60 + (Number(s[1]) / 2);
         }

         const totalDaylight = minsToStr(strToMins(convertedSunset) - strToMins(convertedSunrise));
         const morningMins = strToMins(convertedSunrise);
         const midDayMins = strToMinsDiv2(convertedSunset) - strToMinsDiv2(convertedSunrise);
         const midDay = minsToStr(Math.round(morningMins) + Math.round(midDayMins));
         const sunriseHrs = Number(convertedSunrise.split(':')[0]);
         const sunsetHrs = Number(convertedSunset.split(':')[0]);
         const midDayHrs = Number(midDay.split(':')[0]);
         let data = [];
         for (let i = 0; i < 24; i++) {
             const j = i * .7;
             const position = i <= sunriseHrs ? -sunriseHrs + j : i > sunriseHrs && i <= midDayHrs ? -sunriseHrs + j : i > midDayHrs ? ((sunsetHrs - 11) - (j - 12)) : null;
             if (position < -3) {
                 let position = -3;
                 data.push({
                     solarPosition: position,
                     time: i
                 })
             } else if (position > 10) {
                 let position = 10.5;
                 data.push({
                     solarPosition: position,
                     time: i
                 })
             } else {
                 data.push({
                     solarPosition: position,
                     time: i
                 })
             }
             var times = SunCalc.getTimes(new Date(), props.coords.lat, props.coords.lng);

             // format sunrise time from the Date object
             var sunriseStr = times.sunrise.getHours() + ':' + times.sunrise.getMinutes();

             // get position of the sun (azimuth and altitude) at today's sunrise
             var sunrisePos = SunCalc.getPosition(times.sunrise, props.coords.lat, props.coords.lng);
             var sunriseEndPos = SunCalc.getPosition(times.sunriseEnd, props.coords.lat, props.coords.lng);
             var goldenHourEndPos = SunCalc.getPosition(times.goldenHourEnd, props.coords.lat, props.coords.lng);
             var solarNoonPos = SunCalc.getPosition(times.solarNoon, props.coords.lat, props.coords.lng);
             var goldenHourPos = SunCalc.getPosition(times.goldenHour, props.coords.lat, props.coords.lng);
             var sunsetStartPos = SunCalc.getPosition(times.sunsetStart, props.coords.lat, props.coords.lng);


             
             console.log(sunrisePos, sunriseEndPos, goldenHourEndPos, solarNoonPos, goldenHourPos, sunsetStartPos);

         }
         return data;
     }
    return (
        <Fragment>
            <StyledMapImg coords={props.coords}  ></StyledMapImg>
        <ConditionsContainer>
                <Weather>
                    <Row>
                        <Title>Weather</Title>
                    </Row>
                    <Row>
                        {!Array.isArray(props.surf.weather) ? <WeatherIcon icon={props.surf.weather.data[0].weather.icon}></WeatherIcon> : null}
                    </Row>
                </Weather>
                <WaterTemp>
                    <Title>Water Temperature</Title>
                    {!Array.isArray(props.surf.weather) ? <SunriseSunsetGraph data={getSolarDatums(props.surf.weather.data[0].sunset, props.surf.weather.data[0].sunrise)} /> : null }
                </WaterTemp>
                <WaterTemp>
                    <Title>Water Temperature</Title>
                    <p>{parseInt(props.surf.waterTemp) - 2}{degree} - {parseInt(props.surf.waterTemp) + 1}{degree} <span>f</span></p>
                </WaterTemp>
                <WaterTemp>
                    <Title>Water Temperature</Title>
                    <p>{parseInt(props.surf.waterTemp) - 2}{degree} - {parseInt(props.surf.waterTemp) + 1}{degree} <span>f</span></p>
                </WaterTemp>
        </ConditionsContainer>
        </Fragment>
        
    )
};

export default connect(mapStateToProps)(SurfMapAndConditions)