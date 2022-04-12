import React, {Fragment, useEffect} from 'react';
import {Row, Col} from 'react-bootstrap';
import styled from 'styled-components';
import {connect} from 'react-redux'
import SunriseSunsetGraph from './sunriseSunsetGraph';
import UvIndexGraph from './uvIndexGraph';
import {WaterTempSVGPath} from '../designElementComponents/waterTempSVGPath';
import {UvIconSVGPath} from '../designElementComponents/uvIconSVGPath';
import {SunPositionSVGPath} from '../designElementComponents/sunPositionSVGPath';
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
    ? `url(https://maps.googleapis.com/maps/api/staticmap?center=${props.coords.lat},${props.coords.lng}&zoom=12&size=800x250&style=feature:water|element:all|color:0x55a8e5&key=AIzaSyBj-Wc8m2pdQxlR-YBJLMcgda-3HLJiERw)`
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
min-width: 115px;
padding: 1vh;
height: 14vh;
margin: 1.5vh 0 1.5vh 1.5vh;
`;

const TitleIconRow = styled(Row)`
width: 100%;
display: flex;
justify-content: space-between;
margin: 0;
padding: 0;
p {
    padding: 0;
    margin: 0;
}
svg {
    padding: 0;
    margin: 0;
}
`

const Title = styled.p `
text-transform: uppercase;
color: rgba(255, 255, 255, 0.8);
opacity: .6;
margin-left: 0;
margin-top: 0;
display: block;
margin-bottom: 1vh;
width: auto;
font-size: .65vw;
height: fit-content;
line-height: .65vw;
`

const Data = styled.p `
color: var(--white);
opacity: .75;
margin-left: 0;
margin-top: 0;
display: block;
margin-bottom: 1vh;
line-height: normal;
font-size: 1.2vw;
`

const Temp = styled(Data)`
font-size: 2vw;
line-height: 2vw;
font-weight: 600;
letter-spacing: .5px;
text-align: center;
color: rgba(255,255,255, 0.9);
margin-bottom: 0.5vh;
width: 50%;
height: 2vw;
padding: 0;
`

const WaterTempData = styled(Temp)`
font-size: 1.75vw;
`
const HiLoTemp = styled.div `
width: 50%;
text-align: center;
margin: .2vh 0 .2vh 1vh;
display: block;
line-height: .6vw;
height: auto;
padding: 0;
p {
display: block;
padding: .15vw;
margin: 0;
font-size: .5vw;
width: auto;
font-size: .8vw;
font-weight: 500;
letter-spacing: .5px;
color: rgba(255,255,255, 0.5);
}
`

const TempWeatherIconContainer = styled.div `
width: 70%;
text-align: center;
margin: .2vh auto;
display: flex;
line-height: .6vw;
height: auto;
padding: 0;
`

const WaterTempContainer = styled.div `
width: 90%;
text-align: center;
margin: .2vh auto;
display: flex;
line-height: .6vw;
height: auto;
padding: 0;
p {
    line-height: 8vh;
    width: 100%;
    height: 8vh;
}
`
const Description = styled(Data)`
font-size: 0.6vw;
letter-spacing: 0.1vw;
font-weight: 500;
text-align: center;
color: rgba(255,255,255, 0.8);
margin: 0.5vh 0;
text-transform: capitalize;
`
const Weather = styled(WaterTemp)`

`

const SunPosition = styled(WaterTemp)`

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
width: 1.75vw;
height: 1.75vw;
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
width: 2.25vh;
height: 2.25vh;
position: relative;
top: -2px;
right: 0;
padding: 0;
path {
    fill: rgba(255,255,255, 0.25);
}
`
const UvIcon = styled(WaterTempIcon)``;

const SunIcon = styled(WaterTempIcon)``
const SunPositionGraphRow = styled.div `
width: 100%;
height: 7vh;
display: flex;
`

const SunPositionDataRow = styled.div `
width: 100%;
display: flex;
div {
    width: 50%;
    display: block;
    color: rgba(255,255,255,0.6);
    font-size: 0.6vw;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1vw;
p:first-child {
    font-size: 0.4vw;
    font-weight: 300;
}
p {
    
    text-align: left;
    margin-bottom: 0;
    line-height: 0.6vw;
}
}

