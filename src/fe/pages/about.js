import React from 'react';
import {Row, Col} from 'react-bootstrap';
import styled from 'styled-components';
import HeaderComponent from '../components/navigation/header';
import Footer from '../components/footer'
import AboutPageHero from '../components/heros/aboutPageHero';
import {LineAnimationL2R} from "../components/heros/lineSvg";
import Parallax from '../helpers/parallax';
import { FadeInWhenVisibleScale, FadeInWhenVisibleOpacity } from '../helpers/fadeInOnViewport';
import XaxisScrollContainer from '../helpers/dragOnXaxis'
// import { useInView } from 'react-intersection-observer';

const BaseLayer = styled.div `
    background-color: #1d1e22;
`

const IntroSection = styled(Row)`
    background-color: #1d1e22;
    min-height: 500px;
    color: #fff;
    z-index: 1;
    position: relative;
`;

const AboutSection = styled(Row)`
    background-color: #fff;
    min-height: 500px;
    color: #fff;
    z-index: 1;
    position: relative;
    height: 100vh;
`

const Line = styled.div `
    position: relative;
    display: block;
    width: 100%;
    margin: 2rem 0;
    border-bottom: #1d1e22 1px solid;
`

const IntroBlurb1 = styled.h1 `
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: none;
    font-weight: 200;
    font-size: 16px;
`
const IntroBlurb2 = styled.h2 `
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: none;
    font-weight: 300;
    font-size: 36px;
    height: 450px;
`
const FifthLine = styled.div `
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
    background-image: url(coding.gif);
    background-position: center;
    background-size: 100vw auto;
    background-repeat: no-repeat;
    margin: 0;
    z-index: 0;
    position: relative;
    height: 100vh;
`

const AboutMain = styled(Row)`
    color: #1d1e22;
    position: relative;
    z-index: 1;
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

const ServicesSection = styled(Row)`
    background-color: #1d1e22;
    min-height: 500px;
    color: #fff;
    z-index: 1;
    position: relative;
    height: 100% ;
`

const Services = styled(Row)`
    color: #fff;
    position: relative;
    z-index: 2;
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

const About = (props) => {
  

  

    return (

        <BaseLayer>
        <Parallax offset={-25}>
            <IntroSection >
                    <FadeInWhenVisibleOpacity duration={2}>
                <HeaderComponent location={props.location.pathname}/>
                
                <AboutPageHero/>
                    </FadeInWhenVisibleOpacity>

                <Col sm={2}></Col>
                <Col sm={8}>

                    <Row>
                        <Col sm={6}></Col>
                        <Col sm={6}>
                                <FadeInWhenVisibleScale>
                            <Row>
                                    
                                <IntroBlurb1 >
                                    With years of development experience, MK Digital can create a digital solution
                                    for you that will become the reference for all that’s digital, web design and
                                    branding. I'm not just bragging, I'm good. My promise: finding tomorrow’s
                                    creative solutions — today.
                                </IntroBlurb1>
                                    
                            </Row>
                                
                            <Row>
                                <FifthLine>
                                    <LineAnimationL2R/>
                                </FifthLine>

                            </Row>
                            <Row >
                                    
                                <IntroBlurb2 >
                                    A forward-thinking developer driven by passion — and fuelled by curiosity.
                                </IntroBlurb2>
                                       
                            </Row>
                                </FadeInWhenVisibleScale>
                        </Col>
                    </Row>
                </Col>
                <Col sm={2}></Col>

            </IntroSection>
            </Parallax>
            <Parallax offset={-50}>
                <ImgSection ></ImgSection>
            </Parallax>
            <Parallax>
                <AboutSection >
                    <Col sm={2}></Col>
                    <Col sm={8}>
                        <FadeInWhenVisibleScale>
                        <AboutMain>
                            
                                <h2>
                                    <span>Why</span>
                                    <span>MK Digital?</span>
                                </h2>
                           
                            <span>About</span>
                            <p>
                                MK Digital stands out among digital creators,
                            </p>
                            <p>
                                and offers a wide range of creative and digital services for brands, companies,
                                foundations and other remarkable organizations. I assist and educate my clients
                                in making the best use of the solutions I build with them.
                            </p>
                            
                        </AboutMain>
                        </FadeInWhenVisibleScale>
                        <Row>
                            <Line></Line>
                        </Row>

                    </Col>
                    <Col sm={2}></Col>
                </AboutSection>
            </Parallax>
            <Parallax offset={-50}>
                <ServicesSection >
                    <Col sm={2}></Col>
                    <Col sm={8}>
                        <FadeInWhenVisibleScale>
                        <Services>
                            
                            <h2>
                                <span>Why</span>
                                <span>MK Digital?</span>
                            </h2>
                            
                            
                            <span>About</span>
                            <p>
                                MK Digital stands out among digital creators,
                            </p>
                            <p>
                                and offers a wide range of creative and digital services for brands, companies,
                                foundations and other remarkable organizations. I assist and educate my clients
                                in making the best use of the solutions I build with them.
                            </p>
                                <Line></Line>
                                <XaxisScrollContainer />
                        </Services>
                        </FadeInWhenVisibleScale>
                        
                        
                        
                        

                    </Col>
                    <Col sm={2}></Col>
                    <Footer />
                </ServicesSection>
            </Parallax>

            
        </BaseLayer>
    );
}

export default About;
