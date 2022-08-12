import React, { useEffect, useState, Fragment } from 'react';
import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import styled from 'styled-components';
import MediaQuery from 'react-responsive';
import variables from '../../variables.module.scss';

export const SwellRadialChart = () => {
    
    const data = [
        {
            subject: 'NStart',
            Primary: 5,
            Secondary: 0,
            Tertiary: 0,
            fullMark: 25,
        },
        {
            subject: 'NEnd',
            Primary: 5,
            Secondary: 0,
            Tertiary: 0,
            fullMark: 25,
        },
        {
            subject: 'NNEStart',
            Primary: 5,
            Secondary: 0,
            Tertiary: 0,
            fullMark: 25,
        },
        {
            subject: 'NNEEnd',
            Primary: 5,
            Secondary: 0,
            Tertiary: 0,
            fullMark: 25,
        }, {
            subject: 'NEStart',
            Primary: 5,
            Secondary: 0,
            Tertiary: 0,
            fullMark: 25,
        },
        {
            subject: 'NEEnd',
            Primary: 5,
            Secondary: 0,
            Tertiary: 0,
            fullMark: 25,
        }, {
            subject: 'ENEStart',
            Primary: 5,
            Secondary: 0,
            Tertiary: 0,
            fullMark: 25,
        },
        {
            subject: 'ENEEnd',
            Primary: 5,
            Secondary: 0,
            Tertiary: 0,
            fullMark: 25,
        }, {
            subject: 'EStart',
            Primary: 5,
            Secondary: 0,
            Tertiary: 0,
            fullMark: 25,
        },
        {
            subject: 'EEnd',
            Primary: 5,
            Secondary: 0,
            Tertiary: 0,
            fullMark: 25,
        }, {
            subject: 'ESEStart',
            Primary: 5,
            Secondary: 0,
            Tertiary: 0,
            fullMark: 25,
        },
        {
            subject: 'ESEEnd',
            Primary: 5,
            Secondary: 0,
            Tertiary: 0,
            fullMark: 25,
        }, {
            subject: 'SSEStart',
            Primary: 5,
            Secondary: 0,
            Tertiary: 0,
            fullMark: 25,
        },
        {
            subject: 'SSEEnd',
            Primary: 5,
            Secondary: 0,
            Tertiary: 0,
            fullMark: 25,
        }, {
            subject: 'SStart',
            Primary: 5,
            Secondary: 0,
            Tertiary: 0,
            fullMark: 25,
        },
        {
            subject: 'SEnd',
            Primary: 5,
            Secondary: 0,
            Tertiary: 0,
            fullMark: 25,
        }, {
            subject: 'SSWStart',
            Primary: 5,
            Secondary: 0,
            Tertiary: 0,
            fullMark: 25,
        },
        {
            subject: 'SSWEnd',
            Primary: 5,
            Secondary: 0,
            Tertiary: 0,
            fullMark: 25,
        }, {
            subject: 'WSWStart',
            Primary: 5,
            Secondary: 0,
            Tertiary: 0,
            fullMark: 25,
        },
        {
            subject: 'WSWEnd',
            Primary: 5,
            Secondary: 0,
            Tertiary: 0,
            fullMark: 25,
        }, {
            subject: 'WStart',
            Primary: 5,
            Secondary: 0,
            Tertiary: 0,
            fullMark: 25,
        },
        {
            subject: 'WEnd',
            Primary: 5,
            Secondary: 0,
            Tertiary: 0,
            fullMark: 25,
        }, {
            subject: 'WNWStart',
            Primary: 5,
            Secondary: 0,
            Tertiary: 0,
            fullMark: 25,
        },
        {
            subject: 'WNWEnd',
            Primary: 5,
            Secondary: 0,
            Tertiary: 0,
            fullMark: 25,
        }, {
            subject: 'NNWStart',
            Primary: 5,
            Secondary: 0,
            Tertiary: 0,
            fullMark: 25,
        },
        {
            subject: 'NNWEnd',
            Primary: 5,
            Secondary: 0,
            Tertiary: 0,
            fullMark: 25,
        },
    ];

    console.log(data);

        return (
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                    <PolarGrid gridType="circle" />
                    <PolarAngleAxis axisLine={false} dataKey="subject" />
                    <PolarRadiusAxis axisLine={false} angle={30} domain={[0, 25]} />
                <Radar name="Primary" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                <Radar name="Secondary" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                <Legend />
            </RadarChart>
            </ResponsiveContainer>
        );
    }