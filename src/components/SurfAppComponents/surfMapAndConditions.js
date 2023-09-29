import React, { Fragment, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import { connect } from 'react-redux';
import SunriseSunsetGraph from './sunriseSunsetGraph';
import UvIndexGraph from './uvIndexGraph';
import { WaterTempSVGPath } from '../designElementComponents/waterTempSVGPath';
import { UvIconSVGPath } from '../designElementComponents/uvIconSVGPath';
import { SunPositionSVGPath } from '../designElementComponents/sunPositionSVGPath';
import { formatAMPMwMins } from '../../helpers/utilities';
import { SwellSpectraCompassSVGPath } from '../designElementComponents/swellSpectraCompass';
import { SwellRadialChart } from '../SurfAppComponents/swellRadialChart';
import variables from '../../variables.module.scss';
import { MapWMOWeatherCodeToDescription } from '../../helpers/utilities';

var SunCalc = require('suncalc');

const StyledMapImg = styled.div`
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-right-color: rgba(255, 255, 255, 0.07);
  border-bottom-color: rgba(255, 255, 255, 0.07);
  z-index: 1;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048),
    0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072),
    0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 25px 20px rgba(0, 0, 0, 0.062);
  width: 100%;
  height: 25vh;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  mix-blend-mode: multiply;
  background-image: ${(props) =>
    props.coords
      ? `url(https://maps.googleapis.com/maps/api/staticmap?center=${props.coords.lat},${props.coords.lng}` +
        '&zoom=12&size=800x250&style=feature:water|element:all|color:0x0A2A4A' +
        '&style=feature:landscape|element:all|color:0x4A6075' +
        '&style=feature:poi|element:geometry.fill|color:0x6F7E8C' +
        '&style=feature:all|element:labels.icon|visibility:off' +
        '&style=feature:all|element:labels.text.fill|color:0xffffff' +
        '&style=feature:all|element:labels.text.stroke|visibility:off' +
        '&style=feature:road|element:geometry|color:0x8193A3|visibility:on' +
        '&key=AIzaSyBj-Wc8m2pdQxlR-YBJLMcgda-3HLJiERw)'
      : null};
`;

const StyledMapImgMobile = styled(StyledMapImg)`
  height: 35vh;
  background-image: ${(props) =>
    props.coords
      ? `url(https://maps.googleapis.com/maps/api/staticmap?center=${props.coords.lat},${props.coords.lng}` +
        '&zoom=12&size=800x250&style=feature:water|element:all|color:0x0A2A4A' +
        '&style=feature:landscape|element:all|color:0x4A6075' +
        '&style=feature:poi|element:geometry.fill|color:0x6F7E8C' +
        '&style=feature:all|element:labels.icon|visibility:off' +
        '&style=feature:all|element:labels.text.fill|color:0xffffff' +
        '&style=feature:all|element:labels.text.stroke|visibility:off' +
        '&style=feature:road|element:geometry|color:0x8193A3|visibility:on' +
        '&key=AIzaSyBj-Wc8m2pdQxlR-YBJLMcgda-3HLJiERw)'
      : null};
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048),
    0 2.5px 1px rgba(0, 0, 0, 0.06),
    0 2.3px 7.9px rgba(0, 0, 0, 0.072),
    0 4.8px 3.4px rgba(0, 0, 0, 0.086), 0 2px 2px rgba(0, 0, 0, 0.062);
`;

const StyledMapImgMulti = styled(StyledMapImg)`
  height: 100%;
  width: 100%;
  position: relative;
  border-radius: 5px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-right-color: rgba(255, 255, 255, 0.07);
  border-bottom-color: rgba(255, 255, 255, 0.07);
  box-shadow: none;
`;

const StyledCompassBase = styled.svg`
  width: 100%;
  height: 20vh;
  left: 0;
  top: 2.5vh;
  z-index: 2;
  position: absolute;
  opacity: 0.6;
  filter: drop-shadow(2px 0 1px #000000);

  path {
    fill: var(--white);
    stroke: 2px solid var(--white);
  }
  polygon {
    fill: var(--white);
    stroke: 2px solid var(--white);
  }
  @media (max-width: ${variables.large}) {
    width: 80%;
    height: 80%;
    left: 10%;
    top: 10.75%;
    opacity: 0.5;
  }
`;

const StyledCompassBaseMultiView = styled(StyledCompassBase)`
  height: 85%;
  top: 8%;
`;

const WaterTemp = styled(Col)`
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-right-color: rgba(255, 255, 255, 0.07);
  border-bottom-color: rgba(255, 255, 255, 0.07);
  box-shadow: 0 20px 30px rgb(0 0 0 / 7%);
  width: min(calc(25% - 1.5vh - (2.5vh / 4)), 125px);
  padding: 1vh;
  height: 14vh;
  margin: 1.5vh 0 1.5vh 1.5vh;
`;

const WaterTempStandAlone = styled(WaterTemp)`
  width: calc(50% - 1.35vw);
  height: 20vh;
  margin: 0 0.5vw 2vh 0.5vw;
  @media (max-width: ${variables.large}) {
    width: calc(50% - 1.5vw);
    height: calc(50vw - 1.5vw);
    margin: 0 1vw 1vw 0.5vw;
  }
`;

const WeatherContainer = styled(WaterTempStandAlone)``;

const SunPositionContainer = styled(WaterTempStandAlone)``;

const UVIndexContainer = styled(WaterTempStandAlone)``;

const TitleIconRow = styled(Row)`
  width: 100%;
  display: flex;
  height: 1vw;
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
  @media (max-width: ${variables.large}) {
    position: unset;
    margin: 1vw 0 1vw 0.5vw;
    height: 2vw;
    width: calc(100% - 1vw);
  }
`;

const TitleIconRowWeather = styled(TitleIconRow)`
  height: 7vw;
`;

const Title = styled.p`
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.8);
  margin-left: 0;
  margin-top: 0;
  display: block;
  margin-bottom: 1vh;
  width: auto;
  font-size: 0.65vw;
  height: fit-content;
  line-height: 0.65vw;
  @media (max-width: ${variables.large}) {
    font-size: max(2vw, 0.9rem);
    line-height: 2vw;
  }
