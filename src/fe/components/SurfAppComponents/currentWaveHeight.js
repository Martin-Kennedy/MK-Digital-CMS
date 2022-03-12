import React from 'react';
import styled from 'styled-components'
import {Row} from 'react-bootstrap'

const WaveConditionBackdrop = styled.div`
border-radius: 5px;
background: rgba(255, 255, 255, 0.04);
border: 1px solid rgba(255, 255, 255, 0.15);
border-right-color: rgba(255, 255, 255, 0.07);
border-bottom-color: rgba(255, 255, 255, 0.07);
box-shadow: 0 20px 30px rgba(0, 0, 0, 0.07);
position: relative;
height:  22vh;
padding-top: 5vh;
z-index: 2;
width: calc(23% - 1.25vh);
margin:0 1%;
z-index: 2;
`



const Title = styled(Row)`
p {
    color: var(--white);
opacity: .7;
font-size: 1vw;
margin-left: 15px;
font-weight: 200;
position: relative;
top: -3vh;
height: 0;
margin-bottom: .5vh;
text-transform: uppercase;
}
`
const WaveHeight = styled.div`

p {
color: var(--white);
opacity: .5;
font-size: 2.5vw;
margin-left: 15px;
font-weight: 600;
display: inline-block;
margin-bottom: 0;
text-transform: uppercase;
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

const PeriodAndDirection = styled(WaveHeight)`

    p {
        margin-left: 5px;
        font-size: 1.2vw;
        font-weight: 400;
    }
    span {
        font-size: 1.2vw;
    }
    

    span:first-child {
    margin-left: 15px;
    }

    span:last-child {
    margin-left: 5px;
    font-size: .7vw;
    }
    &::after {
    content: "";
    position: absolute;
    bottom: 0;
    right: -2px;
    border-radius: 5px;
    background-image: linear-gradient(to bottom right,rgba(255,255,255,0), rgba(255,255,255,0), rgba(255,255,255,0), rgba(255,255,255,0), rgba(255,255,255,0), rgba(131,252,229,0.1),rgba(131,252,229, 0.3));
    box-shadow: 0 20px 30px rgb(0 0 0 / 7%);
    height: 22vh;
    padding-top: 5vh;
    z-index: 2;
    width: 100%;
    margin: 0 1%;
    z-index: 0;
    }
`

export const WaveHeightComponent = (props) => {
    let degree = String.fromCodePoint(176)
   return <WaveConditionBackdrop>

           <Title><p>Surf Height</p></Title>
           <WaveHeight><p>{`${props.waveData.swell.minBreakingHeight} - ${props.waveData.swell.maxBreakingHeight}`}</p><span>ft</span></WaveHeight>
           <PeriodAndDirection><span>at</span><p>{props.waveData.swell.components.primary.period}</p><span>s</span><p> {props.waveData.swell.components.primary.compassDirection}</p><span>({parseInt(props.waveData.swell.components.primary.direction)}{degree})</span></PeriodAndDirection>
       
       </WaveConditionBackdrop>
       
};

