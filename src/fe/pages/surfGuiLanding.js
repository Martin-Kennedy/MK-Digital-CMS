import React, { Component } from 'react';
import { Row, Col, } from 'react-bootstrap';
import { connect } from 'react-redux';
import styled from 'styled-components';
import SwellBarChart from '../components/SurfAppComponents/swellBarChart';
import { getLocationObject, getSurfForecast, getCloseSurfSpots, getSwellForecast } from '../actions/surfApp.actions';




const SurfGUILandingContainer = styled(Row)`
    background-color: var(--black);
    height: 100vh;
    min-height: 600px;
    overflow: hide;
`

const BarChartContainer = styled.div`
width: 100%;
display: flex;
flex-direction: row;
`

const GlassContainerBkg = styled(Row)`
  background-color: #26262c;
  background-image: linear-gradient(320deg, #26262c 0%, #363741 100%);
  height: 90vh;
  min-height: 600px;
  border-radius: 15px;
  margin-top: 5vh;
`

const LeftNavBkg = styled.div`
  margin-top: 2vh;
  margin-left: 2vh;
  height: 86vh;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(2px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-right-color: rgba(255, 255, 255, 0.1);
  border-bottom-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.1);
  padding: 15px;
  position: relative;
  ul {
      margin-left: 0;
      padding-left: 0;
  }
`

const Title = styled(Row)`
p {
    width: 100%;
    text-align: center;
    font-size: 18px;
    font-weight: 400;
    color: var(--white);
    margin-bottom: 0;
    padding: 0;
}
span {
    width: 100%;
    text-align: center;
    font-size: 12px;
    font-weight: 400;
    color: #7a7b7b;
    margin: 3px 0 10px 0;
    padding: 0;
}
`

const SurfSpot = styled.li`
color: #8a8b8b;
width: 100%;
      text-align: center;
      font-weight: 400;
      font-size: 14px;
      margin-top: 3px;
`


const mapStateToProps = state => {
    return { 
        surf: {
            locations: state.surf.locations,
            closeSurfSpots: state.surf.closeSurfSpots,
            closestSurfSpot: state.surf.closestSurfSpot,
            hourlyForecast: state.surf.hourlyForecast,
            currentConditions: state.surf.currentConditions,
            swellForecast: state.surf.swellForecast,
            maxWaveHeightInForecast: state.surf.maxWaveHeightInForecast
        }
    }
}

const mapDispatchToProps = dispatch => ({
    getCloseSurfSpots: closeSurfSpots => dispatch(getCloseSurfSpots(closeSurfSpots)),
    getSurfForecast: surfForecast => dispatch(getSurfForecast(surfForecast)),
    getSwellForecast: swellForecast => dispatch(getSwellForecast(swellForecast))
});


class SurfGUILanding extends Component {

    componentDidMount(){
        const { getCloseSurfSpots } = this.props;
        getCloseSurfSpots()
    }

    componentDidUpdate(prevProps){
        if(prevProps.surf.closeSurfSpots != this.props.surf.closeSurfSpots){
            const { getSurfForecast } = this.props;
            getSurfForecast(this.props.surf.closeSurfSpots[0].spotId)
        }
        if (prevProps.surf.hourlyForecast != this.props.surf.hourlyForecast) {
            const { getSwellForecast } = this.props;
            getSwellForecast(this.props.surf.hourlyForecast)
        }
        

    }
    


    render() {
        
        return (
            <SurfGUILandingContainer>
                <Row>
                    <Col sm={1}>
                    </Col>
                    <Col sm={10}>
                    <GlassContainerBkg>
                        {console.log(this.props.surf.hourlyForecast)}
                            <Col sm={2}>
                        <LeftNavBkg >
                            <Title>
                            <p>Surf Spots Near You</p>
                            <span>within a 100km radius</span>
                            </Title>
                            <Row>
                            <ul>
                                    {this.props.surf.closeSurfSpots.map((surfSpot, index) => { return <SurfSpot key={index}>{surfSpot.town}</SurfSpot> })}
                            </ul>
                            </Row>
                        </LeftNavBkg>
                            </Col>
                        <Col sm={10}>
                                <SwellBarChart maxWaveHeightInForecast={this.props.surf.maxWaveHeightInForecast + 2} forecast={this.props.surf.swellForecast} />
                        </Col>
                              
                        
                    </GlassContainerBkg>
                    </Col>
                    <Col sm={1}>
                    </Col>
                </Row>
            </SurfGUILandingContainer>

        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SurfGUILanding);