import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styled from 'styled-components'

const MonthText = styled.text`
color: #fff !important;
fill: #666;
`

const SwellChartToolTip = styled.div`

`

const toolTipGlassMorphism = {
width: '10vw',
height: '12vw',
borderRadius: '5px',
background: 'rgba(255, 255, 255, 0.05)',
backdropFilter: 'blur(1px)',
border: '1px solid rgba(255, 255, 255, 0.15)',
borderRightColor: 'rgba(255, 255, 255, 0.1)',
borderBottomColor: 'rgba(255, 255, 255, 0.1)',
boxShadow: '0 20px 30px rgba(0, 0, 0, 0.1)',
padding: '15px',
position: 'relative',
top: '-60px',
color: 'white',
zIndex: '999',
}



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
    constructor(props) {
        super(props);
        this.state = { 
            focusBar: null,
            mouseLeave: true
        
        };
        console.log(this.state)
    }
    

    render() {
       
        return (

            <ResponsiveContainer width="100%" height="90%"  >
                
                <BarChart
                    width={500}
                    height={300}
                    data={this.props.forecast}
                    margin={{
                        top: 8,
                        right: 25,
                        left: -25,
                        bottom: 10,
                    }}
                    onMouseMove={(state) => {
                        if (state.isTooltipActive) {
                            console.log(state.activeTooltipIndex)
                            console.log(this.state)
                            this.setState({
                                focusBar: state.activeTooltipIndex,
                                mouseLeave: false
                            }) ;
                            } else {
                            this.setState({
                                focusBar: null,
                                mouseLeave: true
                            }) 
                            }
                        
                    }}>
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
                    <YAxis type="number"  margin={{
                        top: 5,
                        right: 10,
                        left: 0,
                        bottom: 5,
                    }} />
                    <Tooltip wrapperStyle={toolTipGlassMorphism} content={<SwellInfoTooltip />} cursor={false} />
                    <Bar 
                    dataKey="maxBreakingHeight" 
                        fill="#7ecaed">
                        {this.props.forecast.map((entry, index) => {
                           return <Cell
                                fill={
                                    this.state.focusBar === index  
                                       ? "#40bcf0" : this.state.mouseLeave ? "rgba(64, 188, 240, 0.8)"
                                           : "rgba(64, 188, 240, 0.35)"
                                }
                            />
                        })}
                            </Bar>
                </BarChart>
            </ResponsiveContainer>
        );
    }
}
