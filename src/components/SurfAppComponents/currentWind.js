import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Row } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { WindIconSVGPath } from '../designElementComponents/windIconSVGPath';
import variables from '../../variables.module.scss';
import { DegreesToCompassDirection } from '../../helpers/utilities';

const WaveConditionBackdrop = styled.div`
width: 100%;
height: 100%;
padding: 0;
z-index: 5;
svg:nth-child(3){
        opacity: 1;
        
    }
}
`;

const WindConditionBackdropMultiView = styled.div`
width: 100%;
height: 100%;
padding: 0;
z-index: 5;
position:relative;
svg:nth-child(3){
        opacity: 1;
        
    }
}
`;

const WindIcon = styled.svg`
  width: 2.25vh;
  height: 2.25vh;
  position: relative;
  top: -2px;
  right: 0;
  padding: 0;
  path {
    fill: rgba(255, 255, 255, 0.25);
  }
  @media (max-width: ${variables.large}) {
    height: 3vw;
    width: 3vw;
    position: unset;
  }
`;

const Title = styled.p`
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.6);
  margin-left: 0;
  margin-top: 0;
  display: block;
  margin-bottom: 1vh;
  width: auto;
  font-size: 0.75vw;
  height: fit-content;
  line-height: 0.65vw;
  @media (max-width: ${variables.large}) {
    font-size: max(2vw, 0.9rem);
    line-height: 2vw;
  }
`;

const StyledCompassBase = styled.svg`
  width: 80%;
  height: 80%;
  left: 10%;
  top: 10%;
  z-index: 2;
  position: absolute;
  opacity: 0.3;

  path {
    fill: var(--white);
  }
  @media (max-width: ${variables.large}) {
    width: 80%;
    height: 80%;
    left: 10%;
    top: 10%;
  }
`;

const StyledCompassArrow = styled(motion.svg)`
  width: 80%;
  height: 80%;
  left: 10%;
  top: 10%;
  z-index: 3;
  position: absolute;
  opacity: 0.8;

  transform-origin: center center !important;
  path {
    fill: var(--white);
  }
  @media (max-width: ${variables.large}) {
    width: 80%;
    height: 80%;
    z-index: 3;
    position: absolute;
    opacity: 0.8;
    left: 10%;
    top: 10%;
  }
`;

const StyledCompassArrowMulti = styled(StyledCompassArrow)`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;

const StyledCompassBaseMulti = styled(StyledCompassBase)`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;

const WindSpeed = styled.div`
  position: absolute;
  opacity: 0.8;
  text-align: center;
  padding: 5vh;
  left: 10%;
  top: 10%;
  z-index: 4;
  width: 80%;
  height: 80%;
  color: var(--white);
  text-transform: uppercase;
  p {
    font-size: 3.5vh;
    font-weight: 700;
    width: 100%;
    margin: 0;
    letter-spacing: 0.3vh;
    line-height: 3.5vh;
    top: 4px;
    position: relative;
    @media (max-width: ${variables.large}) {
      position: unset;
    }
  }
  span {
    font-size: 1.55vh;
    font-weight: 500;
    width: 100%;
    line-height: 1.55vh;
    top: -4px;
    position: relative;
    @media (max-width: ${variables.large}) {
      position: unset;
    }
  }
  @media (max-width: ${variables.large}) {
    position: absolute;
    opacity: 0.8;
    text-align: center;
    padding: 0;
    left: 10%;
    top: 10%;
    z-index: 4;
    width: 80%;
    height: 80%;
    justify-content: center;
    flex-direction: column;
    display: flex;
  }
`;

const WindSpeedMultiView = styled.div`
  position: relative;
  opacity: 0.8;
  text-align: center;
  padding: 0;
  z-index: 4;
  display: flex;
  flex-flow: wrap;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  align-content: center;
  color: var(--white);
  text-transform: uppercase;
  p {
    font-size: 1.75vh;
    font-weight: 700;
    width: 100%;
    margin: 0;
    letter-spacing: 0.3vh;
    line-height: 1.75vh;
    position: inherit;
    @media (max-width: ${variables.large}) {
      position: unset;
      font-size: 2.1vh;
      line-height: 2.1vh;
    }
  }
  span {
    font-size: 0.65vh;
    font-weight: 500;
    width: 100%;
    line-height: 0.55vh;
    position: inherit;
    @media (max-width: ${variables.large}) {
      position: unset;
      font-size: 1vh;
      line-height: 1vh;
    }
  }
  @media (max-width: ${variables.large}) {
    position: absolute;
    opacity: 0.8;
    text-align: center;
    padding: 0;
    left: 10%;
    top: 10%;
    z-index: 4;
    width: 80%;
    height: 80%;
    justify-content: center;
    flex-direction: column;
    display: flex;
  }
`;

