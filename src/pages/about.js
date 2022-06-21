import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';
import styled from 'styled-components';
import {MediumText} from '../helpers/commonStyledComponents'
import HeaderComponent from '../components/navigation/header';
import Footer from '../components/footer';
import AboutPageHero from '../components/heros/aboutPageHero';
import {LineAnimationL2R} from "../components/designElementComponents/lineSvg";
import {FadeInWhenVisibleScale, FadeInWhenVisibleOpacity} from '../helpers/fadeInOnViewport';
import XaxisScrollComponent from '../helpers/dragOnXaxis';
import Sticky from 'react-stickynode';
import {Waypoint} from 'react-waypoint';
import {getIntersectingState} from '../actions/pages.actions';
import {connect} from 'react-redux';
import {getAbout} from '../actions/about.actions';
import {getToken, establishSession} from '../actions/initialUtility.actions';
import DOMPurify from 'dompurify';
import MediaQuery  from 'react-responsive';


const BaseLayer = styled.div `
    background-color: #1d1e22;
`

const IntroSection = styled(Row)`
    background-color: #1d1e22;
    min-height: 130vh;
    color: #fff;
    z-index: 1;
    position: relative;
`;

const Line = styled.div `
    position: relative;
    display: block;
    width: 100%;
    margin: 0 0 3rem ;
    border-bottom: ${props => props.white
    ? "#fff"
    : "#1d1e22"} 1px solid;
`

const IntroBlurb1 = styled.h1 `
margin-top: 7vw;
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
    height: 100vh;
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
        @media(max-width: 960px){
            margin:50px 0 30px 0;
            white-space: break-spaces;
            padding-left: 12px;
        }
    }

    
    p:nth-child(3) {
        padding-left: 150px;
        margin:0;
         @media(max-width: 960px){
        padding-left:12px;
    }
        } 
        
    p {
    position: relative;
    line-height: 4.2rem;
    font-size: 3rem;
    font-weight: 300;
    @media(max-width: 960px){
        white-space: break-spaces;
        font-size: 5vw;
        font-weight: 300;
        line-height: 7.5vw;
    }
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
        @media(max-width: 960px){
            display: none;
        }

    }
`

const ScrollComponentContainer = styled.div `
        position: relative;
        top: -100px;
        div{
            @media(max-width: 960px){
            font-size: 33vh;
        }
        }
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
         @media(max-width: 960px){
            padding-left:0;
            white-space: break-spaces;
        }
        }
        p:nth-child(4) {
        position: relative;
        line-height: 4.2rem;
        font-size: 3rem;
        font-weight: 300;
        }   
    `

const ServicesInitialDescription = styled.div ``;

const VideoContainer = styled.div `
    width: 100vw;
    height: 100vh;
    div {
    width: 100vw;
    height: 100vh;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9;
    }
    video {
        top: 50%;
        left: 50%;
        width: 100vw;
        height: auto;
        transform: translate(-50%, -50%);
        position: absolute;
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

const AboutFooter = styled.div `
    height: 30vh;
    background-color: #1d1e22;
    display: flex;
    color: var(--white);
    width: 100%;
    padding-top: 10vh;
