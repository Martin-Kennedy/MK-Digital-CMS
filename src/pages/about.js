import React, { Component } from 'react';
import {Row, Col} from 'react-bootstrap';
import styled from 'styled-components';
import { MediumText } from '../helpers/commonStyledComponents'
import HeaderComponent from '../components/navigation/header';
import Footer from '../components/footer';
import AboutPageHero from '../components/heros/aboutPageHero';
import { LineAnimationL2R } from "../components/designElementComponents/lineSvg";
import { FadeInWhenVisibleScale, FadeInWhenVisibleOpacity } from '../helpers/fadeInOnViewport';
import XaxisScrollComponent from '../helpers/dragOnXaxis';
import Sticky from 'react-stickynode';
import { Waypoint } from 'react-waypoint';
import {getIntersectingState} from '../actions/pages.actions';
import {connect} from 'react-redux';
import {getAbout} from '../actions/about.actions';
import { getToken, establishSession } from '../actions/initialUtility.actions';
import DOMPurify from 'dompurify';

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
        margin: 40px 0 100px 150px;
        display: block;
        padding: 20px 0 ;
        line-height: 4.2rem;
        font-size: 4rem;
        font-weight: 300;

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
const AboutMainTop = styled(AboutMain)`
    p:nth-child(2) {
        font-size: 16px;
        font-weight: 200;
        position: relative;
        left: 20px;
        top: 65px;
        padding: 0 10px 0 10px;
        height: 20px;
        width: auto;
        border-left: 1px solid var(--black);
        border-right: 1px solid var(--black);

    }
`

