import React from 'react';
import styled from 'styled-components'
import {Row} from 'react-bootstrap'

const WaveConditionBackdrop = styled.div `
    width: 22.5vh;
    height: 14vh;
    z-index: 5;
    text-align: center;
&:hover {
    cursor: pointer;
}`

const Title = styled(Row)`
p {
    color: var(--white);
    opacity: .7;
    font-size: 1.5vh;
    font-weight: 200;
    position: relative;
    top: -3vh;
    height: 0;
    margin-bottom: .5vh;
    text-transform: uppercase;
}`

const WaveHeight = styled.div `
    opacity: .8;
${WaveConditionBackdrop}:hover & {
    opacity: 1;
}
p {
    color: var(--white);
    font-size: 2.75vw;
    margin: 10px 0 0 15px;
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
`

const ConditionContainer = styled.div `
    border-radius: 4px;
    background: ${props => props.rating >= 2
    ? 'rgba(229, 135,41, 0.8)'
                    : props.rating < 1
        ? 'rgba(183, 32,32, 0.8)'
        : 'rgba(60, 214,82, 0.8)'};

    z-index: 1;
    box-shadow: 0 2.8px 2.2px rgb(0 0 0 / 3%), 0 6.7px 5.3px rgb(0 0 0 / 5%), 0 12px 8px rgb(0 0 0 / 3%), 0 12px 8px rgb(0 0 0 / 4%), 0 12px 8px rgb(0 0 0 / 3%), 0 12px 8px rgb(0 0 0 / 3%);
    width: 18.25vh;
    height: 4vh;
    margin: 2vh 0 0 2.25vh;
`

export const CurrWaveDataComponent = (props) => {
    return <WaveConditionBackdrop>
        <Title>
            <p>Surf Height - Quality</p>
        </Title>
        <WaveHeight>
            <p>{`${props.waveData.minBreakingHeight} - ${props.waveData.maxBreakingHeight}`}</p>
            <span>ft</span>
        </WaveHeight>
        <ConditionContainer rating={props.rating}>
            <RatingText>{props.rating >= 2
                    ? 'Good'
                    : props.rating < 1
                        ? 'Poor'
                        : 'Fair'}</RatingText>
        </ConditionContainer>
    </WaveConditionBackdrop>

};
