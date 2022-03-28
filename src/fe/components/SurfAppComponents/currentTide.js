import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ReferenceLine, ResponsiveContainer } from 'recharts';
import { formatAMPM } from '../../helpers/utilities';
import styled from 'styled-components';

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
        
        
        var closest = this.props.tide.reduce(function (a, b) {
            return (Math.abs(a.time - formatAMPM(new Date())) < Math.abs(b.time - formatAMPM(new Date())) ? a : b);
        });
        return (
            <ResponsiveContainer width="100%" height="100%">
                
                <AreaChart
                    width={500}
                    height={400}
                    data={this.props.tide}
                    stackOffset="silhouette"
                    baseValue="dataMin"
                    margin={{
                        top: 4,
                        right: 10,
                        left: -35,
                        bottom: 4
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
                    <ReferenceLine x={closest.time} stroke="rgba(255,255,255,0.45)" />
                    <Area type="monotone" dataKey="v" stroke="transparent"  fill="url(#colorUv)" />
                </AreaChart>
            </ResponsiveContainer>
        );
    }
}
