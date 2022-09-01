import React, { Component, Fragment } from 'react';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { motion } from "framer-motion";
import { CurrWaveDataComponent } from '../components/SurfAppComponents/currentWaveHeight';
import { CurrWindDataComponent } from '../components/SurfAppComponents/currentWind';
import { CurrSwellDataComponent } from '../components/SurfAppComponents/currentSwell';
import CurrentTideDataComponent from '../components/SurfAppComponents/currentTide';
import { SpotSearchSVGPath } from '../components/designElementComponents/spotSearchSVGPath';
import { CloseSpotsSVGPath } from '../components/designElementComponents/closeSpotsSVGPath';
import { HomeIconSVGPath } from '../components/designElementComponents/homeIconSVGPath';
import MediaQuery from 'react-responsive';
import variables from '../variables.module.scss';
import { Link } from 'react-router-dom';
import SwellBarChart from '../components/SurfAppComponents/swellForecastBarChart';
import WindBarChart from '../components/SurfAppComponents/windForecastBarChart';
import { SwellRadialChart } from '../components/SurfAppComponents/swellRadialChart';
import {
    SurfMapAndConditions,
    SurfMap,
    WeatherComponent,
    WaterTempComponent,
    SunPositionComponent,
    UVIndexComponent
} from '../components/SurfAppComponents/surfMapAndConditions';

import {
    getLocationsObject,
    getSurfForecast,
    getCloseSurfSpots,
    getSwellForecast,
    getWindForecast,
    getMaxWaveHeight,
    getMaxWaveHeightMultiView,
    getTideForecast,
    getTideStations,
    getNdbcStations,
    getWeatherStations,
    getWaterTemp,
    getWeather,
    getWeatherForecast,
    getCurrentSwell,
    searchOpenState,
    closeSpotsOpenState,
    loadView,
    getActiveLocation,
    getMultiViewForecast,
    getMultiViewSwellForecast,
} from '../actions/surfApp.actions';


const SurfGUILandingContainer = styled(Row)`
background-color: #0f2a46;
background-image: linear-gradient(0deg, #0f2a46 0%, #022f5c 50%, #061a2e 100%);
height: 100%;
min-height: 600px;
z-index: 1;
`
const DataContainer = styled(Row)`
z-index: 1;
@media(max-width: ${variables.large}){
    margin: 0;
}
`
const DataDashBoardRow = styled(Row)`
margin: 2vh 0;
padding: 0;
&:first-child{
    margin-top: 5vh;
}
@media(max-width: ${variables.large}){
    margin: 0.5vw 0;
}
}
`
const DataDashboardRowMenuMobile = styled(DataDashBoardRow)`
`

const CustomCol = styled(Col)`
@media(max-width: ${variables.large}){

}
`

const DataDashboardRowMap = styled(DataDashBoardRow)`
&:first-child{
    margin-top: 0;
}
@media(max-width: ${variables.large}){
    width: calc(100% - 1vw);
    margin: 2vw 0 0;
}
`
const CurrentConditionRow = styled(Row)`
padding-left: 0;
margin-left: -.25vw;
&:last-child {
    margin-bottom: 0;
}
`

const CurrentConditionRowBottom = styled(CurrentConditionRow)`
    div {
        margin-bottom: 0;
    }
`

const StyledCol35 = styled.div`
width: 35%;
margin: 0;
padding:0;
display: block;
${CurrentConditionRow} {
    >div:first-child {
        margin-left: .5vh;
    }
}
`

const StyledCol65 = styled(StyledCol35)`
width: 65%;
padding: 0 0 0 0.5vw;
margin:0;
`