`;

const Data = styled.p`
  color: var(--white);
  opacity: 0.75;
  margin-left: 0;
  margin-top: 0;
  display: block;
  margin-bottom: 1vh;
  line-height: normal;
  font-size: 1.2vw;
`;

const Temp = styled(Data)`
  font-size: 2vw;
  line-height: 2vw;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-align: center;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 0.5vh;
  width: 50%;
  height: 2vw;
  padding: 0;
`;

const TempMobile = styled(Temp)`
  @media (max-width: ${variables.large}) {
    width: 100%;
    text-align: center;
    font-weight: 500;
    font-size: 12vw;
    line-height: 22vw;
    span {
      font-size: 9vw;
      margin: 0;
      padding: 0;
      position: relative;
      top: -2vw;
    }
    span:nth-child(2) {
      top: 0;
      font-size: 5vw;
      margin-left: 1vw;
    }
  }
`;

const WaterTempMobileContainer = styled(TempMobile)`
  font-size: 8vw;
  line-height: 22vw;
`;

const WaterTempData = styled(Temp)`
  font-size: 1.75vw;
`;
const HiLoTemp = styled.div`
  width: 50%;
  text-align: center;
  margin: 0.2vh 0 0.2vh 1vh;
  display: block;
  line-height: 0.6vw;
  height: auto;
  padding: 0;
  p {
    display: block;
    padding: 0.15vw;
    margin: 0;
    font-size: 0.5vw;
    width: auto;
    font-size: 0.8vw;
    font-weight: 500;
    letter-spacing: 0.5px;
    color: rgba(255, 255, 255, 0.5);
  }
`;

const HiLoTempMobile = styled(HiLoTemp)`
  @media (max-width: ${variables.large}) {
    p {
      display: inline-block;
      padding: 0.15vw;
      margin: 0;
      font-size: 3vw;
      letter-spacing: 0.2vw;
      font-weight: 500;
      line-height: 4.6vw;
      width: 100%;
      text-align: center;
      letter-spacing: 0.5px;
      color: rgba(255, 255, 255, 0.5);
      text-align: center;
      margin: 0 auto;
      padding: 0;
      width: calc(50% - 0.3vw);
    }
    font-size: 3vw;
    letter-spacing: 0.2vw;
    font-weight: 500;
    line-height: 4.6vw;
    width: 100%;
    margin: 0;
  }
`;

const TempWeatherIconContainer = styled.div`
  width: 70%;
  text-align: center;
  margin: 0.2vh auto;
  display: flex;
  line-height: 0.6vw;
  height: 7vh;
  padding: 0;
  align-items: center;
  @media (max-width: ${variables.large}) {
    height: 22vw;
    align-items: inherit;
  }
`;
const TempWeatherDescriptionContainer = styled(
  TempWeatherIconContainer
)`
  display: block;
`;

const WeatherDescriptionRow = styled(Row)`
  width: 100%;
  display: block;
  margin: 0 0 1vw 0;
`;

const WaterTempContainer = styled.div`
  width: 90%;
  text-align: center;
  margin: 0.2vh auto;
  display: flex;
  line-height: 0.6vw;
  height: auto;
  padding: 0;
  p {
    line-height: 8vh;
    width: 100%;
    height: 8vh;
  }
`;
const Description = styled(Data)`
  font-size: 0.6vw;
  letter-spacing: 0.1vw;
  font-weight: 500;
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
  margin: 0.5vh 0;
  text-transform: capitalize;
  @media (max-width: ${variables.large}) {
    font-size: 3.5vw;
    letter-spacing: 0.2vw;
    font-weight: 500;
    text-align: center;
    margin: 0 auto;
    padding: 0;
  }
