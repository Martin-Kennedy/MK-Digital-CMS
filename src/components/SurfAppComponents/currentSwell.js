import React from 'react';
import styled from 'styled-components';
import { Row } from 'react-bootstrap';
import { SwellSVGPath } from '../designElementComponents/swellSVGPath';
import variables from '../../variables.module.scss';


const WaveConditionBackdrop = styled.div`
// border-radius: 5px;
// background: rgba(255, 255, 255, 0.04);
// border: 1px solid rgba(255, 255, 255, 0.15);
// border-right-color: rgba(255, 255, 255, 0.07);
// border-bottom-color: rgba(255, 255, 255, 0.07);
// box-shadow: 0 20px 30px rgba(0, 0, 0, 0.07);
// position: relative;
// height:  22vh;
// padding-top: 5vh;
// z-index: 2;
// width: calc(23% - 1.25vh);
// margin:0 1%;
z-index: 2;
`



const TitleIconRow = styled(Row)`
width: 100%;
display: flex;
justify-content: space-between;
margin: 0;
padding: 0;
position: relative;
top: -3vh;
p {
    padding: 0 0 0 0.8vw;
    margin: 0;
}
svg {
    padding: 0;
    margin: 0 0.4vw 0 0;
}
 @media(max-width:${variables.large}){
    font-size: 2vw;
    margin: 1vw;
    height: 2vw;
    width: calc(100% - 2vw);
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
   padding: 0 0 0 0.8vw;
}
`

const SwellIcon = styled.svg`
    width: 2.25vh;
    height: 2.25vh;
    position: relative;
    top: -2px;
    right: 0;
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
const Primary = styled.div`
margin-top: -2vh;
p {
color: var(--white);
opacity: .5;
margin-left: 15px;
display: inline-block;
margin-bottom: 0;
line-height: normal;
@media(max-width:${variables.large}){
    padding: 0 0 0 0.8vw;
    margin:0;
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
    opacity: .5;
    letter-spacing: 1.25px;
    margin-left: 3px;
    @media(max-width:${variables.large}){
    padding: 0 0 0 0.8vw;
    margin:0;
    }
}
`;

const Secondary = styled(Primary)`
margin-top: 0;
`

const Tertiary = styled(Primary)`
margin-top: 0;
`



const SwellTrain = styled.div`
font-size: 1.5vh;
font-weight: 200;
opacity: 7;
margin: 1vw;
width: calc(100% - 2vw);
`

const SwellTrainPrimary = styled(SwellTrain)`
font-size: 1.5vh;
font-weight: 200;
opacity: 7;
margin-bottom: 0;
margin-top: 0;
`
const SwellData = styled.div`
font-size: 1.7vh;
font-weight: 300;
@media(max-width:${variables.large}){
    padding: 0 0 0 0.8vw;
    margin:0 1vw;
    width: calc(100% - 2vw);
    p {
        padding-left: 0;
    }
    }
`

export const CurrSwellDataComponent = (props) => {
    let degree = String.fromCodePoint(176)
    return <WaveConditionBackdrop>

        
            <TitleIconRow>
                <Title>Swell</Title>
            <SwellIcon x="0px" y="0px" viewBox="0 0 100 100">
                    <SwellSVGPath />
            </SwellIcon>
            </TitleIconRow>
            <Primary>
            <SwellTrainPrimary>
                <p>Primary</p>
            </SwellTrainPrimary> 
            {/* primary swell train */}
            {console.log(props)}
            <SwellData>
                <p>{`${parseFloat(props.ndbcData.waveHeight.toFixed(1))}ft at ${props.ndbcData.dominantPeriod}s from ${props.waveData.components.primary.compassDirection} ${parseInt(props.ndbcData.swellDirection)}${degree}`}</p>
            </SwellData>
           
            </Primary>
        
        {/* secondary swell train */}
        {props.waveData.components.secondary ?
            <Secondary>
                <SwellTrain>
                    <p>Secondary</p>
                </SwellTrain>
                <SwellData>
                    <p>{`${props.waveData.components.secondary.height}ft at ${props.waveData.components.secondary.period}s from ${props.waveData.components.secondary.compassDirection} ${parseInt(props.waveData.components.secondary.direction) - 180}${degree}`}</p>
                </SwellData>
            </Secondary> : null}

        {props.waveData.components.tertiary ?
            <Tertiary>
                <SwellTrain>
                    <p>Tertiary</p>
                </SwellTrain>
                <SwellData>
                    <p>{`${props.waveData.components.tertiary.height}ft at ${props.waveData.components.tertiary.period}s from ${props.waveData.components.tertiary.compassDirection} ${parseInt(props.waveData.components.tertiary.direction - 180)}${degree}`}</p>
                </SwellData>
            </Tertiary> : null}
        
        

    </WaveConditionBackdrop>

};

