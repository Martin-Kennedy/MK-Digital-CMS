import React, {Component, Fragment} from 'react';
import {Row, Col} from 'react-bootstrap';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {motion} from "framer-motion";
import {FadeInWhenVisibleOpacity} from '../helpers/fadeInOnViewport';
import SwellBarChart from '../components/SurfAppComponents/swellForecastBarChart';
import WindBarChart from '../components/SurfAppComponents/windForecastBarChart';
import {
    getLocationsObject,
    getSurfForecast,
    getCloseSurfSpots,
    getSwellForecast,
    getWindForecast,
    getMaxWaveHeight,
    getTideForecast,
    getTideStations,
    getNdbcStations,
    getWeatherStations,
    getWaterTemp,
    getWeather,
    getWeatherForecast,
    getCurrentSwell
} from '../actions/surfApp.actions';
import {CurrWaveDataComponent} from '../components/SurfAppComponents/currentWaveHeight';
import {CurrWindDataComponent} from '../components/SurfAppComponents/currentWind';
import {CurrSwellDataComponent} from '../components/SurfAppComponents/currentSwell';
import CurrentTideDataComponent from '../components/SurfAppComponents/currentTide';
import { SurfMapAndConditions, SurfMap, WeatherComponent, WaterTempComponent, SunPositionComponent, UVIndexComponent } from '../components/SurfAppComponents/surfMapAndConditions';
import SurfSpotsSearchFilter from '../components/SurfAppComponents/autoSuggest';
import {SpotSearchSVGPath} from '../components/designElementComponents/spotSearchSVGPath';
import { HomeIconSVGPath } from '../components/designElementComponents/homeIconSVGPath';
import {CloseButtonSVGPath} from '../components/designElementComponents/closeButtonSVGPath';
import MediaQuery from 'react-responsive';
import variables from '../variables.module.scss';
import {Link} from 'react-router-dom';

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

const StyledCol35 = styled.div `
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



const BackDrop = styled.div `
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
const SwellChartLabel = styled.p `
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
            margin: 0 1vw 1vw 0.5vw;
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
const WindChartLabel = styled(SwellChartLabel)`

`

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
`

const RightNavBkg = styled.div `
  margin: 5vh 0;
  height: 90vh;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-right-color: rgba(255, 255, 255, 0.07);
  border-bottom-color: rgba(255, 255, 255, 0.07);
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.07);
  padding: 15px;
  position: relative;
  backdrop-filter: blur(1px);
  z-index: 1;
  ul {
      margin-left: 0;
      padding: 0;
      li {
           &:hover, &:focus {
        cursor: pointer;
         font-size: 1vw; {
         opacity: 0.9;
        
        }
      }
  }
`
const MenuNavBkg = styled(RightNavBkg)`
z-index: 2;
margin-left: 2vw;
height: fit-content;
`;

const MenuNavBkgMobile = styled(RightNavBkg)`
z-index: 12;
position: fixed;
top: 1.5vw;
margin: 0 auto !important;
height: calc(100vw / 8);
width:  calc(100vw - (var(--bs-gutter-x) * 1.25));
display: flex;
justify-content: space-between;
padding: 2.75vw;
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
    &:hover, &:focus {
        cursor: pointer;
         font-size: 1.2vw;
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
`

const SurfSpot = styled.li `
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

const CloseButtonContainer = styled.div `
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

const CloseButtonIcon = styled.svg `
width: 1.5vw;
height: 1.5vw;
padding: 0;
}
`

const SpotSearchContainer = styled.div `
width: 2.5vw;
height: 2.5vw;
position: relative;
padding: 0;
margin-bottom: 1.25vw;
@media(max-width: ${variables.large}){
    width: 5vw;
    height: 5vw;
    margin-right: 2vw;
}
`

const HomeIconContainer = styled(Link)`
width: 2.5vw;
height: 2.5vw;
position: relative;
display: block;
padding: 0;
margin-bottom: 1.25vw;
@media(max-width: ${variables.large}){
    width: 7vw;
    height: 7vw;
    margin-right: 3vw;
}
`;

const SpotSearchIcon = styled.svg `
width: 2.5vw;
height: 2.5vw;
position: relative;
padding: 0;
cursor: pointer;
@media(max-width: ${variables.large}){
    width: 7vw;
    height: 7vw;
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

const WaveFormBottom = styled.div `
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
            currentSwell: state.surf.currentSwell

        }
    }
}

