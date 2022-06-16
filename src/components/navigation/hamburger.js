import React from "react";
import {Wave} from '../designElementComponents/waveSvg'
import styled from 'styled-components';
import { connect } from 'react-redux';
import variables from '../../variables.module.scss';


const StyledHamburger = styled.div`
position: fixed;
margin-right: 3vw;
top: 15px;
right: 0;
width: fit-content;
animation:  750ms ease-in-out;
svg {
    position: absolute;
    bottom: 26px;
    right: 0px;
    height: 26px;
    width: 41px;
    transition: 275ms ease-in;
    
}
svg:nth-child(2) {
    position: absolute;
    bottom: 14px;
    right: 0px;
    transition: 275ms ease-in;
}

`



const mapStateToProps = state => {
    return {
        isIntersecting: state.pages.isIntersecting
    }
}

const Hamburger = (props) => {

    
    const isOpen = props.isOpen;
    
    
    return (
        <StyledHamburger
            className={isOpen  ? 'hamburger-container animateIn' : 'hamburger-container animateOut'}
            >
            <div className={isOpen ? 'circle animateIn' : 'circle animateOut'}>
                <Wave isOpen={isOpen}></Wave>
                <Wave isOpen={isOpen}></Wave>
            </div>
        </StyledHamburger>
         
    )
    
}

export default connect(mapStateToProps)(Hamburger);