const TitleIconRow = styled(Row)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 0;
  padding: 0;
  position: relative;
  top: -3vh;
  p {
    padding: 0 0 0 0.8vw;
    margin: 0;
  }
  svg {
    padding: 0;
    margin: 0 0.8vw 0 0;
  }
  @media (max-width: ${variables.large}) {
    font-size: 2vw;
    margin: 1vw;
    height: 2vw;
    width: calc(100% - 2vw);
  }
`;

const BottomRow = styled(Row)`
  width: 100%;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  margin: 0;
  padding: 0;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1vh;
  font-size: 0.75vw;
  height: fit-content;
  line-height: 0.65vw;
  @media (max-width: ${variables.large}) {
    font-size: 2vw;
    margin: 1vw;
    height: 2vw;
    width: calc(100% - 2vw);
  }
  p:first-child {
    padding: 0 0 0 0.8vw;
    margin: 0;
    width: 50%;
    text-align: left;
  }
  p:nth-child(2) {
    padding: 0 0.8vw 0 0;
    margin: 0;
    width: 50%;
    text-align: right;
    font-size: 0.5vw;
    @media (max-width: ${variables.large}) {
      font-size: 2vw;
    }
  }
  span {
    padding: 0 0 0 0.4vw;
    font-weight: 600;
    opacity: 0.6;
    font-size: 0.75vw;
    @media (max-width: ${variables.large}) {
      font-size: 2vw;
    }
  }
