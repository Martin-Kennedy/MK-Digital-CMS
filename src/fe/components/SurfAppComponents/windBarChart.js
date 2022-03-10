import React, { PureComponent } from 'react';
import {
    BarChart,
    Bar,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';
import styled from 'styled-components'

const MonthText = styled.text`
color: #fff !important;
fill: #666;
`

const WindChartToolTip = styled.div`

`

const toolTipGlassMorphism = {
    width: '12vw',
    height: '12.5vw',
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
    zIndex: '999'
}

const WindChartDateTime = styled.p`
width: 100%;
display: block;
margin: .2vh 0 1.75vh 0;
    font-size: .8vw;
    font-weight: 300;
    letter-spacing: .1vw;
    color: rgba(255,255,255, 0.8);
    

`

const WindChartWaveHeight = styled.p`
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

const WindChartPrimary = styled.p`
width: 100%;
display: block;
margin: .2vh 0 1.25vh 0;
     font-size: .85vw;
    font-weight: 200;
    letter-spacing: .1vw;
    color: rgba(255,255,255, 0.7);
     div {
        width: 100%;
        display: block;
        margin-bottom: .5vh; 
        span {
        color: rgba(255,255,255, 0.9);
        font-weight: 400;
        
    }
`;

const WindChartSecondary = styled(WindChartPrimary)`

`;


const WindBarb = (props) => {
    const { fill, x, y, width, height, direction, speed } = props;
    const scaleNum = speed / 12;

    // set max and min scale ratio

    return <image style={{
        transform: `rotate(${direction - 90}deg) scale(${scaleNum})`,
        transformOrigin: `${x + 10}px ${y}px`}} href={'/windBarb.svg'} x={x} y={y} width="12" height="12" />
};

const renderDateTick = (tickProps) => {
    const { x, y, payload } = tickProps;
    const { value, offset } = payload;

    const localTimeHours = new Date(value).getHours();

    let dateObj = new Date(value);
    let fullDate = `${dateObj.getMonth() + 1}/${dateObj.getDate()}`

    if (localTimeHours === 13) {
        return <MonthText x={x} y={y - 4} textAnchor="middle">{`${fullDate}`}</MonthText>;
    }
    const isLast = localTimeHours === 22;

    if (localTimeHours === 22 || isLast) {
        const pathX = Math.floor(isLast
            ? x + offset
            : x - offset) + 0.5;

        return <path d={`M${pathX},${y - 4}v${- 35}`} />;
    }

    return null;
};

const WindInfoTooltip = ({ active, payload, data }) => {
    if (active && payload && payload.length) {
        console.log(payload[0])
        return (
            <WindChartToolTip>
                <WindChartDateTime>{payload[0].payload.date} - {payload[0].payload.time}</WindChartDateTime>
                <WindChartWaveHeight>Wind Speed:
                    <span> {payload[0].payload.speed} - {payload[0].payload.gusts}mph</span>
                </WindChartWaveHeight>
            </WindChartToolTip>
        );
    }

    return null;
};

export default class WindBarChart extends PureComponent {
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

            <ResponsiveContainer width="100%" height="90%">
                    
                <BarChart
                    width={500}
                    height={300}
                    data={this.props.forecast}
                    margin={{
                        top: 8,
                        right: 25,
                        left: -25,
                        bottom: 10
                    }}
                    onMouseMove={(state) => {
                        if (state.isTooltipActive) {
                            this.setState({ focusBar: state.activeTooltipIndex, mouseLeave: false });
                        } else {
                            this.setState({ focusBar: null, mouseLeave: true })
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
                        xAxisId="Date" />
                    <YAxis
                        type="number"
                        margin={{
                            top: 5,
                            right: 10,
                            left: 0,
                            bottom: 5
                        }} />
                    <Tooltip
                        wrapperStyle={toolTipGlassMorphism}
                        content={< WindInfoTooltip />}
                        cursor={false} />

                        {/* Use shape props in bar chart por line chart to create custom sized and direction based wind barbs for forecast */}

                    <Bar dataKey="speed" shape={<WindBarb />} fill="#7ecaed">
                        {this
                            .props
                            .forecast
                            .map((entry, index) => {
                                return <Cell key={`cell-${index}`}
                                    fill={this.state.focusBar === index
                                        ? "#40bcf0"
                                        : this.state.mouseLeave
                                            ? "rgba(64, 188, 240, 0.8)"
                                            : "rgba(64, 188, 240, 0.35)"} />
                            })}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        );
    }
}
