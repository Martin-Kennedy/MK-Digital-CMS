import React, { useRef, useEffect, useState }from "react";
import { useMotionValue, motion, useTransform } from "framer-motion";
import { useWindowDimensions } from '../helpers/utilities';
import styled from 'styled-components';

const TextContainer = styled.div`
 color: ${props => props.white
        ? 'var(--white)'
        : 'var(--black)'};
position: absolute;
font-size: 300px;
white-space: nowrap;`

export default function XaxisScrollComponent(props) {
    const scrollX = useMotionValue(0);

    const widthRef = useRef();
    const [currentWidth, setCurrentWidth] = useState(0);
    const [currentHeight, setCurrentHeight] = useState(0);

    useEffect(() => {
        setCurrentWidth(widthRef.current.clientWidth);
        const trueHeight = widthRef.current.clientHeight * .75; 
        setCurrentHeight(trueHeight);
    }, []);
    const dragAmount = currentWidth - 300;
    

    return (
        <div style={{height: currentHeight - 40}}>
            <motion.div
                style={{
                    position: "relative",
                    cursor: "grab",
                }}
                whileTap={{ cursor: "grabbing" }}
            >
                <motion.div
                    style={{ height: 'auto', x: scrollX, cursor: "url('https://uploads.codesandbox.io/uploads/user/b3e56831-8b98-4fee-b941-0e27f39883ab/Ad1_-cursor.png') 39 39, auto" }}
                    drag="x"
                    whileDrag={{ scale: 0.85 }} 
                    dragConstraints={{
                        left: -dragAmount,
                        right: 0,
                    }}
                    dragTransition={{ timeConstant: 1000 }}
                    transition={{
                        scale: {
                            type: "spring",
                            mass: 1.75 
                        }
                    }}
                >
                    <TextContainer ref={widthRef}
                            >{props.text} </TextContainer>
                        
                </motion.div>
            </motion.div>
        
        </div>
    )
}