const BackDrop = styled.div`
border-radius: 5px;
background: rgba(255, 255, 255, 0.04);
border: 1px solid rgba(255, 255, 255, 0.15);
border-right-color: rgba(255, 255, 255, 0.07);
border-bottom-color: rgba(255, 255, 255, 0.07);
box-shadow: 0 20px 30px rgba(0, 0, 0, 0.07);
position: relative;
height:  ${props => props.dynamicHeight > 8
        ? props.dynamicHeight / 6 + 22
        : 22}vh;
width: 100%;
padding: 4vh 0 0 0;
`
const ErrorAlertBar = styled(BackDrop)`
height: 8vh;
position: absolute;
top: 2vh;
justify-content: center;
align-items: center;
padding: 1vw;
width: 96vw;
display: flex;
left: 2vw;
z-index: 12;
 backdrop-filter: blur(10px);
 span {
    width: 60%;
    color: rgba(255,255,255,0.7);
    z-index: 12;
    font-size: 2vw;
    line-height: 8vw;
    font-weight: 500;
    @media(max-width:${variables.medium}){
        font-size: 4vw;
        width: 75%;
        line-height: 4vw;
    }
 }
   @media(max-width:${variables.medium}){
        padding: 2vw;
    }
`
const SwellChartContainer = styled.div`
margin-left: 0;
padding-right: 0;
padding-left: 0;

${BackDrop} {
    @media(max-width: ${variables.medium}){
    width: calc(100% - 1.5vw);
    margin: 0 1vw 1vw 0.5vw;
    padding: 0;
    overflow-x: overlay;
    overflow-y: hidden;
              &::-webkit-scrollbar {
          height: 1.5vw;
        }
        &::-webkit-scrollbar-track {
          background-color: transparent;
        }
        &::-webkit-scrollbar-thumb {
          background-image: linear-gradient(45deg, rgba(64, 188, 240, 0.4), rgba(64, 188, 240, 0.8), rgba(64, 188, 240, 0.4));
          border-radius: 10px;
          width: 50px;
        }
    }
}
`

const SurfMapBackDrop = styled(BackDrop)`
height: 42vh;
padding: 0;
z-index: 2;
@media(max-width: ${variables.large}){
    height: 35vh;
}
`

const CurrentConditionBackdrop = styled(BackDrop)`
width: calc(50% - 1.35vw);
height: 20vh;
margin:0 0.5vw 2vh 0.5vw;
@media(max-width: ${variables.large}){
    width: calc(50% - 1.5vw);
    height: calc(50vw - 1.5vw);
    margin: 0 1vw 1vw .5vw 
}
`

const CurrentConditionsBackDropTablet100vw = styled(CurrentConditionBackdrop)`
@media(max-width: ${variables.large}){
    width: calc(100% - 1.5vw);
    height: calc(100vw / 7);
    margin: 0 1vw 1vw .5vw;
    padding: 0;
}
`

const TideBackDrop100vw = styled(CurrentConditionsBackDropTablet100vw)`
height: calc(100vw / 5);
`

const LocationBackDropTablet100vw = styled.div`
@media(max-width: ${variables.large}){
    width: calc(100% - 1.5vw);
    height: calc(100vw / 9);
    margin: 0 1vw 2vw .5vw;
    padding: 0;
}
`
const SwellChartLabel = styled.p`
color: var(--white);
opacity: .7;
font-size: 1vw;
margin-left: 25px;
font-weight: 200;
position: relative;
top: -3vh;
height: 0;
margin-bottom: 0;
@media(max-width: ${variables.large}){
    position: unset;
    margin: 1vw 0 1vw 1.5vw;
    padding: 1vh;
    font-size: 2vw;
    width: calc(100% - 1vw);
    line-height: 2vw;
}
`

const WindChartContainer = styled(SwellChartContainer)`
${BackDrop} {
    @media(max-width: ${variables.medium}){
            overflow-x: overlay;
            overflow-y: hidden;
            width: calc(100% - 1.5vw);
            margin: 0.5vw 1vw 1.5vw 0.5vw;
            padding: 0;
            &::-webkit-scrollbar {
          height: 1.5vw;
        }
        
        &::-webkit-scrollbar-track {
          background-color: transparent;
        }
        
        &::-webkit-scrollbar-thumb {
          background-image: linear-gradient(45deg, rgba(64, 188, 240, 0.4), rgba(64, 188, 240, 0.8), rgba(64, 188, 240, 0.4));
          border-radius: 10px;
          width: 50px;
        }
    }
}

`
const WindChartLabel = styled(SwellChartLabel)``

const TideChartLabel = styled(SwellChartLabel)`
color: var(--white);
opacity: .7;
font-size: 1.5vh;
margin-left: 15px;
font-weight: 200;
position: relative;
top: -3vh;
height: 0;
margin-bottom: .5vh;
text-transform: uppercase;
`

const GlassContainerBkg = styled(Row)`
flex-wrap: nowrap; 
`

