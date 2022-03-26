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
                    baseMin={'dataMin'}
                    margin={{
                    top: 4,
                    right: 10,
                    bottom: 15,
                    left: -40
                }}>
                    <defs>
                        <linearGradient id="gradient" x1="0" y1="0" x2="100%" y2="0">
                            <stop offset="0%" stopColor="red"/>
                            <stop offset="20%" stopColor="red"/>
                            <stop offset="80%" stopColor="blue"/>
                            <stop offset="100%" stopColor="blue"/>
                        </linearGradient>
                    </defs>

                    <Line type={type} dataKey="solarPosition" stroke="url(#gradient)" dot={false}/>
                    <XAxis dataKey="time"/>
                    <Tooltip />
                    <YAxis type="number" domain={['dataMin - 3', 'dataMax + 2']} />
                </LineChart>
            </ResponsiveContainer>
        );
    }
}
