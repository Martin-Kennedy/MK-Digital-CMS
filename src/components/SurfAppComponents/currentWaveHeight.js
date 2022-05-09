import React from 'react';
import styled from 'styled-components'
import {Row} from 'react-bootstrap'
import { WaveConditionsSVGPath } from '../designElementComponents/waveConditionsSVGPath'

const WaveConditionBackdrop = styled.div `
    width: 22.5vh;
    height: 14vh;
    z-index: 5;
    text-align: center;
&:hover {
    cursor: pointer;
}`

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
    margin: 0;
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
`

const WaveIcon = styled.svg`
    width: 2.25vh;
    height: 2.25vh;
    position: relative;
    top: -2px;
    right: -0.5vw;
    padding: 0;
    path {
        fill: rgba(255,255,255, 0.4);
    }
`

const WaveHeight = styled.div `
    opacity: .8;
${WaveConditionBackdrop}:hover & {
    opacity: 1;
}
margin-top: -2vh;
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
    background: ${props => (props.rating[0] >= 2 || props.maxBreakingHeight >= 6) && props.rating[1] < 1
    ? 'rgba(229, 135,41, 0.8)' : props.rating[0] < 1 || props.maxBreakingHeight <= 2 || props.rating[1] >= 2
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
        <TitleIconRow>
            <Title>Current Conditions</Title>
            <WaveIcon x="0px" y="0px" viewBox="0 0 100 100">
                <WaveConditionsSVGPath />
            </WaveIcon>
        </TitleIconRow>
        <WaveHeight>
            <p>{`${props.waveData.minBreakingHeight} - ${props.waveData.maxBreakingHeight}`}</p>
            <span>ft</span>
        </WaveHeight>
        <ConditionContainer maxBreakingHeight={props.waveData.maxBreakingHeight} rating={props.rating}>
            <RatingText>{(props.rating[0] >= 2 || props.waveData.maxBreakingHeight >= 6) && props.rating[1] < 1
                    ? 'Good'
                : props.rating[0] < 1 || props.waveData.maxBreakingHeight <= 2 || props.rating[1] >= 2
                        ? 'Poor'
                        : 'Fair'}</RatingText>
        </ConditionContainer>
    </WaveConditionBackdrop>

};
