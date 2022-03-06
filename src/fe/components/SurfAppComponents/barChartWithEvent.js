import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styled from 'styled-components'

const StyledBarChart = styled(BarChart)`
width: auto;
height: 100px;

`

export default class BarChartWithEvent extends PureComponent {

    

    constructor(props) {
        super(props);
        this.state = {
            data: {}
        }
    }




    

    render() {
       

        return (
            <ResponsiveContainer width="100%" height="100%">
            <BarChart width={300} height={200} data={this.props.forecast}>
                    <Tooltip />
                    <Bar dataKey="maxBreakingHeight" stackId="a" fill="#82ca9d" />
                    <YAxis type="number" domain={[0, 40]} />
                    <XAxis dataKey="time" />
            </BarChart>
            </ResponsiveContainer>
                    
        );
    }
}
