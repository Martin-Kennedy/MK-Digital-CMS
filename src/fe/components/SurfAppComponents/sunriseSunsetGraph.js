import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, ReferenceLine, ResponsiveContainer } from "recharts";

const data = [
    {
        time: 0,
        amt: -10,
    },
    {
        time: 4,
        amt: -7,
    },
    {
        time: 8,
        amt: 0,
    },
    {
        time: 12,
        amt: 6,
    },
    {
        time: 16,
        amt: 0,
    },
    {
        time: 20,
        amt: -7,
    },
    {
        time: 24,
        amt: -10,
    },
];

const type = "monotone";

export default class SunriseSunsetGraph extends PureComponent {

    render() {
        return (
            <ResponsiveContainer width="100%" height="100%">
             
                <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{ top: 4, right: 10, bottom: 5, left: -50 }}
                >
                    <defs>
                        <linearGradient id="gradient" x1="0" y1="0" x2="100%" y2="0">
                            <stop offset="0%" stopColor="red" />
                            <stop offset="20%" stopColor="red" />
                            <stop offset="80%" stopColor="blue" />
                            <stop offset="100%" stopColor="blue" />
                        </linearGradient>
                    </defs>

                    <Line type={type} dataKey="amt" stroke="url(#gradient)" dot={false} />
                    <XAxis dataKey="time" />
                    <YAxis />
                </LineChart>
            </ResponsiveContainer>
        );
    }
}
