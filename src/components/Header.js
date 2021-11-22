import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Nav from './navigation/nav.js';


const stylingObject = {
  header: {
    color: "#fff",
    width: "100%",
    padding: "20px",
    margin: "20px 10px",
    display: "flex",
    alignItems: "center",
    height: "100px",
    position: "absolute"
    
  },
  logoCol: {
    display: "flex",
    alignItems: "center"
  },
  logoLine: {
    width: "13px",
    height: "100px",
    borderLeft: "1px solid #fff"
  },
  logoText: {
    textAlign: "left",
    fontFamily: "mr-eaves-modern, sans-serif",
    fontWeight: "100",
    fontSize: "25px",
    marginTop: "0",
    color: "#fff",
    textTransform: "uppercase"

  },
  h2: {
    textAlign: "left",
    fontFamily: "mr-eaves-modern, sans-serif",
    fontWeight: "regular",
    fontSize: "16px",
    marginTop: "0"
  },
    logo: {
      backgroundImage: "url('logo.png')",
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      width:"112px",
      height: "76px",
      display: "inline-block",
      alt: "logo",
      float: "left",
      margin: "0 13px 0 20px"
    }
}

const Header = (props) => {
  return (
      <div style={stylingObject.header}>
      <Col xs={6} style={stylingObject.logoCol}>
        <div style={stylingObject.logo} alt={stylingObject.logo.alt}></div>
        <div style={stylingObject.logoLine}></div>
        <div style={stylingObject.logoText}>MK Digital</div>
      </Col>
      <Col xs={6}>
        <Nav />
      </Col>
      </div>
  );
};

Header.defaultProps = {
  title: '',
  subtitle: ''
};

export default Header;
