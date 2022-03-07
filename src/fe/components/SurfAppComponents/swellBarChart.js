import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styled from 'styled-components'

const MonthText = styled.text`
color: #fff !important;
fill: #666;
`

const SwellChartToolTip = styled.div`
width: 10vw;
height: 12vw;
border-radius: 5px;
background: rgba(255, 255, 255, 0.05);
backdrop-filter: blur(2px);
border: 1px solid rgba(255, 255, 255, 0.2);
border-right-color: rgba(255, 255, 255, 0.1);
border-bottom-color: rgba(255, 255, 255, 0.1);
box-shadow: 0 20px 30px rgba(0, 0, 0, 0.1);
padding: 15px;
position: relative;
color: white;
`



const renderDateTick = (tickProps) => {
    const { x, y, payload } = tickProps;
    const { value, offset } = payload;

    const localTimeHours = new Date(value).getHours();

    let dateObj = new Date(value);
    let fullDate = `${dateObj.getMonth() + 1}/${dateObj.getDate()}`


    if (localTimeHours === 13) {
        return <MonthText x={x} y={y - 4}  textAnchor="middle">{`${fullDate}`}</MonthText>;
    }
    const isLast = localTimeHours === 22;

    if (localTimeHours === 22 || isLast) {
        const pathX = Math.floor(isLast ? x + offset : x - offset) + 0.5;

        return <path d={`M${pathX},${y - 4}v${-35}`} stroke="#666" />;
    }

    return null;
};

const SwellInfoTooltip = ({ active, payload, data }) => {
    if (active && payload && payload.length) {
        return (
            <SwellChartToolTip>
                <p className="label">{`${payload[0].payload.date} - ${payload[0].payload.time}`}</p>
                <p className="intro">{`Wave Height: ${payload[0].payload.maxBreakingHeight}ft`}</p>
                <p className="intro">{`Primary Swell: ${payload[0].payload.primaryHeight}ft at ${payload[0].payload.primaryPeriod}`}</p>
            </SwellChartToolTip>
        );
    }

    return null;
};

export default class SwellBarChart extends PureComponent {

    render() {
        let maxWaveHeightInForecast = this.props.maxWaveHeightInForecast;
        let domain = [0, maxWaveHeightInForecast.data]
        console.log(maxWaveHeightInForecast.data)
        return (

            <ResponsiveContainer width="100%" height="100%" >
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
                    <XAxis dataKey="time" />
                    <XAxis
                        dataKey="localTime"
                        axisLine={false}
                        tickLine={false}
                        interval={0}
                        tick={renderDateTick}
                        height={1}
                        scale="band"
                        xAxisId="Date"
                    />
                    <YAxis type="number" domain={domain} margin={{
                        top: 5,
                        right: 10,
                        left: 0,
                        bottom: 5,
                    }} />
                    <Tooltip content={<SwellInfoTooltip />} />
                    <Bar 
                    dataKey="maxBreakingHeight" 
                    shape={renderShape('maxBreakingHeight')} 
                    fill="red"/>
                </BarChart>
            </ResponsiveContainer>
        );
    }
}
