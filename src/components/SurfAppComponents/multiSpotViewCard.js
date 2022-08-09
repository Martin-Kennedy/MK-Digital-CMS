import React from 'react';
import styled from 'styled-components'
import {Row, Col} from 'react-bootstrap'
import {WaveConditionsSVGPath} from '../designElementComponents/waveConditionsSVGPath';
import variables from '../../variables.module.scss';
import SwellBarChartMultiView from './swellForecastBarChartMultiView';
import MediaQuery from 'react-responsive';

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

const CurrentConditionBackdrop = styled(BackDrop)`
width: calc(33% - 1.35vw);
height: calc(25vh - 2vh - (10vh/5));
margin:0 0.5vw 2vh 0.5vw;
display: inline-flex;
flex-direction: column;
@media(max-width: ${variables.large}){
    width: calc(50% - 1.5vw);
    height: calc(50vw - 1.5vw);
    margin: 0 1vw 1vw .5vw 
}
`

const TitleIconRow = styled(Row)`
width: 100%;
display: flex;
justify-content: space-between;
margin: 0;
padding: 0;
height: 4vh;
margin-bottom: .5vh;

@media(max-width: ${variables.large}){
    position: unset;
    margin: 1vw 0 1vw 0.5vw;
    height: 2vw;
    width: calc(100% - 1vw);
}
`
const TitleCol = styled(Col)``;

const WaveDataCol = styled(Col)`
color: rgba(255, 255, 255, 0.8);
p {
margin-left: 0;
margin-top: 0;
display: inline-block;
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
    display: inline-block;
    margin-left: .5vw;
}`;

const Title = styled.p `
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

const WaveIcon = styled.svg `
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

const SwellChartContainer = styled(Row)`
opacity: .8;
height: 9vh;
width: 50%;
position: absolute;
margin: 0;
bottom: 0;
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
const PeriodAndDirection = styled.div `
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
const ConditionContainer = styled.div `
border-radius: 4px;
background: ${props => (props.rating[0] >= 2 || props.maxBreakingHeight >= 6) && props.rating[1] < 1
    ? 'rgba(229, 135,41, 0.8)'
    : props.rating[0] < 1 || props.maxBreakingHeight <= 2 || props.rating[1] >= 2
        ? 'rgba(183, 32,32, 0.8)'
        : 'rgba(60, 214,82, 0.8)'};

z-index: 1;
box-shadow: 0 2.8px 2.2px rgb(0 0 0 / 3%), 0 6.7px 5.3px rgb(0 0 0 / 5%), 0 12px 8px rgb(0 0 0 / 3%), 0 12px 8px rgb(0 0 0 / 4%), 0 12px 8px rgb(0 0 0 / 3%), 0 12px 8px rgb(0 0 0 / 3%);
width: 10vw;
height: 4vh;
margin: 0 auto;
position: absolute;
bottom: -25%;
left: calc(50% - 5vw);
@media(max-width: ${variables.large}){
position: unset;
width: calc(100% - 1vw);
height: 6vw;
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

const MobileRow = styled(Row)`
margin-top: 2.5vw;
`

export const MultiSpotViewCard = (props) => {

    const convertMilesToKM = (km) => {
        const miles = km / 1.609;
        return parseInt(miles);
    }

    return props
        .swellForecast
        .map((spot) => {
            const getCurrentConditions = (data) => {
                const now = Date.now() / 1000 | 0;
                return data.filter((d) => {
                    return (d.localTime / 1000) < now;
                })
            }
            const getFutureConditions = (data) => {

                function addHours(numOfHours, date = new Date()) {
                    date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);
                    return date;
                }

                return data.filter((d) => {
                    const forecastDateObj = new Date(d.localTime).getTime();
                    const fullDateToday = Math.floor(Date.now() / 1000) * 1000;
                    const parsedDate = new Date(fullDateToday)
                    const endTime = addHours(27, parsedDate);
                    return forecastDateObj >= fullDateToday && forecastDateObj <= endTime;
                })
            }

            let currentMultiViewConditions = getCurrentConditions(spot.swellForecast)[getCurrentConditions(spot.swellForecast).length - 1];

            return <CurrentConditionBackdrop>
                <TitleIconRow>
                    <TitleCol xs={7}>
                        <Location>{spot.town}, {spot.country}</Location>
                        <Distance>{convertMilesToKM(spot.distanceFromLocation)}
                            miles away</Distance>
                    </TitleCol>
                    <WaveDataCol xs={4}>
                        <p>{`${currentMultiViewConditions.minBreakingHeight} - ${currentMultiViewConditions.maxBreakingHeight}`}</p>
                        <span>ft</span>
                    </WaveDataCol>
                </TitleIconRow>
                <SwellChartContainer>

                    <SwellBarChartMultiView maxWaveHeight={props.maxWaveHeight}
                    forecast={getFutureConditions(spot.swellForecast)}/>
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
            </CurrentConditionBackdrop>
        })

};
