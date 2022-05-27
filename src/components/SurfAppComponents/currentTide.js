import React, { PureComponent, Fragment } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ReferenceDot, ResponsiveContainer } from 'recharts';
import { TideSVGPath } from '../designElementComponents/tideSVGPath'
import {Row} from 'react-bootstrap';
import styled from 'styled-components';
import variables from '../../variables.module.scss';


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
    margin: 0 0.8vw 0 0;
}
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
@media(max-width: ${variables.large}){
    font-size: 1.5vw;
    line-height: 3vw;
    padding: 0;
}
`

const TideIcon = styled.svg`
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

const TideChartToolTip = styled.div`

`

const TideChartDateTime = styled.p`
width: 100%;
display: block;
margin: .2vh 0 1.75vh 0;
    font-size: .8vw;
    font-weight: 300;
    letter-spacing: .1vw;
    color: rgba(255,255,255, 0.8);
    

`

const TideChartHeight = styled.p`
width: 100%;
display: block;
margin: .2vh 0 1.25vh 0;
font-size: .85vw;
font-weight: 200;
letter-spacing: .1vw;
color: rgba(255,255,255, 0.7);
    span {
    color: rgba(255,255,255, 0.9);
    font-weight: 400;

}
`
const StyledResponsiveContainer = styled(ResponsiveContainer)`
margin: 0 0 0 -0.4vw;
`

const toolTipGlassMorphism = {
    width: '20vh',
    height: '12.5vh',
    borderRadius: '5px',
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(1px)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRightColor: 'rgba(255, 255, 255, 0.1)',
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    boxShadow: '0 20px 30px rgba(0, 0, 0, 0.1)',
    padding: '15px',
    position: 'relative',
    top: '-14.5vh',
    left: '21vh',
    color: 'white',
    zIndex: '5'
}

const TideInfoTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        
        return (
            <TideChartToolTip>
                <TideChartDateTime>Time: {payload[0].payload.time}</TideChartDateTime>
                <TideChartHeight>Height:
                    <span> {payload[0].payload.v}ft</span>
                </TideChartHeight>
            </TideChartToolTip>
        );
    }

    return null;
};


export default class CurrentTideDataComponent extends PureComponent {

    render() {
        const hours = new Date().getHours();
        const minutes = new Date().getMinutes();
        const conHrsToSec = Math.floor(hours * 60 * 60);
        const conMinsToSec = Math.floor(minutes * 60);
        const timeToSec = conHrsToSec + conMinsToSec;
        const closest = this.props.tide.reduce(function (a, b) {
            const aTime = new Date(a.t).getHours() * 60 * 60;
            const bTime = new Date(b.t).getHours() * 60 * 60;
            return (Math.abs(aTime - timeToSec) < Math.abs(bTime - timeToSec) ? a : b);
        });
        return (
            <Fragment>
            <TitleIconRow>
            <Title>Tide</Title>
            <TideIcon x="0px" y="0px" viewBox="0 0 100 100">
                <TideSVGPath />
            </TideIcon>
        </TitleIconRow>
                <StyledResponsiveContainer  width="100%" height="100%">
                
                <AreaChart
                    width={500}
                    height={400}
                    data={this.props.tide}
                    stackOffset="silhouette"
                    baseValue="dataMin"
                    margin={{
                        top: 5,
                        right: 10,
                        left: -35,
                        bottom: 5
                    }}
                >
                    <XAxis dataKey="time" />
                    <YAxis type="number" />
                    <Tooltip
                        wrapperStyle={toolTipGlassMorphism}
                        content={<TideInfoTooltip />}
                         />
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="-5%" stopColor="rgb(64, 188, 240)" stopOpacity={1} />
                            <stop offset="100%" stopColor="rgb(64, 188, 240)" stopOpacity={0} />
                        </linearGradient>
                        </defs>
                    <ReferenceDot x={closest.time} y={closest.v} r={3} stroke="rgba(255,255,255,0.75)" fill="none" ifOverflow="extendDomain" />
                    <Area type="monotone" dataKey="v" stroke="transparent"  fill="url(#colorUv)" />
                </AreaChart>
                </StyledResponsiveContainer>
            </Fragment>
        );
    }
}
