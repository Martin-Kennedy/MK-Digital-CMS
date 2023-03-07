import React, {Fragment, useEffect} from 'react';
import {Row, Col} from 'react-bootstrap';
import {connect} from 'react-redux';
import HomepageHero from '../components/heros/homepageHero'
import XaxisScrollComponent from '../helpers/dragOnXaxis';
import HeaderComponent from '../components/navigation/header';
import Footer from '../components/footer';
import Loading from '../components/loadingComponent';
import styled from 'styled-components';
import {getHomepage} from './../actions/homepage.actions';
import {getToken, establishSession} from './../actions/initialUtility.actions';
import {Link} from 'react-router-dom';
import {Waypoint} from 'react-waypoint';
import {getIntersectingState} from '../actions/pages.actions';
import MediaQuery from 'react-responsive';

const AboutRow = styled(Row)`
background-color: var(--white);
margin-bottom: 15vh;
`

const ApplicationRow = styled(Row)`
background-color: var(--black);
p, div, span {
  color: var(--white);
}
`

const ContactRow = styled(ApplicationRow)`
`;
const SectionOne = styled(Row)`
padding-top: 20vh;
@media(max-width: 690px){
        padding: 2rem;
    }
`

const SectionTwo = styled(SectionOne)`
padding-top: 0;
margin-top: -7vh;
`

const SectionThree = styled(SectionOne)``;
const SectionFour = styled(SectionOne)`
padding-top: 5vh;
`;

const SectionFive = styled(SectionOne)`
padding-top: 5vh;
`;

const SectionSix = styled(SectionOne)`
padding-top: 15vh;
@media(max-width: 690px){
    padding-top: 0;
}
`;

const Line = styled.div `
position: relative;
display: block;
width: 100%;
margin: ${props => props.belowText
    ? '5vh 0 3vh 0'
    : '0 0 3vh'};
border-bottom: ${props => props.white
        ? "#fff"
        : "#1d1e22"} 1px solid;
`

const H2 = styled.h2 `
    font-size: 7vw;
    font-weight: 500;
    @media(max-width: 690px){
        font-size: 18vw;
    }
    `
const H2Small = styled(H2)`
font-size: 1vw;
font-weight: 300;
@media(max-width: 690px){
        font-size: 6vw;
    }
`
const H3 = styled.h3 `
    font-size: 2vw;
    font-weight: 500;
    width: 100%;
     @media(max-width: 690px){
        font-size: 10vw;
    }

    `
const SectionLink = styled(Link)`
    background-color: ${props => props.color
    ? props.color
    : 'var(--black)'};
    width: 7vw;
    height: 7vw;
    border-radius: 100%;
    position: relative;
    display: block;
    left: 45vw;
    top: -10vh;
    margin: 0;
    color: var(--white);
    font-size: 1vw;
    font-weight: 500;
    text-align: center;
    line-height: 7vw;
    &:hover {
        cursor: pointer;
        color: var(--white);
    }
    @media(max-width: 690px){
        top: -7vh;
        width: 20vw;
        height: 20vw;
        line-height: 20vw;
        font-size: 1rem;
    }
`

const ApplicationSectionLink = styled(SectionLink)`
position: inherit;
border-radius: 0;
font-size: 1.5vw;
height: 4vw;
line-height: 4vw;
font-weight: 700;
width: fit-content;
padding: 0 2vw;
margin-top: 10vh;
@media(max-width: 690px){
        font-size: 5vw;
        height: 20vw;
        line-height: 20vw;
    }
`

const ContactSectionLink = styled(SectionLink)`
position: inherit;
border-radius: 0;
font-size: 1.5vw;
height: 4vw;
line-height: 4vw;
font-weight: 700;
width: fit-content;
padding: 0 2vw;
margin: 7vh 0 0 auto;
color: var(--black);
&:hover {
        color: var(--black);
    }
    @media(max-width: 690px){
        font-size: 5vw;
        height: 20vw;
        line-height: 20vw;
        padding: 0 7vw;
        margin: 7vh auto 0 0;
    }
`

