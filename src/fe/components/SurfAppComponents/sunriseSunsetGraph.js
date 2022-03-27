import React, {PureComponent} from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ReferenceLine,
    ResponsiveContainer
} from "recharts";

const type = "monotone";

export default class SunriseSunsetGraph extends PureComponent {
    
    render() {
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
                    bottom: 7,
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
                    <XAxis interval='preserveStartEnd' dataKey="time"/>
                    <Tooltip />
                    <ReferenceLine y={0} stroke="rgba(255,255,255,0.15)"  alwaysShow={true} />
                    <YAxis tick={false} domain={['dataMin - .5', 'dataMax']} />
                </LineChart>
            </ResponsiveContainer>
        );
    }
}
