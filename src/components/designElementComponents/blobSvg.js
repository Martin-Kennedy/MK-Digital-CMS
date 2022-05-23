import React, { useEffect } from 'react';
import styled from 'styled-components';
import {useSpring, animated, useSpringRef} from "react-spring";
import variables from '../../variables.module.scss';

const StyledSVGContainer = styled.div`
width: 600px;
height: 750px;
padding: 0;
margin: 0;
position: absolute;
top: 0;
left: calc(50% - 300px) ;
@media(max-width: ${variables.small}){
    width: 400px;
    height: 500px;
    left: calc(50vw - 215px);
}
@media screen and (min-height: ${variables.large}){
    width: 500px;
    left: calc(50vw - 270px);
}
@media(max-width: ${variables.large})  and (orientation: portrait){
    width: 600px;
    left: calc(50vw - 330px);
}
@media(max-height: ${variables.large}) and (min-width: ${variables.large}){
    width: 535px;
    left: calc(50% - 290px);
}
@media(min-width: ${variables.medium})  and  (min-height: ${variables.large}) and (orientation: portrait){
        width: 875px;
    left: calc(50vw - 465px);
}

@media(min-height: ${variables.medium}) and (max-height: ${variables.large}) and (min-width: ${variables.medium}) and (max-width: ${variables.large}) and (orientation: portrait){
    width: 750px;
    top: 6vh;
    left: calc(50% - 405px);
}
@media(max-width: ${variables.extraSmall}){
    width: 360px;
    left: calc(50vw - 192px);
}
`
const StyledSVG = styled.svg `
position: relative;
width: 100%;
top: 0;

@media(max-width: ${variables.small}){
    top: 0;
}
`

const StyledPath = styled(animated.path)`
transition: transform 1s;
transition-timing-function: cubic-bezier(0.07, 2.0, 1.0, 0.1);
fill: ${props => props.bkgcolor};
`

const SvgBlob = ({slides, bkgcolor, widthHeight}) => {
    const ref = useSpringRef();
    const {x} = useSpring({
        config: { duration: 5000 },
        x: 0,
        ref
    });
    useEffect(() => {
        const previousSlide = slides.previousSlide;
        const currentSlide = slides.currentSlide;

        const animateForward = () => ref
            .current[0]
            .springs
            .x
            .start(0)
            .then(() => {
                x.set(1);
            });

        const animateBackward = () => ref
            .current[0]
            .springs
            .x
            .start(1)
            .then(() => {
                x.set(0);
            });

        const setZero = () => ref
            .current[0]
            .springs
            .x.set(0);

        const setOne = () => ref
            .current[0]
            .springs
            .x.set(1);

            const animationOne = () => {
                    setOne();
                    animateForward();
                
            };
            const animationTwo = () => {
                setZero();
                animateBackward();
            }
            

        currentSlide < previousSlide
            ? animationOne()
            : null;

        

        currentSlide > previousSlide
            ? animationTwo()
            : null;

    })

    return <StyledSVGContainer widthHeight={widthHeight}>
       
        <StyledSVG viewBox="0 0 550 700" x="0px" y="0px" widthHeight={widthHeight} preserveAspectRatio>
        <StyledPath 
            bkgcolor={bkgcolor}
            d={x.to({
            range: [
                0, 0.25, 0.5, 0.75, 1
            ],
            output: [
                "M467.25,717.36c0-30.14,0-187.39,0-207.98c-0.01-41.19,0-157.7,0-198.89c0-18.22,0-" +
                "153.76,0-178.93c-15.93,0-322.19,0.73-342.44,0c1.39,1.89,0.75,141.09,0,178.93c-0." +
                "11,5.55,0,181.65,0,196.2c0,17.12,0.77,177.67,0,210.68C140.42,717.05,455.57,717.3" +
                "6,467.25,717.36L467.25,717.36z",
                "M467.25,717.36c2.86-32.58,60.2-115.98,62.8-207.98c0-109.99-62.8-157.7-62.8-198.8" +
                "9c0-18.22,0-153.76,0-178.93c-15.93,0-322.19,0.73-342.44,0c1.39,1.89,0.04,141.08," +
                "0,178.93c-0.05,43.29-61.3,86.3-63.9,195.76c2.61,118.59,61.25,144.65,63.9,211.11C" +
                "140.42,717.05,455.57,717.36,467.25,717.36L467.25,717.36z",
                "M467.25,717.36c0-30.14,39.34-139.44,60.2-208.51c35.19-92.52,29.97-125.1,0-198.89" +
                "c-6.86-16.88-60.19-153.24-60.19-178.41c-15.93,0-322.19,0.73-342.44,0c1.39,1.89-5" +
                "3.92,145.32-67.81,180.52c-19.55,49.52-26.06,119.89,3.91,196.78c0,17.12,64.67,175" +
                ".49,63.9,208.51C140.42,717.05,455.57,717.36,467.25,717.36L467.25,717.36z",
                "M467.25,717.36c0-30.14,0-187.39,0-207.98c0.25-111.29,83.65-97.97,83.65-207.73c0-" +
                "135.25-79.49-109.47-83.65-170.1c-15.93,0-322.19,0.73-342.44,0c2.56,31.96-80.84,4" +
                "7.86-80.84,164.89c0,101.93,80.8,108.16,80.84,212.94c0,17.12,0.77,174.97,0,207.98" +
                "C140.42,717.05,455.57,717.36,467.25,717.36L467.25,717.36z",
                "M467.25,717.36c0-30.14,0-187.39,0-207.98c-0.01-41.19,0-157.7,0-198.89c0-18.22,0-" +
                "153.76,0-178.93c-15.93,0-322.19,0.73-342.44,0c1.39,1.89,0.75,141.09,0,178.93c-0." +
                "11,5.55,0,181.65,0,196.2c0,17.12,0.77,177.67,0,210.68C140.42,717.05,455.57,717.3" +
                "6,467.25,717.36L467.25,717.36z"
            ]
        })}></StyledPath>

    </StyledSVG>
    </StyledSVGContainer>
}

export default SvgBlob;