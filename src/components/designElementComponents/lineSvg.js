import React, { useState } from "react";
import { useSpring, animated } from "react-spring";


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
        <svg viewBox={[0,0,1100,50]}>
        <animated.line
            strokeWidth='1'
            strokeDasharray={1144}
            fill='none'
            x1="24.54"
            y1="48.85"
            x2="1168.13"
            y2="48.85"
            {...animatedProps}
        />
        </svg>
        
    );
}

function LineAnimationR2L() {
    const animatedProps = useAnimatedPathR();

    return (
        <svg viewBox={[0, 0, 1100, 50]}>
        <animated.line
            strokeWidth='1'
            fill='none'
            x1="24.54"
            y1="48.85"
            x2="1168.13"
            y2="48.85"
            strokeDasharray={1144}
            {...animatedProps}
        />  
        </svg >
    );
}
export { LineAnimationL2R,
          LineAnimationR2L
        }