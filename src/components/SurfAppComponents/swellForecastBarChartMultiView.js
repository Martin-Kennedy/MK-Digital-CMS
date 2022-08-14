import React, { PureComponent, Fragment } from 'react';
import {
    BarChart,
    Bar,
    Cell,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';
import styled from 'styled-components';
import MediaQuery from 'react-responsive';
import variables from '../../variables.module.scss';

const MonthText = styled.text`
color: #fff !important;
fill: #fff;
`

const SwellChartToolTip = styled.div`

`

const toolTipGlassMorphism = {
    width: '17vw',
    height: '10vh',
    borderRadius: '5px',
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(6px)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRightColor: 'rgba(255, 255, 255, 0.1)',
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    boxShadow: '0 20px 30px rgba(0, 0, 0, 0.1)',
    padding: '6px',
    position: 'relative',
    top: '-10vh',
    left: '-2vh',
    color: 'white',
    zIndex: '12'
}

const SwellChartDateTime = styled.p`
width: 100%;
display: block !important;
margin:  0 0 1vh 0 !important;
font-size: 1.7vh!important;
height: 2.5vh;
font-weight: 500 !important;
letter-spacing: .1vw;
color: rgba(255,255,255, 1) !important;
position: relative;
top: -2vh;
`

const SwellChartWaveHeight = styled.p`
width: 100%;
height:  2.5vh;
display: block !important;
margin:  0 !important;
font-size: 1.7vh !important;
font-weight: 400 !important;
letter-spacing: .1vw !important;
position: relative;
top: -2vh;

    span {
    color: rgba(255,255,255, 1)  !important;
    font-weight: 500 !important;
    font-size: 1.7vh !important;
    }
`

const SwellChartPrimary = styled.p`
width: 100%;
height:  2.5vh;
display: block !important;
margin: .2vh 0 .2vh 0 !important;
font-size: 1.7vh !important;
font-weight: 400 !important;
letter-spacing: .1vw;

position: relative;
top: -2vh;
div {
    width: 100%;
    display: block;
    margin-bottom: .2vh; 
    font-size: 1.7vh !important;
    color: rgba(255,255,255, 0.9) !important;
    span {
    color: rgba(255,255,255, 1)  !important;
    font-weight: 500 !important;
}
`;

const SwellChartSecondary = styled(SwellChartPrimary)`

`;

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

const SwellInfoTooltip = ({ active, payload, data }) => {
    if (active && payload && payload.length) {
        return (
            <SwellChartToolTip>
                <SwellChartDateTime>{payload[0].payload.dayOfWeek}, {payload[0].payload.date} - {payload[0].payload.time}</SwellChartDateTime>
                <SwellChartWaveHeight>Wave Height:
                    <span> {payload[0].payload.minBreakingHeight} - {payload[0].payload.maxBreakingHeight}ft</span>
                </SwellChartWaveHeight>

                <SwellChartPrimary>
                    <div>Combined Swell:
                        <span> {payload[0].payload.combinedHeight}ft </span>
                        at
                        <span> {payload[0].payload.combinedPeriod}s </span>
                        <span> {payload[0].payload.combinedSwellDirection} </span>
                    </div>
                </SwellChartPrimary>
            </SwellChartToolTip>
        );
    }

    return null;
};

export default class SwellBarChartMultiView extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            focusBar: null,
            mouseLeave: true

        };
    }

    render() {

        return (
            <Fragment>
                <MediaQuery maxWidth={Number(variables.largeNum)}>
                    <ResponsiveContainer className="swellForecastContainer" width="100%" height="90%">
                        

                        <BarChart
                            width={500}
                            height={300}
                            data={this.props.forecast}
                            margin={{
                                top: 0,
                                right: 25,
                                left: -25,
                                bottom: 0
                            }}
                            onMouseMove={(state) => {
                                if (state.isTooltipActive) {
                                    this.setState({ focusBar: state.activeTooltipIndex, mouseLeave: false });
                                } else {
                                    this.setState({ focusBar: null, mouseLeave: true })
                                }
                            }}>
                            <XAxis dataKey="time" />
                            {/* <XAxis
                                dataKey="localTime"
                                axisLine={false}
                                tickLine={false}
                                interval={0}
                                tick={renderDateTick}
                                height={1}
                                scale="band"
                                xAxisId="Date" /> */}
                            <YAxis
                                type="number"
                                domain={[0, this.props.maxWaveHeight]}
                                margin={{
                                    top: 5,
                                    right: 10,
                                    left: 0,
                                    bottom: 5
                                }} />
                            <Tooltip
                                wrapperStyle={toolTipGlassMorphism}
                                content={< SwellInfoTooltip />}
                                cursor={false} />
                            <Bar dataKey="maxBreakingHeight" fill="#7ecaed">
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
                </MediaQuery>
                <MediaQuery minWidth={Number(variables.largeNum)}>
                    <ResponsiveContainer width="100%" height="90%">
                        <BarChart
                            width={500}
                            height={300}
                            data={this.props.forecast}
                            margin={{
                                top: 2,
                                right: 25,
                                left: -35,
                                bottom: -10
                            }}
                            onMouseMove={(state) => {
                                if (state.isTooltipActive) {
                                    this.setState({ focusBar: state.activeTooltipIndex, mouseLeave: false });
                                } else {
                                    this.setState({ focusBar: null, mouseLeave: true })
                                }
                            }}>
                            <XAxis dataKey="time" />
                            {/* <XAxis
                                dataKey="localTime"
                                axisLine={false}
                                tickLine={false}
                                interval={0}
                                tick={renderDateTick}
                                height={1}
                                scale="band"
                                xAxisId="Date" /> */}
                            <YAxis
                                type="number"
                                domain={[0, this.props.maxWaveHeight]}
                                margin={{
                                    top: 5,
                                    right: 10,
                                    left: 0,
                                    bottom: 5
                                }} />
                            <Tooltip
                                wrapperStyle={toolTipGlassMorphism}
                                content={< SwellInfoTooltip />}
                                cursor={false} />
                            <Bar dataKey="maxBreakingHeight" fill="#7ecaed">
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
                </MediaQuery>
            </Fragment>
        );
    }
}
