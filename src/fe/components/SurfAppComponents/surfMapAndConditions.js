import React, {Fragment} from 'react';
import {Row, Col} from 'react-bootstrap';
import styled from 'styled-components';
import {connect} from 'react-redux'

const StyledMapImg = styled.div`
 border-radius: 5px 5px 15px 15px;
background: rgba(255, 255, 255, 0.04);
border: 1px solid rgba(255, 255, 255, 0.15);
border-right-color: rgba(255, 255, 255, 0.07);
border-bottom-color: rgba(255, 255, 255, 0.07);
z-index: 1;
 box-shadow:
  0 2.8px 2.2px rgba(0, 0, 0, 0.034),
  0 6.7px 5.3px rgba(0, 0, 0, 0.048),
  0 12.5px 10px rgba(0, 0, 0, 0.06),
  0 22.3px 17.9px rgba(0, 0, 0, 0.072),
  0 41.8px 33.4px rgba(0, 0, 0, 0.086),
  0 50px 40px rgba(0, 0, 0, 0.062);
 width: 100%;
 height: 25vh;
 background-size: cover;
 background-repeat: no-repeat;
 background-image: ${props => props.coords ? `url(https://maps.googleapis.com/maps/api/staticmap?center=${props.coords.lat},${props.coords.lng}&zoom=11&size=800x250&style=feature:water|element:all|color:0x55a8e5&key=AIzaSyBj-Wc8m2pdQxlR-YBJLMcgda-3HLJiERw)` : null};
`


const WaterTemp = styled(Col)`
margin-top: 3vh;

p {
color: var(--white);
opacity: .5;
margin-left: 15px;
display: inline-block;
margin-bottom: 0;
line-height: normal;
}
span {
    width: 100%;
    text-align: center;
    font-size: 1vw;
    font-weight: 200;
    color: var(--white);
    margin: 3px 0 10px 0;
    padding: 0;
    opacity: .5;
    letter-spacing: 1.25px;
    margin-left: 3px;
}
`;

const Title = styled.p`
text-transform: uppercase;
opacity: .8;
color: var(--white);
margin-bottom: 1vh;
text-align: left;
font-size: .8vw;

`

const Weather = styled(WaterTemp)`
${Title} {
    padding-left: 0;
}
`

const Conditions = styled(WaterTemp)`
p {
color: var(--white);
opacity: .5;
margin-left: 15px;
display: inline-block;
margin-bottom: 0;
line-height: normal;
}
span {
    width: 100%;
    text-align: center;
    font-size: 1vw;
    font-weight: 200;
    color: var(--white);
    margin: 3px 0 10px 0;
    padding: 0;
    opacity: .5;
    letter-spacing: 1.25px;
    margin-left: 3px;
}
`



const ConditionsContainer = styled(Row)`

`;

const WeatherIcon = styled.div`
 width: 7vh;
 height: 7vh;
 background-size: cover;
 background-repeat: no-repeat;
background-image: ${props => props.icon ? `url(https://www.weatherbit.io/static/img/icons/${props.icon}.png)` : null };
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
            weather: state.surf.weather

        }
    }
}

let degree = String.fromCodePoint(176)

 const SurfMapAndConditions = (props) => {
    return (
        <Fragment>
            <StyledMapImg coords={props.coords}  ></StyledMapImg>
        <ConditionsContainer>
                <Weather>
                    <Row>
                        <Title>Weather</Title>
                    </Row>
                    <Row>
                        {!Array.isArray(props.surf.weather) ? <WeatherIcon icon={props.surf.weather.data[0].weather.icon}></WeatherIcon> : null}
                    </Row>
                </Weather>
                <WaterTemp>
                    <Title>Water Temperature</Title>
                    <p>{parseInt(props.surf.waterTemp) - 2}{degree} - {parseInt(props.surf.waterTemp) + 1}{degree} <span>f</span></p>
                </WaterTemp>
        </ConditionsContainer>
        </Fragment>
        
    )
};

export default connect(mapStateToProps)(SurfMapAndConditions)