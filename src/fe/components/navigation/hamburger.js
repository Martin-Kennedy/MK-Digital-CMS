import React, {useState} from "react";
import { motion } from "framer-motion";
import Wave from '../designElementComponents/waveSvg'
import styled from 'styled-components';


const HamburgerContainer = styled.div`
width: 50px;
height: 50px;
display: block;
position: relative;
top: -20px;
transition: 350ms ease-in;
svg {
    position: absolute;
    bottom: 15px;
    right: 0px;
    height: 26px;
    width: 41px;
    transition: 350ms ease-in;
    
}
svg:nth-child(2) {
    position: absolute;
    bottom: 3px;
    right: 0px;
    transition: 350ms ease-in;
}
`



const Hamburger = (props) => {
    const [isOpen, setOpen] = useState(false);
    return (
        <HamburgerContainer 
            isOpen={isOpen}
            onClick={() => setOpen(!isOpen)}
            className={isOpen ? 'animate' : null}
            >
            <Wave isOpen={isOpen}></Wave>
            <Wave isOpen={isOpen}></Wave>
        </HamburgerContainer>
         
    )
    
}

export default Hamburger;