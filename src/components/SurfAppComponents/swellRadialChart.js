import React, { useEffect, useState, Fragment } from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  Legend,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';
import { scaleLog } from 'd3-scale';

import styled from 'styled-components';
import MediaQuery from 'react-responsive';
import variables from '../../variables.module.scss';
import {
  DegreesToCompassDirection,
  MetersToFeet,
} from '../../helpers/utilities';

const CustomResponsiveContainer = styled(ResponsiveContainer)`
  margin: auto;
`;

export const SwellRadialChart = (props) => {
  const swellTemplateArray = [
    {
      subject: 'N',
      primary: 0,
      secondary: 0,
      tertiary: 0,
      fullMark: 25,
    },
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
    {
      subject: 'NWEnd',
      primary: 0,
      secondary: 0,
      tertiary: 0,
      fullMark: 25,
    },
    {
      subject: 'NNW',
      primary: 0,
      secondary: 0,
      tertiary: 0,
      fullMark: 25,
    },
    {
      subject: 'NNWEnd',
      primary: 0,
      secondary: 0,
      tertiary: 0,
      fullMark: 25,
    },
  ];

  const swellArray = [];

  // const swellDataArray = new Promise((resolve) => {
  if (props.data && props.data.swellDirection) {
    swellTemplateArray.map((swellDirection, index) => {
      const swellData = props.data;

      if (swellData.swellDirection) {
        swellArray.push({
          subject: swellDirection.subject,
          primary:
            swellDirection.subject ===
            DegreesToCompassDirection(swellData.swellDirection)
              ? (swellDirection.primary = MetersToFeet(
                  swellData.swellHeight
                ))
              : swellDirection.subject ===
                DegreesToCompassDirection(
                  swellData.swellDirection
                ).concat('End')
              ? (swellDirection.secondary = MetersToFeet(
                  swellData.swellHeight
                ))
              : (swellDirection.secondary = 0),
          secondary:
            swellDirection.subject ===
            DegreesToCompassDirection(swellData.waveDirection)
              ? (swellDirection.secondary = MetersToFeet(
                  swellData.waveHeight
                ))
              : swellDirection.subject ===
                DegreesToCompassDirection(
                  swellData.waveDirection
                ).concat('End')
              ? (swellDirection.secondary = MetersToFeet(
                  swellData.waveHeight
                ))
              : (swellDirection.secondary = 0),
          fullMark: swellDirection.fullMark,
        });
      } else {
        console.log('no swell data');
      }
    });
  }

  return (
    <CustomResponsiveContainer
      className="swellRadialChart"
      width="100%"
      height="100%"
    >
      <RadarChart
        cx="50%"
        cy="50%"
        outerRadius="80%"
        data={swellArray}
      >
        <PolarGrid gridType="circle" />
        <PolarAngleAxis
          allowDuplicatedCategory={false}
          dataKey="subject"
        />
        <PolarRadiusAxis
          orientation="middle"
          tickCount={4}
          scale="sqrt"
          domain={[0, 20]}
        />
        <Radar
          className="primaryRadar"
          name="Primary Swell"
          dataKey="primary"
          stroke="#40BCF0"
          fill="#40BCF0"
          fillOpacity={1}
        />
        <Radar
          className="secondaryRadar"
          name="Signifigant Wave"
          dataKey="secondary"
          stroke="#307AD9"
          fill="#307AD9"
          fillOpacity={0.85}
        />
        <Legend />
      </RadarChart>
    </CustomResponsiveContainer>
  );
};
