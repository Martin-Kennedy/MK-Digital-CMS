import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import faker from 'faker';
import styled from 'styled-components';
import HeaderComponent from '../components/navigation/header';
import BarChartWithEvent from '../components/SurfAppDataComponents/barChartWithEvent';
import Footer from '../components/footer';
import {getCloseSurfSpots} from '../actions/surfApp.actions';




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
            towns: [],
            countries: [],
            forecast: []
        }
    }
}


class SurfGUILanding extends Component {

    componentDidMount(){
        getCloseSurfSpots();
    }


    render() {
        return (
            <SurfGUILadingContainer>
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