import React, { useState, useEffect, useRef, useLayoutEffect }  from 'react';
import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import HeaderComponent from '../components/navigation/header';
import Footer from '../components/footer'
import AboutPageHero from '../components/heros/aboutPageHero';
import { LineAnimationL2R } from "../components/heros/lineSvg";
import {
  useViewportScroll,
  motion,
  useTransform
} from 'framer-motion';
// import { useInView } from 'react-intersection-observer';



const BaseLayer = styled.div`
background-color: #fff;
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
const IntroBlurb2 = styled.h2`
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: none;
    font-weight: 300;
    font-size: 36px;
    height: 450px;
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
    const [elementTop1, setElementTop1] = useState(0);
    const [elementTop2, setElementTop2] = useState(0);
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const { scrollY } = useViewportScroll();

    const y = useTransform(scrollY, [elementTop1, elementTop1 + 1], [0, 1], {
        clamp: false
    });

    const y2 = useTransform(scrollY, [elementTop2, elementTop2 + 1], [0, 1], {
        clamp: false
    });

    useLayoutEffect(() => {
        const element1 = ref1.current;
        setElementTop1(element1.offsetTop);
        
    }, [ref1]);

    useLayoutEffect(() => {
        const element2 = ref2.current;
        setElementTop2(element2.offsetTop);
    }, [ref2]);

    

        return (
                    
            <BaseLayer>
                <IntroSection >
                    <HeaderComponent location={props.location.pathname} />
                    <AboutPageHero />
                    
                    <Col sm={2}>
                    </Col>
                    <Col sm={8}>
                        
                        <Row>
                            <Col sm={6}>
                            </Col>
                            <Col sm={6}>
                                <Row>
                                    <IntroBlurb1 >
                                        With years of development experience,
                                        MK Digital can create a digital solution for you that will become the reference for all that’s digital, web
                                        design and branding. I'm not just bragging, I'm good. My
                                        promise: finding tomorrow’s creative solutions — today.
                                    </IntroBlurb1>
                                </Row>
                                <Row>
                                    <FifthLine>
                                        <LineAnimationL2R />
                                    </FifthLine>

                                </Row>
                                <Row >
                                    <IntroBlurb2 >
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
                
                
                
                <motion.div style={{ y }} ref={ref1}>
                    <ImgSection  ></ImgSection>
                </motion.div>
                
                    
    
                <motion.div ref={ref2} style={{ y2 }} >
                    <AboutSection >
                        <Col sm={2}>
                        </Col>
                        <Col sm={8}>

                            <AboutMain>
                                <h2><span>Why</span><span>MK Digital?</span></h2>
                                <span>About</span>
                                <p> MK Digital stands out among digital creators,
                                </p>
                                <p> and offers a wide range of creative and
                                    digital services for brands, companies,
                                    foundations and other remarkable organizations. I
                                    assist and educate my clients in making the best use
                                    of the solutions I build with them.
                                </p>
                            </AboutMain>
                            <Row>
                                <Line></Line>
                            </Row>
                            
                        </Col>
                        <Col sm={2}>
                        </Col>
                    </AboutSection>
                </motion.div>

                
                <Footer />
            </BaseLayer>
        );
    }

export default About;