div:nth-child(2){
    width: 50%;
    p {
        text-align: right;
        text-align: right;
    }
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
opacity: .6;
letter-spacing: 1.25px;
position: relative;
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

    const times = SunCalc.getTimes(new Date(), props.coords.lat, props.coords.lng);

    const formatTime = (time) => {
        const date = new Date();
        date.setHours(time.split(':')[0]);
        date.setMinutes(time.split(':')[1])
        const dateStr = date.toString();
        const timeStamp = new Date(dateStr).getTime();
        const formatted = formatAMPMwMins(new Date(timeStamp));
        return formatted;
    }

    // get position of the sun (azimuth and altitude) at today's sunrise
    const convertToSec = (time) => {
        return time * 60 * 60;
    }

    // format sunrise time from the Date object

    const nightEndTime = formatTime(times.nightEnd.getHours() + ':' + times.nightEnd.getMinutes());
    const sunriseTime = formatTime(times.sunrise.getHours() + ':' + times.sunrise.getMinutes());
    const goldenHourEndTime = formatTime(times.goldenHourEnd.getHours() + ':' + times.goldenHourEnd.getMinutes());
    const solarNoonTime = formatTime(times.solarNoon.getHours() + ':' + times.solarNoon.getMinutes());
    const goldenHourTime = formatTime(times.goldenHour.getHours() + ':' + times.goldenHour.getMinutes());
    const sunsetTime = formatTime(times.sunset.getHours() + ':' + times.sunset.getMinutes());
    const duskTime = formatTime(times.dusk.getHours() + ':' + times.dusk.getMinutes());
    const nightTime = formatTime(times.night.getHours() + ':' + times.night.getMinutes());
    const nightEndPos = SunCalc.getPosition(times.nightEnd, props.coords.lat, props.coords.lng);
    const sunrisePos = SunCalc.getPosition(times.sunrise, props.coords.lat, props.coords.lng);
    const goldenHourEndPos = SunCalc.getPosition(times.goldenHourEnd, props.coords.lat, props.coords.lng);
    const solarNoonPos = SunCalc.getPosition(times.solarNoon, props.coords.lat, props.coords.lng);
    const goldenHourPos = SunCalc.getPosition(times.goldenHour, props.coords.lat, props.coords.lng);
    const sunsetPos = SunCalc.getPosition(times.sunset, props.coords.lat, props.coords.lng);
    const duskPos = SunCalc.getPosition(times.dusk, props.coords.lat, props.coords.lng);
    const nightPos = SunCalc.getPosition(times.night, props.coords.lat, props.coords.lng);

    const getSolarDatums = (sunset, sunrise) => {

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
                                <TitleIconRow>
                                    <Title>Weather</Title>
                                    <WeatherIcon icon={props.surf.weather.data[0].weather.icon}></WeatherIcon>

                                </TitleIconRow>
                                <Row>
                                    <TempWeatherIconContainer>
                                        <Temp>{parseInt(props.surf.weather.data[0].app_temp)}{degree}
                                            <UnitType>f</UnitType>
                                        </Temp>
                                        {!Array.isArray(props.surf.weatherForecast)
                                            ? <Fragment>
                                                    <HiLoTemp>
                                                        <p>H: {parseInt(props.surf.weatherForecast.daily[0].temp.max)}{degree}</p>
                                                        <p>L: {parseInt(props.surf.weatherForecast.daily[0].temp.min)}{degree}</p>
                                                    </HiLoTemp>
                                                </Fragment>
                                            : null}

                                    </TempWeatherIconContainer>
                                </Row>
                                <Row>
                                    <Description>{props.surf.weather.data[0].weather.description}</Description>
                                </Row>

                            </Fragment>
                        : null}
                </Weather>
                <WaterTemp>
                    <TitleIconRow>
                        <Title>Water Temp</Title>
                        <WaterTempIcon x="0px" y="0px" viewBox="0 0 100 100">
                            <WaterTempSVGPath/>
                        </WaterTempIcon>
                    </TitleIconRow>
                    <Row>
                        <WaterTempContainer>
                            <WaterTempData>
                                {parseInt(props.surf.waterTemp) - 2}{degree}
                                - {parseInt(props.surf.waterTemp) + 1}{degree}
                                <UnitType>f</UnitType>
                            </WaterTempData>
                        </WaterTempContainer>
                    </Row>
                </WaterTemp>
                <SunPosition>
                    <TitleIconRow>
                        <Title>Sun Position</Title>
                        <SunIcon x="0px" y="0px" viewBox="0 0 100 100">
                            <SunPositionSVGPath/>
                        </SunIcon>
                    </TitleIconRow>
                    {!Array.isArray(props.surf.weather)
                        ? <Fragment>
                                <SunPositionGraphRow>
                                    <SunriseSunsetGraph data={getSolarDatums()}/>
                                </SunPositionGraphRow>
                                <SunPositionDataRow>
                                    <div>
                                        <p>Sunrise:</p>
                                        <p>{sunriseTime}</p>
                                    </div>
                                    <div>
                                        <p>Sunset:</p>
                                        <p>{sunsetTime}</p>
                                    </div>
                                </SunPositionDataRow>
                            </Fragment>
                        : null}
                </SunPosition>
                {!Array.isArray(props.surf.weatherForecast) && props.surf.weatherForecast.current.uvi != 0
                    ? <WaterTemp>
                            <TitleIconRow>
                                <Title>UV Index</Title>
                                <UvIcon x="0px" y="0px" viewBox="0 0 100 100">
                                    <UvIconSVGPath/>
                                </UvIcon>
                            </TitleIconRow>
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
