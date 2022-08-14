import React, {PureComponent, Fragment} from 'react';
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
import styled from 'styled-components';
import MediaQuery from 'react-responsive';
import variables from '../../variables.module.scss';

const MonthText = styled.text `
color: #fff !important;
fill: #666;
`

const SwellChartToolTip = styled.div `

`

const toolTipGlassMorphism = {
    width: '13vw',
    height: '20.5vh',
    borderRadius: '5px',
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(4px)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRightColor: 'rgba(255, 255, 255, 0.1)',
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    boxShadow: '0 20px 30px rgba(0, 0, 0, 0.1)',
    padding: '15px',
    position: 'relative',
    top: '-20vh',
    color: 'white',
    zIndex: '4'
}

const SwellChartDateTime = styled.p `
width: 100%;
display: block;
margin: .2vh 0 1.75vh 0;
    font-size: 1.7vh;
    font-weight: 300;
    letter-spacing: .1vw;
    color: rgba(255,255,255, 0.8);
`

const SwellChartWaveHeight = styled.p `
width: 100%;
display: block;
margin: .2vh 0 1vh 0;
font-size: 1.7vh;
font-weight: 200;
letter-spacing: .1vw;
color: rgba(255,255,255, 0.7);
    span {
    color: rgba(255,255,255, 0.9);
    font-weight: 400;
    }
`

const SwellChartPrimary = styled.p `
width: 100%;
display: block;
margin: .2vh 0 1vh 0;
     font-size: 1.7vh;
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

const SwellInfoTooltip = ({active, payload, data}) => {
    if (active && payload && payload.length) {
        return (
            <SwellChartToolTip>
                <SwellChartDateTime>{payload[0].payload.dayOfWeek}, {payload[0].payload.date} - {payload[0].payload.time}</SwellChartDateTime>
                <SwellChartWaveHeight>Wave Height:
                    <span> {payload[0].payload.minBreakingHeight} - {payload[0].payload.maxBreakingHeight}ft</span>
                </SwellChartWaveHeight>

                <SwellChartPrimary>
                    <div>Primary:
                        <span> {payload[0].payload.primaryHeight}ft </span>
                        at 
                        <span> {payload[0].payload.primaryPeriod}s </span>
                        <span> {payload[0].payload.primarySwellDirection} </span>
                    </div>
                </SwellChartPrimary>

                {payload[0].payload.secondaryHeight ? <SwellChartSecondary>
                    <div>Secondary:
                        <span> {payload[0].payload.secondaryHeight}ft </span>
                        at
                        <span> {payload[0].payload.secondaryPeriod}s </span>
                        <span> {payload[0].payload.secondarySwellDirection} </span>
                    </div>
                    
                </SwellChartSecondary> : null}
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
                    top: 8,
                    right: 25,
                    left: -25,
                    bottom: 10
                }}
                    onMouseMove={(state) => {
                    if (state.isTooltipActive) {
                        this.setState({focusBar: state.activeTooltipIndex, mouseLeave: false});
                    } else {
                        this.setState({focusBar: null, mouseLeave: true})
                    }
                }}>
                    <XAxis dataKey="time"/>
                    <XAxis
                        dataKey="localTime"
                        axisLine={false}
                        tickLine={false}
                        interval={0}
                        tick={renderDateTick}
                        height={1}
                        scale="band"
                        xAxisId="Date"/>
                    <YAxis
                        type="number"
                        domain={[0, this.props.maxWaveHeight]}
                        margin={{
                        top: 5,
                        right: 10,
                        left: 0,
                        bottom: 5
                    }}/>
                    <Tooltip
                        wrapperStyle={toolTipGlassMorphism}
                        content={< SwellInfoTooltip />}
                        cursor={false}/>
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
                                        : "rgba(64, 188, 240, 0.35)"}/>
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