const SectionOneBlurbOne = styled.p `
font-size: 2vw;
@media(max-width: 690px){
        font-size: 6vw;
        line-height: 10vw;
    }
`
const SectionTwoBlurbOne = styled(SectionOneBlurbOne)`
font-size: 1.5vw;
line-height: 1.75vw;
padding-right: 2vw;
@media(max-width: 690px){
        font-size: 6vw;
        line-height: 8vw;
    }
`;
const SectionTwoBlurbTwo = styled(SectionOneBlurbOne)`
font-size: 1.5vw;
line-height: 1.75vw;
@media(max-width: 690px){
        font-size: 6vw;
        line-height: 8vw;
    }
`;
const SectionThreeBlurbOne = styled(SectionOneBlurbOne)`
font-size: 8vw;
line-height: 8vw;
@media(max-width: 690px){
        font-size: 16vw;
        line-height: 16vw;
    }
`;

const SectionFourBlurbOne = styled(SectionOneBlurbOne)`
font-size: 1.5vw;
line-height: 2vw;
letter-spacing: .15vw;
@media(max-width: 690px){
        font-size: 6vw;
        line-height: 8vw;
    }
`;

const SectionFiveBlurbOne = styled(SectionOneBlurbOne)`
font-size: 1.5vw;
line-height: 2vw;
letter-spacing: .15vw;
padding-right: 2vw;
margin-top: 5vh;
@media(max-width: 690px){
        font-size: 6vw;
        line-height: 8vw;
    }
`;
const DragComponentContainer = styled.div `
word-spacing: 100px;
@media(max-width: 690px){
    word-spacing: 10vw;
    height: 30vw;
        >div {
            >div {
                >div {
                    >div {
                        font-size: 20vw;
                    }
                }
            }
        }
    }
`
const HomeFooter = styled.div `
    height: 30vh;
    background-color: #1d1e22;
    display: flex;
    color: var(--white);
    width: 100%;
    padding-top: 10vh;
`

const HomeFooterRow = styled(Row)`
width: 100%;
display: flex;
align-items: center;
`

const mapStateToProps = state => {
    return {
        initialUtility: {
            session: state.initialUtility.session,
            keystoneToken: state.initialUtility.keystoneToken
        },
        homepage: {
            pageData: state.homepage.pageData
        },
        totalSlides: state.homepage.totalSlides,
        currentSlide: state.homepage.currentSlide,
        hoverState: state.homepage.hoverState,
        intervalID: state.homepage.intervalID,
        imageElement: React.createRef(),
        imgWidth: state.homepage.imgWidth
    }
}

