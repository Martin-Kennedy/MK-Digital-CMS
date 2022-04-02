import React, {Fragment, useEffect} from 'react';
import {Row, Col} from 'react-bootstrap';
import styled from 'styled-components';
import {connect} from 'react-redux'
import SunriseSunsetGraph from './sunriseSunsetGraph';
import UvIndexGraph from './uvIndexGraph';
import {formatAMPMwMins} from '../../helpers/utilities';
import {useDispatch} from 'react-redux';
var SunCalc = require('suncalc');

const StyledMapImg = styled.div `
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
background-image: ${props => props.coords
    ? `url(https://maps.googleapis.com/maps/api/staticmap?center=${props.coords.lat},${props.coords.lng}&zoom=11&size=800x250&style=feature:water|element:all|color:0x55a8e5&key=AIzaSyBj-Wc8m2pdQxlR-YBJLMcgda-3HLJiERw)`
    : null};
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

const Title = styled.p `
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

const Data = styled.p `
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

const WeatherIcon = styled.div `
width: 5vh;
height: 5vh;
position: relative;
top: -5px;
right: -5px;
background-size: cover;
background-repeat: no-repeat;
background-image: ${props => props.icon
    ? `url(https://www.weatherbit.io/static/img/icons/${props.icon}.png)`
    : null};
`

const WaterTempIcon = styled.svg `
    width: 3vh;
    height: 3vh;
    position: relative;
    top: -2px;
    right: -10px;
    padding: 0;
path {
    fill: rgba(255,255,255, 0.5);
}
`



const UnitType = styled.span `
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

