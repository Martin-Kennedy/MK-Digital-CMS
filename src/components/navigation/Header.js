import React from 'react';
import {Link} from 'react-router-dom';
import {Col} from 'react-bootstrap';
import Nav from './nav.js';
import styled from 'styled-components';
import { displayValueArray } from '../../helpers/commonStyledComponents';
import HideOnScroll from '../../helpers/hideOnScroll';
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';



const HeaderWrapper = styled.div`
    color: ${props => displayValueArray.includes(props.location) ? "#1d1e22" : "white"};
    width: 100%;
    padding: 0px 10px 20px;
    margin: 20px 10px 10px;
    display: flex;
    align-items: center;
    height: 100px;
    position: fixed;
    top: 0;
    z-index: 99;
  `;

const LogoCol = styled(Col)`
    display: flex;
    align-items: center;
    `;

const LogoLine = styled.div`
    width: 13px;
    height: 90px;
    border-left: 1px solid ${props => (displayValueArray.includes(props.location) && props.isIntersecting) ? "#fff" : (displayValueArray.includes(props.location) && props.isIntersecting) ? "white" : displayValueArray.includes(props.location) ? "#1d1e22" : props.isIntersecting ? "#1d1e22" : "white"};
    `;

const LogoText = styled.div`
    text-align: left;
    font-family: 'mr-eaves-modern' sans-serif;
    font-weight: 100;
    font-size: 25px;
    margin-top: 0;
    color: ${props => (displayValueArray.includes(props.location) && props.isIntersecting) ? "#fff" : (displayValueArray.includes(props.location) && props.isIntersecting) ? "white" : displayValueArray.includes(props.location) ? "#1d1e22" : props.isIntersecting ? "#1d1e22" : "white"};
    text-transform: uppercase;
    `;

const Logo = styled.div`
    background-image: ${props => (displayValueArray.includes(props.location) && props.isIntersecting) ? "url('/logo.png')" : (displayValueArray.includes(props.location) && props.isIntersecting) ? "white" : displayValueArray.includes(props.location) ? "url('/logoDark.png')" : props.isIntersecting ? "url('/logoDark.png')" : "url('/logo.png')"};
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    width: 101px;
    height: 68px;
    display: inline-block;
    float: left;
    margin: 0 13px 0 20px;
    @media(max-width: 758px){
      width: 66px;
      height: 45px;
      margin-left: 12px;
    }
`;

const StlyedHeaderLink = styled(Link)`
color: ${props => displayValueArray.includes(props.location)  ? "#1d1e22" : "white"};
text-decoration: none;
display: contents;
align-items: center;
`;


const customStyles = 'display: flex; align-items: center;';
const mapStateToProps = state => {
  return {
    isIntersecting: state.pages.isIntersecting
  }
}

const HeaderComponent = (props) => {
  

    return (
      <HeaderWrapper location={props.location}>
          <LogoCol xs={6}>
          <StlyedHeaderLink to={'/'} >
            <Logo id='logo' isIntersecting={props.isIntersecting} style={{position: 'sticky'}} location={props.location}></Logo>
            <MediaQuery minWidth={968}>
            <HideOnScroll customStyles={customStyles}>
              <LogoLine isIntersecting={props.isIntersecting} location={props.location}></LogoLine>
              <LogoText isIntersecting={props.isIntersecting} location={props.location}>MK Digital</LogoText>
            </HideOnScroll>
            </MediaQuery>
          </StlyedHeaderLink>
          </LogoCol>
          <Col xs={6}>
          <Nav location={props.location}/>
          </Col>
      </HeaderWrapper>
    );
};

export default connect(mapStateToProps)(HeaderComponent);
