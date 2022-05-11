import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


const LinkContainer = styled.div`
display: flex;
flex-direction: row;
width: calc(70% - 2vw);
display: flex;
align-items: center;
justify-content: space-between;
padding-right: 0;
a {
     font-size: 1vw;
    font-weight: 300;
}
`

const CopyRightContainer = styled.div`
width: 30%;
margin-right: 2vw;
p {
        font-size: 1vw;
    font-weight: 300;
}
`

const Footer = () => {

    return (
        <Row >
                <CopyRightContainer>
                <p>MK Digital © {new Date().getFullYear()}</p>
                </CopyRightContainer>
                
                <LinkContainer>
                <Link to={location => ({ ...location, pathname: "/projects" })} >Projects</Link>
                <Link to={location => ({ ...location, pathname: "/blogs" })} >Blog</Link>
                <Link to={location => ({ ...location, pathname: "/about" })} >About</Link>
                <Link to={location => ({ ...location, pathname: "/charge-and-bless" })} >Surf Forecast</Link>
                <Link to={location => ({ ...location, pathname: "/contact" })} >Contact</Link>
                </LinkContainer>
        </Row>
    )
} 





export default Footer;