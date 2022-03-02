import React, { Component } from 'react';
import { Row, Col, } from 'react-bootstrap';
import { connect } from 'react-redux';
import styled from 'styled-components';
import BarChartWithEvent from '../components/SurfAppComponents/barChartWithEvent';
import { getLocationObject, getInitialSurfForecast, getCloseSurfSpots } from '../actions/surfApp.actions';




const SurfGUILandingContainer = styled(Row)`
    background-color: var(--black);
    height: 100vh;
    min-height: 600px;
    overflow: hide;
`

const BarChartContainer = styled.div`

`

const GlassContainerBkg = styled(Row)`
  background-color: #26262c;
  background-image: linear-gradient(320deg, #26262c 0%, #363741 100%);
  height: 90vh;
  min-height: 600px;
  border-radius: 15px;
  margin-top: 5vh;
`

const LeftNavBkg = styled(Col)`
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
            initialSurfForecast: state.surf.initialSurfForecast
        }
    }
}

const mapDispatchToProps = dispatch => ({
    getCloseSurfSpots: closeSurfSpots => dispatch(getCloseSurfSpots(closeSurfSpots)),
    getInitialSurfForecast: initialSurfForecast => dispatch(getInitialSurfForecast(initialSurfForecast))
});


class SurfGUILanding extends Component {

    componentDidMount(){
        const { getCloseSurfSpots } = this.props;
        getCloseSurfSpots()
    }

    componentDidUpdate(prevProps){
        if(prevProps.surf.closeSurfSpots != this.props.surf.closeSurfSpots){
            const { getInitialSurfForecast } = this.props;
            getInitialSurfForecast(this.props.surf.closeSurfSpots[0].spotId)
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
                        
                        <LeftNavBkg sm={2}>
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
                        <Col>
                                {console.log(this.props)}
                            {/* <Row>
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
                            </Row> */}
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