import React from 'react';
import {Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
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
    @media(max-width: 758px){
        font-size: 2.5vw;
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

const Footer = () => {

    return (
        <Row >
            <CopyRightContainer>
                <p>MK Digital © {new Date().getFullYear()}</p>
            </CopyRightContainer>

            <LinkContainer>
                <Link
                    to={location => ({
                    ...location,
                    pathname: "/projects"
                })}>Projects</Link>
                <MediaQuery minWidth={960}>
                    <Link
                        to={location => ({
                        ...location,
                        pathname: "/blogs"
                    })}>Blog</Link>
                </MediaQuery>
                <Link
                    to={location => ({
                    ...location,
                    pathname: "/about"
                })}>About</Link>
                <Link
                    to={location => ({
                    ...location,
                    pathname: "/charge-and-bless"
                })}>Surf Forecast</Link>
                <MediaQuery minWidth={960}>
                    <Link
                        to={location => ({
                        ...location,
                        pathname: "/contact"
                    })}>Contact</Link>
                </MediaQuery>
            </LinkContainer>
        </Row>
    )
}

export default Footer;