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
    width: '28vh',
    height: '20.5vh',
    borderRadius: '5px',
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(2px)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRightColor: 'rgba(255, 255, 255, 0.1)',
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    boxShadow: '0 20px 30px rgba(0, 0, 0, 0.1)',
    padding: '15px',
    position: 'relative',
    top: '-22.5vh',
    color: 'white',
    zIndex: '4'
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


const WindBarb = (props) => {
    const { x, y, width, height, direction, speed, data } = props;
    const scaleNum = () => {
        const size = speed / 12;
        if (size < .9){
            return .9
        } else if (size > 2.25){
            return 2.25
        }else {
            return size;
        }
    } 

    // set max and min scale ratio

    return <image style={{
        transform: `rotate(${direction - 90}deg) scale(${scaleNum()})`,
        transformOrigin: `${x + 10}px ${y}px`,
        opacity: props.index === props.data.focusBar ? '1' : props.data.mouseLeave ? '0.7' : '0.4',
        position: 'relative',
        zIndex: '2'
        }} href={'/windBarb.svg'} x={x} y={y} width="12" height="12" />
};

const renderDateTick = (tickProps) => {
    const { x, y, payload } = tickProps;
    const { value, offset } = payload;

    const localTimeHours = new Date(value).getHours();

    let dateObj = new Date(value);
    let fullDate = `${dateObj.getMonth() + 1}/${dateObj.getDate()}`
    if (localTimeHours >= 10 && localTimeHours < 13) {
        return <MonthText x={x} y={y - 4} textAnchor="middle">{`${fullDate}`}</MonthText>;
    }
    const isLast = localTimeHours === 24;

    if (localTimeHours >= 22 || isLast) {
        const pathX = Math.floor(isLast
            ? x + offset
            : x - offset) + 0.5;

        return <path d={`M${pathX},${y - 4}v${- 35}`} />;
    }

    return null;
};

const WindInfoTooltip = ({ active, payload }) => {

    if (active && payload && payload.length) {
        let degree = String.fromCodePoint(176)
        return (
            <WindChartToolTip>
                <WindChartDateTime>{payload[0].payload.dayOfWeek}, {payload[0].payload.date} - {payload[0].payload.time}</WindChartDateTime>
                <WindChartWaveHeight>Wind Speed:
                    <span> {payload[0].payload.speed} - {payload[0].payload.gusts}mph</span>
                </WindChartWaveHeight>
                <WindChartWaveHeight>Wind Direction:
                    <span> {payload[0].payload.compassDirection} - {payload[0].payload.direction + 180}{degree}</span>
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

                    <Bar dataKey="speed" shape={<WindBarb data={this.state} />} >
                        
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        );
    }
}