const ScrollComponentContainer = styled.div`
position: relative;
top: -100px;
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
        display: block;
        line-height: 4.2rem;
        font-size: 4rem;
        font-weight: 300;
    }
    
    p:nth-child(2)  {
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

const ServicesInitialDescription = styled.div``;

const VideoContainer = styled.div`
    width: 100vw;
    height: 100vh;
    div{
    width: 100vw;
    height: 100vh;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 9;
    }
    iframe {
        top: 50%;
        left: 50%;
        width: 100vw;
        height: 100vh;
        transform: translate(-50%, -50%);
        position: absolute;
        @media (min-aspect-ratio: 16/9){  
            height: 56.25vw;
        }
        @media (max-aspect-ratio: 16/9) {
            width: 177.78vh;
        }
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

const mapStateToProps = state => {
    return {
        isIntersecting: state.pages.isIntersecting,
        initialUtility: {
            keystoneToken: state.initialUtility.keystoneToken,
            session: state.initialUtility.session
        },
        about: {
            aboutData: state.about.aboutData
        }
    }
}


class About extends Component {

    constructor(){
        super()
    }

    componentDidUpdate(prevProps) {

        if (this.props.initialUtility.session === true) {
            if (!this.props.about.aboutData.length) {
                this.props.dispatch(getAbout(this.props.initialUtility.keystoneToken))
            }
        } else {
            if (this.props.initialUtility.keystoneToken === null) {
                this.props.dispatch(getToken())
            } else {
                this.props.dispatch(establishSession(this.props.initialUtility.keystoneToken))
            }
        }

    }

    sanitizeHTML(itemToClean) {
        const clean = DOMPurify.sanitize(itemToClean);
        return clean;
    }    
    
    render(props){
        let item = this.props.about.aboutData[0];
        return (
            <div>
                {this.props.about.aboutData.length ? 
            <BaseLayer>
            {console.log(this.props)}
                
                <HeaderComponent location={this.props.location.pathname} />
                <Sticky>
                    <IntroSection >
                        <FadeInWhenVisibleOpacity duration={2}>
                            <AboutPageHero />
                        </FadeInWhenVisibleOpacity>
                        <Col sm={2}></Col>
                        <Col sm={8}>

                            <Row>
                                <Col sm={6}></Col>
                                <Col sm={6}>

                                    <FadeInWhenVisibleScale>
                                        <Row>
                                            <IntroBlurb1 >
                                                {item.introBlurbOne}
                                            </IntroBlurb1>

                                        </Row>
                                        <Row>
                                            <FifthLine>
                                                <LineAnimationL2R />
                                            </FifthLine>

                                        </Row>
                                        <Row >
                                            <IntroBlurb2 >
                                                        {item.introBlurbTwo}
                                            </IntroBlurb2>
                                        </Row>
                                    </FadeInWhenVisibleScale>
                                </Col>
                            </Row>
                        </Col>
                        <Col sm={2}></Col>

                    </IntroSection>
                </Sticky>
                <Sticky >
                    <ImgSection >
                                <VideoContainer>
                                    <div></div>
                                    <iframe width="1280" height="662" src={`https://www.youtube.com/embed/${item.parallaxVideoEmbed}?list=${item.parallaxVideoPlaylist}&controls=0&showinfo=0&rel=0&autoplay=1&loop=1&mute=1`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                </VideoContainer>
                    </ImgSection>
                </Sticky>


                <Waypoint onEnter={() => {this.props.dispatch(getIntersectingState(true))}} bottomOffset={'100%'} topOffset={100} onLeave={() => {this.props.dispatch(getIntersectingState(false))}}>

                    <AboutSection >
                        <Col sm={2}></Col>
                        <Col sm={8}>
                            <FadeInWhenVisibleScale>
                                        <AboutMainTop dangerouslySetInnerHTML={{
                                            __html: this.sanitizeHTML(item.aboutInitialDescription)
                                        }}>
                                        </AboutMainTop>
                            </FadeInWhenVisibleScale>
                            <Row>
                                <Line></Line>
                            </Row>
                            <FadeInWhenVisibleScale>
                                <AboutMain>
                                    <Section>

                                                <Col><span>{item.aboutSectionOneShort}</span></Col>
                                        <Col>
                                                    <p>{item.aboutSectionOneLong}</p>

                                        </Col>
                                    </Section>
                                    <Section>
                                        <Col></Col>
                                        <Col>
                                            <Line></Line>
                                                    <MediumText>{item.aboutSectionTwoLong}
                                            </MediumText>

                                        </Col>
                                    </Section>
                                    <ScrollComponentContainer>
                                                <XaxisScrollComponent text={item.dragComponentText} />
                                    </ScrollComponentContainer>
                                </AboutMain>
                            </FadeInWhenVisibleScale>
                        </Col>
                        <Col sm={2}></Col>
                    </AboutSection>

                </Waypoint>

                <Sticky>
                    <ServicesSection>
                        <Col sm={2}></Col>
                        <Col sm={8}>
                            <FadeInWhenVisibleScale>
                                <Services>
                                    <Line white></Line>
                                    <ServicesInitialDescription dangerouslySetInnerHTML={{
                                        __html: this.sanitizeHTML(item.servicesInitialDescription)
                                    }}>
                                    </ServicesInitialDescription>
                                    <ServicesMain>
                                        <Col>
                                            <span>{item.serviceOneName}</span>
                                            <Line white></Line>
                                        </Col>
                                        <Col sm={1}></Col>
                                        <Col>
                                            <span>{item.serviceOneValue}</span>
                                            <Line white></Line>
                                        </Col>
                                    </ServicesMain>
                                    <ServicesMain>
                                        <Col>
                                        </Col>
                                        <Col sm={1}></Col>
                                        <Col>
                                            <MediumText>
                                               {item.serviceOneDescription}
                                            </MediumText>
                                                <DigitalServicesList >
                                                <Col dangerouslySetInnerHTML={{
                                                    __html: this.sanitizeHTML(item.serviceOneListOne)
                                                }}>
                                                </Col>
                                                <Col dangerouslySetInnerHTML={{
                                                    __html: this.sanitizeHTML(item.serviceOneListTwo)
                                                }}>
                                                </Col>
                                            </DigitalServicesList>

                                        </Col>
                                    </ServicesMain>

                                    <ServicesMain>
                                        <Col>
                                            <span>{item.serviceTwoName}</span>
                                            <Line white></Line>
                                        </Col>
                                        <Col sm={1}></Col>
                                        <Col>
                                            <span>{item.serviceTwoValue}</span>
                                            <Line white></Line>
                                        </Col>
                                    </ServicesMain>

                                    <ServicesMain>
                                        <Col>
                                        </Col>
                                        <Col sm={1}></Col>
                                        <Col>
                                            <MediumText>
                                                        {item.serviceOneDescription}
                                            </MediumText>
                                            <DigitalServicesList>
                                                <Col dangerouslySetInnerHTML={{
                                                    __html: this.sanitizeHTML(item.serviceTwoListOne)
                                                }}>
                                                </Col>
                                                <Col dangerouslySetInnerHTML={{
                                                    __html: this.sanitizeHTML(item.serviceTwoListTwo)
                                                }}>

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
            </BaseLayer> : null}
            </div>
            
        );
    }
  
    
}

export default connect(mapStateToProps)(About);
