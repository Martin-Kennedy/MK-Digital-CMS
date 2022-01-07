import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import faker from 'faker';
import styled from 'styled-components';
import AboutPageHero from '../components/heros/aboutPageHero';
import { LineAnimationL2R } from "../components/heros/lineSvg";



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
`;

const AboutSection = styled(Row)`
background-color: #fff;
min-height: 500px;
color: #fff;
`

const Line = styled.div`
position: relative;
display: block;
width: 100%;
margin: 2rem 0;
border-bottom: #1d1e22 1px solid;
`

const IntroBlurb1 = styled.h1`
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: none;
    font-weight: 200;
    font-size: 16px;
`
const  IntroBlurb2 = styled.h2`
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: none;
    font-weight: 300;
    font-size: 36px;
`
const FifthLine = styled.div`
    height: 0;
    position: relative;
    z-index: 0;
    width: 100%;
    top: 0%;
    height: 100px;

    svg  {
    position: relative; 
    left: 0;
    padding-top: 25px;
    }
    `;

const ImgSection = styled(Row)`
    width: 100vw;
    min-height: 600px;
    background-image: url(coding.gif);
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    margin: 0;
    position: inherit;
    top: 0;
    left: 0;
    display: block;
    

`

    const AboutMain = styled(Row)`
    color: #1d1e22;
    h2 {
        margin: 10px 0 140px 150px;
        span {
            display: block;
            padding: 10px 0 ;
            
        line-height: 4.2rem;
        font-size: 4rem;
        font-weight: 300;
        }

    }
    span {
        font-size: 16px;
        font-weight: 200;
        position: relative;
        top: 55px;

    }
    
    p:nth-child(3) {
        position: relative;
        line-height: 4.2rem;
        font-size: 3rem;
        font-weight: 300;
        padding-left: 150px;
        white-space: nowrap;
        margin: 0;
        }
        p:nth-child(4) {
            position: relative;
        line-height: 4.2rem;
        font-size: 3rem;
        font-weight: 300;
        }
        
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
                                <Row>
                                    <IntroBlurb1>With more than a decade of development experience, 
                                        MK Digital has become the reference for all that’s digital, web
                                         design and branding. We’re not just bragging, we’re good. Our
                                          promise: finding tomorrow’s creative solutions — today.
                                    </IntroBlurb1>
                                </Row>
                                <Row>
                                    <FifthLine>
                                        <LineAnimationL2R />
                                    </FifthLine>
                                    
                                </Row>
                                <Row>
                                    <IntroBlurb2>
                                        A forward-thinking
                                        developer driven by
                                        passion — and fuelled by
                                        curiosity.
                                    </IntroBlurb2>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col sm={2}>
                    </Col>
                </IntroSection>
                
                <ImgSection>
                </ImgSection>

                <AboutSection >
                    <Col sm={2}>
                    </Col>
                    <Col sm={8}>

                        <AboutMain>
                            <h2><span>Why</span><span>MK Digital?</span></h2>
                            <span>About</span>
                            <p> MK Digital stands out among web
                                agencies, 
                            </p>
                            <p> and offers a wide range of creative and
                                strategic services for brands, companies,
                                foundations and other remarkable organizations. We
                                assist and educate our clients in making the best use
                                of the solutions we build with them.
                            </p> 
                        </AboutMain>
                        <Row>
                            <Line></Line>
                        </Row>
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
                </AboutSection>
                </div>


               

               
                
            

        );
    }
}

export default About;
