import React, { useRef, useEffect, useState }from "react";
import { useMotionValue, motion, useTransform } from "framer-motion";
import { useWindowDimensions } from '../helpers/utilities'



export default function XaxisScrollContainer(props) {
    const scrollX = useMotionValue(0);

    

    const widthRef = useRef();
    const [currentWidth, setCurrentWidth] = useState(0);
    const [currentHeight, setCurrentHeight] = useState(0)
    const  windowWidth  = useWindowDimensions();
    


            
        const width = useTransform(
            scrollX,
            [currentWidth, 0],
            ["calc(0% - 0px)", "calc(100vw - 20px)"]
        )

    useEffect(() => {
        setCurrentWidth(widthRef.current.clientWidth);
        setCurrentHeight(widthRef.current.clientHeight);
        
        
    }, []);
    const dragAmount = currentWidth - 300;
    

    return (
        <div style={{height: currentHeight}}>
            <motion.div
                style={{
                    borderRadius: 30,
                    position: "relative",
                    cursor: "grab",
                }}
                whileTap={{ cursor: "grabbing" }}
            >
                <motion.div
                    style={{  height: 'auto', x: scrollX }}
                    drag="x"
                    whileDrag={{ scale: 0.85 }} 
                    dragConstraints={{
                        left: -dragAmount,
                        right: 0,
                    }}
                    dragTransition={{ timeConstant: 1000 }}
                    transition={{
                        scale: {
                            delay: .25,
                            type: "spring",
                            mass: 1.75 
                        }
                    }}
                >
                   {console.log(dragAmount)}
                    <div ref={widthRef}
                                style={{
                                    borderRadius: 20,
                                    color: "#fff",
                                    position: "absolute",
                                    left: 100,
                                    fontSize: "300px",
                                    whiteSpace: "nowrap"
                                }}
                            >WORK HARD PLAY HARD SUCK DICK</div>
                        
                </motion.div>
            </motion.div>
        
        </div>
    )
}


