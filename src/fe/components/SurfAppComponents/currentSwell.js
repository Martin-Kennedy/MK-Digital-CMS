import React from 'react';
import styled from 'styled-components'
import { Row } from 'react-bootstrap'

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
const Primary = styled.div`

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

const Secondary = styled(Primary)`

`

const Tertiary = styled(Primary)`

`



const SwellTrain = styled(Row)`
font-size: 1.5vh;
font-weight: 200;
opacity: 7;
margin-bottom: 4px;
margin-top: 1.5vh;
`

const SwellTrainPrimary = styled(SwellTrain)`
font-size: 1.5vh;
font-weight: 200;
opacity: 7;
margin-bottom: 0;
margin-top: 0;
`
const SwellData = styled(Row)`
font-size: 1.7vh;
font-weight: 300;
`

export const CurrSwellDataComponent = (props) => {
    let degree = String.fromCodePoint(176)
    return <WaveConditionBackdrop>

        <Title><p>Swells</p></Title>
        <Primary>
            <SwellTrainPrimary>
                <p>Primary</p>
            </SwellTrainPrimary> 
            {/* primary swell train */}
            <SwellData>
                <p>{`${props.waveData.components.primary.height}ft at ${props.waveData.components.primary.period}s from ${props.waveData.components.primary.compassDirection} ${parseInt(props.waveData.components.primary.direction)}${degree}`}</p>
            </SwellData>
           
        </Primary>
        
        {/* secondary swell train */}
        {props.waveData.components.secondary ?
            <Secondary>
                <SwellTrain>
                    <p>Secondary</p>
                </SwellTrain>
                <SwellData>
                    <p>{`${props.waveData.components.secondary.height}ft at ${props.waveData.components.secondary.period}s from ${props.waveData.components.secondary.compassDirection} ${parseInt(props.waveData.components.secondary.direction)}${degree}`}</p>
                </SwellData>
            </Secondary> : null}

        {props.waveData.components.tertiary ?
            <Tertiary>
                <SwellTrain>
                    <p>Tertiary</p>
                </SwellTrain>
                <SwellData>
                    <p>{`${props.waveData.components.tertiary.height}ft at ${props.waveData.components.tertiary.period}s from ${props.waveData.components.tertiary.compassDirection} ${parseInt(props.waveData.components.tertiary.direction)}${degree}`}</p>
                </SwellData>
            </Tertiary> : null}
        
        

    </WaveConditionBackdrop>

};