`;
const Weather = styled(WaterTemp)``;

const SunPosition = styled(WaterTemp)``;

const ConditionsContainer = styled(Row)`
  height: 17vh;
  > div:first-child {
    margin-left: 2.5vh;
  }
  > div:last-child {
    margin-right: 2.5vh;
  }
`;

const WeatherIcon = styled.div`
  width: 1.75vw;
  height: 1.75vw;
  position: relative;
  top: -5px;
  right: -5px;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: ${(props) =>
    props.icon
      ? `url(https://www.weatherbit.io/static/img/icons/${props.icon}.png)`
      : null};
  @media (max-width: ${variables.large}) {
    width: 7.75vw;
    height: 7.75vw;
  }
`;

const WaterTempIcon = styled.svg`
  width: 2.25vh;
  height: 2.25vh;
  position: relative;
  top: -2px;
  right: 0;
  padding: 0;
  path {
    fill: rgba(255, 255, 255, 0.25);
  }
`;
const UvIcon = styled(WaterTempIcon)``;

const SunIcon = styled(WaterTempIcon)``;
const SunPositionGraphRow = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  top: 5%;
  position: relative;
  @media (min-width: ${variables.extraLarge}) {
    top: -3%;
    height: 65%;
  }
`;

const SunPositionDataRow = styled.div`
  width: 100%;
  display: flex;
  @media (max-width: ${variables.large}) {
    position: relative;
    top: 8%;
  }
  div {
    width: 50%;
    display: block;
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.6vw;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1vw;

    p:first-child {
      font-size: 0.4vw;
      font-weight: 300;
      @media (max-width: ${variables.large}) {
        font-size: 1.5vw;
        line-height: 3.5vw;
        font-weight: 300;
      }
    }
    p {
      text-align: left;
      margin-bottom: 0;
      line-height: 0.6vw;
      @media (max-width: ${variables.large}) {
        font-size: 2.5vw;
        line-height: 3.5vw;
        font-weight: 500;
      }
    }
  }

  div:nth-child(2) {
    width: 50%;
    p {
      text-align: right;
      text-align: right;
    }
  }
`;

const UnitType = styled.span`
  width: 100%;
  text-align: center;
  font-size: 1vw;
  font-weight: 200;
  color: var(--white);
  margin: 3px 0 10px 0;
  padding: 0;
  opacity: 0.6;
  letter-spacing: 1.25px;
  position: relative;
`;

const UvValue = styled(Data)`
  font-size: calc(60vw / 4 / 8);
  font-weight: 600;
  letter-spacing: 0.5px;
  color: rgba(255, 255, 255, 1);
  position: relative;
  top: -72%;
  left: calc(50% - 1vw);
  padding-left: 0.5vw;
`;

const UvValueMobile = styled(Data)`
  font-size: 10vw;
  font-weight: 600;
  letter-spacing: 0.5px;
  color: rgba(255, 255, 255, 1);
  position: relative;
  left: calc(25vw - 6vw);
  padding-left: 0.5vw;
  width: fit-content;
  top: -20vw;
  padding: 0;
`;
const UvValueMobileMessage = styled(Data)`
  font-size: 3.5vw;
  letter-spacing: 0.2vw;
  font-weight: 500;
  text-align: center;
  margin: 0 auto;
  padding: 0;
  width: 100%;
  display: block;
  top: -17vw;
  position: relative;
`;

const mapStateToProps = (state) => {
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
      uvForecast: state.surf.uvForecast,
    },
  };
};

let degree = String.fromCodePoint(176);

