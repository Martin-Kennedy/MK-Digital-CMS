import React, { useState, useEffect } from "react";
import Hamburger from './hamburger.js'
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import { displayValueArray } from "../../helpers/commonStyledComponents.js";
import NavOffCanvasLeft from './slideNavigation';

const StyledNav = styled.nav`
margin-left: auto;
margin-right: 50px;
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

const HamburgerContainer = styled.div`
display: block;
position: absolute;
top: 0;
right: 100px;
z-index: 999;
    color: ${props => displayValueArray.includes(props.location) ? "#1d1e22" : "white"} !important;
    svg {
        path {
            stroke: ${props => displayValueArray.includes(props.location) ? "#1d1e22" : "white"} !important;
        }
    }
    &:hover {
        cursor: pointer;
    }
`

const StyledLink = styled(Link)`
    font-family: mr-eaves-modern, sans-serif;
    font-weight: 100;
    font-size: 18px;
    margin: 0 3rem;
    text-decoration: none !important;
`



const Nav =  (props) => {
    const [isOpen, setOpen] = useState(null);
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "scroll";
        };
    }, [isOpen])
    return (
        <div>
        <StyledNav >
            <Ul >
                <Li location={props.location}>
                    
                    <StyledLink to={'case-studies'} >
                        Projects
                    </StyledLink>
                </Li>
                
                {/* <Li location={props.location}>
                    <StyledLink to={'/contributions'} location={props.location.pathname}>
                        Contributions
                    </StyledLink>
                </Li> */}
                <Li location={props.location}>
                    <StyledLink to='/about' location={props.location}>
                        About
                    </StyledLink>
                </Li>

                {/* <Li location={props.location}>
                    <StyledLink to='/blog' location={props.location.pathname}>
                        Blog
                    </StyledLink>
                </Li> */}
                
                    
                
            </Ul>
            
        </StyledNav>
        <NavOffCanvasLeft isOpen={isOpen}/>
        <HamburgerContainer location={props.location} onClick={() => setOpen(!isOpen)}>
            <Hamburger isOpen={isOpen} />
        </HamburgerContainer>
        </div>
    )
}

export default Nav;