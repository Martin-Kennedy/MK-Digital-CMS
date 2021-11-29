import React from 'react';
import Header from '../components/navigation/header';
import Footer from '../components/Footer';
import Hero from '../components/hero/hero'
import { Container, Row, Col } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import faker from 'faker';

const stylingObject = {
  homepage: {
    height: "100vh",
    width: "100vw",
    margin: "0",
    padding: "0",
  },
  section: {
    minHeight: "500px",
    width: "100vw",
    margin: "0",
    display: "flex",
    alignItems: "center"
  },
  h2: {
    fontSize: "0.75rem",
    fontWeight: "200"
  }
}

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: []
    };
  }

  render() {

    return (
      <Container fluid style={stylingObject.homepage}>

        { /* Header / Hero Section */}

        <Header />
        <Hero />

        { /* Bio Section */}
        <Row style={stylingObject.section}>
          <Col sm={2}>
          </Col>
          {/* Carousel */}
          <Col sm={8}>
            
            <Row>
              <Col>
                <h2 style={stylingObject.h2}>CASE STUDIES</h2>
              </Col>
              <Col>
              <p>{faker.lorem.paragraph(8)}</p>
              </Col>
            </Row>
          </Col>
          <Col sm={2}>
          </Col>
        </Row>

        {/* Case Studies */}
        <Row style={stylingObject.section}>
          <Col sm={2}>
          </Col>
          {/* Carousel */}
          <Col sm={8}>
            <Row>
            <Col>
            <h2 style={stylingObject.h2}>BIO</h2>
          </Col>
          <Col>
            <p>{faker.lorem.paragraph(8)}</p>
          </Col>
          </Row>
          </Col>
          <Col sm={2}>
          </Col>
        </Row>

        { /* Surf GUI Section */}
        <Row style={stylingObject.section}>
            <Col sm={2}>
            </Col>
            {/* Carousel */}
            <Col sm={8}>
              <Row>
              <Col>
              <h2 style={stylingObject.h2}>SURF GUI</h2>
          </Col>
          <Col>
            <p>{faker.lorem.paragraph(8)}</p>
          </Col>
          </Row>
            </Col>
            <Col sm={2}>
            </Col>
        </Row>

        { /* Blog Section */}
        <Row style={stylingObject.section}>
          <Col sm={2}>
          </Col>
          <Col sm={8}>
            <Row>
            <Col>
            <h2 style={stylingObject.h2}>BLOG SECTION</h2>
          </Col>
          <Col>
            <p>{faker.lorem.paragraph(8)}</p>
          </Col>
          </Row>
          </Col>
          <Col sm={2}>
          </Col>
        </Row>

        { /* Open Source Contribution Section */}
        <Row style={stylingObject.section}>
          <Col sm={2}>
          </Col>
          {/* Carousel */}
          <Col sm={8}>
            <Row>
            <Col>
            <h2 style={stylingObject.h2}>OPEN SOURCE CONTRIBUTIONS</h2>
          </Col>
          <Col>
            <p>{faker.lorem.paragraph(8)}</p>
          </Col>
          </Row>
          </Col>
          <Col sm={2}>
          </Col>
        </Row>

        { /* Footer */}
        <Footer />

        </Container>
      
    );
  }
}