`

const AboutFooterRow = styled(Row)`
width: 100%;
display: flex;
align-items: center;
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

    constructor() {
        super()
    }

    componentDidUpdate(prevProps) {

        if (this.props.initialUtility.session === true) {
            if (!this.props.about.aboutData.length) {
                this
                    .props
                    .dispatch(getAbout(this.props.initialUtility.keystoneToken))
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

    sanitizeHTML(itemToClean) {
        const clean = DOMPurify.sanitize(itemToClean);
        return clean;
    }

    render(props) {
        let item = this.props.about.aboutData[0];
        return (
            <div>
                {this.props.about.aboutData.length
                    ? <BaseLayer>
                            <HeaderComponent location={this.props.location.pathname}/>
                            <Sticky>
                                <IntroSection >
                                    <FadeInWhenVisibleOpacity duration={2}>
                                        <AboutPageHero/>
                                    </FadeInWhenVisibleOpacity>
                                    <Col xs={1} sm={2}></Col>
                                    <Col  xs={10} sm={8}>

                                        <Row>
                                        <MediaQuery minWidth={575}> <Col sm={6}></Col></MediaQuery>
                                            <Col xs={12} sm={6}>

                                                <FadeInWhenVisibleScale>
                                                    <Row>
                                                        <IntroBlurb1 >
                                                            {item.introBlurbOne}
                                                        </IntroBlurb1>

                                                    </Row>
                                                    <Row>
                                                        <FifthLine>
                                                            <LineAnimationL2R/>
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
                                    <Col xs={1} sm={2}></Col>

                                </IntroSection>
                            </Sticky>
                        <MediaQuery minWidth={960}>
                            <Sticky >
                                <ImgSection >
                                    <VideoContainer>
                                        <div></div>
                                        <video
                                            height="auto"
                                            width="100%"
                                            autoPlay={true}
                                            loop={true}
                                            muted={true}
                                            controls={false}>
                                            <source src={item.parallaxVideoEmbed}/>
                                            <p className="warning">Your browser does not support HTML5 video.</p>
                                        </video>
                                    </VideoContainer>
                                </ImgSection>
                            </Sticky>
                        </MediaQuery>
                            <Waypoint
                                onEnter={() => {
                                this
                                    .props
                                    .dispatch(getIntersectingState(true))
                            }}
                                bottomOffset={'100%'}
                                topOffset={100}
                                onLeave={() => {
                                this
                                    .props
                                    .dispatch(getIntersectingState(false))
                            }}>

                                <AboutSection >
                                    <Col xs={1} sm={2}></Col>
                                    <Col xs={10} sm={8}>
                                        <FadeInWhenVisibleScale>
                                            <AboutMainTop
                                                dangerouslySetInnerHTML={{
                                                __html: this.sanitizeHTML(item.aboutInitialDescription)
                                            }}></AboutMainTop>
                                        </FadeInWhenVisibleScale>
                                        <Row>
                                            <Line></Line>
                                        </Row>
                                        <FadeInWhenVisibleScale>
                                            <AboutMain>
                                                <Section>

                                                    <Col xs={12}>
                                                        <span>{item.aboutSectionOneShort}</span>
                                                    </Col>
                                                    <Col xs={12}>
                                                        <p>{item.aboutSectionOneLong}</p>
                                                    </Col>
                                                </Section>
                                                <Section>
                                                    <MediaQuery minWidth={960}>
                                                        <Col xs={0}></Col>
                                                    </MediaQuery>
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
                                    <Col xs={1} sm={2}></Col>
                                </AboutSection>

                            </Waypoint>

                            <Sticky>
                                <ServicesSection>
                                    <Col xs={1} sm={2}></Col>
                                    <Col xs={10} sm={8}>
                                        <FadeInWhenVisibleScale>
                                            <Services>
                                                <Line white></Line>
                                                <ServicesInitialDescription
                                                    dangerouslySetInnerHTML={{
                                                    __html: this.sanitizeHTML(item.servicesInitialDescription)
                                                }}></ServicesInitialDescription>
                                                <ServicesMain>
                                                    <Col>
                                                        <span>{item.serviceOneName}</span>
                                                        <Line white></Line>
                                                    </Col>
                                                <MediaQuery minWidth={575}>
                                                    <Col  sm={1}></Col>
                                                    <Col>
                                                        <span>{item.serviceOneValue}</span>
                                                        <Line white></Line>
                                                    </Col>
                                                    </MediaQuery>
                                                </ServicesMain>
                                                <ServicesMain>
                                                <MediaQuery minWidth={960}>
                                                    <Col></Col>
                                                    <Col sm={1}></Col>
                                                </MediaQuery>
                                                    
                                                    <Col>
                                                        <MediumText>
                                                            {item.serviceOneDescription}
                                                        </MediumText>
                                                        <DigitalServicesList >
                                                            <Col
                                                                dangerouslySetInnerHTML={{
                                                                __html: this.sanitizeHTML(item.serviceOneListOne)
                                                            }}></Col>
                                                            <Col
                                                                dangerouslySetInnerHTML={{
                                                                __html: this.sanitizeHTML(item.serviceOneListTwo)
                                                            }}></Col>
                                                        </DigitalServicesList>

                                                    </Col>
                                                </ServicesMain>

                                                <ServicesMain>
                                                    <Col>
                                                        <span>{item.serviceTwoName}</span>
                                                        <Line white></Line>
                                                    </Col>
                                                <MediaQuery minWidth={960}>
                                                    <Col sm={1}></Col>
                                                    <Col>
                                                        <span>{item.serviceTwoValue}</span>
                                                        <Line white></Line>
                                                    </Col>
                                                    </MediaQuery>
                                                </ServicesMain>

                                                <ServicesMain>
                                                    <MediaQuery minWidth={575}>
                                                    <Col></Col>
                                                    <Col sm={1}></Col>
                                                    </MediaQuery>
                                                    <Col>
                                                        <MediumText>
                                                            {item.serviceOneDescription}
                                                        </MediumText>
                                                        <DigitalServicesList>
                                                            <Col
                                                                dangerouslySetInnerHTML={{
                                                                __html: this.sanitizeHTML(item.serviceTwoListOne)
                                                            }}></Col>
                                                            <Col
                                                                dangerouslySetInnerHTML={{
                                                                __html: this.sanitizeHTML(item.serviceTwoListTwo)
                                                            }}></Col>
                                                        </DigitalServicesList>

                                                    </Col>
                                                </ServicesMain>
                                            </Services>
                                        </FadeInWhenVisibleScale>
                                    </Col>
                                    <Col xs={1} sm={2}></Col>
                                </ServicesSection>

                                <AboutFooter>
                                    <AboutFooterRow>
                                        <Col xs={1} sm={2}></Col>
                                        <Col xs={10} sm={8}>
                                        <Footer location={this.props.location.pathname} />
                                        </Col>
                                        <Col xs={1} sm={2}></Col>
                                    </AboutFooterRow>
                                </AboutFooter>
                            </Sticky>
                        </BaseLayer>
                    : null}
            </div>

        );
    }

}

export default connect(mapStateToProps)(About);
