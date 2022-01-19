import React from "react";
import Wave from '../designElementComponents/waveSvg'
import styled from 'styled-components';
// best seen at 1500px or less

const SlideMenuContainer = styled.div`
width: 50px;
height: 50px;
display: block;
position: relative;
top: -20px;
svg {
    position: absolute;
    bottom: 15px;
    right: 0px;
    height: 26px;
    width: 41px;
}
svg:nth-child(2) {
    position: absolute;
    bottom: 3px;
    right: 0px;
}
`



const SlideMenu = (props) => {
    return (
        <SlideMenuContainer>
            <Wave></Wave>
            <Wave></Wave>
        </SlideMenuContainer>
         
    )
}

export default SlideMenu;