import React from "react";
import Hamburger from './hamburger.js'
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import { displayValueArray } from "../../helpers/commonStyledComponents.js";

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
    return (
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
                <HamburgerContainer location={props.location} onClick={''}>
                    <Hamburger />
                </HamburgerContainer>
                    
                
            </Ul>
        </StyledNav>
    )
}

export default Nav;