const RightNavBkg = styled.div`
  margin: 5vh 0;
  height: 90vh;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-right-color: rgba(255, 255, 255, 0.07);
  border-bottom-color: rgba(255, 255, 255, 0.07);
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.07);
  padding: max(1.35vw, 10px);
  position: relative;
  backdrop-filter: blur(1px);
  z-index: 1;
  ul {
      margin-left: 0;
      padding: 0;
      li {
           &:hover, &:focus {
        cursor: pointer;
         font-size: 1vw; 
         opacity: 0.9;
        
        }
      }
  }
`

const RightNavBkgMobile = styled(RightNavBkg)`
@media(max-width: ${variables.large}){
transition: 450ms ease;
backdrop-filter: blur(4px);
background: rgba(255, 255, 255, 0.06);
top: -110vh;
opacity: 0.5;
left: inherit;
width: 100vw;
height: 100vh;
position: fixed;

 ul {
      margin-left: 0;
      padding: 0;
      li {
          font-size: 2.7vw;
           &:hover, &:focus {
            cursor: pointer;
         font-size: 3vw;
         opacity: 0.9;
        
        }
      }
  }
}
`
const RightNavMobileContent = styled.div`
margin-top: 8vh;
`
const MenuNavBkg = styled(RightNavBkg)`
z-index: 2;
margin-left: 2vw;
height: fit-content;
padding: 0;
display: flex;
flex-direction: column;
align-items: center;
`;

const MenuNavBkgMobile = styled(RightNavBkg)`
z-index: 9;
position: fixed;
top: 1.5vw;
margin: 0 auto !important;
height: calc(100vw / 8);
max-height: 63px;
width:  calc(100vw - (var(--bs-gutter-x) * 1.25));
display: flex;
padding: min(14px, 2.75vw);
backdrop-filter: blur(10px);
`;
const SearchMenu = styled(RightNavBkg)`
z-index: 10;
position: absolute;
left: -35vw;
width: 33vw;
padding: 8px;
transition: 600ms ease;
backdrop-filter: blur(4px);
background: rgba(255, 255, 255, 0.06);
padding-top: 2vw;
@media(max-width: ${variables.large}){
transition: 450ms ease;
backdrop-filter: blur(4px);
background: rgba(255, 255, 255, 0.06);
top: -110vh;
opacity: 0.5;
left: inherit;
width: 100vw;
height: 100vh;
position: fixed;
}
ul {
    li {
    margin-right: .8vw;
    letter-spacing: 1.25px;
    width: 100%;
    text-align: center;
    font-weight: 400;
    font-size: 1vw;
    margin-top: 3px;
    height: 1.7vw;
    @media(max-width: ${variables.large}){
        font-size: 3vw;
        height: 4vw;
    }
    &:hover, &:focus {
        cursor: pointer;
         font-size: 1.2vw;
          @media(max-width: ${variables.large}){
                font-size: 3.5vw;
                height: 4vw;
            }
          div {
            span {
                opacity: 1;
            }
            }
        }
        }
    }
}
`;

const Title = styled(Row)`
p {
    width: 100%;
    text-align: center;
    font-size: 1.2vw;
    font-weight: 200;
    color: var(--white);
    opacity: .8;
    margin-bottom: 0;
    padding: 0;
    text-transform: uppercase;

}
span {
    width: 100%;
    text-align: center;
    font-size: .75vw;
    font-weight: 200;
    color: var(--white);
    margin: 3px 0 10px 0;
    padding: 0;
    opacity: .3;
    letter-spacing: 1.25px;
}
@media(max-width: ${variables.large}){
    p {
    font-size: 3.3vw;

}
span {
    font-size: 2.5vw;
    
}
}
`

const SurfSpot = styled.li`
color: var(--white);
opacity: ${props => props.active};
letter-spacing: 1.25px;
width: 100%;
text-align: center;
font-weight: 400;
font-size: .9vw;
margin-top: 3px;
&:hover {
    cursor: pointer;
}
`

