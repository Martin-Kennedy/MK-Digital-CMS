import React, { useEffect, useState, Fragment } from 'react';
import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { scaleLog } from 'd3-scale';

import styled from 'styled-components';
import MediaQuery from 'react-responsive';
import variables from '../../variables.module.scss';

const CustomResponsiveContainer = styled(ResponsiveContainer)`
margin: auto;
`

export const SwellRadialChart = (props) => {
    
    const swellTemplateArray = [
        
        {
            subject: 'N',
            primary: 0,
            secondary: 0,
            tertiary: 0,
            fullMark: 25,
        }, {
            subject: 'NEnd',
            primary: 0,
            secondary: 0,
            tertiary: 0,
            fullMark: 25,
        },
        {
            subject: 'NNE',
            primary: 0,
            secondary: 0,
            tertiary: 0,
            fullMark: 25,
        }, {
            subject: 'NNEEnd',
            primary: 0,
            secondary: 0,
            tertiary: 0,
            fullMark: 25,
        },
        {
            subject: 'NE',
            primary: 0,
            secondary: 0,
            tertiary: 0,
            fullMark: 25,
        }, {
            subject: 'NEEnd',
            primary: 0,
            secondary: 0,
            tertiary: 0,
            fullMark: 25,
        },
        {
            subject: 'ENE',
            primary: 0,
            secondary: 0,
            tertiary: 0,
            fullMark: 25,
        }, {
            subject: 'ENEEnd',
            primary: 0,
            secondary: 0,
            tertiary: 0,
            fullMark: 25,
        },
        {
            subject: 'E',
            primary: 0,
            secondary: 0,
            tertiary: 0,
            fullMark: 25,
        }, {
            subject: 'EEnd',
            primary: 0,
            secondary: 0,
            tertiary: 0,
            fullMark: 25,
        },
        {
            subject: 'ESE',
            primary: 0,
            secondary: 0,
            tertiary: 0,
            fullMark: 25,
        }, 
        {
            subject: 'ESEEnd',
            primary: 0,
            secondary: 0,
            tertiary: 0,
            fullMark: 25,
        },
        {
            subject: 'SE',
            primary: 0,
            secondary: 0,
            tertiary: 0,
            fullMark: 25,
        }, {
            subject: 'SEEnd',
            primary: 0,
            secondary: 0,
            tertiary: 0,
            fullMark: 25,
        },
        {
            subject: 'SSE',
            primary: 0,
            secondary: 0,
            tertiary: 0,
            fullMark: 25,
        }, {
            subject: 'SSEEnd',
            primary: 0,
            secondary: 0,
            tertiary: 0,
            fullMark: 25,
        },
        {
            subject: 'S',
            primary: 0,
            secondary: 0,
            tertiary: 0,
            fullMark: 25,
        }, {
            subject: 'SEnd',
            primary: 0,
            secondary: 0,
            tertiary: 0,
            fullMark: 25,
        },
        {
            subject: 'SSW',
            primary: 0,
            secondary: 0,
            tertiary: 0,
            fullMark: 25,
        }, {
            subject: 'SSWEnd',
            primary: 0,
            secondary: 0,
            tertiary: 0,
            fullMark: 25,
        },
        {
            subject: 'SW',
            primary: 0,
            secondary: 0,
            tertiary: 0,
            fullMark: 25,
        }, {
            subject: 'SWEnd',
            primary: 0,
            secondary: 0,
            tertiary: 0,
            fullMark: 25,
        },
        {
            subject: 'WSW',
            primary: 0,
            secondary: 0,
            tertiary: 0,
            fullMark: 25,
        }, {
            subject: 'WSWEnd',
            primary: 0,
            secondary: 0,
            tertiary: 0,
            fullMark: 25,
        },
        {
            subject: 'W',
            primary: 0,
            secondary: 0,
            tertiary: 0,
            fullMark: 25,
        }, 
        {
            subject: 'WEnd',
            primary: 0,
            secondary: 0,
            tertiary: 0,
            fullMark: 25,
        },
        {
            subject: 'WNW',
            primary: 0,
            secondary: 0,
            tertiary: 0,
            fullMark: 25,
        }, {
            subject: 'WNWEnd',
            primary: 0,
            secondary: 0,
            tertiary: 0,
            fullMark: 25,
        },
        {
            subject: 'NW',
            primary: 0,
            secondary: 0,
            tertiary: 0,
            fullMark: 25,
        }, {
            subject: 'NWEnd',
            primary: 0,
            secondary: 0,
            tertiary: 0,
            fullMark: 25,
        }, {
            subject: 'NNW',
            primary: 0,
            secondary: 0,
            tertiary: 0,
            fullMark: 25,
        }, {
            subject: 'NNWEnd',
            primary: 0,
            secondary: 0,
            tertiary: 0,
            fullMark: 25,
        }
    ];

    const swellArray = [];

    const scale = scaleLog().base(Math.E);
        // const swellDataArray = new Promise((resolve) => {
            if (props.swell) {
            swellTemplateArray.map((swellDirection, index) => {
            const swellData = props.swell; 
                if (swellData.swell.components.tertiary) {
                    swellArray.push({
                        subject: swellDirection.subject,
                        primary: swellDirection.subject === swellData.swell.components.primary.compassDirection ? swellDirection.primary = swellData.swell.components.primary.height : swellDirection.subject === swellData.swell.components.primary.compassDirection.concat('End') ? swellDirection.primary = swellData.swell.components.primary.height : swellDirection.primary = 0,
                        secondary: swellDirection.subject === swellData.swell.components.secondary.compassDirection ? swellDirection.secondary = swellData.swell.components.secondary.height : swellDirection.subject === swellData.swell.components.secondary.compassDirection.concat('End') ? swellDirection.secondary = swellData.swell.components.secondary.height : swellDirection.secondary = 0,
                        tertiary: swellDirection.subject === swellData.swell.components.tertiary.compassDirection ? swellDirection.tertiary = swellData.swell.components.tertiary.height : swellDirection.subject === swellData.swell.components.tertiary.compassDirection.concat('End') ? swellDirection.tertiary = swellData.swell.components.tertiary.height : swellDirection.tertiary = 0,
                        fullMark: swellDirection.fullMark,
                    });
                } 
                else if (swellData.swell.components.secondary) {
                    swellArray.push({
                        subject: swellDirection.subject,
                        primary: swellDirection.subject === swellData.swell.components.primary.compassDirection ? swellDirection.primary = swellData.swell.components.primary.height : swellDirection.subject === swellData.swell.components.primary.compassDirection.concat('End') ? swellDirection.primary = swellData.swell.components.primary.height : swellDirection.primary = 0,
                        secondary: swellDirection.subject === swellData.swell.components.secondary.compassDirection ? swellDirection.secondary = swellData.swell.components.secondary.height : swellDirection.subject === swellData.swell.components.secondary.compassDirection.concat('End') ? swellDirection.secondary = swellData.swell.components.secondary.height : swellDirection.secondary = 0,
                        fullMark: swellDirection.fullMark,
                    });
                } else if (swellData.swell.components.primary) {
                    swellArray.push({
                        subject: swellDirection.subject,
                        primary: swellDirection.subject === swellData.swell.components.primary.compassDirection ? swellDirection.primary = swellData.swell.components.primary.height : swellDirection.subject === swellData.swell.components.primary.compassDirection.concat('End') ? swellDirection.primary = swellData.swell.components.primary.height : swellDirection.primary = 0,
                        fullMark: swellDirection.fullMark,
                    });
                } else {
                    console.log('no swell data');
                }
           
        })
                
     }
    
        return (
            <CustomResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={swellArray}>
                    <PolarGrid gridType="circle" />
                    <PolarAngleAxis  allowDuplicatedCategory={false}  dataKey="subject" />
                    <PolarRadiusAxis orientation="middle" tickCount={4} scale="sqrt" domain={[0, 15]} />
                    <Radar name="Primary" dataKey="primary" stroke="transparent" fill="#8884d8" fillOpacity={0.6} />
                    <Radar name="Secondary" dataKey="secondary" stroke="transparent" fill="#82ca9d" fillOpacity={0.6} />
                    <Radar name="Tertiary" dataKey="tertiary" stroke="transparent" fill="red" fillOpacity={0.6} />
                <Legend />
            </RadarChart>
            </CustomResponsiveContainer>
        );
    }