const SurfMapAndConditionsDesktop = (props) => {
  const times = SunCalc.getTimes(
    new Date(),
    props.coords.lat,
    props.coords.lng
  );

  const formatTime = (time) => {
    const date = new Date();
    date.setHours(time.split(':')[0]);
    date.setMinutes(time.split(':')[1]);
    const dateStr = date.toLocaleString('en-US', {
      timeZone: props.surf.activeLocation
        ? props.surf.activeLocation.timeZone
        : props.surf.closestSurfSpot
        ? props.surf.closestSurfSpot.timeZone
        : null,
    });
    const timeStamp = new Date(dateStr).getTime();
    const formatted = formatAMPMwMins(new Date(timeStamp));
    return formatted;
  };

  // get position of the sun (azimuth and altitude) at today's sunrise
  const convertToSec = (time) => {
    return time * 60 * 60;
  };

  // format sunrise time from the Date object

  const midPointTimeCalc = (a, b) => {
    const aTime = new Date(a).getTime();
    const bTime = new Date(b).getTime();
    const difVal = (aTime - bTime) / 2;
    const midPointTimeStamp = aTime - difVal;
    return midPointTimeStamp;
  };

  const midPointAltitudeCalc = (a, b) => {
    const difVal = (a - b) / 2;
    const midPointAltitude = a - difVal;
    return midPointAltitude;
  };

  const nightEndTime = formatTime(
    times.nightEnd.getHours() + ':' + times.nightEnd.getMinutes()
  );
  const nightToSunriseMidPoint = formatTime(
    new Date(
      midPointTimeCalc(times.sunrise, times.nightEnd)
    ).getHours() +
      ':' +
      new Date(
        midPointTimeCalc(times.sunrise, times.nightEnd)
      ).getMinutes()
  );
  const sunriseTime = formatTime(
    times.sunrise.getHours() + ':' + times.sunrise.getMinutes()
  );
  const sunriseToGoldenMidPoint = formatTime(
    new Date(
      midPointTimeCalc(times.goldenHourEnd, times.sunrise)
    ).getHours() +
      ':' +
      new Date(
        midPointTimeCalc(times.goldenHourEnd, times.sunrise)
      ).getMinutes()
  );
  const goldenHourEndTime = formatTime(
    times.goldenHourEnd.getHours() +
      ':' +
      times.goldenHourEnd.getMinutes()
  );
  const goldenHourAmtoNoonMidPoint = formatTime(
    new Date(
      midPointTimeCalc(times.solarNoon, times.goldenHourEnd)
    ).getHours() +
      ':' +
      new Date(
        midPointTimeCalc(times.solarNoon, times.goldenHourEnd)
      ).getMinutes()
  );
  const solarNoonTime = formatTime(
    times.solarNoon.getHours() + ':' + times.solarNoon.getMinutes()
  );
  const goldenHourNoontoPMMidPoint = formatTime(
    new Date(
      midPointTimeCalc(times.goldenHour, times.solarNoon)
    ).getHours() +
      ':' +
      new Date(
        midPointTimeCalc(times.goldenHour, times.solarNoon)
      ).getMinutes()
  );
  const goldenHourTime = formatTime(
    times.goldenHour.getHours() + ':' + times.goldenHour.getMinutes()
  );
  const goldenHourtoSunsetMidPoint = formatTime(
    new Date(
      midPointTimeCalc(times.sunset, times.goldenHour)
    ).getHours() +
      ':' +
      new Date(
        midPointTimeCalc(times.sunset, times.goldenHour)
      ).getMinutes()
  );
  const sunsetTime = formatTime(
    times.sunset.getHours() + ':' + times.sunset.getMinutes()
  );
  const duskTime = formatTime(
    times.dusk.getHours() + ':' + times.dusk.getMinutes()
  );
  const nightTime = formatTime(
    times.night.getHours() + ':' + times.night.getMinutes()
  );
  const nightEndPos = SunCalc.getPosition(
    times.nightEnd,
    props.coords.lat,
    props.coords.lng
  );
  const sunrisePos = SunCalc.getPosition(
    times.sunrise,
    props.coords.lat,
    props.coords.lng
  );
  const goldenHourEndPos = SunCalc.getPosition(
    times.goldenHourEnd,
    props.coords.lat,
    props.coords.lng
  );
  const solarNoonPos = SunCalc.getPosition(
    times.solarNoon,
    props.coords.lat,
    props.coords.lng
  );
  const goldenHourPos = SunCalc.getPosition(
    times.goldenHour,
    props.coords.lat,
    props.coords.lng
  );
  const sunsetPos = SunCalc.getPosition(
    times.sunset,
    props.coords.lat,
    props.coords.lng
  );
  const duskPos = SunCalc.getPosition(
    times.dusk,
    props.coords.lat,
    props.coords.lng
  );
  const nightPos = SunCalc.getPosition(
    times.night,
    props.coords.lat,
    props.coords.lng
  );

  const getSolarDatums = (sunset, sunrise) => {
    return [
      {
        event: 'Night End',
        time: nightEndTime,
        timeTick: convertToSec(times.nightEnd.getHours()),
        position: nightEndPos.altitude,
      },
      {
        event: 'Night to Sunrise',
        time: nightToSunriseMidPoint,
        timeTick: convertToSec(
          new Date(
            midPointTimeCalc(times.sunrise, times.nightEnd)
          ).getHours()
        ),
        position: midPointAltitudeCalc(
          sunrisePos.altitude,
          nightEndPos.altitude
        ),
      },
      {
        event: 'Sunrise',
        time: sunriseTime,
        timeTick: convertToSec(times.sunrise.getHours()),
        position: sunrisePos.altitude,
      },
      {
        event: 'Sunrise to Goldenhour',
        time: sunriseToGoldenMidPoint,
        timeTick: convertToSec(
          new Date(
            midPointTimeCalc(times.goldenHourEnd, times.sunrise)
          ).getHours()
        ),
        position: midPointAltitudeCalc(
          goldenHourEndPos.altitude,
          sunrisePos.altitude
        ),
      },
      {
        event: 'Golden Hour End',
        time: goldenHourEndTime,
        timeTick: convertToSec(times.goldenHourEnd.getHours()),
        position: goldenHourEndPos.altitude,
      },
      {
        event: 'Mid Morning',
        time: goldenHourAmtoNoonMidPoint,
        timeTick: convertToSec(
          new Date(
            midPointTimeCalc(times.solarNoon, times.goldenHourEnd)
          ).getHours()
        ),
        position: midPointAltitudeCalc(
          solarNoonPos.altitude,
          goldenHourEndPos.altitude
        ),
      },
      {
        event: 'Solar Noon',
        time: solarNoonTime,
        timeTick: convertToSec(times.solarNoon.getHours()),
        position: solarNoonPos.altitude,
      },
      {
        event: 'Mid Afternoon',
        time: goldenHourNoontoPMMidPoint,
        timeTick: convertToSec(
          new Date(
            midPointTimeCalc(times.goldenHour, times.solarNoon)
          ).getHours()
        ),
        position: midPointAltitudeCalc(
          goldenHourPos.altitude,
          solarNoonPos.altitude
        ),
      },
      {
        event: 'Golden Hour',
        time: goldenHourTime,
        timeTick: convertToSec(times.goldenHour.getHours()),
        position: goldenHourPos.altitude,
      },
      {
        event: 'Golden Hour to Sunset',
        time: goldenHourtoSunsetMidPoint,
        timeTick: convertToSec(
          new Date(
            midPointTimeCalc(times.sunset, times.goldenHour)
          ).getHours()
        ),
        position: midPointAltitudeCalc(
          sunsetPos.altitude,
          goldenHourPos.altitude
        ),
      },
      {
        event: 'Sunset',
        time: sunsetTime,
        timeTick: convertToSec(times.sunset.getHours()),
        position: sunsetPos.altitude,
      },
      {
        event: 'Dusk',
        time: duskTime,
        timeTick: convertToSec(times.dusk.getHours()),
        position: duskPos.altitude,
      },
      {
        event: 'Night',
        time: nightTime,
        timeTick: convertToSec(times.night.getHours()),
        position: nightPos.altitude,
      },
    ];
  };
  return (
    <Fragment>
      <StyledMapImg coords={props.coords}>
        <StyledCompassBase
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 2000 2000"
        >
          <SwellSpectraCompassSVGPath />
        </StyledCompassBase>
        <SwellRadialChart swell={props.surf.currentConditions} />
      </StyledMapImg>
      <ConditionsContainer>
        <Weather>
          {props.surf.currentConditions ? (
            <Fragment>
              <TitleIconRow>
                <Title>Weather</Title>
                {/* <WeatherIcon
                  icon={props.surf.weather.data[0].weather.icon}
                ></WeatherIcon> */}
              </TitleIconRow>
              <Row>
                <TempWeatherIconContainer>
                  <Temp>
                    {parseInt(
                      props.surf.currentConditions.temperature
                    )}
                    {degree}
                    <UnitType>f</UnitType>
                  </Temp>
                  {!Array.isArray(props.surf.currentConditions) ? (
                    <Fragment>
                      <HiLoTemp>
                        <p>
                          H:{' '}
                          {parseInt(
                            props.surf.currentConditions
                              .maxTemperature
                          )}
                          {degree}
                        </p>
                        <p>
                          L:{' '}
                          {parseInt(
                            props.surf.currentConditions
                              .minTemperature
                          )}
                          {degree}
                        </p>
                      </HiLoTemp>
                    </Fragment>
                  ) : null}
                </TempWeatherIconContainer>
              </Row>
              <Row>
                <Description>
                  {MapWMOWeatherCodeToDescription(
                    props.surf.currentConditions.weatherCode
                  )}
                </Description>
              </Row>
            </Fragment>
          ) : null}
        </Weather>
        {!Number.isNaN(parseInt(props.surf.waterTemp)) ? (
          <WaterTemp>
            <TitleIconRow>
              <Title>Water Temp</Title>
              <WaterTempIcon x="0px" y="0px" viewBox="0 0 100 100">
                <WaterTempSVGPath />
              </WaterTempIcon>
            </TitleIconRow>
            <Row>
              <WaterTempContainer>
                <WaterTempData>
                  {parseInt(props.surf.waterTemp) - 2}
                  {degree}- {parseInt(props.surf.waterTemp) + 1}
                  {degree}
                  <UnitType>f</UnitType>
                </WaterTempData>
              </WaterTempContainer>
            </Row>
          </WaterTemp>
        ) : null}
        <SunPosition>
          <TitleIconRow>
            <Title>Sun Position</Title>
            <SunIcon x="0px" y="0px" viewBox="0 0 100 100">
              <SunPositionSVGPath />
            </SunIcon>
          </TitleIconRow>
          {!Array.isArray(props.surf.weather) ? (
            <Fragment>
              <SunPositionGraphRow>
                <SunriseSunsetGraph data={getSolarDatums()} />
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
          ) : null}
        </SunPosition>
        {!Array.isArray(props.surf.weatherForecast) ? (
          <WaterTemp>
            <TitleIconRow>
              <Title>UV Index</Title>
              <UvIcon x="0px" y="0px" viewBox="0 0 100 100">
                <UvIconSVGPath />
              </UvIcon>
            </TitleIconRow>
            <UvIndexGraph data={props.surf.weatherForecast.current} />
            <UvValue>
              {parseInt(props.surf.weatherForecast.current.uvi) > 11
                ? 11
                : parseInt(props.surf.weatherForecast.current.uvi)}
            </UvValue>
          </WaterTemp>
        ) : null}
      </ConditionsContainer>
    </Fragment>
  );
};

