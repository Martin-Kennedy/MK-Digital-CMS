import React from 'react';
import styled from 'styled-components'
import {Row, Col} from 'react-bootstrap'
import { WaveConditionsSVGPath } from '../designElementComponents/waveConditionsSVGPath';
import variables from '../../variables.module.scss';
import MediaQuery from 'react-responsive';

const WaveConditionBackdrop = styled.div `
width: 100%;
height: 14vh;
z-index: 5;
margin: 0 auto;
text-align: center;
position: relative;
top: -3vh;
@media(max-width: ${variables.large}){
    width: calc(100% - 3vw);
    height: 100%;
    z-index: 5;
    text-align: left;
    margin: 0 1vw 0 2vw;
    position: unset;
}
`

const TitleIconRow = styled(Row)`
width: 100%;
display: flex;
justify-content: space-between;
margin: 0;
padding: 0;

@media(max-width: ${variables.large}){
    position: unset;
    margin: 1vw 0 1vw 0.5vw;
    height: 2vw;
    width: calc(100% - 1vw);
}
`

const Title = styled.p`
text-transform: uppercase;
color: rgba(255, 255, 255, 0.6);
margin-left: 0;
margin-top: 0;
display: block;
margin-bottom: 1vh;
width: auto;
font-size: .75vw;
height: fit-content;
line-height: .65vw;
@media(max-width:${variables.large}){
   font-size: 2vw;
   line-height: 2vw;
   padding: 0;
}
`

const WaveIcon = styled.svg`
width: 2.25vh;
height: 2.25vh;
position: relative;
top: -2px;
right: 0.5vw;
padding: 0;
path {
    fill: rgba(255,255,255, 0.4);
}

@media(max-width: ${variables.large}){
    height: 3vw;
    width: 3vw;
    position: unset;
}
`