const CloseButtonContainer = styled.div`
width: fit-content;
padding: 0;
margin-bottom: 2vh;
margin-top: 0;
text-align: right;
color: var(--white);
position: absolute; 
right: .75vw;
top: 0; 
display: flex;
justify-content: flex-end;

p {
    font-weight: 500;
    font-size: 1vw;
    text-transform: capitalize;
    margin-left: 1vw;
    opacity: 0.5;
    margin-bottom: 0;
    margin-top: 0.3vw;
    letter-spacing: .075vw;
    transition-duration: .5s;
    transition-timing-function: linear;  
   
}
svg {
    position: relative;
    transition: transform 300ms ease-in;
    top: .25vw;
    left: .5vw;
    path {
        transition-duration: .5s;
        transition-timing-function: linear;
        fill: rgba(255,255,255, 0.5);
    }
}
    @media(max-width: ${variables.large}){
    right: 4vw;
    top: 2vw;
    p {
        font-size: 3vw;
        letter-spacing: 1px;
    }
}
&:hover, &:focus {
    cursor: pointer;
    p {
    opacity: 0.8;
    }
    svg {
        transform: translateX(-.5vw);
        path {
            fill: rgba(255,255,255, 0.8);
        }
    }
}
`

const CloseButtonIcon = styled.svg`
width: 1.5vw;
height: 1.5vw;
padding: 0;
@media(max-width: ${variables.large}){
    display: none;
}
}
`

const SpotSearchContainer = styled.div`
width: 2.5vw;
height: 2.5vw;
position: relative;
padding: 0;
margin-bottom: min(1.25vw, 10px);
max-width: 35px;
max-height: 35px;
@media(max-width: ${variables.large}){
    width: 5vw;
    height: 5vw;
}
`

const HomeIconContainer = styled(Link)`
width: 2.5vw;
height: 2.5vw;
display: block;
padding: 0;
margin-bottom: 1.25vw;
margin-top: 1.25vw;
@media(max-width: ${variables.large}){
    width: 7vw;
    height: 7vw;
    margin: 0;
}
`;

const CloseSpotIconContainer = styled(SpotSearchContainer)`
margin-left: 72%;
margin-right: 7%;
`

const CloseSpotIconContainerDesktop = styled(SpotSearchContainer)`
`

const SpotSearchIcon = styled.svg`
width: 2.5vw;
height: 2.5vw;
position: relative;
padding: 0;
cursor: pointer;
@media(max-width: ${variables.large}){
    width: 7vw;
    height: 7vw;
    max-width: 35px;
    max-height: 35px;
}
&:hover, &:focus {
    path {
    fill: rgba(255,255,255, 0.8);
}
}
path {
    fill: rgba(255,255,255, 0.5);
}
`;
const HomeIcon = styled(SpotSearchIcon)``;

const CloseSpotIcon = styled(SpotSearchIcon)``;

const WaveFormBottom = styled.div`
position: absolute;
bottom: 40vh;
height: 0;
z-index: 0;
`

const WaveWrapper = styled(motion.div)`
    width: 200vw;
    height: 10vh;
    left: 0;
    position: relative;
        x: 0;
        svg {
            position: relative;
            transform: translateX(calc(100vw -2000px));
            transform: scale(3, 1);
            opacity: 0.065;
            stroke-width: 1.5px;
        }
`

const WaveWrapper2 = styled(WaveWrapper)`
        top: -8vh;
`
const WaveWrapper3 = styled(WaveWrapper)`
        top: -16vh;
`
const WaveWrapper4 = styled(WaveWrapper)`
        top: -24vh;
`
const WaveWrapper5 = styled(WaveWrapper)`
        top: -30vh;
`
const WaveWrapper6 = styled(WaveWrapper)`
        top: -33vh;
`
const WaveWrapper7 = styled(WaveWrapper)`
        top: -36vh;
`

const StyledPath = styled(motion.path)`
    width: 2000px;
    strokeLinecap: "round";
    fill: "transparent";
    stroke: #fff;
`

const Location = styled.div`
color: var(--white);
margin: 10px 0 0 15px;
font-weight: 500;
display: block;
margin: 0 auto;
text-transform: uppercase;
font-size: 0.75vw;
line-height: 1vw;
letter-spacing: .1vw;
opacity: 0.9;
@media(max-width: ${variables.large}){
font-size: 2.25vw;
line-height: 2.25vw;
letter-spacing: .25vw;
display: block;
width: fit-content;
margin-left: 0;
}
@media(max-width: ${variables.medium}){
    font-size: 3.5vw;
    line-height: 3.5vw;
    letter-spacing: .25vw;
    width: fit-content;
    margin: 1vw auto;
    text-align: center;
}
`
const Distance = styled.div`
color: var(--white);
margin: 10px 0 0 15px;
font-weight: 500;
display: block;
font-size: 0.5vw;
text-transform: uppercase;
letter-spacing: .1vw;
opacity: 0.8;
@media(max-width: ${variables.large}){
    font-size: 1.5vw;
    line-height: 2vw;
    letter-spacing: .25vw;
    width: fit-content;
    margin: 1vw auto;
    text-align: center;
}

@media(max-width: ${variables.medium}){
    font-size: 2.5vw;
    line-height: 2.5vw;
    letter-spacing: .25vw;
    width: fit-content;
    margin: 1vw auto;
    text-align: center;
}
`

