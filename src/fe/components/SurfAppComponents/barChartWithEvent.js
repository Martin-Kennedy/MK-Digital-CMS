import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default class BarChartWithEvent extends PureComponent {

    

    constructor(props) {
        super(props);
        this.state = {
            data: {}
        }
    }


    componentDidMount(){
        if(this.props.forecast.length > 0){ Object.keys(this.props.forecast).map((keyName, keyIndex) => {
            this.state.data =
                {
                    keyName: this.props.forecast[keyName]
                }

            })
        }
    }



    

    render() {
       

        return (
            <div style={{ width: '100%' }}>
                <ResponsiveContainer width="100%" height={100}>
                    {this.props.forecast.length > 0 ? Object.keys(this.props.forecast).map((keyName, keyIndex) => {
                        return (<BarChart width={150} height={40} data={this.props.forecast[keyName]}>
                            <Tooltip />
                            <Bar dataKey="swell.maxBreakingHeight" stackId="a" fill="#8884d8" />
                            <Bar dataKey="swell.minBreakingHeight" stackId="a" fill="#82ca9d" />
                        </BarChart>)
                    }) : <div></div>}
                        
                    
                </ResponsiveContainer>
            </div>
        );
    }
}
