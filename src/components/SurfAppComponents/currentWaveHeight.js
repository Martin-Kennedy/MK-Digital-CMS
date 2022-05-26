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

    @media(max-width: ${variables.large}){
        width: 100%;
        height: 100%;
        z-index: 5;
        text-align: left;
        margin: 0 2vw;
    }
    `

const TitleIconRow = styled(Row)`
width: 100%;
display: flex;
justify-content: space-between;
margin: 0;
padding: 0;
position: relative;
top: -3vh;
    @media(max-width: ${variables.large}){
        position: unset;
        height: calc(25% - 4vw);
        margin: 2vw 0;
    }
`

const Title = styled.p`
text-transform: uppercase;
color: rgba(255, 255, 255, 0.8);
margin-left: 0;
margin-top: 0;
display: block;
margin-bottom: 1vh;
width: auto;
font-size: .75vw;
height: fit-content;
line-height: .65vw;
  @media(max-width: ${variables.large}){
        font-size: 1.5vw;
        line-height: 1.5vw;
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
        width: 1.5rem;
        height: 1.5rem;
        position: relative;
        top: 0;
        right: 0.5rem;
    }
`
const Location = styled.div`
    color: var(--white);
    margin: 10px 0 0 15px;
    font-weight: 500;
    display: block;
    margin: 0 auto;
    text-transform: uppercase;
      font-size: 0.75vw;
    line-height: 1vw;
    letter-spacing: .1vw;
        opacity: 0.8;
    @media(max-width: ${variables.large}){
    font-size: 2.5vw;
    line-height: 4vw;
    letter-spacing: .25vw;
    display: inline-block;
    width: fit-content;
    }
`
const Distance = styled.div`
    color: var(--white);
    margin: 10px 0 0 15px;
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
    }
    
    
`
const WaveHeight = styled.div `
    opacity: .8;
margin-top: -2vh;
p {
    color: var(--white);
    font-size: 2.75vw;
    margin: 0 0 0 15px;
    font-weight: 600;
    display: inline-block;
    margin-bottom: 0;
    text-transform: uppercase;
    line-height: 3.25vw;
    opacity: .8;
    @media(max-width: ${variables.large}){
        font-size: 7vw;
        line-height: 7vw;
        margin: 1vw auto;
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
    font-size:2.5vh;
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
    ? 'rgba(229, 135,41, 0.8)' : props.rating[0] < 1 || props.maxBreakingHeight <= 2 || props.rating[1] >= 2
        ? 'rgba(183, 32,32, 0.8)'
        : 'rgba(60, 214,82, 0.8)'};

    z-index: 1;
    box-shadow: 0 2.8px 2.2px rgb(0 0 0 / 3%), 0 6.7px 5.3px rgb(0 0 0 / 5%), 0 12px 8px rgb(0 0 0 / 3%), 0 12px 8px rgb(0 0 0 / 4%), 0 12px 8px rgb(0 0 0 / 3%), 0 12px 8px rgb(0 0 0 / 3%);
    width: 18.25vh;
    height: 4vh;
    margin: 0 auto;
     @media(max-width: ${variables.large}){
        width: 50%;
        height: 6VW;
    }
`

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
                <Row>
                <Col xs={5}>
                <Location>{props.surfSpot.town}, {props.surfSpot.countryOrState}</Location>
                <Distance>{convertMilesToKM(props.surfSpot.distanceFromLocation)} miles away</Distance>
                </Col>
                    <Col xs={5}>
                <p>{`${props.waveData.minBreakingHeight} - ${props.waveData.maxBreakingHeight}`}</p>
                <span>ft</span>
                </Col>
                <Col xs={2}>
                        <ConditionContainer maxBreakingHeight={props.waveData.maxBreakingHeight} rating={props.rating}>
                            <RatingText>{(props.rating[0] >= 2 || props.waveData.maxBreakingHeight >= 6) && props.rating[1] < 1
                                ? 'Good'
                                : props.rating[0] < 1 || props.waveData.maxBreakingHeight <= 2 || props.rating[1] >= 2
                                    ? 'Poor'
                                    : 'Fair'}</RatingText>
                        </ConditionContainer>
                </Col>
                </Row>
            </MediaQuery>
        </WaveHeight>
        <MediaQuery minWidth={Number(variables.largeNum)}>
        <ConditionContainer maxBreakingHeight={props.waveData.maxBreakingHeight} rating={props.rating}>
            <RatingText>{(props.rating[0] >= 2 || props.waveData.maxBreakingHeight >= 6) && props.rating[1] < 1
                    ? 'Good'
                : props.rating[0] < 1 || props.waveData.maxBreakingHeight <= 2 || props.rating[1] >= 2
                        ? 'Poor'
                        : 'Fair'}</RatingText>
        </ConditionContainer>
        </MediaQuery>
    </WaveConditionBackdrop>

};
