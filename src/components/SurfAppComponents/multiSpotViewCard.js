import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components'
import {Row, Col} from 'react-bootstrap'
import {WaveConditionsSVGPath} from '../designElementComponents/waveConditionsSVGPath';
import {CurrWindDataComponentMulti} from '../SurfAppComponents/currentWind';
import variables from '../../variables.module.scss';
import SwellBarChartMultiView from './swellForecastBarChartMultiView';
import WindBarChartMultiView from './windForecastBarChartMultiView';
import {SurfMapMultiView} from '../SurfAppComponents/surfMapAndConditions';
import moment from 'moment';
import MediaQuery from 'react-responsive';
import { SwellSVGPath } from '../designElementComponents/swellSVGPath';
import { WindIconSVGPath } from '../designElementComponents/windIconSVGPath';
import { MULTI_VIEW, SINGLE_VIEW } from '../../helpers/types';
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
    getActiveSurfSpot,
    getLat,
    getLng
} from '../../actions/surfApp.actions';



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
padding: .5vh;
`
const Cell = styled(BackDrop)`
display: flex;
height: fit-content;
mix-blend-mode:  multiply;
background: rgba(255, 255, 255, 0.04);
&:first-child {
        margin-bottom: .5vh;
}
`
const SwellIcon = styled.svg`
    width: 1.75;
    height: 1.75vh;
    position: relative;
    top: -2px;
    left: 0;
    padding: 0px;
    margin: 0 3px 1px 0;
    path {
        fill: rgba(255,255,255, 0.4);
    }
    @media(max-width: ${variables.large}){
        height: 3vw;
        width: 3vw;
        position: unset;
    }
`

const WindIcon = styled(SwellIcon)``;


const Title = styled.p`
text-transform: uppercase;
color: rgba(255, 255, 255, 0.6);
margin-left: 0;
margin-top: 0;
display: block;
margin-bottom: 1vh;
width: auto;
font-size: .65vw;
height: fit-content;
line-height: .65vw;
@media(max-width:${variables.large}){
   font-size: 2vw;
   line-height: 2vw;
   padding: 0 0 0 0.8vw;
}
`

const SwellKeyColor = styled.svg`
    width: 1vh;
    height:  1vh;
    margin-right: .5vw;
    margin-bottom: .5vh;
`
const SwellKeyRow = styled(Row)`
width: 100%;
`
const PrimarySwell = styled.div`
height: fit-content;
width: 100%;
height: fit-content;
margin-bottom: .5vh;
margin-top: 2vh;
color: rgba(255,255,255, 0.7);
font-size: 1.25vh;
letter-spacing: .1vh;
line-height: 1.5vh;
margin-left: .15vw;
${SwellKeyColor} {
    rect {
        fill: #40BCF0;
    }
}
`

const WindData = styled(PrimarySwell)`
margin-top: 3vh;
font-size: 1.5vh;
font-weight: 400;
span {
font-size: 1.2vh;
font-weight: 200;
}
`

const SecondarySwell = styled(PrimarySwell)`
margin-top: 0;
${SwellKeyColor}  {
    rect {
        fill: #307AD9;
    }
}
`

const SwellKey = styled.div`
width: 100%;
display: flex;
position: absolute;
font-size: 1vh;
line-height: 1vh;
color: rgba(255,255,255,0.8);
margin-left: .15vw;
div {
    width: fit-content;
    margin-right: .25vw;
}
${SwellKeyColor}{
    width: .75vh;
    height:  .75vh;
    margin-right: .25vw;
}
${SwellKeyColor}:first-child  {
    rect {
        fill: #40BCF0;
    }
}
${SwellKeyColor}  {
    rect {
        fill: #307AD9;
    }
}
`

const CellCol = styled(Col)`
display: inline-block;

`

const MultiViewCardColumn = styled(Col)`
padding: 0 0 0 .5vw;
&:first-child {
        padding-left: calc(var(--bs-gutter-x) * .5);
}
`

const CurrentConditionBackdrop = styled(BackDrop)`
width: calc(33% - 1.25vw);
height: calc(33vh - 2vh - (10vh/5));
margin:0 0.5vw 2vh 0.5vw;
display: inline-flex;
flex-direction: column;
transition: .15s ease-in;
&:hover, &:active {
    cursor: pointer;
    border: 1px solid rgba(255,255,255,0.5);
}
@media(max-width: ${variables.large}){
    width: calc(50% - 1.5vw);
    height: calc(50vw - 1.5vw);
    margin: 0 1vw 1vw .5vw 
}
`

const ChartRow= styled(Row)`
width: 100%;
display: flex;
--bs-gutter-x: 1vw;

