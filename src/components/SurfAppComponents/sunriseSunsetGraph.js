import React, {PureComponent} from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ReferenceDot,
    ReferenceLine,
    ResponsiveContainer
} from "recharts";
import { formatAMPMwMins } from '../../helpers/utilities';
import styled from 'styled-components';

const SunGraphToolTip = styled.div`
padding-top: 1vh;
`

const SunGraphDateTime = styled.p`
width: 100%;
display: flex;
margin: 1.2vh 0 1.75vh 0;
font-size: 1.7vh;
line-height: 1.7vh;
font-weight: 300;
letter-spacing: .1vw;
color: rgba(255,255,255, 0.8);
`

const SunGraphData = styled.span`
width: 100%;
display: flex;
margin: .2vh 0 1vh .5vh;
font-size: 1.7vh;
line-height: 1.7vh;
letter-spacing: .125vw;
color: rgba(255,255,255, 0.9);
font-weight: 400;
`

const SunGraphHeight = styled.p`
width: 100%;
display: block;
margin: 5px 0 0 0;
font-size: 1.25vh;
font-weight: 200;
letter-spacing: .1vw;
color: rgba(255,255,255, 0.7);
    
`

const toolTipGlassMorphism = {
    width: '20vh',
    height: '12.5vh',
    borderRadius: '5px',
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(4px)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRightColor: 'rgba(255, 255, 255, 0.1)',
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    boxShadow: '0 20px 30px rgba(0, 0, 0, 0.1)',
    padding: '5px',
    position: 'relative',
    top: '-14.5vh',
    left: '21vh',
    color: 'white',
    zIndex: '5'
}

const SunGraphTooltip = ({ active, payload }) => {
    
    if (active && payload && payload.length) {
        
        return (
            <SunGraphToolTip>
                <SunGraphDateTime>Event: <SunGraphData>{payload[0].payload.event}</SunGraphData></SunGraphDateTime>
                <SunGraphDateTime>Time: <SunGraphData>{payload[0].payload.time}</SunGraphData></SunGraphDateTime>
                
            </SunGraphToolTip>
        );
    }

    return null;
};

const type = "monotone";

export default class SunriseSunsetGraph extends PureComponent {
    
    render() {
        const hours = new Date().getHours();
        const minutes = new Date().getMinutes();
        const conHrsToSec = Math.floor(hours * 60 * 60);
        const conMinsToSec = Math.floor(minutes * 60);
        const timeToSec = conHrsToSec + conMinsToSec;
        var closest = this.props.data.reduce(function (a, b) {
            return (Math.abs(a.timeTick - timeToSec) < Math.abs(b.timeTick - timeToSec) ? a : b);
        });
     
        return (
            <ResponsiveContainer width="100%" height="100%">

                <LineChart
                    width={500}
                    height={300}
                    data={this.props.data}
                    className='sunGraph'
                    base={'dataMin'}
                    margin={{
                    top: 4,
                    right: 5,
                    bottom: -25,
                    left: -60
                }}>
                    <defs>
                        <linearGradient id="gradient" x1="0" y1="0" x2="100%" y2="0">
                            <stop offset="0%" stopColor="#023059"/>
                            <stop offset="45%" stopColor="rgba(255,255,255,0.15)"/>
                            <stop offset="50%" stopColor="rgba(255,255,255,0.5)" />
                            <stop offset="55%" stopColor="rgba(255,255,255,0.15)"/>
                            <stop offset="100%" stopColor="#023059"/>
                        </linearGradient>
                    </defs>

                    <Line type={type} dataKey="position" stroke="url(#gradient)" dot={false}/>
                    <XAxis 
                    dataKey='time'
                    domain={['dataMin - 1', 'dataMax + 1']} 
                    tick={false}
                    />
                    <Tooltip
                        wrapperStyle={toolTipGlassMorphism}
                        content={<SunGraphTooltip />}
                    />
                    <ReferenceDot x={closest.time} y={closest.position} r={5} stroke="none" fill="rgba(251,176,59,1)" ifOverflow="extendDomain" />
                    <ReferenceLine y={0} stroke="rgba(255,255,255,0.15)"  ifOverflow="extendDomain" />
                    <YAxis  dataKey="position" domain={['dataMin - 0.25', 'dataMax + 0.25']} />
                </LineChart>
            </ResponsiveContainer>
        );
    }
}
