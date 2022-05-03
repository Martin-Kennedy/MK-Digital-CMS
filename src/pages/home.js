import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';
import {connect} from 'react-redux';
import HomepageHero from '../components/heros/homepageHero'
import faker from 'faker';
import HeaderComponent from '../components/navigation/header';
import Footer from '../components/footer';
import {getHomepage} from './../actions/homepage.actions';

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
   return { 
     initialUtility: {
       session: state.initialUtility.session,
       keystoneToken: state.initialUtility.keystoneToken,
     },
     homepage: state.homepage
     };
} 

class Home extends Component {

  componentDidUpdate(prevProps) {

    // if (prevProps.initialUtility.session !== this.props.initialUtility.session) {
    //   this.props.dispatch(getHomepage(this.props.initialUtility.keystoneToken));
    // }


  }


  render() {
    return (
      <div>
        
        <HeaderComponent location={this.props.location.pathname} />
        {/* Hero Section */}
        <HomepageHero />

          

         {/* Bio Section  */}
        <Row style={stylingObject.section}>
          {console.log(this.props)}
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
        <Footer />
        </div>
      
    );
  }
}

export default connect(mapStateToProps)(Home);