@media(max-width: ${variables.large}){
    position: unset;
    margin: 1vw 0 1vw 0.5vw;
    height: 2vw;
    width: calc(100% - 1vw);
}
`

const TitleIconRow = styled.div`
width: 100%;
display: flex;
position: absolute;
top: 0.5vh;
height: 1.5vh;
margin: 0;

@media(max-width: ${variables.large}){
    position: unset;
    margin: 1vw 0 1vw 0.5vw;
    height: 2vw;
    width: calc(100% - 1vw);
}
`
const TitleCol = styled(Col)``;

const WaveHeightWrapper = styled.div `

width: calc(100% - 1.5vh);
margin: 1.5vh 0 0.5vh 1.5vh;
color: rgba(255, 255, 255, 0.8);

p {
margin-left: 0;
margin-top: 0;
margin-bottom: 1vh;
width: auto;
font-size: 1.75vw;
font-weight: 600;
height: fit-content;
line-height: .65vw;
span {
    margin-left: .5vw;
    font-size: 0.75vw;
    font-weight: 400;
}
@media(max-width:${variables.large}){
    font-size: 2vw;
    line-height: 2vw;
    padding: 0;
    }
}
`

const WindWrapper = styled.div `
width: 100%;
margin: 0 0 0.5vh 1.5vh;
border-radius: 5px;
background: rgba(255, 255, 255, 0.04);
border: 1px solid rgba(255, 255, 255, 0.15);
border-right-color: rgba(255, 255, 255, 0.07);
border-bottom-color: rgba(255, 255, 255, 0.07);
box-shadow: 0 20px 30px rgba(0, 0, 0, 0.07);
`

const ConditionsWrapper = styled.div `
width: calc(60% - 1.5vh);
margin: 2vh 0 0.5vh 1.5vh;

`

const WaveDataCol = styled(Col)`
color: rgba(255, 255, 255, 0.8);
p {
margin-left: 0;
margin-top: 0;
margin-bottom: 1vh;
width: auto;
font-size: 1.75vw;
font-weight: 600;
height: fit-content;
line-height: .65vw;
@media(max-width:${variables.large}){
    font-size: 2vw;
    line-height: 2vw;
    padding: 0;
    }
}
span {
    margin-left: .5vw;
}`;

const SwellChartContainer = styled(Row)`
height: 35%;
width: 100%;
position: absolute;
padding-top: 1.5vh;
padding-right: 0.5vh;
margin: 0;
bottom: 0;
flex-wrap: nowrap;
p {
color: var(--white);
font-size: min(2.5vw,40px);
margin: 0 0 0 15px;
font-weight: 600;
display: inline-block;
margin-bottom: 0;
text-transform: uppercase;
line-height: max(1.8vw,35px);
@media(max-width: ${variables.large}){
    font-size: 9vw;
    margin: 1.5vw auto;
    line-height: 2vw;
}
}
span {

text-align: center;
font-size: 1vw;
font-weight: 200;
color: var(--white);
margin: 3px 0 10px 0;
padding: 0;
letter-spacing: 1.25px;
margin-left: 3px;
opacity: .8;
    @media(max-width: ${variables.large}){
    font-size: 2vw;
}
}`;

const RatingText = styled.div `
opacity: .85;
font-size: 2.5vh;
font-weight: 600;
display: inline-block;
text-transform: uppercase;
text-align: center;
width: 100%;
margin-bottom: 0;
color: var(--white);
@media(max-width: ${variables.large}){
    font-size: 2.5vw;
    line-height: 6vw;
}
`

const ConditionContainer = styled.div `
border-radius: 4px;
background: ${props => (props.rating[0] >= 2 || props.maxBreakingHeight >= 6) && props.rating[1] < 1
    ? 'rgba(229, 135,41, 0.8)'
    : props.rating[0] < 1 || props.maxBreakingHeight <= 2 || props.rating[1] >= 2
        ? 'rgba(183, 32,32, 0.8)'
        : 'rgba(60, 214,82, 0.8)'};

