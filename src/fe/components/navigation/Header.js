import React from 'react';
import {Link} from 'react-router-dom';
import {Col} from 'react-bootstrap';
import Nav from './nav.js';
import styled from 'styled-components';



const HeaderWrapper = styled.div`
    color: ${props => props.location === "/blog" ? "#1d1e22" : "white"};
    width: 100%;
    padding: 0px 10px 20px;
    margin: 20px 10px 10px;
    display: flex;
    align-items: center;
    height: 100px;
    position: absolute;
  `;

const LogoCol = styled(Col)`
    display: flex;
    align-items: center;
    `;

const LogoLine = styled.div`
    width: 13px;
    height: 90px;
    border-left: 1px solid ${props => props.location === "/blog" ? "#1d1e22" : "white"};
    `;

const LogoText = styled.div`
    text-align: left;
    font-family: mr-eaves-modern; sans-serif;
    font-weight: 100;
    font-size: 25px;
    margin-top: 0;
    color: ${props => props.location === "/blog" ? "#1d1e22" : "white"};
    text-transform: uppercase;
    `;

const Logo = styled.div`
    background-image: ${props => props.location === "/blog" ? "url('logoDark.png')" : "url('logo.png')"};
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    width: 101px;
    height: 68px;
    display: inline-block;
    float: left;
    margin: 0 13px 0 20px;
`;
const StlyedHeaderLink = styled(Link)`
color: ${props => props.location === "/blog" ? "#1d1e22" : "white"};
text-decoration: none;
display: contents;
align-items: center;

`



const HeaderComponent = (props) => {
  
    return (
      <HeaderWrapper location={props.location.pathname}>
          <LogoCol xs={6}>
          <StlyedHeaderLink to={'/'} >
            <Logo location={props.location.pathname}></Logo>
            <LogoLine location={props.location.pathname}></LogoLine>
          <LogoText location={props.location.pathname}>MK Digital</LogoText>
          </StlyedHeaderLink>
            </LogoCol>
            <Col xs={6}>
            <Nav location={props.location.pathname}/>
            </Col>
      </HeaderWrapper>
    );
};

export default HeaderComponent;
