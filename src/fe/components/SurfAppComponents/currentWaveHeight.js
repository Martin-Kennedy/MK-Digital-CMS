import React from 'react';
import styled from 'styled-components'
import {Row} from 'react-bootstrap'

const WaveConditionBackdrop = styled.div`
    width: 18vh;
    height: 14vh;
    z-index: 5;
&:hover {
    cursor: pointer;
}`

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
}`

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
}`;


const RatingText = styled.div`
    opacity: .85;
    margin-left: 15px;
    margin-top: 1.2vh;
    font-size:1.5vw;
    font-weight: 400;
    display: inline-block;
    margin-bottom: 0;
    line-height: normal;
    color: var(--white);
`

export const CurrWaveDataComponent = (props) => {
   return <WaveConditionBackdrop>
          <Title>
            <p>Surf Height - Quality</p>
          </Title>
          <WaveHeight>
            <p>{`${props.waveData.minBreakingHeight} - ${props.waveData.maxBreakingHeight}`}</p><span>ft</span>
          </WaveHeight>
          <RatingText>{props.rating > 3 ? 'Good' : props.rating <= 2 ? 'Poor' : 'Fair'}</RatingText>
          </WaveConditionBackdrop>
       
};