const LocationContainer = styled.div`
display: block;
width: fit-content;
margin: 2vw auto;
`

const CloseButton = styled.div`
display: flex;
align-content: center;
justify-content: center;
border-radius: 4px;
background: rgba(183, 32,32, 0.8);
z-index: 15;
box-shadow: 0 2.8px 2.2px rgb(0 0 0 / 3%), 0 6.7px 5.3px rgb(0 0 0 / 5%), 0 12px 8px rgb(0 0 0 / 3%), 0 12px 8px rgb(0 0 0 / 4%), 0 12px 8px rgb(0 0 0 / 3%), 0 12px 8px rgb(0 0 0 / 3%);
width: 10%;
height: 6vh;
line-height: 6vh;
margin: 0 0 0 auto;
position: relative;
color: rgba(255,255,255,0.7);
font-size: 1.5vw;
text-transform: uppercase;
font-weight: 500;
&:hover, &:active {
cursor: pointer;
}

@media(max-width: ${variables.medium}){
    font-size: 5vw;
    line-height: 4vh;
    width: 20%;
    line-height: 6vh;
    font-weight: 600;
}
`
const mapDispatchToProps = dispatch => ({
    getLocationsObject: locations => dispatch(getLocationsObject(locations)),
    getCloseSurfSpots: closeSurfSpots => dispatch(getCloseSurfSpots(closeSurfSpots)),
    getSurfForecast: surfForecast => dispatch(getSurfForecast(surfForecast)),

    getTideStations: tideStations => dispatch(getTideStations(tideStations)),
    getTideForecast: tideForecast => dispatch(getTideForecast(tideForecast)),
    getNdbcStations: ndbcStations => dispatch(getNdbcStations(ndbcStations)),
    getWaterTemp: waterTemp => dispatch(getWaterTemp(waterTemp)),
    getCurrentSwell: currentSwell => dispatch(getCurrentSwell(currentSwell)),
    getWeatherStations: weatherStations => dispatch(getWeatherStations(weatherStations)),
    getWeather: weather => dispatch(getWeather(weather)),
    getWeatherForecast: weatherForecast => dispatch(getWeatherForecast(weatherForecast)),
    searchOpenState: openState => dispatch(searchOpenState(openState)),
    closeSpotsOpenState: openState => dispatch(closeSpotsOpenState(openState)),
    loadView: openState => dispatch(loadView(openState)),
    getActiveLocation: activeLocation => dispatch(getActiveLocation(activeLocation)),
    getMultiViewForecast: forecast => dispatch(getMultiViewForecast(forecast)),
    getMultiViewSwellForecast: forecast => dispatch(getMultiViewSwellForecast(forecast)),
    getMaxWaveHeightMultiView: waveHeight => dispatch(getMaxWaveHeightMultiView(waveHeight))
});
const mapStateToProps = state => {
    return {
        surf: {
            locations: state.surf.locations,
            geoLocationError: state.surf.geoLocationError,
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
            currentSwell: state.surf.currentSwell,
            isSearchOpen: state.surf.isSearchOpen,
            isCloseSpotsOpen: state.surf.isCloseSpotsOpen,
            activeLocation: state.surf.activeLocation,
            isView: state.surf.isView,
            multiViewForecast: state.surf.multiViewForecast,
            multiViewSwellForecast: state.surf.multiViewSwellForecast
        }
    }
}

const convertMilesToKM = (km) => {
    const miles = km / 1.609;
    return parseInt(miles);
}


class SurfGUISingleSpotView extends Component {