const mapDispatchToProps = dispatch => ({
    getLocationsObject: locations => dispatch(getLocationsObject(locations)),
    getCloseSurfSpots: closeSurfSpots => dispatch(getCloseSurfSpots(closeSurfSpots)),
    getSurfForecast: surfForecast => dispatch(getSurfForecast(surfForecast)),
    getSwellForecast: swellForecast => dispatch(getSwellForecast(swellForecast)),
    getWindForecast: windForecast => dispatch(getWindForecast(windForecast)),
    getMaxWaveHeight: maxWaveHeight => dispatch(getMaxWaveHeight(maxWaveHeight)),
    getTideStations: tideStations => dispatch(getTideStations(tideStations)),
    getTideForecast: tideForecast => dispatch(getTideForecast(tideForecast)),
    getNdbcStations: ndbcStations => dispatch(getNdbcStations(ndbcStations)),
    getWaterTemp: waterTemp => dispatch(getWaterTemp(waterTemp)),
    getCurrentSwell: currentSwell => dispatch(getCurrentSwell(currentSwell)),
    getWeatherStations: weatherStations => dispatch(getWeatherStations(weatherStations)),
    getWeather: weather => dispatch(getWeather(weather)),
    getWeatherForecast: weatherForecast => dispatch(getWeatherForecast(weatherForecast))
});

const convertMilesToKM = (km) => {
    const miles = km / 1.609;
    return parseInt(miles);
}

