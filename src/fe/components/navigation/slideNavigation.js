import React from 'react';
import {Row, Col} from 'react-bootstrap';
import styled from 'styled-components';

const SlideNavLeft = styled.nav`
position: absolute;
top: -20px;
left: calc(-70vw - 10px);
width: 70vw;
height: 100vh;
background-color: #000;
transition: .75s ease-in-out;
`

const Ul = styled.ul`
    display: flex;
    padding: 0 35px;
    justify-content: end;
`

const Li = styled.li`
    color: ${props => displayValueArray.includes(props.location) ? "#1d1e22" : "white"} !important;
    svg {
        path {
            stroke: ${props => displayValueArray.includes(props.location) ? "#1d1e22" : "white"} !important;
        }
    }

    &:last-of-type {
        margin-right: 8rem;
    }
`



const NavOffCanvasLeft = (props) => {
    console.log(props)
    return (<SlideNavLeft
        className={props.isOpen ? 'slideInRight' : null}
        >

            </SlideNavLeft>)
}

export default NavOffCanvasLeft;