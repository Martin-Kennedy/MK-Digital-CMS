import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import styled from 'styled-components';

const AnimatedLineL2R = styled.svg`
    position: absolute; 
    top: 20%;
    padding: 0 40px;
    width: 100%;
    left: 0;
`;

const AnimatedLineR2L = styled.svg`
    position: absolute; 
    top: 60%;
    z-index: 0;
    padding: 0 40px;
    width: 100%;
    left: 0;
`;

function useAnimatedPathL() {
    
    const [length, setLength] = useState(null);
 
        const animatedStyle = useSpring({
            from: { strokeDashoffset: length },
            to: { strokeDashoffset: 0 },
            config: { duration: 2000 },
        });
    

    return {
        style: animatedStyle,
        ref: (ref) => {
            if (ref) {
                setLength(ref.getTotalLength());
            }
        }
    };
}

function useAnimatedPathR() {

    const [length, setLength] = useState(null);

    const animatedStyle = useSpring({
        from: { strokeDashoffset: -length },
        to: { strokeDashoffset:  0},
        config: { duration: 2000 },
        
    });


    return {
        style: animatedStyle,
        ref: (ref) => {
            if (ref) {
                setLength(ref.getTotalLength());
            }
        }
    };
}


function LineAnimationL2R() {
    const animatedProps = useAnimatedPathL();

    return (
        <AnimatedLineL2R viewBox={[0,0,1100,100]}>
        <animated.line
            stroke='white'
            strokeWidth='1'
            strokeDasharray={1144}
            fill='none'
            x1="24.54"
            y1="48.85"
            x2="1168.13"
            y2="48.85"
            {...animatedProps}
        />
        </AnimatedLineL2R>
        
    );
}

function LineAnimationR2L() {
    const animatedProps = useAnimatedPathR();

    return (
        <AnimatedLineR2L viewBox={[0, 0, 1100, 100]}>
        <animated.line
            stroke='white'
            strokeWidth='1'
            fill='none'
            x1="24.54"
            y1="48.85"
            x2="1168.13"
            y2="48.85"
            strokeDasharray={1144}
            {...animatedProps}
        />  
        </AnimatedLineR2L >
    );
}
export { LineAnimationL2R,
          LineAnimationR2L
        }