class SurfGUILanding extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeLocation: null,
            activeSurfSpot: null,
            lat: null,
            lng: null,
            isOpen: false
        };
    }

    componentDidMount() {
        const {getCloseSurfSpots} = this.props;
        getCloseSurfSpots();
        const {getLocationsObject} = this.props;
        getLocationsObject();
        if (window.innerWidth > Number(variables.largeNum)) {
            document.body.style.overflow = "hidden";
        }

        document
            .body
            .classList
            .add('surf-app');
    }

    componentDidUpdate(prevProps) {
        if (prevProps.surf.closeSurfSpots != this.props.surf.closeSurfSpots) {
            const {getSurfForecast} = this.props;
            const {getTideStations} = this.props;
            const {getWeatherStations} = this.props;
            const {getWeather} = this.props;
            const {getWeatherForecast} = this.props;
            const {getNdbcStations} = this.props;
            this.setState({activeSurfSpot: this.props.surf.closeSurfSpots[0].spotId})
            this.setState({lat: this.props.surf.closeSurfSpots[0].lat})
            this.setState({lng: this.props.surf.closeSurfSpots[0].lng})
            getSurfForecast(this.props.surf.closeSurfSpots[0].spotId)
            getTideStations(this.props.surf.closeSurfSpots[0]);
            getNdbcStations(this.props.surf.closeSurfSpots[0]);
            getWeatherStations(this.props.surf.closeSurfSpots[0]);
            getWeather(this.props.surf.closeSurfSpots[0]);
            getWeatherForecast(this.props.surf.closeSurfSpots[0]);
        }
        if (prevProps.surf.hourlyForecast != this.props.surf.hourlyForecast) {
            const {getMaxWaveHeight} = this.props;
            const {getSwellForecast} = this.props;
            const {getWindForecast} = this.props;
            getMaxWaveHeight(this.props.surf.hourlyForecast);
            getSwellForecast(this.props.surf.hourlyForecast);
            getWindForecast(this.props.surf.hourlyForecast);
        }
        if (prevProps.surf.tideStations != this.props.surf.tideStations) {
            const {getTideForecast} = this.props;
            getTideForecast([this.props.surf.tideStations[0], this.props.surf.tideStations[1]]);

        }

        if (prevProps.surf.ndbcStations != this.props.surf.ndbcStations) {
            const {getWaterTemp} = this.props;
            const {getCurrentSwell} = this.props;
            getWaterTemp(this.props.surf.ndbcStations[0]);
            getCurrentSwell(this.props.surf.ndbcStations[0]);
        }

    }

    setOpen() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        const rating = [this.props.surf.currentConditions.solidRating, this.props.surf.currentConditions.fadedRating];
        const d = [
            "m-17.8273,111.16671c20.66565,-0.55532 37.66464,-38.11063 62.99696,-38.66596c28.3" +
                    "335,0.22223 43.33368,37.77777 67.00051,37.66666c25.77793,-0.33334 39.22252,-15.9" +
                    "9997 68.33378,-16.99997c26.22238,0.33334 43.44477,16.66663 67.66716,16.99997c30." +
                    "1113,-0.33334 50.88927,-37.99998 81.33391,-37.99999c33.22242,0.00001 59.1115,37." +
                    "33332 87.66726,37.99999c33.11131,-0.22223 46.8893,-14.77774 78.00061,-15.3333c32" +
                    ".77794,0.77776 55.22254,14.22218 77.66715,14.66662c29.55574,-0.66667 52.11147,-3" +
                    "9.33331 87.66721,-39.99998c30.55573,0.88889 50.11149,38.77776 75.66723,39.66665c" +
                    "26.00018,0 41.16712,-16.66663 74.83396,-17.3333c29.22238,0.11111 52.27802,16.555" +
                    "52 74.16707,17.3333c23.38901,-0.72228 36.27808,-37.94437 59.66709,-38.16666c21.6" +
                    "1114,0.22228 42.72229,38.44437 62.33344,39.16665",
            "m-17.8273,111.16671c20.66565,-0.55532 37.66464,-38.11063 62.99696,-38.66596c28.3" +
                    "335,0.22223 41.33368,23.77776 65.00051,23.66665c25.77793,-0.33334 39.22252,-21.9" +
                    "9998 68.33378,-22.99998c26.22238,0.33334 43.44477,26.66664 67.66716,26.99998c30." +
                    "1113,-0.33334 52.88927,-27.99997 83.33391,-27.99998c33.22242,0.00001 58.1115,17." +
                    "3333 86.66726,17.99997c33.11131,-0.22223 46.8893,-20.77775 78.00061,-21.33331c32" +
                    ".77794,0.77776 57.22254,36.2222 79.66715,36.66664c29.55574,-0.66667 51.11147,-35" +
                    ".3333 86.66721,-35.99997c30.55573,0.88889 46.11149,26.77775 71.66723,27.66664c26" +
                    ".00018,0 41.16712,-26.66664 74.83396,-27.33331c29.22238,0.11111 56.27803,22.5555" +
                    "3 78.16708,23.33331c23.38901,-0.72228 36.27808,-21.94436 59.66709,-22.16665c21.6" +
                    "1114,0.22228 42.72229,38.44437 62.33344,39.16665",
            "m-17.8273,111.16671c20.66565,-0.55532 38.66464,-28.11062 63.99696,-28.66595c28.3" +
                    "335,0.22223 42.33368,27.77776 66.00051,27.66665c25.77793,-0.33334 39.22252,-27.9" +
                    "9998 68.33378,-28.99998c26.22238,0.33334 43.44477,28.66664 67.66716,28.99998c30." +
                    "1113,-0.33334 51.88927,-27.99997 82.33391,-27.99998c33.22242,0.00001 58.1115,27." +
                    "33331 86.66726,27.99998c33.11131,-0.22223 44.8893,-25.77775 76.00061,-26.33331c3" +
                    "2.77794,0.77776 57.22254,25.22219 79.66715,25.66663c29.55574,-0.66667 57.11147,-" +
                    "28.3333 92.66721,-28.99997c30.55573,0.88889 45.11149,27.77775 70.66723,28.66664c" +
                    "26.00018,0 40.16712,-28.66664 73.83396,-29.33331c29.22238,0.11111 53.27802,28.55" +
                    "553 75.16707,29.33331c23.38901,-0.72228 36.27808,-28.94437 59.66709,-29.16665c21" +
                    ".61114,0.22228 42.72229,29.44437 62.33344,30.16664"
        ]

        return (
            <SurfGUILandingContainer>
                {console.log(this.props.surf)}
                <DataContainer>
                    <Col sm={12}>
                        <GlassContainerBkg>
                            <SearchMenu
                                className={this.state.isOpen
                                ? 'slideInFromLeftSurfSPA'
                                : null}>
                                <CloseButtonContainer onClick={() => this.setOpen()}>
                                    
                                    <CloseButtonIcon x="0px" y="0px" viewBox="0 0 100 100">
                                        <CloseButtonSVGPath/>
                                    </CloseButtonIcon>
                                    <p>close</p>
                                </CloseButtonContainer>

                                <SurfSpotsSearchFilter/>
                            </SearchMenu>
                            <MediaQuery minWidth={variables.large}>
                                <Col md={1}>
                                    <MenuNavBkg >
                                        <HomeIconContainer to={`/`}>
                                            <HomeIcon x="0px" y="0px" viewBox="0 0 100 100">
                                                <HomeIconSVGPath />
                                                
                                            </HomeIcon>
                                        </HomeIconContainer>
                                        <SpotSearchContainer onClick={() => this.setOpen()}>
                                            <SpotSearchIcon x="0px" y="0px" viewBox="0 0 100 100">
                                                <SpotSearchSVGPath/>
                                            </SpotSearchIcon>
                                        </SpotSearchContainer>

                                    </MenuNavBkg>
                                </Col>
                            </MediaQuery>
                            <CustomCol md={12} lg={9}>
                                <DataDashBoardRow>
                                    <MediaQuery minWidth={variables.large}>
                                        <StyledCol35 >
                                            <CurrentConditionRow>
                                                <CurrentConditionBackdrop>
                                                    {!Array.isArray(this.props.surf.currentConditions)
                                                        ? <CurrWaveDataComponent
                                                            surfSpot={this.state.activeLocation != null ? this.state.activeLocation : this.props.surf.closestSurfSpot}
                                                                rating={rating}
                                                                ndbcData={this.props.surf.currentSwell}
                                                                waveData={this.props.surf.currentConditions.swell}/>
                                                        : null}
                                                </CurrentConditionBackdrop>
                                                <CurrentConditionBackdrop>
                                                    {!Array.isArray(this.props.surf.weatherForecast)
                                                        ? <CurrWindDataComponent weatherForecast={this.props.surf.weatherForecast}/>
                                                        : null}
                                                </CurrentConditionBackdrop>

                                            </CurrentConditionRow>
                                            <CurrentConditionRowBottom>
                                                <CurrentConditionBackdrop>
                                                    {!Array.isArray(this.props.surf.currentConditions) && !Array.isArray(this.props.surf.currentSwell)
                                                        ? <CurrSwellDataComponent
                                                                ndbcData={this.props.surf.currentSwell}
                                                                waveData={this.props.surf.currentConditions.swell}/>
                                                        : null}
                                                </CurrentConditionBackdrop>
                                                <CurrentConditionBackdrop>
                                                    {!Array.isArray(this.props.surf.tideForecast)
                                                        ? <CurrentTideDataComponent tide={this.props.surf.tideForecast.predictions}/>
                                                        : null}
                                                </CurrentConditionBackdrop>
                                            </CurrentConditionRowBottom>
                                        </StyledCol35>
                                    </MediaQuery>
                                    <MediaQuery minWidth={variables.large}>
                                        <StyledCol65>
                                            <SurfMapBackDrop>
                                                {this.state.lng && this.state.lat
                                                    ? <SurfMapAndConditions
                                                            coords={{
                                                            lat: this.state.lat,
                                                            lng: this.state.lng
                                                        }}/>
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
                                                    <SpotSearchContainer onClick={() => this.setOpen()}>
                                                        <SpotSearchIcon x="0px" y="0px" viewBox="0 0 100 100">
                                                            <SpotSearchSVGPath />
                                                        </SpotSearchIcon>
                                                    </SpotSearchContainer>

                                            </MenuNavBkgMobile>
                                        </DataDashboardRowMenuMobile>
                                        <DataDashboardRowMap>
                                            <SurfMapBackDrop>
                                                {this.state.lng && this.state.lat
                                                    ? <SurfMap
                                                            coords={{
                                                            lat: this.state.lat,
                                                            lng: this.state.lng
                                                        }}/>
                                                    : null}
                                            </SurfMapBackDrop>
                                        </DataDashboardRowMap>
                                        <DataDashBoardRow>
                                            <LocationBackDropTablet100vw>
                                                {!Array.isArray(this.props.surf.currentConditions) ?
                                                    <Fragment>
                                                        <LocationContainer>
                                                        <Location>{this.props.surf.closestSurfSpot.town}, {this.props.surf.closestSurfSpot.countryOrState}</Location>
                                                        <Distance>{convertMilesToKM(this.props.surf.closestSurfSpot.distanceFromLocation)} miles away</Distance>
                                                        </LocationContainer>
                                                    </Fragment> : null}
                                            </LocationBackDropTablet100vw>
                                            <CurrentConditionsBackDropTablet100vw>
                                                {!Array.isArray(this.props.surf.currentConditions)
                                                    ? <CurrWaveDataComponent
                                                            rating={rating}
                                                            ndbcData={this.props.surf.currentSwell}
                                                            surfSpot={this.props.surf.closestSurfSpot}
                                                            waveData={this.props.surf.currentConditions.swell}/>
                                                    : null}
                                            </CurrentConditionsBackDropTablet100vw>
                                        </DataDashBoardRow>
                                        
                                        <DataDashBoardRow>
                                            <CurrentConditionBackdrop>
                                                {!Array.isArray(this.props.surf.weatherForecast)
                                                    ? <CurrWindDataComponent weatherForecast={this.props.surf.weatherForecast}/>
                                                    : null}
                                            </CurrentConditionBackdrop>
                                            <CurrentConditionBackdrop>
                                                {!Array.isArray(this.props.surf.currentConditions) && !Array.isArray(this.props.surf.currentSwell)
                                                    ? <CurrSwellDataComponent
                                                            ndbcData={this.props.surf.currentSwell}
                                                            waveData={this.props.surf.currentConditions.swell}/>
                                                    : null}
                                            </CurrentConditionBackdrop>
                                            <DataDashBoardRow>
                                                <TideBackDrop100vw>
                                                    {!Array.isArray(this.props.surf.tideForecast)
                                                        ? <CurrentTideDataComponent tide={this.props.surf.tideForecast.predictions} />
                                                        : null}
                                                </TideBackDrop100vw>
                                            </DataDashBoardRow>

                                            <DataDashBoardRow>
                                                <WeatherComponent/>
                                                <WaterTempComponent/>
                                            </DataDashBoardRow>
                                            <DataDashBoardRow>
                                                <SunPositionComponent coords={{
                                                    lat: this.state.lat,
                                                    lng: this.state.lng
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
                                                forecast={this.props.surf.swellForecast}/>
                                        </BackDrop>
                                    </SwellChartContainer>
                                </DataDashBoardRow>
                                <DataDashBoardRow>
                                    <WindChartContainer>
                                        <BackDrop>
                                            <WindChartLabel>WIND SPEED / DIRECTION (mph)</WindChartLabel>
                                            <WindBarChart forecast={this.props.surf.windForecast}/>
                                        </BackDrop>
                                    </WindChartContainer>
                                </DataDashBoardRow>
                            </CustomCol>
                            <MediaQuery minWidth={variables.large}>
                                <Col sm={2}>
                                    <RightNavBkg >
                                        <Title>
                                            <p>Surf Spots Near You</p>
                                            <span>within a 100km radius</span>
                                        </Title>
                                        <Row>
                                            <ul>
                                                {this
                                                    .props
                                                    .surf
                                                    .closeSurfSpots
                                                    .map((surfSpot, index) => {
                                                        return <SurfSpot
                                                            key={index}
                                                            active={() => this.state.activeSurfSpot === surfSpot.spotId
                                                            ? '.8'
                                                            : '.3'}
                                                            onClick={() => {
                                                            this.setState({activeSurfSpot: surfSpot.spotId});
                                                            this.setState({ activeLocation: surfSpot });
                                                            this
                                                                .props
                                                                .getSurfForecast(surfSpot.spotId);
                                                            this
                                                                .props
                                                                .getWeather(surfSpot);
                                                            this
                                                                .props
                                                                .getWeatherForecast(surfSpot);
                                                            this
                                                                .props
                                                                .getTideStations(surfSpot);
                                                            this.setState({lat: surfSpot.lat});
                                                            this.setState({lng: surfSpot.lng});
                                                        }}>{surfSpot.town}</SurfSpot>
                                                    })}
                                            </ul>
                                        </Row>
                                    </RightNavBkg>
                                </Col>
                            </MediaQuery>

                        </GlassContainerBkg>
                    </Col>
                </DataContainer>
                <MediaQuery minWidth={variables.large}>
                    <WaveFormBottom>

                        <FadeInWhenVisibleOpacity duration={1.75}>

                            <div>
                                <WaveWrapper
                                    animate={{
                                    x: 1000
                                }}
                                    transition={{
                                    ease: 'linear',
                                    duration: 20,
                                    times: [
                                        0,
                                        0.32,
                                        0.48,
                                        0.64,
                                        .8,
                                        1
                                    ],
                                    delay: 1,
                                    repeat: Infinity,
                                    repeatType: "reverse"
                                }}>
                                    <svg
                                        x="0px"
                                        y="0px"
                                        width="1000"
                                        height="200"
                                        fill="none"
                                        viewBox="0 0 1000 200">
                                        <StyledPath
                                            animate={{
                                            d: d
                                        }}
                                            d="m-17.8273,111.16671c20.66565,-0.55532 38.66464,-28.11062 63.99696,-28.66595c28.3335,0.22223 42.33368,27.77776 66.00051,27.66665c25.77793,-0.33334 39.22252,-27.99998 68.33378,-28.99998c26.22238,0.33334 43.44477,28.66664 67.66716,28.99998c30.1113,-0.33334 51.88927,-27.99997 82.33391,-27.99998c33.22242,0.00001 58.1115,27.33331 86.66726,27.99998c33.11131,-0.22223 44.8893,-25.77775 76.00061,-26.33331c32.77794,0.77776 57.22254,25.22219 79.66715,25.66663c29.55574,-0.66667 57.11147,-28.3333 92.66721,-28.99997c30.55573,0.88889 45.11149,27.77775 70.66723,28.66664c26.00018,0 40.16712,-28.66664 73.83396,-29.33331c29.22238,0.11111 53.27802,28.55553 75.16707,29.33331c23.38901,-0.72228 36.27808,-28.94437 59.66709,-29.16665c21.61114,0.22228 42.72229,29.44437 62.33344,30.16664"
                                            transition={{
                                            ease: [
                                                .57, .21, .69, 1.25
                                            ],
                                            duration: 3,
                                            times: [
                                                0,
                                                0.32,
                                                0.48,
                                                0.64,
                                                .8,
                                                1
                                            ],
                                            delay: 1,
                                            repeat: Infinity,
                                            repeatType: "reverse"
                                        }}></StyledPath>
                                    </svg>
                                </WaveWrapper>
                                <WaveWrapper2
                                    animate={{
                                    x: 1000
                                }}
                                    transition={{
                                    ease: 'linear',
                                    duration: 20,
                                    times: [
                                        0,
                                        0.32,
                                        0.48,
                                        0.64,
                                        .8,
                                        1
                                    ],
                                    delay: 2,
                                    repeat: Infinity,
                                    repeatType: "reverse"
                                }}>
                                    <svg
                                        x="0px"
                                        y="0px"
                                        width="1000"
                                        height="200"
                                        fill="none"
                                        viewBox="0 0 1000 200">
                                        <StyledPath
                                            animate={{
                                            d: d
                                        }}
                                            d="m-17.8273,111.16671c20.66565,-0.55532 38.66464,-28.11062 63.99696,-28.66595c28.3335,0.22223 42.33368,27.77776 66.00051,27.66665c25.77793,-0.33334 39.22252,-27.99998 68.33378,-28.99998c26.22238,0.33334 43.44477,28.66664 67.66716,28.99998c30.1113,-0.33334 51.88927,-27.99997 82.33391,-27.99998c33.22242,0.00001 58.1115,27.33331 86.66726,27.99998c33.11131,-0.22223 44.8893,-25.77775 76.00061,-26.33331c32.77794,0.77776 57.22254,25.22219 79.66715,25.66663c29.55574,-0.66667 57.11147,-28.3333 92.66721,-28.99997c30.55573,0.88889 45.11149,27.77775 70.66723,28.66664c26.00018,0 40.16712,-28.66664 73.83396,-29.33331c29.22238,0.11111 53.27802,28.55553 75.16707,29.33331c23.38901,-0.72228 36.27808,-28.94437 59.66709,-29.16665c21.61114,0.22228 42.72229,29.44437 62.33344,30.16664"
                                            transition={{
                                            ease: [
                                                .57, .21, .69, 1.25
                                            ],
                                            duration: 3,
                                            times: [
                                                0,
                                                0.32,
                                                0.48,
                                                0.64,
                                                .8,
                                                1
                                            ],
                                            delay: 2.25,
                                            repeat: Infinity,
                                            repeatType: "reverse"
                                        }}></StyledPath>
                                    </svg>
                                </WaveWrapper2>
                                <WaveWrapper3
                                    animate={{
                                    x: 1000
                                }}
                                    transition={{
                                    ease: 'linear',
                                    duration: 20,
                                    times: [
                                        0,
                                        0.32,
                                        0.48,
                                        0.64,
                                        .8,
                                        1
                                    ],
                                    delay: 2,
                                    repeat: Infinity,
                                    repeatType: "reverse"
                                }}>
                                    <svg
                                        x="0px"
                                        y="0px"
                                        width="1000"
                                        height="200"
                                        fill="none"
                                        viewBox="0 0 1000 200">
                                        <StyledPath
                                            animate={{
                                            d: d
                                        }}
                                            d="m-17.8273,111.16671c20.66565,-0.55532 38.66464,-28.11062 63.99696,-28.66595c28.3335,0.22223 42.33368,27.77776 66.00051,27.66665c25.77793,-0.33334 39.22252,-27.99998 68.33378,-28.99998c26.22238,0.33334 43.44477,28.66664 67.66716,28.99998c30.1113,-0.33334 51.88927,-27.99997 82.33391,-27.99998c33.22242,0.00001 58.1115,27.33331 86.66726,27.99998c33.11131,-0.22223 44.8893,-25.77775 76.00061,-26.33331c32.77794,0.77776 57.22254,25.22219 79.66715,25.66663c29.55574,-0.66667 57.11147,-28.3333 92.66721,-28.99997c30.55573,0.88889 45.11149,27.77775 70.66723,28.66664c26.00018,0 40.16712,-28.66664 73.83396,-29.33331c29.22238,0.11111 53.27802,28.55553 75.16707,29.33331c23.38901,-0.72228 36.27808,-28.94437 59.66709,-29.16665c21.61114,0.22228 42.72229,29.44437 62.33344,30.16664"
                                            transition={{
                                            ease: [
                                                .57, .21, .69, 1.25
                                            ],
                                            duration: 3,
                                            times: [
                                                0,
                                                0.32,
                                                0.48,
                                                0.64,
                                                .8,
                                                1
                                            ],
                                            delay: .5,
                                            repeat: Infinity,
                                            repeatType: "reverse"
                                        }}></StyledPath>
                                    </svg>
                                </WaveWrapper3>
                                <WaveWrapper4
                                    animate={{
                                    x: 1000
                                }}
                                    transition={{
                                    ease: 'linear',
                                    duration: 20,
                                    times: [
                                        0,
                                        0.32,
                                        0.48,
                                        0.64,
                                        .8,
                                        1
                                    ],
                                    delay: 1,
                                    repeat: Infinity,
                                    repeatType: "reverse"
                                }}>
                                    <svg
                                        x="0px"
                                        y="0px"
                                        width="1000"
                                        height="200"
                                        fill="none"
                                        viewBox="0 0 1000 200">
                                        <StyledPath
                                            animate={{
                                            d: d
                                        }}
                                            d="m-17.8273,111.16671c20.66565,-0.55532 38.66464,-28.11062 63.99696,-28.66595c28.3335,0.22223 42.33368,27.77776 66.00051,27.66665c25.77793,-0.33334 39.22252,-27.99998 68.33378,-28.99998c26.22238,0.33334 43.44477,28.66664 67.66716,28.99998c30.1113,-0.33334 51.88927,-27.99997 82.33391,-27.99998c33.22242,0.00001 58.1115,27.33331 86.66726,27.99998c33.11131,-0.22223 44.8893,-25.77775 76.00061,-26.33331c32.77794,0.77776 57.22254,25.22219 79.66715,25.66663c29.55574,-0.66667 57.11147,-28.3333 92.66721,-28.99997c30.55573,0.88889 45.11149,27.77775 70.66723,28.66664c26.00018,0 40.16712,-28.66664 73.83396,-29.33331c29.22238,0.11111 53.27802,28.55553 75.16707,29.33331c23.38901,-0.72228 36.27808,-28.94437 59.66709,-29.16665c21.61114,0.22228 42.72229,29.44437 62.33344,30.16664"
                                            transition={{
                                            ease: [
                                                .57, .21, .69, 1.25
                                            ],
                                            duration: 3,
                                            times: [
                                                0,
                                                0.32,
                                                0.48,
                                                0.64,
                                                .8,
                                                1
                                            ],
                                            delay: .75,
                                            repeat: Infinity,
                                            repeatType: "reverse"
                                        }}></StyledPath>
                                    </svg>
                                </WaveWrapper4>
                                <WaveWrapper5
                                    animate={{
                                    x: 1000
                                }}
                                    transition={{
                                    ease: 'linear',
                                    duration: 20,
                                    times: [
                                        0,
                                        0.32,
                                        0.48,
                                        0.64,
                                        .8,
                                        1
                                    ],
                                    delay: 1.25,
                                    repeat: Infinity,
                                    repeatType: "reverse"
                                }}>
                                    <svg
                                        x="0px"
                                        y="0px"
                                        width="1000"
                                        height="200"
                                        fill="none"
                                        viewBox="0 0 1000 200">
                                        <StyledPath
                                            animate={{
                                            d: d
                                        }}
                                            d="m-17.8273,111.16671c20.66565,-0.55532 38.66464,-28.11062 63.99696,-28.66595c28.3335,0.22223 42.33368,27.77776 66.00051,27.66665c25.77793,-0.33334 39.22252,-27.99998 68.33378,-28.99998c26.22238,0.33334 43.44477,28.66664 67.66716,28.99998c30.1113,-0.33334 51.88927,-27.99997 82.33391,-27.99998c33.22242,0.00001 58.1115,27.33331 86.66726,27.99998c33.11131,-0.22223 44.8893,-25.77775 76.00061,-26.33331c32.77794,0.77776 57.22254,25.22219 79.66715,25.66663c29.55574,-0.66667 57.11147,-28.3333 92.66721,-28.99997c30.55573,0.88889 45.11149,27.77775 70.66723,28.66664c26.00018,0 40.16712,-28.66664 73.83396,-29.33331c29.22238,0.11111 53.27802,28.55553 75.16707,29.33331c23.38901,-0.72228 36.27808,-28.94437 59.66709,-29.16665c21.61114,0.22228 42.72229,29.44437 62.33344,30.16664"
                                            transition={{
                                            ease: [
                                                .57, .21, .69, 1.25
                                            ],
                                            duration: 3,
                                            times: [
                                                0,
                                                0.32,
                                                0.48,
                                                0.64,
                                                .8,
                                                1
                                            ],
                                            delay: 1.75,
                                            repeat: Infinity,
                                            repeatType: "reverse"
                                        }}></StyledPath>
                                    </svg>
                                </WaveWrapper5>
                                <WaveWrapper6
                                    animate={{
                                    x: 1000
                                }}
                                    transition={{
                                    ease: 'linear',
                                    duration: 20,
                                    times: [
                                        0,
                                        0.32,
                                        0.48,
                                        0.64,
                                        .8,
                                        1
                                    ],
                                    delay: .5,
                                    repeat: Infinity,
                                    repeatType: "reverse"
                                }}>
                                    <svg
                                        x="0px"
                                        y="0px"
                                        width="1000"
                                        height="200"
                                        fill="none"
                                        viewBox="0 0 1000 200">
                                        <StyledPath
                                            animate={{
                                            d: d
                                        }}
                                            d="m-17.8273,111.16671c20.66565,-0.55532 38.66464,-28.11062 63.99696,-28.66595c28.3335,0.22223 42.33368,27.77776 66.00051,27.66665c25.77793,-0.33334 39.22252,-27.99998 68.33378,-28.99998c26.22238,0.33334 43.44477,28.66664 67.66716,28.99998c30.1113,-0.33334 51.88927,-27.99997 82.33391,-27.99998c33.22242,0.00001 58.1115,27.33331 86.66726,27.99998c33.11131,-0.22223 44.8893,-25.77775 76.00061,-26.33331c32.77794,0.77776 57.22254,25.22219 79.66715,25.66663c29.55574,-0.66667 57.11147,-28.3333 92.66721,-28.99997c30.55573,0.88889 45.11149,27.77775 70.66723,28.66664c26.00018,0 40.16712,-28.66664 73.83396,-29.33331c29.22238,0.11111 53.27802,28.55553 75.16707,29.33331c23.38901,-0.72228 36.27808,-28.94437 59.66709,-29.16665c21.61114,0.22228 42.72229,29.44437 62.33344,30.16664"
                                            transition={{
                                            ease: [
                                                .57, .21, .69, 1.25
                                            ],
                                            duration: 3,
                                            times: [
                                                0,
                                                0.32,
                                                0.48,
                                                0.64,
                                                .8,
                                                1
                                            ],
                                            delay: .35,
                                            repeat: Infinity,
                                            repeatType: "reverse"
                                        }}></StyledPath>
                                    </svg>
                                </WaveWrapper6>
                                <WaveWrapper7
                                    animate={{
                                    x: 1000
                                }}
                                    transition={{
                                    ease: 'linear',
                                    duration: 20,
                                    times: [
                                        0,
                                        0.32,
                                        0.48,
                                        0.64,
                                        .8,
                                        1
                                    ],
                                    delay: 2,
                                    repeat: Infinity,
                                    repeatType: "reverse"
                                }}>
                                    <svg
                                        x="0px"
                                        y="0px"
                                        width="1000"
                                        height="200"
                                        fill="none"
                                        viewBox="0 0 1000 200">
                                        <StyledPath
                                            animate={{
                                            d: d
                                        }}
                                            d="m-17.8273,111.16671c20.66565,-0.55532 38.66464,-28.11062 63.99696,-28.66595c28.3335,0.22223 42.33368,27.77776 66.00051,27.66665c25.77793,-0.33334 39.22252,-27.99998 68.33378,-28.99998c26.22238,0.33334 43.44477,28.66664 67.66716,28.99998c30.1113,-0.33334 51.88927,-27.99997 82.33391,-27.99998c33.22242,0.00001 58.1115,27.33331 86.66726,27.99998c33.11131,-0.22223 44.8893,-25.77775 76.00061,-26.33331c32.77794,0.77776 57.22254,25.22219 79.66715,25.66663c29.55574,-0.66667 57.11147,-28.3333 92.66721,-28.99997c30.55573,0.88889 45.11149,27.77775 70.66723,28.66664c26.00018,0 40.16712,-28.66664 73.83396,-29.33331c29.22238,0.11111 53.27802,28.55553 75.16707,29.33331c23.38901,-0.72228 36.27808,-28.94437 59.66709,-29.16665c21.61114,0.22228 42.72229,29.44437 62.33344,30.16664"
                                            transition={{
                                            ease: [
                                                .57, .21, .69, 1.25
                                            ],
                                            duration: 3,
                                            times: [
                                                0,
                                                0.32,
                                                0.48,
                                                0.64,
                                                .8,
                                                1
                                            ],
                                            delay: 2,
                                            repeat: Infinity,
                                            repeatType: "reverse"
                                        }}></StyledPath>
                                    </svg>
                                </WaveWrapper7>

                            </div>

                        </FadeInWhenVisibleOpacity>

                    </WaveFormBottom>
                </MediaQuery>

            </SurfGUILandingContainer>

        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SurfGUILanding);