const SurfMapMultiViewComponent = (props) => {
  return (
    <StyledMapImgMulti className="multiViewMap" coords={props.coords}>
      <StyledCompassBaseMultiView
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 2000 2000"
      >
        <SwellSpectraCompassSVGPath />
      </StyledCompassBaseMultiView>
      <SwellRadialChart swell={props.surf.currentConditions} />
    </StyledMapImgMulti>
  );
};

const SurfMapMobile = (props) => {
  return (
    <StyledMapImgMobile coords={props.coords}>
      <StyledCompassBase
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 2000 2000"
      >
        <SwellSpectraCompassSVGPath />
      </StyledCompassBase>
      <SwellRadialChart data={props.surf.currentConditions} />
    </StyledMapImgMobile>
  );
};

const WeatherMobile = (props) => {
  return (
    <WeatherContainer>
      {!Array.isArray(props.surf.weather) ? (
        <Fragment>
          <TitleIconRowWeather>
            <Title>Weather</Title>
            <WeatherIcon
              icon={props.surf.weather.data[0].weather.icon}
            ></WeatherIcon>
          </TitleIconRowWeather>
          <Row>
            <TempWeatherIconContainer>
              <TempMobile>
                {parseInt(props.surf.weather.data[0].app_temp)}
                <span>{degree}</span>
                <UnitType>f</UnitType>
              </TempMobile>
            </TempWeatherIconContainer>
            <TempWeatherDescriptionContainer>
              <WeatherDescriptionRow>
                <Description>
                  {props.surf.weather.data[0].weather.description}
                </Description>
              </WeatherDescriptionRow>
              <WeatherDescriptionRow>
                {!Array.isArray(props.surf.weatherForecast) ? (
                  <Fragment>
                    <HiLoTempMobile>
                      <p>
                        H:{' '}
                        {parseInt(
                          props.surf.weatherForecast.daily[0].temp.max
                        )}
                        {degree} L:{' '}
                        {parseInt(
                          props.surf.weatherForecast.daily[0].temp.min
                        )}
                        {degree}
                      </p>
                    </HiLoTempMobile>
                  </Fragment>
                ) : null}
              </WeatherDescriptionRow>
            </TempWeatherDescriptionContainer>
          </Row>
        </Fragment>
      ) : null}
    </WeatherContainer>
  );
};

