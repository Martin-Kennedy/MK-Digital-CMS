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
    getCurrentSwell,
    searchOpenState,
    closeSpotsOpenState,
    getActiveLocation
} from '../actions/surfApp.actions';
import {CurrWaveDataComponent} from '../components/SurfAppComponents/currentWaveHeight';
import {CurrWindDataComponent} from '../components/SurfAppComponents/currentWind';
import {CurrSwellDataComponent} from '../components/SurfAppComponents/currentSwell';
import CurrentTideDataComponent from '../components/SurfAppComponents/currentTide';
import { MultiSpotViewCard } from '../components/SurfAppComponents/multiSpotViewCard';
import SurfSpotsSearchFilter from '../components/SurfAppComponents/autoSuggest';
import {SpotSearchSVGPath} from '../components/designElementComponents/spotSearchSVGPath';
import {CloseSpotsSVGPath} from '../components/designElementComponents/closeSpotsSVGPath';
import {HomeIconSVGPath} from '../components/designElementComponents/homeIconSVGPath';
import {CloseButtonSVGPath} from '../components/designElementComponents/closeButtonSVGPath';
import MediaQuery from 'react-responsive';
import variables from '../variables.module.scss';
import {Link} from 'react-router-dom';

const SurfGUIMultiSpotViewContainer = styled(Row)`
height: 100%;
min-height: 600px;
flex-wrap: nowrap;
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
flex-wrap: nowrap;
&:first-child{
    margin-top: 5vh;
}
@media(max-width: ${variables.large}){
    margin: 0.5vw 0;
}
}
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


const RightNavBkg = styled.div `
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
            activeLocation: state.surf.activeLocation

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
    getWeatherForecast: weatherForecast => dispatch(getWeatherForecast(weatherForecast)),
    searchOpenState: openState => dispatch(searchOpenState(openState)),
    closeSpotsOpenState: openState => dispatch(closeSpotsOpenState(openState)),
    getActiveLocation: activeLocation => dispatch(getActiveLocation(activeLocation))
});

const convertMilesToKM = (km) => {
    const miles = km / 1.609;
    return parseInt(miles);
}

class SurfGUIMultiSpotView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeLocation: null,
            activeSurfSpot: null,
            lat: null,
            lng: null,
            isOpen: false,
            geoLocationModalClosed: false
        };
    }

    componentDidMount() {
        const {getCloseSurfSpots} = this.props;
        getCloseSurfSpots();
        const {getLocationsObject} = this.props;
        getLocationsObject();
        const {searchOpenState} = this.props;
        const {closeSpotsOpenState} = this.props;
        const {getActiveLocation} = this.props;
        if (window.innerWidth > Number(variables.largeNum)) {
            document.body.style.overflow = "hidden";

            document.getElementsByTagName('html')[0].style.overflow = "hidden";
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
            this
                .props
                .getActiveLocation(this.props.surf.closeSurfSpots[0]);
            this.setState({activeSurfSpot: this.props.surf.closeSurfSpots[0].spotId});
            this.setState({lat: this.props.surf.closeSurfSpots[0].lat});
            this.setState({lng: this.props.surf.closeSurfSpots[0].lng});
            getSurfForecast(this.props.surf.closeSurfSpots[0].spotId);
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
        if (window.innerWidth < Number(variables.largeNum)) {
            if (this.props.surf.isSearchOpen || this.props.surf.isCloseSpotsOpen) {
                document.body.style.overflow = "hidden";
            } else {
                document.body.style.overflow = "overlay";
            }
        }

    }

    render() {
        const rating = [this.props.surf.currentConditions.solidRating, this.props.surf.currentConditions.fadedRating];

        return (
            <SurfGUIMultiSpotViewContainer>

               
                
                {/* <MultiSpotViewCard /> */}
                

            </SurfGUIMultiSpotViewContainer>

        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SurfGUIMultiSpotView);