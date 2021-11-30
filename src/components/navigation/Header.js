import React from 'react';
import {Col} from 'react-bootstrap';
import Nav from './nav.js';
import styled from 'styled-components';

const HeaderWrapper = styled.div`
    color: #fff;
    width: 100%;
    padding: 20px 10px 10px;
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

const LogoLine = styled.div `
    width: 13px;
    height: 100px;
    border-left: 1px solid #fff;
    `;

const LogoText = styled.div `
    text-align: left;
    font-family: mr-eaves-modern; sans-serif;
    font-weight: 100;
    font-size: 25px;
    margin-top: 0;
    color: #fff;
    text-transform: uppercase;
    `;

const Logo = styled.div `
    background-image: url('logo.png');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    width: 112px;
    height: 76px;
    display: inline-block;
    alt: logo;
    float: left;
    margin: 0 13px 0 20px;
`;



const Header = (props) => {
    return (
      <HeaderWrapper >
            <LogoCol xs={6}>
                <Logo ></Logo>
                <LogoLine ></LogoLine>
                <LogoText>MK Digital</LogoText>
            </LogoCol>
            <Col xs={6}>
            <Nav/>
            </Col>
      </HeaderWrapper>
    );
};

export default Header;