const WaterTempMobile = (props) => {
  return (
    <WaterTempStandAlone>
      <TitleIconRowWeather>
        <Title>Water Temp</Title>
        <WaterTempIcon x="0px" y="0px" viewBox="0 0 100 100">
          <WaterTempSVGPath />
        </WaterTempIcon>
      </TitleIconRowWeather>
      <Row>
        {typeof props.surf.waterTemp === 'number' ? (
          <Fragment>
            <TempWeatherIconContainer>
              <WaterTempMobileContainer>
                {parseInt(props.surf.waterTemp) - 2}
                {degree} - {parseInt(props.surf.waterTemp) + 1}
                {degree}
              </WaterTempMobileContainer>
            </TempWeatherIconContainer>
            <TempWeatherDescriptionContainer>
              <WeatherDescriptionRow>
                <Description>
                  Wetsuit:{' '}
                  {parseInt(props.surf.waterTemp) - 2 > 69
                    ? 'Board Shorts'
                    : parseInt(props.surf.waterTemp) - 2 < 70
                    ? '3/2mm'
                    : parseInt(props.surf.waterTemp) - 2 < 60
                    ? '4/3mm'
                    : parseInt(props.surf.waterTemp) - 2 < 50
                    ? '5/4mm'
                    : parseInt(props.surf.waterTemp) - 2 < 40
                    ? '6/5mm'
                    : null}
                </Description>
              </WeatherDescriptionRow>
            </TempWeatherDescriptionContainer>
          </Fragment>
        ) : (
          <TempWeatherDescriptionContainer>
            <WeatherDescriptionRow>
              <Description>
                Water Temp Buoy Data Unavailable
              </Description>
            </WeatherDescriptionRow>
          </TempWeatherDescriptionContainer>
        )}
      </Row>
    </WaterTempStandAlone>
  );
};

