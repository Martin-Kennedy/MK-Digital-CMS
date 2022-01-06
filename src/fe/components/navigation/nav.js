import React from "react";
import SlideMenu from './slideMenu.js'
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const StyledNav = styled.nav`
margin-left: auto;
`

const Ul = styled.ul`
    display: flex;
    padding: 0 35px 0 0;
    justify-content: end;
`

const Li = styled.li`
    color: ${props => props.location === "/blog" ? "#1d1e22" : "white"} !important;
`

const StyledLink = styled(Link)`
    font-family: mr-eaves-modern, sans-serif;
    font-weight: 100;
    font-size: 18px;
    margin: 0 15px;
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
                
                <Li location={props.location}>
                    <StyledLink to={'/contributions'} location={props.location.pathname}>
                        Contributions
                    </StyledLink>
                </Li>
                <Li location={props.location}>
                    <StyledLink to='/about' location={props.location.pathname}>
                        Bio
                    </StyledLink>
                </Li>
                <Li location={props.location}>
                    <StyledLink to='/blog' location={props.location.pathname}>
                        Blog
                    </StyledLink>
                </Li>
                <Li location={props.location}>
                    <SlideMenu />
                </Li>
            </Ul>
        </StyledNav>
    )
}

export default Nav;