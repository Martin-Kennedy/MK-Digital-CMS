import React, {Component, Fragment} from 'react';
import {Row, Col} from 'react-bootstrap';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {motion} from "framer-motion";
import {FadeInWhenVisibleOpacity} from '../helpers/fadeInOnViewport';
import SwellBarChart from '../components/SurfAppComponents/swellForecastBarChart';
import WindBarChart from '../components/SurfAppComponents/windForecastBarChart';
import {
    getWeather,
    getWeatherForecast,
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
z-index: 1;
padding-right: 3vw;
margin: 5vh 0;
`




const mapStateToProps = state => {
    return {
        surf: {
            multiViewForecast: state.surf.multiViewForecast,
            multiViewSwellForecast: state.surf.multiViewSwellForecast

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



    componentDidUpdate(prevProps) {
        if (prevProps.surf.closeSurfSpots != this.props.surf.closeSurfSpots) {


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
        // const rating = [this.props.surf.currentConditions.solidRating, this.props.surf.currentConditions.fadedRating];

        return (
            <SurfGUIMultiSpotViewContainer>
                {console.log(this.props.surf.multiViewSwellForecast)}
                {this.props.surf.multiViewSwellForecast ? 
                <Fragment>
                <Col md={11}>
                            <MultiSpotViewCard swellForecast={this.props.surf.multiViewSwellForecast} multiViewForecast={this.props.surf.multiViewForecast} />
                </Col>
                <Col md={1}></Col>
                </Fragment> : null
    }

            </SurfGUIMultiSpotViewContainer>

        );
    }
}

export default connect(mapStateToProps)(SurfGUIMultiSpotView);