import React, {useEffect, useRef, useState} from "react";
import styled from 'styled-components';
import {useViewportScroll, motion, useTransform} from "framer-motion";

const Track = styled(motion.div)`

white-space: nowrap;
will-change: transform;
font-family: mr-eaves-modern, sans-serif;
font-weight: 200;
color: ${props => props.black
    ? 'var(--black)'
    : 'var(--white)'};
text-transform: uppercase;
white-space: nowrap;
letter-spacing: 1.5rem;
text-align: center;
`

const Marquee = styled.div `
position: relative;
top: -20px;
height: calc(25vh - 40px);
display: flex;
justify-content: center;      
align-items: center;
`
const Marquee3rd = styled(Marquee)`
top: 0;
height: calc(33vh - 40px);
`

export const TextTranslation = (props) => {

    const [x1,
        setX1] = useState(0);
    const [x2,
        setX2] = useState(0);

    useEffect(() => {

        switch (props.reverse) {
            case(props.reverse === true):
                setX1(-2000);
                setX2(2000);
                break;

            default:
                setX1(2000);
                setX2(-2000);
        }
        switch (props.start) {
            case(props.start != 'undefined'):
                switch (props.start) {
                    case(Number.isSafeInteger(start)):
                        setX1(start);
                }
        }
        switch (props.finish) {
            case(props.finish != 'undefined'):
                switch (props.finish) {
                    case(Number.isSafeInteger(finish)):
                        setX2(finish);
                }
        }

    })

    const marqueeVariants = {
        animate: {
            x: [
                x1, x2
            ],
            opacity: [
                0, 1
            ],
            transition: {
                x: {
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: props.duration
                        ? props.duration
                        : 10,
                    ease: "linear",
                    delay: props.delay
                        ? props.delay
                        : 0
                },
                opacity: {
                    delay: 1,
                    repeat: 0,
                    duration: 2,
                    ease: "linear"
                }
            }
        }
    };

    const marquee = <Marquee >
        <Track
            black={props.black}
            duration={props.duration}
            key={props.text}
            variants={marqueeVariants}
            animate="animate">
            {props.text}
        </Track>
    </Marquee>;

    const marquee3rd = <Marquee3rd >
        <Track
            black={props.black}
            duration={props.duration}
            key={props.text}
            variants={marqueeVariants}
            animate="animate">
            {props.text}
        </Track>
    </Marquee3rd>;

    return (
        <div>
            {props.ratio3rd ? marquee3rd : marquee}
        </div>
    );
};

export const TextScrollTranslation = (props) => {

    const [x1,
        setX1] = useState(0);
    const [x2,
        setX2] = useState(0);
    const [x3,
        setX3] = useState(0)

    useEffect(() => {

        switch (props.reverse) {
            case(props.reverse != 'undefined'):
                switch (props.reverse) {
                    case(props.reverse === true):
                        let x3 = -2 * -1;
                        setX3(x3);
                }
            default:
                setX3(-2);
        }
        switch (props.start) {
            case(props.start != 'undefined'):
                switch (props.start) {
                    case(Number.isSafeInteger(start)):
                        setX1(start);
                }
        }
        switch (props.finish) {
            case(props.finish != 'undefined'):
                switch (props.finish) {
                    case(Number.isSafeInteger(finish)):
                        setX2(finish);
                }
        }
    })
    const {scrollY} = useViewportScroll();
    const x = useTransform(scrollY, value => value * x3);
    const refMarquee = useRef(null);

    return (
        <div>

            <Marquee>
                <Track
                    black={props.black}
                    style={{
                    x,
                    scrollY
                }}
                    ref={refMarquee}>
                    {props.text}
                </Track>
            </Marquee>
        </div>
    );
};
