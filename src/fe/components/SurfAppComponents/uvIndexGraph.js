import React, { PureComponent } from 'react';
import {
    PieChart, Pie, Sector, Cell,
    Tooltip,
    ReferenceDot,
    ResponsiveContainer
} from "recharts";
import styled from 'styled-components';

const SunGraphToolTip = styled.div`
padding: 0;
`

const SunGraphDateTime = styled.p`
width: 100%;
display: block;
margin: 5px 0 0 0;
font-size: 1.25vh;
font-weight: 200;
letter-spacing: .1vw;
color: rgba(255,255,255, 0.7);
`

const SunGraphData = styled.span`
color: rgba(255,255,255, 0.9);
font-weight: 500;
font-size: 1.25vh !important;
`

const SunGraphHeight = styled.p`
width: 100%;
display: block;
margin: 5px 0 0 0;
font-size: 1.25vh;
font-weight: 200;
letter-spacing: .1vw;
color: rgba(255,255,255, 0.7);
    
`

const toolTipGlassMorphism = {
    width: '20vh',
    height: '12.5vh',
    borderRadius: '5px',
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(1px)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRightColor: 'rgba(255, 255, 255, 0.1)',
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    boxShadow: '0 20px 30px rgba(0, 0, 0, 0.1)',
    padding: '5px',
    position: 'relative',
    top: '-14.5vh',
    left: '21vh',
    color: 'white',
    zIndex: '5'
}

const SunGraphTooltip = ({ active, payload }) => {

    if (active && payload && payload.length) {

        return (
            <SunGraphToolTip>
                <SunGraphDateTime>Time: <SunGraphData>{payload[0].payload.uviColor}</SunGraphData></SunGraphDateTime>
            </SunGraphToolTip>
        );
    }

    return null;
};

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
    const mx = cx + (outerRadius - 10) * cos;
    const my = cy + (outerRadius - 10) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    return <g>
        <Sector
            cx={cx}
            cy={cy}
            innerRadius={innerRadius }
            outerRadius={outerRadius }
            startAngle={startAngle}
            endAngle={endAngle}
            fill={fill}
        />
        
        <circle cx={ex} cy={ey} r={8} fill="#0f2a46" stroke="#fff" />
            </g>;
}
export default class UvIndexGraph extends PureComponent {

    render() {
      

        return (
            <div className="uvIndex" style={{ width: "200px", height: "110px", transform: "scale(.8)" }}>
            <ResponsiveContainer>

                <PieChart >
                    
                    <Pie
                        data={data}
                        activeIndex={6}
                        activeShape={ActiveShape}
                        cx={100}
                        cy={100}
                        startAngle={180}
                        endAngle={0}
                        innerRadius={70}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        className='uvIndex'
                        isAnimationActive={false}
                        
                    >
                        {/* <ReferenceDot x={closest.time} y={closest.position} r={5} stroke="none" fill="rgba(251,176,59,1)" ifOverflow="extendDomain" /> */}
                        {data.map((entry, index) => (
                            <Cell stroke={COLORS[index % COLORS.length]} key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                </PieChart>
                </ResponsiveContainer>
            </div>
                   
                    
                    
        );
    }
}
