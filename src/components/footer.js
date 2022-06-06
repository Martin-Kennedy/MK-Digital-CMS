import React, {useState, useEffect} from 'react';
import {Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { WaveLink } from '../components/designElementComponents/waveSvg';
import { displayValueArray } from "../helpers/commonStyledComponents.js";
import styled from 'styled-components';
import MediaQuery from 'react-responsive';

const LinkContainer = styled.div `
display: flex;
flex-direction: row;
width: calc(70% - 2vw);
display: flex;
align-items: center;
justify-content: space-between;
padding-right: 0;
a {
     font-size: 1.5vw;
    font-weight: 300;
    &:hover {
    cursor: pointer;
    svg {
        opacity: 1;
        top: 0;
    }
}
   
    @media(max-width: 758px){
        font-size: 2.5vw;
    }
}
`
const StyledLink = styled(Link)`
display: flex;
position: relative;
align-content: center;
text-align: center;
justify-content: center;
margin: 0 0 0 1vw;
color: ${props => displayValueArray.includes(props.location)
        ? "#1d1e22"
        : "white"} !important;
    svg {
        height: 3vw;
        position: absolute;
        opacity: 0;
        width: 3vw;
        z-index: 0;
        top: -25px;
        transition: .5s ease-in-out; 

        path {
            stroke: ${props => displayValueArray.includes(props.location)
        ? "#1d1e22"
        : "white"} !important;
        }
    }
`
const CopyRightContainer = styled.div `
width: 30%;
margin-right: 2vw;
p {
    font-size: 1.5vw;
    font-weight: 300;
    margin-bottom: 0;
    @media(max-width: 758px){
        font-size: 2.5vw;
    }
}
`

const Footer = (props) => {
    const [isHovered,
        setHover] = useState(null);
    useEffect(() => {
    }, [isHovered])
    return (
        <Row >
            <CopyRightContainer>
                <p>MK Digital © {new Date().getFullYear()}</p>
            </CopyRightContainer>

            <LinkContainer>
                <StyledLink location={props.location}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    to={location => ({
                    ...location,
                    pathname: "/projects"
                })}>Projects
                    <WaveLink isHovered={isHovered}></WaveLink>
                </StyledLink>
                <MediaQuery minWidth={960}>
                    <StyledLink location={props.location}
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                        to={location => ({
                        ...location,
                        pathname: "/blogs"
                        })}>Blog
                        <WaveLink isHovered={isHovered}></WaveLink>
                        </StyledLink>
                </MediaQuery>
                <StyledLink location={props.location}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    to={location => ({
                    ...location,
                    pathname: "/about"
                    })}>About
                    <WaveLink isHovered={isHovered}></WaveLink>
                    </StyledLink>
                <StyledLink location={props.location}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    to={location => ({
                    ...location,
                    pathname: "/charge-and-bless"
                    })}>Surf Forecast
                    <WaveLink isHovered={isHovered}></WaveLink>
                    </StyledLink>
                <MediaQuery minWidth={960}>
                    <StyledLink location={props.location}
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                        to={location => ({
                        ...location,
                        pathname: "/contact"
                        })}>Contact
                        <WaveLink isHovered={isHovered}></WaveLink>
                        </StyledLink>
                </MediaQuery>
            </LinkContainer>
        </Row>
    )
}

export default Footer;