const Home = (props) => {

   const state = {
            mouseLeft: null,
            session: props.initialUtility.session,
            token: props.initialUtility.keystoneToken,

        }
    

    useEffect( () => {

        if (props.initialUtility.session === true) {
            if (!props.homepage.pageData) {
                props
                    .dispatch(getHomepage(props.initialUtility.keystoneToken));
            }
        } else {
            if (props.initialUtility.keystoneToken === null) {
                props
                    .dispatch(getToken())
            } else {
                props
                    .dispatch(establishSession(props.initialUtility.keystoneToken))
            }
        }
    },[state.session, state.token])

        const pageData = props.homepage.pageData;
        return (
            <div>
                {props.homepage.pageData
                    ? <Fragment>
                            <HeaderComponent location={props.location.pathname}/> {/* Hero Section */}
                            <HomepageHero/>

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
                                <AboutRow >
                                    <Col xs={1} sm={3}></Col>
                                    <Col xs={10} sm={7}>
                                        <SectionOne>
                                            <Col>
                                                <Line></Line>
                                                <H2>{pageData.sectionOneTitle}</H2>
                                                <SectionOneBlurbOne>{pageData.sectionOneBlurbOne}</SectionOneBlurbOne>
                                                <Line belowText></Line>
                                                <SectionLink
                                                    to={pageData.sectionOneLink}
                                                    replace
                                                    color={pageData.sectionOneLinkColor}
                                                    className={state.mouseLeft === true
                                                    ? 'projectSiteLinkHoverOut'
                                                    : state.mouseLeft === false
                                                        ? 'projectSiteLinkHoverIn'
                                                        : null}
                                                    onMouseEnter={() => setState({mouseLeft: false})}
                                                    onMouseLeave={() => setState({mouseLeft: true})}>{pageData.sectionOneLinkLabel}</SectionLink>
                                            </Col>

                                        </SectionOne>
                                        <SectionTwo>
                                            <Col>
                                                <H3>{pageData.sectionTwoTitle}</H3>
                                                <Col xs={12}>
                                                    <SectionTwoBlurbOne>{pageData.sectionTwoBlurbOne}</SectionTwoBlurbOne>
                                                </Col>
                                                <Col xs={12}>
                                                    <SectionTwoBlurbTwo>{pageData.sectionTwoBlurbTwo}</SectionTwoBlurbTwo>
                                                </Col>
                                                <Line belowText></Line>
                                            </Col>
                                        </SectionTwo>
                                    </Col>
                                    <Col xs={1} sm={2}></Col>
                                </AboutRow>

                            </Waypoint>
                            <ApplicationRow >
                                <Col xs={1} sm={3}></Col>
                                <Col xs={10} sm={7}>
                                    <SectionThree>
                                        <Col>
                                            <Line white belowText></Line>
                                            <H2Small>{pageData.sectionThreeTitle}</H2Small>
                                            <SectionThreeBlurbOne>{pageData.sectionThreeBlurbOne}</SectionThreeBlurbOne>
                                            <Line white belowText></Line>
                                        </Col>

                                    </SectionThree>
                                    <SectionFour>
                                        <Col
                                            xs={{
                                            span: 12,
                                            order: 'last'
                                        }}>
                                            <ApplicationSectionLink
                                                to={pageData.sectionFourLink}
                                                replace
                                                color={pageData.sectionFourLinkColor}
                                                className={state.mouseLeft === true
                                                ? 'projectSiteLinkHoverOut'
                                                : state.mouseLeft === false
                                                    ? 'projectSiteLinkHoverIn'
                                                    : null}
                                                onMouseEnter={() => setState({mouseLeft: false})}
                                                onMouseLeave={() => setState({mouseLeft: true})}>{pageData.sectionFourLinkLabel}
                                            </ApplicationSectionLink>
                                        </Col>
                                        <Col
                                            xs={{
                                            span: 12,
                                            order: 'first'
                                        }}>
                                            <H3>{pageData.sectionFourTitle}</H3>
                                            <SectionFourBlurbOne>{pageData.sectionFourBlurb}</SectionFourBlurbOne>
                                            <Line belowText></Line>
                                        </Col>

                                    </SectionFour>
                                </Col>
                                <Col xs={1} sm={2}></Col>
                            </ApplicationRow>
                            <ContactRow>
                                <Col xs={1} sm={3}></Col>
                                <Col xs={10} sm={7}>
                                    <SectionFive>

                                        <DragComponentContainer>
                                            <Line white belowText></Line>
                                            <XaxisScrollComponent white text={pageData.sectionFiveTitle}/>
                                        </DragComponentContainer>

                                    </SectionFive>
                                    <SectionSix>

                                        <Col
                                            xs={{
                                            span: 12,
                                            order: 'first'
                                        }}>
                                            <Line white belowText></Line>
                                            <SectionFiveBlurbOne>{pageData.sectionFiveBlurb}</SectionFiveBlurbOne>
                                        </Col>
                                        <Col
                                            xs={{
                                            span: 12,
                                            order: 'last'
                                        }}>

                                            <ContactSectionLink
                                                to={pageData.sectionFiveLink}
                                                replace
                                                color={pageData.sectionFiveLinkColor}
                                                className={state.mouseLeft === true
                                                ? 'projectSiteLinkHoverOut'
                                                : state.mouseLeft === false
                                                    ? 'projectSiteLinkHoverIn'
                                                    : null}
                                                onMouseEnter={() => setState({mouseLeft: false})}
                                                onMouseLeave={() => setState({mouseLeft: true})}>{pageData.sectionFiveLinkLabel}
                                            </ContactSectionLink>
                                        </Col>
                                    </SectionSix>
                                </Col>
                                <Col xs={1} sm={2}></Col>

                            </ContactRow>
                            <HomeFooter>
                                <HomeFooterRow>

                                    <Col xs={1} sm={3}></Col>
                                    <Col xs={10} sm={7}>
                                        <Footer location={props.location.pathname}/>
                                    </Col>
                                    <Col xs={1} sm={2}></Col>
                                </HomeFooterRow>

                            </HomeFooter>

                        </Fragment>
                    : <Loading/>}
            </div>

        );
}

export default connect(mapStateToProps)(Home);