const UvValue = styled(Data)`
    font-size: 2vw;
    font-weight: 600;
    letter-spacing: .5px;
    color: rgba(255,255,255,1);
    position: relative;
    top: -10.3vh;
    left: calc(50% - 1vw);
    padding-left: 0.5vw;
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
            }, {
                event: 'Sunrise',
                time: sunriseTime,
                timeTick: convertToSec(times.sunrise.getHours()),
                position: sunrisePos.altitude
            }, {
                event: 'Golden Hour End',
                time: goldenHourEndTime,
                timeTick: convertToSec(times.goldenHourEnd.getHours()),
                position: goldenHourEndPos.altitude
            }, {
                event: 'Solar Noon',
                time: solarNoonTime,
                timeTick: convertToSec(times.solarNoon.getHours()),
                position: solarNoonPos.altitude
            }, {
                event: 'Golden Hour',
                time: goldenHourTime,
                timeTick: convertToSec(times.goldenHour.getHours()),
                position: goldenHourPos.altitude
            }, {
                event: 'Sunset',
                time: sunsetTime,
                timeTick: convertToSec(times.sunset.getHours()),
                position: sunsetPos.altitude
            }, {
                event: 'Dusk',
                time: duskTime,
                timeTick: convertToSec(times.dusk.getHours()),
                position: duskPos.altitude
            }, {
                event: 'Night',
                time: nightTime,
                timeTick: convertToSec(times.night.getHours()),
                position: nightPos.altitude
            }

        ]

    }
    return (
        <Fragment>
            <StyledMapImg coords={props.coords}></StyledMapImg>
            <ConditionsContainer>
                <Weather>
                    {!Array.isArray(props.surf.weather)
                        ? <Fragment>
                                <Row>
                                    <Title>Weather</Title>
                                    <WeatherIcon icon={props.surf.weather.data[0].weather.icon}></WeatherIcon>
                                </Row>
                                <Row>
                                    <Temp>{parseInt(props.surf.weather.data[0].app_temp)}{degree}
                                        <UnitType>f</UnitType>
                                    </Temp>
                                </Row>
                                <Row>
                                    <Description>{props.surf.weather.data[0].weather.description}</Description>
                                </Row>
                            </Fragment>
                        : null}
                </Weather>
                <WaterTemp>
                    <Title>Sun Position</Title>
                    {!Array.isArray(props.surf.weather)
                        ? <SunriseSunsetGraph data={getSolarDatums()}/>
                        : null}
                </WaterTemp>
                <WaterTemp>
                    <Row>
                        <Title>Water Temp</Title>
                        <WaterTempIcon x="0px" y="0px" viewBox="0 0 100 100">
                            <path
                                d="M49.51,84.69c3.46,0.01,6.79-1.35,9.26-3.78c2.47-2.43,3.88-5.73,3.93-9.2c0.05-3.46-1.27-6.81-3.67-9.31V12.57
	c0-3.4-1.82-6.55-4.76-8.25c-2.95-1.7-6.58-1.7-9.53,0c-2.95,1.7-4.76,4.85-4.76,8.25V62.4c-2.4,2.5-3.72,5.84-3.67,9.31
	c0.05,3.46,1.46,6.77,3.93,9.2C42.72,83.34,46.05,84.69,49.51,84.69L49.51,84.69z M49.51,8.21c2.41,0,4.36,1.95,4.36,4.37v52.71
	h1.02l-0.12,0.15h0c1.66,1.44,2.66,3.5,2.77,5.7c0.1,2.2-0.7,4.34-2.22,5.94c-1.52,1.59-3.62,2.49-5.83,2.49
	c-2.2,0-4.31-0.9-5.83-2.49c-1.52-1.59-2.32-3.74-2.22-5.94c0.1-2.2,1.1-4.26,2.77-5.7h0.9V12.57c-0.01-1.17,0.45-2.29,1.28-3.11
	c0.82-0.83,1.95-1.29,3.11-1.28L49.51,8.21z"/>
                            <path
                                d="M78.63,88.9c-2.02,0.06-4.01-0.43-5.77-1.41c-5.49-2.77-11.97-2.77-17.46,0c-3.61,1.87-7.91,1.87-11.52,0
	c-5.49-2.77-11.97-2.77-17.46,0c-3.61,1.87-7.91,1.87-11.52,0c-2.69-1.43-5.69-2.14-8.73-2.09v6.86c2.01-0.05,3.99,0.43,5.75,1.41
	c5.49,2.77,11.97,2.77,17.46,0c3.61-1.87,7.91-1.87,11.52,0c5.49,2.77,11.97,2.77,17.46,0c3.61-1.87,7.91-1.87,11.52,0
	c5.5,2.77,11.99,2.77,17.48,0c1.76-0.98,3.76-1.46,5.77-1.41v-6.86c-3.04-0.06-6.04,0.66-8.73,2.09
	C82.64,88.48,80.65,88.96,78.63,88.9L78.63,88.9z"/>
                            <path
                                d="M85.11,68.03c-3.84,1.27-7.99,1.27-11.83,0c-2.57-0.9-5.28-1.33-8-1.29v6.91c2.01-0.05,4.02,0.27,5.92,0.95
	c5.2,1.7,10.8,1.7,16,0c1.9-0.68,3.92-1,5.94-0.95v-6.91C90.4,66.69,87.68,67.13,85.11,68.03L85.11,68.03z"/>
                            <path
                                d="M19.66,75.81c2.65,0.05,5.28-0.37,7.78-1.24c1.83-0.66,3.76-0.97,5.7-0.92v-6.86
	c-2.65-0.05-5.28,0.37-7.78,1.24c-3.7,1.22-7.7,1.22-11.4,0c-2.5-0.87-5.13-1.29-7.78-1.24v6.86c1.94-0.05,3.87,0.27,5.7,0.92
	C14.38,75.44,17.02,75.86,19.66,75.81z"/>
                        </WaterTempIcon>
                    </Row>
                    <Row>
                        <Data>{parseInt(props.surf.waterTemp) - 2}{degree}
                            - {parseInt(props.surf.waterTemp) + 1}{degree}
                            <UnitType>f</UnitType>
                        </Data>
                    </Row>
                </WaterTemp>
                {!Array.isArray(props.surf.weatherForecast) && props.surf.weatherForecast.current.uvi != 0
                    ? <WaterTemp>
                            <Title>UV Index</Title>
                            <UvIndexGraph data={props.surf.weatherForecast.current}/>
                            <UvValue>{parseInt(props.surf.weatherForecast.current.uvi)}
                            </UvValue>
                        </WaterTemp>
                    : null}
            </ConditionsContainer>
        </Fragment>

    )
};

export default connect(mapStateToProps)(SurfMapAndConditions)