    componentDidUpdate(prevProps) {
        if (prevProps.surf.closeSurfSpots != this.props.surf.closeSurfSpots) {
            const { getTideStations } = this.props;
            const { getWeatherStations } = this.props;
            const { getWeather } = this.props;
            const { getWeatherForecast } = this.props;
            const { getNdbcStations } = this.props;
            const { getMultiViewForecast } = this.props;

            getActiveLocation(this.props.surf.closeSurfSpots[0]);
            getTideStations(this.props.surf.closeSurfSpots[0]);
            getNdbcStations(this.props.surf.closeSurfSpots[0]);
            getWeatherStations(this.props.surf.closeSurfSpots[0]);
            getWeather(this.props.surf.closeSurfSpots[0]);
            getWeatherForecast(this.props.surf.closeSurfSpots[0]);
            getMultiViewForecast(this.props.surf.closeSurfSpots);


        }
        if (prevProps.surf.tideStations != this.props.surf.tideStations) {
            const { getTideForecast } = this.props;
            getTideForecast([this.props.surf.tideStations[0], this.props.surf.tideStations[1]]);

        }

       

    }

    render() {
        const rating = [this.props.surf.currentConditions.solidRating, this.props.surf.currentConditions.fadedRating];
        return (<CustomCol md={12} lg={9}>

            <DataDashBoardRow>

                <MediaQuery minWidth={variables.large}>

                    <StyledCol35 >

                        <CurrentConditionRow>
                            <CurrentConditionBackdrop>
                                {!Array.isArray(this.props.surf.currentConditions)
                                    ? <CurrWaveDataComponent
                                        surfSpot={this.props.surf.activeLocation != null
                                            ? this.props.surf.activeLocation
                                            : this.props.surf.closestSurfSpot}
                                        rating={rating}
                                        ndbcData={this.props.surf.currentSwell}
                                        waveData={this.props.surf.currentConditions.swell} />
                                    : null}
                            </CurrentConditionBackdrop>
                            <CurrentConditionBackdrop>
                                {!Array.isArray(this.props.surf.weatherForecast)
                                    ? <CurrWindDataComponent weatherForecast={this.props.surf.weatherForecast} />
                                    : null}
                            </CurrentConditionBackdrop>

                        </CurrentConditionRow>
                        <CurrentConditionRowBottom>
                            <CurrentConditionBackdrop>
                                {!Array.isArray(this.props.surf.currentConditions) && !Array.isArray(this.props.surf.currentSwell)
                                    ? <CurrSwellDataComponent
                                        ndbcData={this.props.surf.currentSwell}
                                        waveData={this.props.surf.currentConditions.swell} />
                                    : null}
                            </CurrentConditionBackdrop>
                            <CurrentConditionBackdrop>
                                {!Array.isArray(this.props.surf.tideForecast) && (this.props.surf.activeLocation != null)

                                    ? <CurrentTideDataComponent activeLocation={this.props.surf.activeLocation} tide={this.props.surf.tideForecast.predictions} />
                                    : null}
                            </CurrentConditionBackdrop>
                        </CurrentConditionRowBottom>
                    </StyledCol35>
                </MediaQuery>
                <MediaQuery minWidth={variables.large}>
                    <StyledCol65>
                        <SurfMapBackDrop>
                            {this.props.coords.lng && this.props.coords.lat
                                ? <SurfMapAndConditions
                                    coords={{
                                        lat: this.props.coords.lat,
                                        lng: this.props.coords.lng
                                    }} />
                                : null}
                        </SurfMapBackDrop>
                    </StyledCol65>
                </MediaQuery>
                <MediaQuery maxWidth={variables.large}>
                    <DataDashboardRowMenuMobile>
                        <MenuNavBkgMobile >
                            <HomeIconContainer to={`/`}>
                                <HomeIcon x="0px" y="0px" viewBox="0 0 100 100">
                                    <HomeIconSVGPath />

                                </HomeIcon>
                            </HomeIconContainer>
                            <CloseSpotIconContainer
                                onClick={() => this.props.closeSpotsOpenState(this.props.surf.isCloseSpotsOpen)}>
                                <CloseSpotIcon x="0px" y="0px" viewBox="0 0 100 100">
                                    <CloseSpotsSVGPath />
                                </CloseSpotIcon>
                            </CloseSpotIconContainer>
                            <SpotSearchContainer
                                onClick={() => this.props.searchOpenState(this.props.surf.isSearchOpen)}>
                                <SpotSearchIcon x="0px" y="0px" viewBox="0 0 100 100">
                                    <SpotSearchSVGPath />
                                </SpotSearchIcon>
                            </SpotSearchContainer>

                        </MenuNavBkgMobile>
                    </DataDashboardRowMenuMobile>
                    <DataDashboardRowMap>
                        <SurfMapBackDrop>
                            {this.props.coords.lng && this.props.coords.lat
                                ? <SurfMap
                                    coords={{
                                        lat: this.props.coords.lat,
                                        lng: this.props.coords.lng
                                    }} />
                                : null}
                        </SurfMapBackDrop>
                    </DataDashboardRowMap>
                    <DataDashBoardRow>
                        <LocationBackDropTablet100vw>
                            {!Array.isArray(this.props.surf.currentConditions)
                                ? <Fragment>
                                    <LocationContainer>
                                        <Location>{this.props.surf.activeLocation != null
                                            ? `${this.props.surf.activeLocation.town}, ${this.props.surf.activeLocation.countryOrState}`
                                            : `${this.props.surf.closestSurfSpot.town}, ${this.props.surf.closestSurfSpot.countryOrState}`}</Location>
                                        <Distance>{convertMilesToKM(this.props.surf.closestSurfSpot.distanceFromLocation)}
                                            miles away</Distance>
                                    </LocationContainer>
                                </Fragment>
                                : null}
                        </LocationBackDropTablet100vw>
                        <CurrentConditionsBackDropTablet100vw>
                            {!Array.isArray(this.props.surf.currentConditions)
                                ? <CurrWaveDataComponent
                                    rating={rating}
                                    ndbcData={this.props.surf.currentSwell}
                                    surfSpot={this.props.surf.closestSurfSpot}
                                    waveData={this.props.surf.currentConditions.swell} />
                                : null}
                        </CurrentConditionsBackDropTablet100vw>
                    </DataDashBoardRow>

                    <DataDashBoardRow>
                        <CurrentConditionBackdrop>
                            {!Array.isArray(this.props.surf.weatherForecast)
                                ? <CurrWindDataComponent weatherForecast={this.props.surf.weatherForecast} />
                                : null}
                        </CurrentConditionBackdrop>
                        <CurrentConditionBackdrop>
                            {!Array.isArray(this.props.surf.currentConditions) && !Array.isArray(this.props.surf.currentSwell)
                                ? <CurrSwellDataComponent
                                    ndbcData={this.props.surf.currentSwell}
                                    waveData={this.props.surf.currentConditions.swell} />
                                : null}
                        </CurrentConditionBackdrop>
                        <DataDashBoardRow>
                            <TideBackDrop100vw>

                                {!Array.isArray(this.props.surf.tideForecast) && (this.props.surf.activeLocation != null)
                                    ? <CurrentTideDataComponent activeLocation={this.props.surf.activeLocation} tide={this.props.surf.tideForecast.predictions} />
                                    : null}
                            </TideBackDrop100vw>
                        </DataDashBoardRow>

                        <DataDashBoardRow>
                            <WeatherComponent />
                            <WaterTempComponent />
                        </DataDashBoardRow>
                        <DataDashBoardRow>
                            <SunPositionComponent
                                coords={{
                                    lat: this.props.coords.lat,
                                    lng: this.props.coords.lng
                                }} />
                            <UVIndexComponent />
                        </DataDashBoardRow>
                    </DataDashBoardRow>

                </MediaQuery>
            </DataDashBoardRow>
            <DataDashBoardRow>
                <SwellChartContainer >
                    <BackDrop dynamicHeight={this.props.surf.maxWaveHeight}>
                        <SwellChartLabel>SURF HEIGHT (ft)</SwellChartLabel>
                        <SwellBarChart
                            maxWaveHeight={this.props.surf.maxWaveHeight}
                            forecast={this.props.surf.swellForecast} />
                    </BackDrop>
                </SwellChartContainer>
            </DataDashBoardRow>
            <DataDashBoardRow>
                <WindChartContainer>
                    <BackDrop>
                        <WindChartLabel>WIND SPEED / DIRECTION (mph)</WindChartLabel>
                        <WindBarChart forecast={this.props.surf.windForecast} />
                    </BackDrop>
                </WindChartContainer>
            </DataDashBoardRow>

        </CustomCol>)
    }


}

export default connect(mapStateToProps, mapDispatchToProps)(SurfGUISingleSpotView);