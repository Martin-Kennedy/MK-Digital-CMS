import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import AboutPageHero from '../components/heros/aboutPageHero'
import faker from 'faker';
import styled from  'styled-components';


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

const IntroSection = styled(Row)`
background-color: #1d1e22;
min-height: 500px;
color: #fff;
`

const IntroBlurb1 = styled.p`
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: none;
    font-weight: 200;
    font-size: 13px;
`






// const mapStateToProps = state => {
//     return { homepage: state.homepage };
// }

class About extends Component {


    render() {
        return (
            <div>

                {/* Hero Section */ }
                <AboutPageHero location={this.props.location.pathname} />

                <IntroSection>
                    <Col sm={2}>
                    </Col>
                    <Col sm={8}>

                        <Row>
                            <Col>
                            </Col>
                            <Col>
                                <IntroBlurb1>With more than a decade of development experience, MK Digital has become the reference for all that’s digital, web design and branding. We’re not just bragging, we’re good. Our promise: finding tomorrow’s creative solutions — today.</IntroBlurb1>
                            </Col>
                        </Row>
                    </Col>
                    <Col sm={2}>
                    </Col>
                </IntroSection>

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

export default About;
