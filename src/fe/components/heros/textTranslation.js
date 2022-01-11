import React, {useRef} from "react";
import styled from 'styled-components';
import {
    useViewportScroll,
    motion,
    useTransform
} from "framer-motion";

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

const Marquee = styled.div`
  position: relative;
  width: 100vw;
  max-width: 100%;
  height: 206px;
  overflow-x: hidden;
`




export const TextTranslation = ({text}) => {

    
    const marqueeVariants = {
        animate: {
            x: [1000, -1000],
            transition: {
                x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 10,
                    ease: "linear",
                },
            },
        },
    };
    return (
        <div>
            <Marquee>
                <Track
                    variants={marqueeVariants}
                    animate="animate" 
                    >
                    {text}
                    </Track>
            </Marquee>
        </div>
    );
};


export const TextScrollTranslation = ({ text }) => {
    const { scrollY } = useViewportScroll();
    const x = useTransform(scrollY, value => value * -2);
    const refMarquee = useRef(null);

    const marqueeVariants = {
        animate: {
            x: [1000, -1000],
            transition: {
                x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 10,
                    ease: "linear",
                },
            },
        },
    };


    return (
        <div>
            <Marquee>
                <Track
                    style={{ x, scrollY }}
                    ref={ refMarquee }
                    >
                        
                    {text}
                </Track>
            </Marquee>
        </div>
    );
};