const SunPositionMobile = (props) => {
  const times = SunCalc.getTimes(
    new Date(),
    props.coords.lat,
    props.coords.lng
  );

  const formatTime = (time) => {
    const date = new Date();
    date.setHours(time.split(':')[0]);
    date.setMinutes(time.split(':')[1]);
    const dateStr = date.toLocaleString('en-US', {
      timeZone: props.surf.activeLocation
        ? props.surf.activeLocation.timeZone
        : props.surf.closestSurfSpot
        ? props.surf.closestSurfSpot.timeZone
        : null,
    });
    const timeStamp = new Date(dateStr).getTime();
    const formatted = formatAMPMwMins(new Date(timeStamp));
    return formatted;
  };

  // get position of the sun (azimuth and altitude) at today's sunrise
  const convertToSec = (time) => {
    return time * 60 * 60;
  };

  // format sunrise time from the Date object

  const midPointTimeCalc = (a, b) => {
    const aTime = new Date(a).getTime();
    const bTime = new Date(b).getTime();
    const difVal = (aTime - bTime) / 2;
    const midPointTimeStamp = aTime - difVal;
    return midPointTimeStamp;
  };

  const midPointAltitudeCalc = (a, b) => {
    const difVal = (a - b) / 2;
    const midPointAltitude = a - difVal;
    return midPointAltitude;
  };

  const nightEndTime = formatTime(
    times.nightEnd.getHours() + ':' + times.nightEnd.getMinutes()
  );
  const nightToSunriseMidPoint = formatTime(
    new Date(
      midPointTimeCalc(times.sunrise, times.nightEnd)
    ).getHours() +
      ':' +
      new Date(
        midPointTimeCalc(times.sunrise, times.nightEnd)
      ).getMinutes()
  );
  const sunriseTime = formatTime(
    times.sunrise.getHours() + ':' + times.sunrise.getMinutes()
  );
  const sunriseToGoldenMidPoint = formatTime(
    new Date(
      midPointTimeCalc(times.goldenHourEnd, times.sunrise)
    ).getHours() +
      ':' +
      new Date(
        midPointTimeCalc(times.goldenHourEnd, times.sunrise)
      ).getMinutes()
  );
  const goldenHourEndTime = formatTime(
    times.goldenHourEnd.getHours() +
      ':' +
      times.goldenHourEnd.getMinutes()
  );
  const goldenHourAmtoNoonMidPoint = formatTime(
    new Date(
      midPointTimeCalc(times.solarNoon, times.goldenHourEnd)
    ).getHours() +
      ':' +
      new Date(
        midPointTimeCalc(times.solarNoon, times.goldenHourEnd)
      ).getMinutes()
  );
  const solarNoonTime = formatTime(
    times.solarNoon.getHours() + ':' + times.solarNoon.getMinutes()
  );
  const goldenHourNoontoPMMidPoint = formatTime(
    new Date(
      midPointTimeCalc(times.goldenHour, times.solarNoon)
    ).getHours() +
      ':' +
      new Date(
        midPointTimeCalc(times.goldenHour, times.solarNoon)
      ).getMinutes()
  );
  const goldenHourTime = formatTime(
    times.goldenHour.getHours() + ':' + times.goldenHour.getMinutes()
  );
  const goldenHourtoSunsetMidPoint = formatTime(
    new Date(
      midPointTimeCalc(times.sunset, times.goldenHour)
    ).getHours() +
      ':' +
      new Date(
        midPointTimeCalc(times.sunset, times.goldenHour)
      ).getMinutes()
  );
  const sunsetTime = formatTime(
    times.sunset.getHours() + ':' + times.sunset.getMinutes()
  );
  const duskTime = formatTime(
    times.dusk.getHours() + ':' + times.dusk.getMinutes()
  );
  const nightTime = formatTime(
    times.night.getHours() + ':' + times.night.getMinutes()
  );
  const nightEndPos = SunCalc.getPosition(
    times.nightEnd,
    props.coords.lat,
    props.coords.lng
  );
  const sunrisePos = SunCalc.getPosition(
    times.sunrise,
    props.coords.lat,
    props.coords.lng
  );
  const goldenHourEndPos = SunCalc.getPosition(
    times.goldenHourEnd,
    props.coords.lat,
    props.coords.lng
  );
  const solarNoonPos = SunCalc.getPosition(
    times.solarNoon,
    props.coords.lat,
    props.coords.lng
  );
  const goldenHourPos = SunCalc.getPosition(
    times.goldenHour,
    props.coords.lat,
    props.coords.lng
  );
  const sunsetPos = SunCalc.getPosition(
    times.sunset,
    props.coords.lat,
    props.coords.lng
  );
  const duskPos = SunCalc.getPosition(
    times.dusk,
    props.coords.lat,
    props.coords.lng
  );
  const nightPos = SunCalc.getPosition(
    times.night,
    props.coords.lat,
    props.coords.lng
  );

  const getSolarDatums = (sunset, sunrise) => {
    return [
      {
        event: 'Night End',
        time: nightEndTime,
        timeTick: convertToSec(times.nightEnd.getHours()),
        position: nightEndPos.altitude,
      },
      {
        event: 'Night to Sunrise',
        time: nightToSunriseMidPoint,
        timeTick: convertToSec(
          new Date(
            midPointTimeCalc(times.sunrise, times.nightEnd)
          ).getHours()
        ),
        position: midPointAltitudeCalc(
          sunrisePos.altitude,
          nightEndPos.altitude
        ),
      },
      {
        event: 'Sunrise',
        time: sunriseTime,
        timeTick: convertToSec(times.sunrise.getHours()),
        position: sunrisePos.altitude,
      },
      {
        event: 'Sunrise to Goldenhour',
        time: sunriseToGoldenMidPoint,
        timeTick: convertToSec(
          new Date(
            midPointTimeCalc(times.goldenHourEnd, times.sunrise)
          ).getHours()
        ),
        position: midPointAltitudeCalc(
          goldenHourEndPos.altitude,
          sunrisePos.altitude
        ),
      },
      {
        event: 'Golden Hour End',
        time: goldenHourEndTime,
        timeTick: convertToSec(times.goldenHourEnd.getHours()),
        position: goldenHourEndPos.altitude,
      },
      {
        event: 'Mid Morning',
        time: goldenHourAmtoNoonMidPoint,
        timeTick: convertToSec(
          new Date(
            midPointTimeCalc(times.solarNoon, times.goldenHourEnd)
          ).getHours()
        ),
        position: midPointAltitudeCalc(
          solarNoonPos.altitude,
          goldenHourEndPos.altitude
        ),
      },
      {
        event: 'Solar Noon',
        time: solarNoonTime,
        timeTick: convertToSec(times.solarNoon.getHours()),
        position: solarNoonPos.altitude,
      },
      {
        event: 'Mid Afternoon',
        time: goldenHourNoontoPMMidPoint,
        timeTick: convertToSec(
          new Date(
            midPointTimeCalc(times.goldenHour, times.solarNoon)
          ).getHours()
        ),
        position: midPointAltitudeCalc(
          goldenHourPos.altitude,
          solarNoonPos.altitude
        ),
      },
      {
        event: 'Golden Hour',
        time: goldenHourTime,
        timeTick: convertToSec(times.goldenHour.getHours()),
        position: goldenHourPos.altitude,
      },
      {
        event: 'Golden Hour to Sunset',
        time: goldenHourtoSunsetMidPoint,
        timeTick: convertToSec(
          new Date(
            midPointTimeCalc(times.sunset, times.goldenHour)
          ).getHours()
        ),
        position: midPointAltitudeCalc(
          sunsetPos.altitude,
          goldenHourPos.altitude
        ),
      },
      {
        event: 'Sunset',
        time: sunsetTime,
        timeTick: convertToSec(times.sunset.getHours()),
        position: sunsetPos.altitude,
      },
      {
        event: 'Dusk',
        time: duskTime,
        timeTick: convertToSec(times.dusk.getHours()),
        position: duskPos.altitude,
      },
      {
        event: 'Night',
        time: nightTime,
        timeTick: convertToSec(times.night.getHours()),
        position: nightPos.altitude,
      },
    ];
  };
  return (
    <SunPositionContainer>
      <TitleIconRow>
        <Title>Sun Position</Title>
        <SunIcon x="0px" y="0px" viewBox="0 0 100 100">
          <SunPositionSVGPath />
        </SunIcon>
      </TitleIconRow>
      {!Array.isArray(props.surf.weather) ? (
        <Fragment>
          <SunPositionGraphRow>
            <SunriseSunsetGraph data={getSolarDatums()} />
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
      ) : null}
    </SunPositionContainer>
  );
};

