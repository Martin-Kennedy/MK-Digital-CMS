import React, {Fragment, Component} from 'react';
import {Row, Col} from 'react-bootstrap';
import {connect} from 'react-redux';
import HomepageHero from '../components/heros/homepageHero'
import faker from 'faker';
import HeaderComponent from '../components/navigation/header';
import Footer from '../components/footer';
import styled from 'styled-components';
import { getHomepage} from './../actions/homepage.actions';
import { getToken, establishSession, } from './../actions/initialUtility.actions';
import {Link} from 'react-router-dom';

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

const Line = styled.div `
position: relative;
display: block;
width: 100%;
margin: 0 0 3rem;
border-bottom: ${ props => props.white ? "#fff" : "#1d1e22" } 1px solid;
`

const H2 = styled.h2`
    font-size: 9vw;
    font-weight: 500;
    `
const SectionLink = styled(Link)`
    background-color: ${props => props.color ? props.color : 'var(--black)'};
    width: 15vh;
    height: 15vh;
    border-radius: 100%;
    position: absolute;
    top: 0;
    margin: 50vh 0 0 0;
    left: 25vw;
    color: var(--white);
    font-size: 12px;
    font-weight: 500;
    text-align: center;
    line-height: 15vh;
    &:hover {
        cursor: pointer;
        color: var(--white);
    }
`

const mapStateToProps = state => {
  return {
    initialUtility: {
      session: state.initialUtility.session,
      keystoneToken: state.initialUtility.keystoneToken,
    },
    homepage: {
      pageData: state.homepage.pageData,
    },
    totalSlides: state.homepage.totalSlides,
    currentSlide: state.homepage.currentSlide,
    hoverState: state.homepage.hoverState,
    intervalID: state.homepage.intervalID,
    imageElement: React.createRef(),
    imgWidth: state.homepage.imgWidth
  }
}

class Home extends Component {

  constructor() {
    super();
    this.state = {
      mouseLeft: null
    }

  }

  componentDidUpdate(prevProps) {

    if (this.props.initialUtility.session === true) {
      if(!this.props.homepage.pageData){
      this
        .props
        .dispatch(getHomepage(this.props.initialUtility.keystoneToken));
      }
    } else {
      if (this.props.initialUtility.keystoneToken === null) {
        this
          .props
          .dispatch(getToken())
      } else {
        this
          .props
          .dispatch(establishSession(this.props.initialUtility.keystoneToken))
      }
    }
  }


  render() {
    const pageData = this.props.homepage.pageData;
    return (
      <div>
        {this.props.homepage.pageData ? 
        <Fragment>
        <HeaderComponent location={this.props.location.pathname} />
        {/* Hero Section */}
        <HomepageHero />

         {/* Bio Section  */}
        <Row style={stylingObject.section}>
          
          <Col sm={2}>
          </Col>
          {/* Carousel */}
          <Col sm={8}>
            
            <Row>
              <Col xs={2}>
              
                
              </Col>
              <Col sm={10}>
                <Line></Line>
                {console.log(pageData)}
                <H2>{pageData.sectionOneTitle}</H2>
                <p>{pageData.sectionOneBlurbOne}</p>
                    <SectionLink to={pageData.sectionOneLink} target="_blank" color={pageData.sectionOneLinkColor} className={this.state.mouseLeft === true ? 'projectSiteLinkHoverOut' : this.state.mouseLeft === false ? 'projectSiteLinkHoverIn' : null} onMouseEnter={() => this.setState({ mouseLeft: false })} onMouseLeave={() => this.setState({ mouseLeft: true })}>{pageData.sectionOneLinkLabel}</SectionLink>
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
          </Fragment>
        : null}
        </div>
      
    );
  }
}

export default connect(mapStateToProps)(Home);