import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';
import {connect} from 'react-redux';
import Hero from '../../fe/components/hero/hero'
import faker from 'faker';

const stylingObject = {
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

const mapStateToProps = state => {
   return { homepage: state.homepage };
} 

class Home extends Component {


  render() {
    return (
      <div>
        
        {/* Hero Section */}
        <Hero />

        {console.log(this.props)
          }

         {/* Bio Section  */}
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
        </div>
      
    );
  }
}

export default connect(mapStateToProps)(Home);