import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



export default class SwellBarChart extends PureComponent {

    render() {
        let maxWaveHeightInForecast = this.props.maxWaveHeightInForecast;
        let domain = [0, maxWaveHeightInForecast.data]
        console.log(maxWaveHeightInForecast.data)
        return (
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    width={500}
                    height={300}
                    data={this.props.forecast}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <XAxis dataKey="date" />
                    <YAxis type="number" domain={domain} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="maxBreakingHeight" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        );
    }
}
