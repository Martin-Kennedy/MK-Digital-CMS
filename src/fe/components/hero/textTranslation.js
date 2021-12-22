import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import styled from 'styled-components';

const AnimatedSliderText = styled.div`
        font-family: mr-eaves-modern, sans-serif;
        font-weight: 700;
        font-size: 100px;
        color: #fff;
        text-transform: uppercase;
        white-space: nowrap;
        position: absolute;
        top: 33%;
        right: 0;
`;

const TextTranslation = ({ text }) => {
    const [key, setKey] = useState(1);

    const scrolling = useSpring({
        from: { transform: "translate(60%,0)" },
        to: { transform: "translate(-60%,0)" },
        config: { duration: 50000 },
        reset: true,
        //reverse: key % 2 == 0,
        onRest: () => {
            setKey(key + 1);
        }
    });

    return (
        <AnimatedSliderText key={key}>
            <animated.div style={scrolling}>{text}</animated.div>
        </AnimatedSliderText>
    );
};

export default TextTranslation;