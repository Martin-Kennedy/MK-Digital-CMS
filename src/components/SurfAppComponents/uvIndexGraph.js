import React, { PureComponent } from 'react';
import {
    PieChart, Pie, Sector, Cell,
    Tooltip,
    ReferenceDot,
    ResponsiveContainer
} from "recharts";
import styled from 'styled-components';
import variables from '../../variables.module.scss';

const StyledPieChart = styled(PieChart)`
svg {
    > g {
    transform: translateY(9%);
    }
}
@media(max-width: ${variables.large}){
width: 80%;
height: 80%;
position: relative;
top: 10%;
left: 10%;
}
`
const SunGraphDateTime = styled.p`
width: 100%;
display: block;
margin: .2vh 0 1.75vh 0;
font-size: 1.7vh;
font-weight: 300;
letter-spacing: .1vw;
color: rgba(255,255,255, 0.8);
`

const SunGraphData = styled.span`
color: rgba(255,255,255, 0.9);
font-weight: 500;
font-size: 1.25vh !important;
`

const UVContainer = styled.div`
width: 100%;
height: 14vh;
marginTop: .5vw;
@media(max-width: ${variables.large}){
    height: 35vw;
    width: 35vw;
}
`

const type = "monotone";

const data = [
    { uvIndex: 1, value: 3 },
    { uvIndex: 2, value: 3 },
    { uvIndex: 3, value: 3 },
    { uvIndex: 4, value: 4 },
    { uvIndex: 5, value: 4 },
    { uvIndex: 6, value: 4 },
    { uvIndex: 7, value: 5 },
    { uvIndex: 8, value: 5 },
    { uvIndex: 9, value: 5 },
    { uvIndex: 10, value: 6 },
    { uvIndex: 11, value: 6 },
];
const COLORS = ['#00a7fe', '#00c5fe', '#00feef', '#00C49F', '#00fe42', '#72fe00', '#febf00', '#FFBB28', '#fea100', '#FF8042', '#fe2400'];

const ActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const mx = cx + (outerRadius - 5) * cos;
    const my = cy + (outerRadius - 5) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    return <g>
        <Sector 
            cx={cx}
            cy={cy}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            startAngle={startAngle}
            endAngle={endAngle}
            fill={fill}
            stroke={fill}
        />

        <circle cx={mx} cy={my} r={5} fill="#0f2a46" stroke="#fff" preserveAspectRatio />
    </g>;
}

export default class UvIndexGraph extends PureComponent {

    render() {
        const uvi = parseInt(this.props.data.uvi) -1;
        const convertedUvi = uvi > 11 ? 10 : uvi;

        return (
            <UVContainer>
            <ResponsiveContainer>

                    <StyledPieChart>
                    
                        <Pie 
                        data={data}
                        activeIndex={convertedUvi}
                        activeShape={ActiveShape}
                        startAngle={180}
                        endAngle={0}
                        innerRadius={'92%'}
                        outerRadius={'100%'}
                        fill="#8884d8"
                        dataKey="value"
                        isAnimationActive={false}
                        >
                            {data.map((entry, index) => (
                                <Cell stroke={COLORS[index % COLORS.length]} key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        {/* <ReferenceDot x={closest.time} y={closest.position} r={5} stroke="none" fill="rgba(251,176,59,1)" ifOverflow="extendDomain" /> */}
                      
                    </StyledPieChart>
                </ResponsiveContainer>
            </UVContainer>
                   
                    
                    
        );
    }
}
