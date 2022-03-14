import React from 'react';
import styled from 'styled-components'
import {Row} from 'react-bootstrap'

const WaveConditionBackdrop = styled.div`
width: 18vh;
height: 14vh;
z-index: 5;
&:hover {
    cursor: pointer;
}
`



const Title = styled(Row)`
p {
color: var(--white);
opacity: .7;
font-size: 1.5vh;
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

opacity: .5;
 ${WaveConditionBackdrop}:hover & {
       opacity: 1;
    }
p {
color: var(--white);

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
    // &::after {
    // content: "";
    // position: absolute;
    // bottom: 0;
    // right: -2px;
    // border-radius: 5px;
    // background-image: linear-gradient(to bottom right,rgba(255,255,255,0), rgba(255,255,255,0), rgba(255,255,255,0), rgba(255,255,255,0), rgba(255,255,255,0), rgba(131,252,229,0.1),rgba(131,252,229, 0.3));
    // box-shadow: 0 20px 30px rgb(0 0 0 / 7%);
    // height: 22vh;
    // padding-top: 5vh;
    // z-index: 2;
    // width: 100%;
    // margin: 0 1%;
    // z-index: 0;
    // }
`

export const CurrWaveDataComponent = (props) => {
    let degree = String.fromCodePoint(176)
   return <WaveConditionBackdrop>

           <Title><p>Surf Height</p></Title>
           <WaveHeight><p>{`${props.waveData.minBreakingHeight} - ${props.waveData.maxBreakingHeight}`}</p><span>ft</span></WaveHeight>
           <PeriodAndDirection><span>at</span><p>{props.waveData.components.primary.period}</p><span>s</span><p> {props.waveData.components.primary.compassDirection}</p><span>({parseInt(props.waveData.components.primary.direction)}{degree})</span></PeriodAndDirection>
       
       </WaveConditionBackdrop>
       
};

