import React from 'react';
import {Row, Col} from 'react-bootstrap';
import styled from 'styled-components';
import { MediumText } from '../helpers/commonStyledComponents'
import HeaderComponent from '../components/navigation/header';
import Footer from '../components/footer'
import AboutPageHero from '../components/heros/aboutPageHero';
import { LineAnimationL2R } from "../components/designElementComponents/lineSvg";
import { FadeInWhenVisibleScale, FadeInWhenVisibleOpacity } from '../helpers/fadeInOnViewport';
import XaxisScrollComponent from '../helpers/dragOnXaxis';
import Sticky from 'react-stickynode';
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



const Line = styled.div `
    position: relative;
    display: block;
    width: 100%;
    margin: 0 0 3rem ;
    border-bottom: ${props => props.white ? "#fff" : "#1d1e22"} 1px solid;
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
    line {
        stroke: #fff;
    }
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
    height: 60vh;
`
const AboutSection = styled(Row)`
    background-color: #fff;
    min-height: 500px;
    color: #fff;
    z-index: 1;
    position: relative;
    height: auto;
`
const AboutMain = styled(Row)`
    color: #1d1e22;
    position: relative;
    z-index: 1;
    margin-bottom: 3rem;
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
    display: block;
    
    h2 {
        display: flex;
        flex-direction: column;
        margin: 10px 0 140px 150px;
        position: relative;
        top: -3rem;
        
        span {
        display: block;
        padding: 10px 0;
            
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
const ScrollComponentContainer = styled.div`
position: relative;
top: -200px;
`

const Section = styled(Row)`
    margin-bottom: 9rem;
    span {
        top: 0;
    }
    p {
        font-weight: 200;
    }
`
const ServicesMain = styled(Section)`
margin-bottom: 2rem;
.col {
    span {
        display: block;
        margin-bottom: 20px;
    }
}
`

const DigitalServicesList = styled(Row)`
ul {

    padding: 10px 0 10px 0;
    margin-boottom: 10px;
    
    li {
        margin: 10px 0;
        font-size: 13px;
        font-weight: 100;
        letter-spacing: 1px;
    }
}
`

const AboutFooter = styled.div`
    height: 100px;
    background-color: #1d1e22;
    .row {
        color: #fff;
        width: 100vw;
        padding: 20px 10px 10px 0;
        margin: 0;
        display: flex;
        align-items: center;
    }
`

const About = (props) => {
  
    return (

        <BaseLayer>
            <Sticky>
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
            </Sticky>
            <Sticky>
            <ImgSection ></ImgSection>
            </Sticky>
                
            <Sticky >
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
                        <FadeInWhenVisibleScale>
                        <AboutMain>
                        <Section>
                            
                            <Col><span>Established in 2016</span></Col>
                            <Col> 
                            <p>In a few short years, MK Digital has made its mark on The New York Metro — our home 
                                and a powerhouse recognized internationally for its creativity. With a unique 
                                identity rooted in Manhattan, its reputation branches far beyond its borders.</p>
                                
                            </Col>
                        </Section>
                        <Section>
                            <Col></Col>
                            <Col>
                                <Line></Line>
                                <MediumText>MK Digital® isn’t just a team — it’s a family. We all share the 
                                    same vision here: to push ideas all the way, 
                                    without taking ourselves too seriously, and overcoming challenges together.
                                </MediumText>
                                
                            </Col>
                        </Section>
                        <ScrollComponentContainer>
                        <XaxisScrollComponent />
                        </ScrollComponentContainer>
                        </AboutMain>
                        </FadeInWhenVisibleScale>
                    </Col>
                    <Col sm={2}></Col>
                </AboutSection>
                </Sticky>
            <Sticky>
                <ServicesSection>
                    <Col sm={2}></Col>
                    <Col sm={8}>
                        <FadeInWhenVisibleScale>
                        <Services>
                            <Line white></Line>
                            <span>Services</span>
                            <h2>
                                <span>Digital</span> 
                                <span>First Design</span>
                            </h2>
                                <ServicesMain>
                                <Col>
                                    <span>Digital Experience</span>
                                    <Line white></Line>
                                </Col>
                                <Col sm={1}></Col>
                                <Col>
                                    <span>01</span>
                                    <Line white></Line>
                                </Col>
                                </ServicesMain>
                                <ServicesMain>
                                    <Col>
                                    </Col>
                                    <Col sm={1}></Col>
                                    <Col>
                                        <MediumText> 
                                            We make digital the starting point around which revolve creative, strategy and technology. 
                                            We work this way whatever the size of your project, because it works.
                                        </MediumText>
                                        <DigitalServicesList>
                                            <Col>
                                            <ul>
                                                <li>
                                                    Digital strategy
                                                </li>
                                                <li>
                                                    User experience (UX)
                                                </li>
                                                <li>
                                                    Front End Development
                                                </li>
                                            </ul>
                                            </Col>
                                            <Col>
                                            <ul>
                                                <li>
                                                    Web design
                                                </li>
                                                <li>
                                                    Web development
                                                </li>
                                                <li>
                                                    Application Development
                                                </li>
                                            </ul>
                                            
                                            </Col>
                                        </DigitalServicesList>
                                        
                                    </Col>
                                </ServicesMain>
                                    
                                <ServicesMain>
                                    <Col>
                                        <span>Brand Experience</span>
                                        <Line white></Line>
                                    </Col>
                                    <Col sm={1}></Col>
                                    <Col>
                                        <span>02</span>
                                        <Line white></Line>
                                    </Col>
                                </ServicesMain>
                                
                                <ServicesMain>
                                    <Col>
                                    </Col>
                                    <Col sm={1}></Col>
                                    <Col>
                                        <MediumText>
                                            We make digital the starting point around which revolve creative, strategy and technology.
                                            We work this way whatever the size of your project, because it works.
                                        </MediumText>
                                        <DigitalServicesList>
                                            <Col>
                                                <ul>
                                                    <li>
                                                        Digital strategy
                                                    </li>
                                                    <li>
                                                        User experience (UX)
                                                    </li>
                                                    <li>
                                                        Front End Development
                                                    </li>
                                                </ul>
                                            </Col>
                                            <Col>
                                                <ul>
                                                    <li>
                                                        Web design
                                                    </li>
                                                    <li>
                                                        Web development
                                                    </li>
                                                    <li>
                                                        Application Development
                                                    </li>
                                                </ul>

                                            </Col>
                                        </DigitalServicesList>

                                    </Col>
                                </ServicesMain>                                
                        </Services>
                        </FadeInWhenVisibleScale>
                    </Col>
                    <Col sm={2}></Col>
                </ServicesSection>
                
                <AboutFooter>
                <Footer />
                </AboutFooter>
            </Sticky>
            
            
            
        </BaseLayer>
    );
}

export default About;