const UVIndexMobile = (props) => {
  return (
    <UVIndexContainer>
      {!Array.isArray(props.surf.weatherForecast) ? (
        <Fragment>
          <TitleIconRow>
            <Title>UV Index</Title>
            <UvIcon x="0px" y="0px" viewBox="0 0 100 100">
              <UvIconSVGPath />
            </UvIcon>
          </TitleIconRow>
          <UvIndexGraph data={props.surf.weatherForecast.current} />
          <UvValueMobile>
            {parseInt(props.surf.weatherForecast.current.uvi) > 11
              ? 11
              : parseInt(props.surf.weatherForecast.current.uvi)}
          </UvValueMobile>
          <UvValueMobileMessage>
            {parseInt(props.surf.weatherForecast.current.uvi) >= 8
              ? 'UV Index Is High, Wear Sun Protection'
              : parseInt(props.surf.weatherForecast.current.uvi) >= 5
              ? 'UV Index Is Moderate, Wear Sun Protection'
              : parseInt(props.surf.weatherForecast.current.uvi) >= 1
              ? 'UV Index Is Low'
              : null}
          </UvValueMobileMessage>
        </Fragment>
      ) : null}
    </UVIndexContainer>
  );
};

export const SurfMapAndConditions = connect(mapStateToProps)(
  SurfMapAndConditionsDesktop
);
export const SurfMap = connect(mapStateToProps)(SurfMapMobile);
export const SurfMapMultiView = connect(mapStateToProps)(
  SurfMapMultiViewComponent
);
export const WeatherComponent =
  connect(mapStateToProps)(WeatherMobile);
export const WaterTempComponent =
  connect(mapStateToProps)(WaterTempMobile);
export const SunPositionComponent =
  connect(mapStateToProps)(SunPositionMobile);
export const UVIndexComponent =
  connect(mapStateToProps)(UVIndexMobile);
