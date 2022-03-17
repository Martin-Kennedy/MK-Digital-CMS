import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';


export default class CurrentTideDataComponent extends PureComponent {

    render() {
        return (
            <ResponsiveContainer width="100%" height="100%">
                
                <AreaChart
                    width={500}
                    height={400}
                    data={this.props.tide}
                    stackOffset="silhouette"
                    baseValue="dataMin"
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <XAxis dataKey="time" />
                    <YAxis type="number" />
                    <Tooltip />
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="rgb(64, 188, 240)" stopOpacity={1} />
                            <stop offset="100%" stopColor="rgb(64, 188, 240)" stopOpacity={0} />
                        </linearGradient>
                        </defs>
                    <Area type="monotone" dataKey="v"  fill="url(#colorUv)" />
                </AreaChart>
            </ResponsiveContainer>
        );
    }
}