const WaveHeight = styled.div `
opacity: .8;
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
width: 100%;
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
const PeriodAndDirection = styled.div`
color: var(--white);
opacity: 0.8;
line-height: 2.5vw;
text-transform: uppercase;
font-size: 2vw;
font-weight: 500;
letter-spacing: 0.125vw;
`
const WaveHeightCol = styled(Col)`
padding: 0 1vw;
width: fit-content;
flex: inherit;
margin-left: 1.5vw;
`
const ConditionContainer = styled.div`
border-radius: 4px;
padding: 0 5px;
background: ${props => getRatingColor(props.waveData, props.rating)};
z-index: 1;
box-shadow: 0 2.8px 2.2px rgb(0 0 0 / 3%), 0 6.7px 5.3px rgb(0 0 0 / 5%), 0 12px 8px rgb(0 0 0 / 3%), 0 12px 8px rgb(0 0 0 / 4%), 0 12px 8px rgb(0 0 0 / 3%), 0 12px 8px rgb(0 0 0 / 3%);
min-width: 10vw;
max-width: fit-content;
height: 4vh;
margin: 0 auto;
position: absolute;
bottom: -25%;
left: calc(50% - 5vw);
@media(max-width: ${variables.large}){
position: unset;
min-width: calc(100% - 1vw);
height: 6vw;
font-size: 3vw;
line-height: 6vw;
letter-spacing: .2vw;
max-width: fit-content;
}
`

const Location = styled.div`
color: var(--white);
font-weight: 500;
display: block;
margin: 0.5vh auto;
text-transform: uppercase;
font-size: 0.75vw;
line-height: 0.85vw;
width: 90%;
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
`
const Distance = styled.div`
color: var(--white);
margin: 0.5vh auto;
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
    margin: 0;
}
`

const MobileRow = styled(Row)`
margin-top: 2.5vw;
`

const getRatingText = (currentConditions) => {
    console.log((currentConditions.waveData.minBreakingHeight >= 4 && currentConditions.rating[1] <= 2));

    if (currentConditions.waveData.minBreakingHeight >= 5 && currentConditions.rating[1] < 1) {
        return 'Very Good';
    }

    else if (currentConditions.waveData.minBreakingHeight >= 3 && currentConditions.waveData.maxBreakingHeight >= 5 && currentConditions.rating[1] < 1) {
        return 'Good';
    }

    else if (currentConditions.waveData.minBreakingHeight >= 2 && currentConditions.waveData.maxBreakingHeight === 4 && currentConditions.rating[1] <= 2) {
        return 'Fair - Good';
    }

    else if (currentConditions.waveData.minBreakingHeight >= 2 && currentConditions.waveData.maxBreakingHeight >= 3 && currentConditions.rating[1] <= 3) {
        return 'Fair';
    }

    else if ((currentConditions.waveData.minBreakingHeight >= 1 && currentConditions.waveData.maxBreakingHeight <= 3) && currentConditions.rating[1] <= 3) {
        return 'Poor - Fair';
    }

    else if ((currentConditions.waveData.minBreakingHeight >= 0 && currentConditions.waveData.maxBreakingHeight <= 2) || currentConditions.rating[1] >= 3) {
        return 'Poor';
    }

    else if (currentConditions.waveData.maxBreakingHeight <= 1) {

        return 'None';
    }
    else {
        return 'None';
    }

}

const getRatingColor = (currentConditions, ratingData) => {

    if (currentConditions.minBreakingHeight >= 5 && ratingData[1] < 1) {
        return '#DB2A05';
    }

    else if (currentConditions.minBreakingHeight >= 3 && currentConditions.maxBreakingHeight >= 5 && ratingData[1] < 1) {
        return '#DB6300';
    }

    else if (currentConditions.minBreakingHeight >= 2 && currentConditions.maxBreakingHeight === 4 && ratingData[1] <= 2) {
        return '#E6D600';
    }

    else if (currentConditions.minBreakingHeight >= 2 && currentConditions.maxBreakingHeight >= 3 && ratingData[1] <= 3) {
        return '#39CC4F';
    }

    else if (currentConditions.minBreakingHeight >= 1 && currentConditions.maxBreakingHeight <= 3 && ratingData[1] <= 3) {
        return '#34B3E3';
    }

    else if ((currentConditions.minBreakingHeight >= 0 && currentConditions.maxBreakingHeight <= 2) || ratingData[1] >= 3) {
        return '#6D32D9';
    }

    else if (currentConditions.maxBreakingHeight <= 1) {
        return '#bbb';
    }
    else {
        return '#bbb';
    }

}


export const CurrWaveDataComponent = (props) => {
    const convertMilesToKM = (km) => {
       const miles = props.surfSpot.distanceFromLocation / 1.609;
       return parseInt(miles);
    }
    return <WaveConditionBackdrop>
            <TitleIconRow>
                <Title>Conditions</Title>
                <WaveIcon x="0px" y="0px" viewBox="0 0 100 100">
                    <WaveConditionsSVGPath />
                </WaveIcon>
            </TitleIconRow>
            <WaveHeight>
            <MediaQuery minWidth={Number(variables.largeNum)}>
            <Location>{props.surfSpot.town}, {props.surfSpot.countryOrState}</Location>
            <Distance>{convertMilesToKM(props.surfSpot.distanceFromLocation)} miles away</Distance>
            <p>{`${props.waveData.minBreakingHeight} - ${props.waveData.maxBreakingHeight}`}</p>
            <span>ft</span>
            </MediaQuery>
            <MediaQuery maxWidth={Number(variables.largeNum)}>
                <MobileRow>
                <Col xs={6}>
                <Row>
                    <WaveHeightCol>
                    <p>{`${props.waveData.minBreakingHeight} - ${props.waveData.maxBreakingHeight}`}</p>
                    <span>ft</span>
                    </WaveHeightCol>
                    <WaveHeightCol>
                    <PeriodAndDirection>At {props.waveData.components.combined.period} seconds</PeriodAndDirection>
                    <PeriodAndDirection>from the {props.waveData.components.combined.compassDirection}</PeriodAndDirection>
                    </WaveHeightCol>
                        </Row>
                </Col>
                <Col xs={6}>
                <ConditionContainer waveData={props.waveData} rating={props.rating} >
                            <RatingText>{getRatingText(props)}
                    </RatingText>
                </ConditionContainer>
                </Col>
                </MobileRow>
            </MediaQuery>
        </WaveHeight>
        <MediaQuery minWidth={Number(variables.largeNum)}>
            <ConditionContainer waveData={props.waveData} rating={props.rating} >
                <RatingText>{getRatingText(props)}
                </RatingText>
            </ConditionContainer>
        </MediaQuery>
    </WaveConditionBackdrop>

};
