import React, {useEffect, useRef, useState} from "react";
import styled from 'styled-components';
import {useViewportScroll, motion, useTransform} from "framer-motion";

const Track = styled(motion.div)`

white-space: nowrap;
will-change: transform;
font-family: mr-eaves-modern, sans-serif;
font-weight: 200;
font-size: 100px;
color: #fff;
text-transform: uppercase;
white-space: nowrap;
letter-spacing: 1.5rem;
text-align: center;
`

const Marquee = styled(motion.div) `

`

export const TextTranslation = (props) => {

    const [x1,
        setX1] = useState(0);
    const [x2,
        setX2] = useState(0)

    useEffect(() => {

        switch (props.reverse) {
            case(props.reverse != 'undefined'):
                switch (props.reverse) {
                    case(props.reverse === true):
                        const intital1 = 1000;
                        const intital2 = -1000;
                        const x1 = intital1 * -1;
                        const x2 = intital2 * -1;
                        setX1(x1);
                        setX2(x2);
                }
            default:
                setX1(1000);
                setX2(-1000);
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
            transition: {
                x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 10,
                    ease: "linear"
                }
            }
        }
    };
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                duration: 2,
            }
        }
    }
    return (
        <div>
            <Marquee initial="hidden" animate="show" variants={container}>
                <Track variants={marqueeVariants} animate="animate">
                    {props.text}
                </Track>
            </Marquee>
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
