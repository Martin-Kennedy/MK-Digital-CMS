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
padding: 0;
`

const SunGraphDateTime = styled.p`
width: 100%;
display: block;
margin: 5px 0 0 0;
font-size: 1.25vh;
font-weight: 200;
letter-spacing: .1vw;
color: rgba(255,255,255, 0.7);
`

const SunGraphData = styled.span`
color: rgba(255,255,255, 0.9);
font-weight: 500;
font-size: 1.25vh !important;
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
    backdropFilter: 'blur(1px)',
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
                <SunGraphDateTime>Time: <SunGraphData>{payload[0].payload.time}</SunGraphData></SunGraphDateTime>
                <SunGraphDateTime>Event: <SunGraphData>{payload[0].payload.event}</SunGraphData></SunGraphDateTime>
            </SunGraphToolTip>
        );
    }

    return null;
};

const type = "monotone";

export default class SunriseSunsetGraph extends PureComponent {
    
    render() {
        const time = Math.floor(Date.now() / 1000)
        const hours = new Date().getHours();
        const minutes = new Date().getMinutes();

        const conHrsToSec = Math.floor(hours * 60 * 60);
        const conMinsToSec = Math.floor(minutes * 60);
        const timeToSec = conHrsToSec + conMinsToSec;
        var closest = this.props.data.reduce(function (a, b) {
            console.log(timeToSec, a.timeTick, b.timeTick)
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
                    bottom: -5,
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
                        <linearGradient id="gradient2" x1="0" y1="0" x2="0" y2="100%">
                            <stop offset="5%" stopColor="rgba(237,28,36,1)" />
                            <stop offset="50%" stopColor="rgba(241,90,36,1)" />
                            <stop offset="75%" stopColor="rgba(241,90,36,1)" />
                            <stop offset="100%" stopColor="rgba(251,176,59,1)" />
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
                    <ReferenceDot x={closest.time} y={closest.position} r={5} stroke="none" fill="rgba(251,176,59,1)" alwaysShow={true} />
                    <ReferenceLine y={0} stroke="rgba(255,255,255,0.15)"  alwaysShow={true} />
                    <YAxis  dataKey="position" domain={['dataMin - .5', '2']} />
                </LineChart>
            </ResponsiveContainer>
        );
    }
}