`;

export const CurrWindDataComponent = (props) => {
  const finalDeg =
    Object.prototype.toString.call(props.weatherForecast) ===
    '[object Object]'
      ? props.weatherForecast.windDirection - 180
      : props.msWindForecast.windDirection - 180;
  const windSpeed =
    Object.prototype.toString.call(props.weatherForecast) ===
    '[object Object]'
      ? parseInt(props.weatherForecast.windSpeed)
      : parseInt(props.msWindForecast.windSpeed);
  const windGust = parseInt(props.msWindForecast.windGusts);
  const direction =
    Object.prototype.toString.call(props.weatherForecast) ===
    '[object Object]'
      ? props.weatherForecast.windDirection - 90
      : props.msWindForecast.windDirection - 90;
  const rotationArr = [-40, -90, -40, 0, 90, finalDeg];

  return (
    <WaveConditionBackdrop>
      <TitleIconRow>
        <Title>Wind</Title>
        <WindIcon x="0px" y="0px" viewBox="0 0 100 100">
          <WindIconSVGPath />
        </WindIcon>
      </TitleIconRow>

      <StyledCompassBase
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 2000 2000"
      >
        <g>
          <path
            d="M992.74,44.07c-531.88,0-963.04,431.17-963.04,963.04c0,531.84,431.17,963.04,963.04,963.04
		s963.04-431.2,963.04-963.04C1955.78,475.23,1524.61,44.07,992.74,44.07z M1635.57,1624.7l-37.52-37.5l-25.22,25.22l37.5,37.52
		c-47.44,45.59-99.76,86.15-156.36,120.44l-26.71-46.27l-30.89,17.84l26.68,46.21c-57.22,31.61-118.34,56.95-182.35,75.44
		l-13.81-51.48l-34.46,9.23l13.82,51.56c-49.31,12.09-125.99,21.02-178.11,24.57l-35.41-123.52l-32.36,123.52
		c-52.11-3.55-131.9-12.49-181.18-24.6l13.81-51.56l-34.46-9.23l-13.78,51.48c-64.02-18.49-125.14-43.84-182.36-75.44l26.68-46.21
		l-30.89-17.84l-26.7,46.27c-56.59-34.29-108.92-74.85-156.36-120.44l37.52-37.52l-25.23-25.22l-37.52,37.5
		c-45.59-47.44-86.15-99.77-120.42-156.36l46.27-26.71l-17.84-30.89l-46.23,26.7c-31.59-57.25-56.95-118.34-75.44-182.38
		l51.47-13.78l-9.23-34.46l-51.52,13.81c-12.09-49.29-23.12-131.07-26.67-183.2l125.58-30.31L100.3,982.65
		c3.55-52.11,14.57-139.84,26.68-189.12l51.52,13.81l9.23-34.46l-51.47-13.78c18.49-64.05,43.85-125.16,75.46-182.38l46.21,26.68
		l17.84-30.89l-46.27-26.71c34.26-56.59,74.81-108.91,120.39-156.35l37.54,37.54l25.23-25.23l-37.54-37.54
		c47.44-45.59,99.77-86.13,156.37-120.39l26.7,46.27l30.89-17.84l-26.68-46.23c57.22-31.59,118.34-56.95,182.36-75.46l13.78,51.47
		l34.46-9.23l-13.78-51.52c49.27-12.09,100.16-20.05,152.27-23.59l61.25,122.5l61.25-122.5c52.11,3.55,103.01,11.47,152.27,23.59
		l-13.81,51.52l34.46,9.23l13.81-51.47c64,18.51,125.12,43.88,182.35,75.46l-26.68,46.23l30.89,17.84l26.71-46.27
		c56.6,34.26,108.93,74.81,156.37,120.39l-37.52,37.54l25.22,25.23l37.54-37.54c45.57,47.44,86.13,99.76,120.39,156.36l-46.24,26.7
		l17.84,30.89l46.19-26.68c31.63,57.22,56.98,118.34,75.48,182.38l-51.48,13.78l9.23,34.46l51.54-13.81
		c12.09,49.29,23.53,139.61,27.08,191.73l-126.04,21.84l126.04,32.9c-3.55,52.11-15.01,131.34-27.12,180.62l-51.54-13.81
		l-9.23,34.46l51.48,13.78c-18.51,64.05-43.85,125.14-75.46,182.38l-46.21-26.7l-17.84,30.89l46.27,26.71
		C1721.73,1524.95,1681.18,1577.28,1635.57,1624.7L1635.57,1624.7z"
          />
          <g>
            <path
              d="M377.03,1066.92h-18.98l-25.37-76.55c-1.07-2.77-2.56-9.17-2.56-9.81c-0.21,0.21-1.92,7.25-2.77,9.81l-25.37,76.55H283
			l-43.92-127.94h25.8l25.8,80.39c0.85,2.77,2.35,11.09,2.56,11.94l3.2-11.94l24.73-80.39h18.55l24.95,80.39
			c0.85,2.99,2.99,11.94,2.99,11.94s1.49-8.96,2.56-11.94l25.59-80.39h24.95L377.03,1066.92z"
            />
          </g>
          <g>
            <path d="M1028.67,384.16l-66.95-84.44v84.44h-23.24V256.23h18.12l66.95,84.44v-84.44h23.24v127.94H1028.67z" />
          </g>
          <g>
            <path d="M1657.22,1066.92V938.98h83.37v20.26h-57.36v30.06h46.7v20.26h-46.7v37.1h57.36v20.26H1657.22z" />
          </g>
          <g>
            <path
              d="M991.57,1749.8c-21.32,0-36.67-8.32-45.42-15.99l5.97-20.47c8.53,8.1,21.96,17.27,39.45,17.27c12.79,0,22.6-6.4,22.6-17.7
			c0-10.66-5.97-16.21-26.87-21.32c-26.87-6.61-37.53-20.9-37.53-39.23c0-20.9,16.63-36.04,44.14-36.04
			c15.78,0,29.85,5.97,38.38,12.58l-5.54,18.12c-8.96-5.97-21.75-11.09-33.05-11.09c-12.58,0-20.04,5.54-20.04,14.71
			c0,7.46,4.48,13.22,21.96,17.48c29.85,7.46,42.65,20.04,42.65,42.22C1038.26,1737.86,1015.66,1749.8,991.57,1749.8z"
            />
          </g>
        </g>
      </StyledCompassBase>
      <StyledCompassArrow
        whileHover={{
          opacity: 1,
        }}
        initial={{
          rotate: 0,
        }}
        animate={{
          rotate: rotationArr,
        }}
        exit={{
          rotate: rotationArr,
        }}
        transition={{
          ease: 'linear',
          duration: 1.5,
          times: [0, 0.2, 0.3, 0.4, 0.5, 0.6, 1],
        }}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 2000 2000"
      >
        <g>
          <path
            d="M975.93,556.92c6.24-0.26,12.51-0.4,18.82-0.4c6.31,0,12.58,0.14,18.82,0.4V168.8c19.62,0.94,38.75,3.82,57.23,8.45
		L995.45,41.54l-76.76,138.24c18.44-5.28,37.57-8.8,57.23-10.37V556.92z"
          />
          <path
            d="M1013.57,1824.27v-372.22c-6.24,0.26-12.51,0.4-18.82,0.4c-6.31,0-12.58-0.14-18.82-0.4v372.22
		c-31.6,8.34-54.98,37.17-54.98,71.36c0,40.69,33.1,73.8,73.8,73.8c40.69,0,73.8-33.1,73.8-73.8
		C1068.54,1861.44,1045.17,1832.61,1013.57,1824.27z M994.75,1929.42c-18.63,0-33.8-15.16-33.8-33.8s15.16-33.8,33.8-33.8
		s33.8,15.16,33.8,33.8S1013.38,1929.42,994.75,1929.42z"
          />
        </g>
      </StyledCompassArrow>
      <WindSpeed>
        <p>{windSpeed}</p>
        <span>MPH</span>
      </WindSpeed>
      <BottomRow>
        <p>
          <span>{DegreesToCompassDirection(direction + 90)}</span>
        </p>
        {!isNaN(windGust) ? (
          <p>
            Gusts:
            <span>{parseInt(windGust)}</span>
          </p>
        ) : null}
      </BottomRow>
    </WaveConditionBackdrop>
  );
};

export const CurrWindDataComponentMulti = (props) => {
  const finalDeg = props.msWindForecast.windDirection - 180;
  const windSpeed = props.weatherForecast
    ? parseInt(props.weatherForecast.current.wind_speed)
    : parseInt(props.msWindForecast.windSpeed);
  const rotationArr = [-40, -90, -40, 0, 90, finalDeg];

  return (
    <WindConditionBackdropMultiView>
      <StyledCompassBaseMulti
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 2000 2000"
      >
        <g>
          <path
            d="M992.74,44.07c-531.88,0-963.04,431.17-963.04,963.04c0,531.84,431.17,963.04,963.04,963.04
		s963.04-431.2,963.04-963.04C1955.78,475.23,1524.61,44.07,992.74,44.07z M1635.57,1624.7l-37.52-37.5l-25.22,25.22l37.5,37.52
		c-47.44,45.59-99.76,86.15-156.36,120.44l-26.71-46.27l-30.89,17.84l26.68,46.21c-57.22,31.61-118.34,56.95-182.35,75.44
		l-13.81-51.48l-34.46,9.23l13.82,51.56c-49.31,12.09-125.99,21.02-178.11,24.57l-35.41-123.52l-32.36,123.52
		c-52.11-3.55-131.9-12.49-181.18-24.6l13.81-51.56l-34.46-9.23l-13.78,51.48c-64.02-18.49-125.14-43.84-182.36-75.44l26.68-46.21
		l-30.89-17.84l-26.7,46.27c-56.59-34.29-108.92-74.85-156.36-120.44l37.52-37.52l-25.23-25.22l-37.52,37.5
		c-45.59-47.44-86.15-99.77-120.42-156.36l46.27-26.71l-17.84-30.89l-46.23,26.7c-31.59-57.25-56.95-118.34-75.44-182.38
		l51.47-13.78l-9.23-34.46l-51.52,13.81c-12.09-49.29-23.12-131.07-26.67-183.2l125.58-30.31L100.3,982.65
		c3.55-52.11,14.57-139.84,26.68-189.12l51.52,13.81l9.23-34.46l-51.47-13.78c18.49-64.05,43.85-125.16,75.46-182.38l46.21,26.68
		l17.84-30.89l-46.27-26.71c34.26-56.59,74.81-108.91,120.39-156.35l37.54,37.54l25.23-25.23l-37.54-37.54
		c47.44-45.59,99.77-86.13,156.37-120.39l26.7,46.27l30.89-17.84l-26.68-46.23c57.22-31.59,118.34-56.95,182.36-75.46l13.78,51.47
		l34.46-9.23l-13.78-51.52c49.27-12.09,100.16-20.05,152.27-23.59l61.25,122.5l61.25-122.5c52.11,3.55,103.01,11.47,152.27,23.59
		l-13.81,51.52l34.46,9.23l13.81-51.47c64,18.51,125.12,43.88,182.35,75.46l-26.68,46.23l30.89,17.84l26.71-46.27
		c56.6,34.26,108.93,74.81,156.37,120.39l-37.52,37.54l25.22,25.23l37.54-37.54c45.57,47.44,86.13,99.76,120.39,156.36l-46.24,26.7
		l17.84,30.89l46.19-26.68c31.63,57.22,56.98,118.34,75.48,182.38l-51.48,13.78l9.23,34.46l51.54-13.81
		c12.09,49.29,23.53,139.61,27.08,191.73l-126.04,21.84l126.04,32.9c-3.55,52.11-15.01,131.34-27.12,180.62l-51.54-13.81
		l-9.23,34.46l51.48,13.78c-18.51,64.05-43.85,125.14-75.46,182.38l-46.21-26.7l-17.84,30.89l46.27,26.71
		C1721.73,1524.95,1681.18,1577.28,1635.57,1624.7L1635.57,1624.7z"
          />
          <g>
            <path
              d="M377.03,1066.92h-18.98l-25.37-76.55c-1.07-2.77-2.56-9.17-2.56-9.81c-0.21,0.21-1.92,7.25-2.77,9.81l-25.37,76.55H283
			l-43.92-127.94h25.8l25.8,80.39c0.85,2.77,2.35,11.09,2.56,11.94l3.2-11.94l24.73-80.39h18.55l24.95,80.39
			c0.85,2.99,2.99,11.94,2.99,11.94s1.49-8.96,2.56-11.94l25.59-80.39h24.95L377.03,1066.92z"
            />
          </g>
          <g>
            <path d="M1028.67,384.16l-66.95-84.44v84.44h-23.24V256.23h18.12l66.95,84.44v-84.44h23.24v127.94H1028.67z" />
          </g>
          <g>
            <path d="M1657.22,1066.92V938.98h83.37v20.26h-57.36v30.06h46.7v20.26h-46.7v37.1h57.36v20.26H1657.22z" />
          </g>
          <g>
            <path
              d="M991.57,1749.8c-21.32,0-36.67-8.32-45.42-15.99l5.97-20.47c8.53,8.1,21.96,17.27,39.45,17.27c12.79,0,22.6-6.4,22.6-17.7
			c0-10.66-5.97-16.21-26.87-21.32c-26.87-6.61-37.53-20.9-37.53-39.23c0-20.9,16.63-36.04,44.14-36.04
			c15.78,0,29.85,5.97,38.38,12.58l-5.54,18.12c-8.96-5.97-21.75-11.09-33.05-11.09c-12.58,0-20.04,5.54-20.04,14.71
			c0,7.46,4.48,13.22,21.96,17.48c29.85,7.46,42.65,20.04,42.65,42.22C1038.26,1737.86,1015.66,1749.8,991.57,1749.8z"
            />
          </g>
        </g>
      </StyledCompassBaseMulti>
      <StyledCompassArrowMulti
        whileHover={{
          opacity: 1,
        }}
        initial={{
          rotate: 0,
        }}
        animate={{
          rotate: rotationArr,
        }}
        exit={{
          rotate: rotationArr,
        }}
        transition={{
          ease: 'linear',
          duration: 1.5,
          times: [0, 0.2, 0.3, 0.4, 0.5, 0.6, 1],
        }}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 2000 2000"
      >
        <g>
          <path
            d="M975.93,556.92c6.24-0.26,12.51-0.4,18.82-0.4c6.31,0,12.58,0.14,18.82,0.4V168.8c19.62,0.94,38.75,3.82,57.23,8.45
		L995.45,41.54l-76.76,138.24c18.44-5.28,37.57-8.8,57.23-10.37V556.92z"
          />
          <path
            d="M1013.57,1824.27v-372.22c-6.24,0.26-12.51,0.4-18.82,0.4c-6.31,0-12.58-0.14-18.82-0.4v372.22
		c-31.6,8.34-54.98,37.17-54.98,71.36c0,40.69,33.1,73.8,73.8,73.8c40.69,0,73.8-33.1,73.8-73.8
		C1068.54,1861.44,1045.17,1832.61,1013.57,1824.27z M994.75,1929.42c-18.63,0-33.8-15.16-33.8-33.8s15.16-33.8,33.8-33.8
		s33.8,15.16,33.8,33.8S1013.38,1929.42,994.75,1929.42z"
          />
        </g>
      </StyledCompassArrowMulti>
      <WindSpeedMultiView>
        <p>{windSpeed}</p>
        <span>MPH</span>
      </WindSpeedMultiView>
    </WindConditionBackdropMultiView>
  );
};
