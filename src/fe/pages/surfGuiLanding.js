import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import faker from 'faker';
import styled from 'styled-components';
import HeaderComponent from '../components/navigation/header';
import BarChartWithEvent from '../components/SurfAppDataComponents/barChartWithEvent';
import Footer from '../components/footer';
import {getCloseSurfSpots} from '../actions/surfApp.actions';
import { GET_LOCATION_OBJECT, GET_GEO_LOCATION, GET_SPOT_FORECAST, GET_CLOSE_SURFSPOTS } from '../helpers/types'




const SurfGUILadingContainer = styled(Row)`
    background-color: var(--black);
    height: 100vh;
    min-height: 1000px;
    overflow: hide;
`

const BarChartContainer = styled.div`

`


const mapStateToProps = state => {
    return { 
        surf: {
            locations: state.surf.locations,
            geoLocation: {
                latitude: state.surf.geoLocation.latitude,
                longitude: state.surf.geoLocation.longitude
            },
            closeSurfSpots: state.surf.closeSurfSpots,
            forecast: []
        }
    }
}


class SurfGUILanding extends Component {

    componentDidMount(){
        this.props.dispatch({
            type: GET_CLOSE_SURFSPOTS,
            payload: getCloseSurfSpots()
        });
    }


    render() {
        return (
            <SurfGUILadingContainer>
                {console.log(this.props.surf.closeSurfSpots)}
                <Row>
                    <HeaderComponent />
                </Row>
                <Row>
                    <Col sm={2}>
                    </Col>
                    <Col sm={7}>
                        <Row>
                            <Col xs={4}>
                                <BarChartContainer>
                                    <BarChartWithEvent />
                                </BarChartContainer>
                            </Col>
                            <Col xs={4}>
                                <BarChartContainer>
                                    <BarChartWithEvent />
                                </BarChartContainer>
                            </Col>
                            <Col xs={4}>
                                <BarChartContainer>
                                    <BarChartWithEvent />
                                </BarChartContainer>
                            </Col>
                        </Row>
                    </Col>
                    <Col sm={3}>
                    </Col>
                </Row>
                <Footer />
            </SurfGUILadingContainer>

        );
    }
}

export default connect(mapStateToProps)(SurfGUILanding);