z-index: 1;
box-shadow: 0 2.8px 2.2px rgb(0 0 0 / 3%), 0 6.7px 5.3px rgb(0 0 0 / 5%), 0 12px 8px rgb(0 0 0 / 3%), 0 12px 8px rgb(0 0 0 / 4%), 0 12px 8px rgb(0 0 0 / 3%), 0 12px 8px rgb(0 0 0 / 3%);
@media(max-width: ${variables.large}){
position: absolute;
width: calc(50% - 1.5vh);
height: fit-content;
font-size: 3vw;
line-height: 6vw;
letter-spacing: .2vw;
}
`

const Location = styled.div `
color: var(--white);
font-weight: 500;
display: block;
margin: 0.5vh 0;
text-transform: uppercase;
font-size: 0.75vw;
line-height: 0.85vw;
width: 100%;
letter-spacing: .1vw;
opacity: 0.9;
margin-left: 1.5vh;
@media(max-width: ${variables.large}){
font-size: 2.25vw;
line-height: 2.25vw;
letter-spacing: .25vw;
display: block;
width: fit-content;

}
`
const Distance = styled.div `
color: var(--white);
margin: 0.5vh auto;
font-weight: 500;
display: block;
font-size: 0.5vw;
text-transform: uppercase;
letter-spacing: .1vw;
opacity: 0.8;
margin-left: 1.5vh;
@media(max-width: ${variables.large}){
    font-size: 1.5vw;
    line-height: 2vw;
    letter-spacing: .25vw;
    width: fit-content;
    margin: 0;
}
`

const ChartCol = styled(Col)`
padding-left: 0;
padding-right: 1.5vh;
&:last-child{
    padding-right:0;
}
`;

const MobileRow = styled(Row)`
margin-top: 2.5vw;
`

const CurrDataComponentMultiContainer = styled.div `
width: 7.5vh;
height: 7.5vh;
`
const convertMilesToKM = (km) => {
    const miles = km / 1.609;
    return parseInt(miles);
}
const degToCompass = (num) => {
    const val = Math.floor((num / 22.5) + 0.5);
    const arr = [
        "N",
        "NNE",
        "NE",
        "ENE",
        "E",
        "ESE",
        "SE",
        "SSE",
        "S",
        "SSW",
        "SW",
        "WSW",
        "W",
        "WNW",
        "NW",
        "NNW"
    ];
    return arr[(val % 16)];
}



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
            multiViewSwellForecast: state.surf.multiViewSwellForecast,
            activeSurfSpot: state.surf.activeSurfSpot,
            lat: state.surf.lat,
            lng: state.surf.lng
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
    loadView: openState => dispatch(loadView(openState)),
    getActiveLocation: activeLocation => dispatch(getActiveLocation(activeLocation)),
    getMultiViewForecast: forecast => dispatch(getMultiViewForecast(forecast)),
    getMultiViewSwellForecast: forecast => dispatch(getMultiViewSwellForecast(forecast)),
    getMaxWaveHeightMultiView: waveHeight => dispatch(getMaxWaveHeightMultiView(waveHeight)),
    getActiveSurfSpot: surfSpot => dispatch(getActiveSurfSpot(surfSpot)),
    getLat: lat => dispatch(getLat(lat)),
    getLng: lng => dispatch(getLng(lng))
});

class MultiSpotViewCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeSurfSpot: null,
            lat: null,
            lng: null,
            geoLocationModalClosed: false
        };
    }
    componentDidMount() {
        const { getCloseSurfSpots } = this.props;

        const { getLocationsObject } = this.props;
        getLocationsObject();
        const { searchOpenState } = this.props;
        const { closeSpotsOpenState } = this.props;
        const { getActiveLocation } = this.props;
        const { loadView } = this.props;
    }


    componentDidUpdate(prevProps) {
        if ((prevProps.surf.closeSurfSpots.length > 1) && (prevProps.surf.closeSurfSpots != this.props.surf.closeSurfSpots)) {
            const { getSurfForecast } = this.props;
            const { getTideStations } = this.props;
            const { getWeatherStations } = this.props;
            const { getWeather } = this.props;
            const { getWeatherForecast } = this.props;
            const { getNdbcStations } = this.props;
            const { getMultiViewForecast } = this.props;
            const { getActiveSurfSpot } = this.props;
            const { getLat } = this.props;
            const { getLng } = this.props;

            this
                .props
                .getActiveLocation(this.props.surf.closeSurfSpots[0]);
            this.props.getActiveSurfSpot(this.props.surf.closeSurfSpots[0].spotId);
            this.props.getLat(this.props.surf.closeSurfSpots[0].lat);
            this.props.getLng(this.props.surf.closeSurfSpots[0].lng);
            getSurfForecast(this.props.surf.closeSurfSpots[0].spotId);
            getTideStations(this.props.surf.closeSurfSpots[0]);
            getNdbcStations(this.props.surf.closeSurfSpots[0]);
            getWeatherStations(this.props.surf.closeSurfSpots[0]);
            getWeather(this.props.surf.closeSurfSpots[0]);
            getWeatherForecast(this.props.surf.closeSurfSpots[0]);
            getMultiViewForecast(this.props.surf.closeSurfSpots);


        }
        if (prevProps.surf.hourlyForecast != this.props.surf.hourlyForecast) {
            const { getMaxWaveHeight } = this.props;
            const { getSwellForecast } = this.props;
            const { getWindForecast } = this.props;
            getMaxWaveHeight(this.props.surf.hourlyForecast);
            getSwellForecast(this.props.surf.hourlyForecast);
            getWindForecast(this.props.surf.hourlyForecast);
        }
        if (prevProps.surf.multiViewForecast != this.props.surf.multiViewForecast) {
            const { getMultiViewSwellForecast } = this.props;
            getMultiViewSwellForecast(this.props.surf.multiViewForecast);
        }
        if (prevProps.surf.multiViewSwellForecast != this.props.surf.multiViewSwellForecast) {
            const { getMaxWaveHeightMultiView } = this.props;
            getMaxWaveHeightMultiView(this.props.surf.multiViewSwellForecast);
        }
        if (prevProps.surf.tideStations != this.props.surf.tideStations) {
            const { getTideForecast } = this.props;
            getTideForecast([this.props.surf.tideStations[0], this.props.surf.tideStations[1]]);

        }

        if (prevProps.surf.ndbcStations != this.props.surf.ndbcStations) {
            const { getWaterTemp } = this.props;
            const { getCurrentSwell } = this.props;
            getWaterTemp(this.props.surf.ndbcStations[0]);
            getCurrentSwell(this.props.surf.ndbcStations[0]);
        }
   

    }
   
render(){
    return this.props
        .multiViewSwellForecast
        .map((spot, i) => {

            const getCurrentConditions = (data) => {

                const now = moment.utc().valueOf();
                
                const currentData =  data.filter((d) => {
                    return (d.timeUTC / 1000) < now;
                })
                console.log(currentData)
                return currentData;
            }
            const getFutureConditions = (data) => {

                function addHours(numOfHours, date = new Date()) {
                    date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);
                    return date;
                }

                const filteredArr = data.filter((d) => {
                    const forecastDateObj = new Date(d.timeUTC).getTime();
                    const fullDateToday = Math.floor(Date.now() / 1000) * 1000;
                    const parsedDate = new Date(fullDateToday)
                    const endTime = addHours(16, parsedDate);
                    return forecastDateObj >= fullDateToday && forecastDateObj <= endTime;

                   
                });

                return filteredArr
            }


            let currentMultiViewConditions = getCurrentConditions(spot.swellForecast)[getCurrentConditions(spot.swellForecast).length - 1];
         
            const rating = currentMultiViewConditions ? [currentMultiViewConditions.solidRating, currentMultiViewConditions.fadedRating] : null;
            const finalDeg = spot.currentWeather ? spot.currentWeather.current.wind_deg : currentMultiViewConditions ? currentMultiViewConditions.windDirection + 90 : null;
            const windSpeed = spot.currentWeather ? parseInt(spot.currentWeather.current.wind_speed) : currentMultiViewConditions ? parseInt(currentMultiViewConditions.windSpeed) :null;
            const compassDirection = degToCompass(finalDeg);

            return <CurrentConditionBackdrop key={i}
            
                onClick={() => {
                    this
                        .props
                        .getActiveLocation(spot);
                    this
                        .props
                        .getSurfForecast(spot.spotId);
                    this
                        .props
                        .getWeather(spot);
                    this
                        .props
                        .getWeatherForecast(spot);
                    this
                        .props
                        .getTideStations(spot);
                    this.props.getLat(spot.lat);
                    this.props.getLng(spot.lng);
                    this
                        .props
                        .closeSpotsOpenState(this.props.surf.isCloseSpotsOpen);
                    this.props.loadView(SINGLE_VIEW);
                }}
            >
                
                <ChartRow>
                    <TitleCol xs={12}>
                        <Row>
                            <MultiViewCardColumn xs={6}>
                                <Location>{spot.town}, {spot.country}</Location>
                                <Distance>{convertMilesToKM(spot.distanceFromLocation)}
                                    miles away</Distance>
                                <WaveHeightWrapper>
                                    {console.log(currentMultiViewConditions)}
                                    <p>
                                        {`${currentMultiViewConditions.minBreakingHeight} - ${currentMultiViewConditions.maxBreakingHeight}`}
                                        <span>ft</span>
                                    </p>
                                </WaveHeightWrapper>
                                <ConditionsWrapper>
                                    <ConditionContainer
                                        maxBreakingHeight={currentMultiViewConditions.maxBreakingHeight}
                                        rating={rating}>
                                        <RatingText>{(rating[0] >= 2 || currentMultiViewConditions.maxBreakingHeight >= 6) && rating[1] < 1
                                            ? 'Good'
                                            : rating[0] < 1 || currentMultiViewConditions.maxBreakingHeight <= 2 || rating[1] >= 2
                                                ? 'Poor'
                                                : 'Fair'}
                                        </RatingText>
                                    </ConditionContainer>
                                </ConditionsWrapper>
                            </MultiViewCardColumn>

                            <MultiViewCardColumn xs={6}>
                                <Cell>

                                    <CellCol xs={8}>
                                        <TitleIconRow>
                                            <SwellIcon x="0px" y="0px" viewBox="0 0 100 100">
                                                <SwellSVGPath />
                                            </SwellIcon>
                                            <Title>Swell</Title>

                                        </TitleIconRow>
                                        <PrimarySwell>
                                            <SwellKeyColor><rect width="100%" height="100%" /></SwellKeyColor>{`${currentMultiViewConditions.primaryHeight}ft at ${currentMultiViewConditions.primaryPeriod} from the ${currentMultiViewConditions.primarySwellDirection}`}</PrimarySwell>
                                        {currentMultiViewConditions.secondaryHeight ?
                                            <SecondarySwell>
                                                <SwellKeyColor><rect width="100%" height="100%" /></SwellKeyColor>{`${currentMultiViewConditions.secondaryHeight}ft at ${currentMultiViewConditions.secondaryPeriod} from the ${currentMultiViewConditions.secondarySwellDirection}`}</SecondarySwell> : null}
                                        <SwellKey>
                                            <SwellKeyColor><rect width="100%" height="100%" /></SwellKeyColor><div>Primary</div>
                                            {currentMultiViewConditions.secondaryHeight ? <Fragment><SwellKeyColor><rect width="100%" height="100%" /></SwellKeyColor><div>Secondary</div></Fragment> : null}
                                        </SwellKey>
                                    </CellCol>
                                    <CellCol xs={4}>
                                        <CurrDataComponentMultiContainer>


                                            <SurfMapMultiView
                                                coords={{
                                                    lat: spot.lat,
                                                    lng: spot.lng
                                                }} />


                                        </CurrDataComponentMultiContainer>
                                    </CellCol>
                                </Cell>
                                <Cell>
                                    <CellCol xs={8}>
                                        <TitleIconRow>

                                            <WindIcon x="0px" y="0px" viewBox="0 0 100 100">
                                                <WindIconSVGPath />
                                            </WindIcon>
                                            <Title>Wind</Title>
                                        </TitleIconRow>
                                        <WindData>
                                            {currentMultiViewConditions.windSpeed} {currentMultiViewConditions.windUnit} <span> with gusts of</span> <br></br>{currentMultiViewConditions.windGusts}{currentMultiViewConditions.windUnit} <span>out of the </span>{compassDirection}</WindData>

                                    </CellCol>
                                    <CellCol xs={4}>
                                        <CurrDataComponentMultiContainer>



                                            <CurrWindDataComponentMulti msWindForecast={currentMultiViewConditions} weatherForecast={spot.currentWeather} />

                                        </CurrDataComponentMultiContainer>
                                    </CellCol>
                                </Cell>
                            </MultiViewCardColumn>
                        </Row>
                    </TitleCol>

                </ChartRow>
                <ChartRow>
                    <SwellChartContainer>
                        <ChartCol xs={6}>
                            <SwellBarChartMultiView
                                maxWaveHeight={this.props.maxWaveHeight}
                                forecast={getFutureConditions(spot.swellForecast)} />
                        </ChartCol>
                        <ChartCol xs={6}>
                            <WindBarChartMultiView
                                forecast={getFutureConditions(spot.swellForecast)} />
                        </ChartCol>

                    </SwellChartContainer>
                    {/* <MediaQuery minWidth={Number(variables.largeNum)}>
                <ConditionContainer maxBreakingHeight={props.waveData.maxBreakingHeight} rating={props.rating}>
                    <RatingText>{(props.rating[0] >= 2 || props.waveData.maxBreakingHeight >= 6) && props.rating[1] < 1
                        ? 'Good'
                        : props.rating[0] < 1 || props.waveData.maxBreakingHeight <= 2 || props.rating[1] >= 2
                            ? 'Poor'
                            : 'Fair'}</RatingText>
                </ConditionContainer>
            </MediaQuery> */}
                </ChartRow>
            </CurrentConditionBackdrop>;
        })
    }
    

};


export default connect(mapStateToProps, mapDispatchToProps)(MultiSpotViewCard);