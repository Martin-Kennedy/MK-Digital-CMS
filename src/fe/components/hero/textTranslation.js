import React, {useState} from "react";
import {useSpring, animated} from "react-spring";
import styled from 'styled-components';

const AnimatedSliderText = styled.div `
        font-family: mr-eaves-modern, sans-serif;
        font-weight: 200;
        font-size: 100px;
        color: #fff;
        text-transform: uppercase;
        white-space: nowrap;
        position: absolute;
        letter-spacing: 1.5rem;
        top: 40%;
        right: 0;
`;

const TextTranslation = ({text}) => {
    const [key,
        setKey] = useState(1);

    const scrolling = useSpring({
        from: {
            transform: "translate(30vw,0)",
            opacity: 0
        },
        to: [
             {
                transform: "translate(0vw,0)",
                opacity: 1
            }, {
                transform: "translate(-30vw,0)"
            }, {
                transform: "translate(-60vw,0)"
            }, {
                transform: "translate(-90vw,0)"
            }, {
                transform: "translate(-120vw,0)"
            }
        ],
        config: {
            tension: 800,
            friction: 800,
            duration: 3500
        },
        loop: false,
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