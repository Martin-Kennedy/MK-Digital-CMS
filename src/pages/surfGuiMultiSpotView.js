import React, {Component, Fragment} from 'react';
import {Row, Col} from 'react-bootstrap';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {motion} from "framer-motion";
import {FadeInWhenVisibleOpacity} from '../helpers/fadeInOnViewport';
import SwellBarChart from '../components/SurfAppComponents/swellForecastBarChart';
import WindBarChart from '../components/SurfAppComponents/windForecastBarChart';
import {
    closeSpotsOpenState,
    searchOpenState,
    loadView } from '../actions/surfApp.actions';
import {CurrWaveDataComponent} from '../components/SurfAppComponents/currentWaveHeight';
import {CurrWindDataComponent} from '../components/SurfAppComponents/currentWind';
import {CurrSwellDataComponent} from '../components/SurfAppComponents/currentSwell';
import CurrentTideDataComponent from '../components/SurfAppComponents/currentTide';
import  MultiSpotViewCard  from '../components/SurfAppComponents/multiSpotViewCard';
import SurfSpotsSearchFilter from '../components/SurfAppComponents/autoSuggest';
import {SpotSearchSVGPath} from '../components/designElementComponents/spotSearchSVGPath';
import {CloseSpotsSVGPath} from '../components/designElementComponents/closeSpotsSVGPath';
import {HomeIconSVGPath} from '../components/designElementComponents/homeIconSVGPath';
import { MultiSpotsSVGPath } from '../components/designElementComponents/multiSpotsSVGPath';
import {CloseButtonSVGPath} from '../components/designElementComponents/closeButtonSVGPath';
import MediaQuery from 'react-responsive';
import variables from '../variables.module.scss';
import {Link} from 'react-router-dom';

const SurfGUIMultiSpotViewContainer = styled(Row)`
height: 100%;
min-height: 600px;
z-index: 1;
padding-right: 3vw;
margin: 5vh 0;
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





const CloseSpotIconContainer = styled(SpotSearchContainer)`
margin-left: 72%;
margin-right: 7%;
`

const CloseSpotIconContainerDesktop = styled(SpotSearchContainer)`
`

const MultiCardColumn = styled(Col)`
@media(max-width: ${variables.large}){
    margin-top: 25px;
}
`

const MultiCardRow = styled(Row)`
padding-right: calc(var(--bs-gutter-x) * .15);
width: inherit;
`



const mapStateToProps = state => {
    return {
        initialUtility: {
            session: state.initialUtility.session,
            keystoneToken: state.initialUtility.keystoneToken
        },
        surf: {
            surfApiEndPoints: state.surf.surfApiEndPoints,
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
            maxMultiViewWaveHeight: state.surf.maxMultiViewWaveHeight,
        }
    }
}


const convertMilesToKM = (km) => {
    const miles = km / 1.609;
    return parseInt(miles);
}

class SurfGUIMultiSpotView extends Component {

    constructor(props) {
        super(props);

    }

    componentDidMount(){
        document
            .body
            .classList
            .add('surf-app-multi-view');
    }
    componentWillUnmount() {
        document
        .body
            .classList
            .remove('surf-app-multi-view');
    }


    componentDidUpdate(prevProps) {
      
        if (window.innerWidth < Number(variables.largeNum)) {
            if (this.props.surf.isSearchOpen || this.props.surf.isCloseSpotsOpen) {
                document.body.style.overflow = "hidden";
            } else {
                document.body.style.overflow = "overlay";
            }
        }

    }

    render() {
        // const rating = [this.props.surf.currentConditions.solidRating, this.props.surf.currentConditions.fadedRating];

        return (
            <SurfGUIMultiSpotViewContainer>
                {this.props.surf.multiViewSwellForecast ? 
                <Fragment>
                        <MediaQuery maxWidth={variables.large}>
                            {console.log(this.props)}
                            <DataDashboardRowMenuMobile>
                                <MenuNavBkgMobile >
                                    <HomeIconContainer to={`/`}>
                                        <HomeIcon x="0px" y="0px" viewBox="0 0 100 100">
                                            <HomeIconSVGPath />

                                        </HomeIcon>
                                    </HomeIconContainer>
                                    <SpotSearchContainer
                                        onClick={() => this.props.dispatch(loadView(MULTI_VIEW))}>
                                        <SpotSearchIcon x="0px" y="0px" viewBox="0 0 100 100">
                                            <MultiSpotsSVGPath />
                                        </SpotSearchIcon>
                                    </SpotSearchContainer>
                                    <CloseSpotIconContainer
                                        onClick={() => this.props.dispatch(closeSpotsOpenState(this.props.surf.isCloseSpotsOpen))}>
                                        <CloseSpotIcon x="0px" y="0px" viewBox="0 0 100 100">
                                            <CloseSpotsSVGPath />
                                        </CloseSpotIcon>
                                    </CloseSpotIconContainer>
                                    <SpotSearchContainer
                                        onClick={() => this.props.dispatch(searchOpenState(this.props.surf.isSearchOpen))}>
                                        <SpotSearchIcon x="0px" y="0px" viewBox="0 0 100 100">
                                            <SpotSearchSVGPath />
                                        </SpotSearchIcon>
                                    </SpotSearchContainer>
                                </MenuNavBkgMobile>
                            </DataDashboardRowMenuMobile>
                        </MediaQuery>
                        <MultiCardRow>
                        <MultiCardColumn md={12} lg={11}>
                            <MultiSpotViewCard maxWaveHeight={this.props.surf.maxMultiViewWaveHeight} multiViewSwellForecast={this.props.surf.multiViewSwellForecast} multiViewForecast={this.props.surf.multiViewForecast} />
                        </MultiCardColumn>
                        <MediaQuery minWidth={variables.large}>
                <Col  md={1}></Col>
                        </MediaQuery>
                        </MultiCardRow>
                </Fragment> : null
    }

            </SurfGUIMultiSpotViewContainer>

        );
    }
}

export default connect(mapStateToProps)(SurfGUIMultiSpotView);