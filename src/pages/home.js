import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';
import {connect} from 'react-redux';
import HomepageHero from '../components/heros/homepageHero'
import faker from 'faker';
import HeaderComponent from '../components/navigation/header';
import Footer from '../components/footer';
import { getHomepage, getHomepageCarousel, getHomepageCarouselProjectsArray, getHomepageCarouselBlogsArrayandCombine, combineCarouselArrays } from './../actions/homepage.actions';
import { getToken, establishSession, } from './../actions/initialUtility.actions';

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
    homepage: {
      homepageCarouselItems: state.homepage.homepageCarouselItems,
      homepageCarouselArrayProjects: state.homepage.homepageCarouselArrayProjects,
      homepageCarouselArrayBlogs: state.homepage.homepageCarouselArrayBlogs,
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

  componentDidUpdate(prevProps) {

    if (this.props.initialUtility.session === true) {
      if(!this.props.homepage.pageData){
      this
        .props
        .dispatch(getHomepage(this.props.initialUtility.keystoneToken));
      }
      if(!this.props.homepage.homepageCarouselItems.length){
        this.props.dispatch(getHomepageCarousel(this.props.initialUtility.keystoneToken));
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

    if (prevProps.homepage.homepageCarouselItems !== this.props.homepage.homepageCarouselItems) {
      const projectsArr = this.props.homepage.homepageCarouselItems.filter((items) => {
        return items.listType === 'PROJECT';
      });
      
      this
        .props
        .dispatch(getHomepageCarouselProjectsArray(projectsArr, this.props.initialUtility.keystoneToken));
     
    }

    if (prevProps.homepage.homepageCarouselArrayProjects !== this.props.homepage.homepageCarouselArrayProjects){
      const blogsArr = this.props.homepage.homepageCarouselItems.filter((items) => {
        return items.listType === 'BLOG';
      });
      this.props.dispatch(getHomepageCarouselBlogsArrayandCombine(this.props.homepage.homepageCarouselArrayProjects, blogsArr, this.props.initialUtility.keystoneToken));
    }


  }


  render() {
    return (
      <div>
        
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