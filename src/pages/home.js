import React, {Fragment, Component} from 'react';
import {Row, Col} from 'react-bootstrap';
import {connect} from 'react-redux';
import HomepageHero from '../components/heros/homepageHero'
import XaxisScrollComponent from '../helpers/dragOnXaxis';
import HeaderComponent from '../components/navigation/header';
import Footer from '../components/footer';
import styled from 'styled-components';
import {getHomepage} from './../actions/homepage.actions';
import {getToken, establishSession} from './../actions/initialUtility.actions';
import {Link} from 'react-router-dom';
import {Waypoint} from 'react-waypoint';
import {getIntersectingState} from '../actions/pages.actions';


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
    `
const H2Small = styled(H2)`
font-size: 1vw;
font-weight: 300;
`
const H3 = styled.h3 `
    font-size: 2vw;
    font-weight: 500;
    width: 100%;
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
    font-size: 12px;
    font-weight: 500;
    text-align: center;
    line-height: 7vw;
    &:hover {
        cursor: pointer;
        color: var(--white);
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
`

const SectionOneBlurbOne = styled.p `
font-size: 2vw;
`
const SectionTwoBlurbOne = styled(SectionOneBlurbOne)`
font-size: 1.5vw;
line-height: 1.75vw;
padding-right: 2vw;
`;
const SectionTwoBlurbTwo = styled(SectionOneBlurbOne)`
font-size: 1.5vw;
line-height: 1.75vw;
`;
const SectionThreeBlurbOne = styled(SectionOneBlurbOne)`
font-size: 8vw;
line-height: 8vw;
`;

const SectionFourBlurbOne = styled(SectionOneBlurbOne)`
font-size: 1.5vw;
line-height: 1.5vw;
`;

const SectionFiveBlurbOne = styled(SectionOneBlurbOne)`
font-size: 1.5vw;
line-height: 1.5vw;
padding-right: 2vw;
margin-top: 5vh;
`;
const DragComponentContainer = styled.div`
word-spacing: 100px;
`
const HomeFooter = styled.div`
    height: 20vh;
    background-color: #1d1e22;
    .row {
        color: #fff;
        width: 100vw;
        padding: 10vh 10px 10px 0;
        margin: 0;
        display: flex;
        align-items: center;
    }
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

class Home extends Component {

    constructor() {
        super();
        this.state = {
            mouseLeft: null
        }

    }

    componentDidUpdate(prevProps) {

        if (this.props.initialUtility.session === true) {
            if (!this.props.homepage.pageData) {
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
                {this.props.homepage.pageData
                    ? <Fragment>
                            <HeaderComponent location={this.props.location.pathname}/> {/* Hero Section */}
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
                  <Col sm={3}></Col>
                  <Col sm={7}>
                      <SectionOne>
                          <Line></Line>
                          {console.log(pageData)}
                          <H2>{pageData.sectionOneTitle}</H2>
                          <SectionOneBlurbOne>{pageData.sectionOneBlurbOne}</SectionOneBlurbOne>
                          <Line belowText></Line>
                          <SectionLink
                              to={pageData.sectionOneLink}
                              replace
                              color={pageData.sectionOneLinkColor}
                              className={this.state.mouseLeft === true
                              ? 'projectSiteLinkHoverOut'
                              : this.state.mouseLeft === false
                                  ? 'projectSiteLinkHoverIn'
                                  : null}
                              onMouseEnter={() => this.setState({mouseLeft: false})}
                              onMouseLeave={() => this.setState({mouseLeft: true})}>{pageData.sectionOneLinkLabel}</SectionLink>

                      </SectionOne>
                      <SectionTwo>
                          <H3>{pageData.sectionTwoTitle}</H3>
                          <Col>
                              <SectionTwoBlurbOne>{pageData.sectionTwoBlurbOne}</SectionTwoBlurbOne>
                          </Col>
                          <Col>
                              <SectionTwoBlurbTwo>{pageData.sectionTwoBlurbTwo}</SectionTwoBlurbTwo>
                          </Col>
                          <Line belowText></Line>
                      </SectionTwo>
                  </Col>
                  <Col sm={2}></Col>
                  </AboutRow>

                </Waypoint>
                <ApplicationRow >
                  <Col sm={3}></Col>
                  <Col sm={7}>
                    <SectionThree>
                      <Line white belowText></Line>
                      <H2Small>{pageData.sectionThreeTitle}</H2Small>
                      <SectionThreeBlurbOne>{pageData.sectionThreeBlurbOne}</SectionThreeBlurbOne>
                      <Line white belowText></Line>
                      

                      </SectionThree>
                      <SectionFour>
                      <Col>
                        <ApplicationSectionLink
                          to={pageData.sectionFourLink}
                          replace
                          color={pageData.sectionFourLinkColor}
                          className={this.state.mouseLeft === true
                            ? 'projectSiteLinkHoverOut'
                            : this.state.mouseLeft === false
                              ? 'projectSiteLinkHoverIn'
                              : null}
                          onMouseEnter={() => this.setState({ mouseLeft: false })}
                          onMouseLeave={() => this.setState({ mouseLeft: true })}>{pageData.sectionFourLinkLabel}
                        </ApplicationSectionLink>
                      </Col>
                      <Col>
                        <H3>{pageData.sectionFourTitle}</H3>
                          <SectionFourBlurbOne>{pageData.sectionFourBlurb}</SectionFourBlurbOne>
                      </Col>
                      <Line belowText></Line>
                        </SectionFour>
                  </Col>
                  <Col sm={2}></Col>
                </ApplicationRow>
                <ContactRow>
                  <Col sm={3}></Col>
                  <Col sm={7}>
                    <SectionFive>
                      <Line white belowText></Line>
                      <DragComponentContainer>
                      <XaxisScrollComponent white text={pageData.sectionFiveTitle} />
                      </DragComponentContainer>
                     
                    </SectionFive>
                    <SectionSix>
                      <Line white belowText></Line>
                      <Col>
                        <SectionFiveBlurbOne>{pageData.sectionFiveBlurb}</SectionFiveBlurbOne>
                      </Col>
                      <Col>
                        
                        <ContactSectionLink
                          to={pageData.sectionFiveLink}
                          replace
                          color={pageData.sectionFiveLinkColor}
                          className={this.state.mouseLeft === true
                            ? 'projectSiteLinkHoverOut'
                            : this.state.mouseLeft === false
                              ? 'projectSiteLinkHoverIn'
                              : null}
                          onMouseEnter={() => this.setState({ mouseLeft: false })}
                          onMouseLeave={() => this.setState({ mouseLeft: true })}>{pageData.sectionFiveLinkLabel}
                        </ContactSectionLink>
                      </Col>
                    </SectionSix>
                  </Col>
                  <Col sm={2}></Col>
                   
                </ContactRow>
                <HomeFooter>
                  <Footer />
                </HomeFooter>
                
            </Fragment>
                    : null}
            </div>

        );
    }
}

export default connect(mapStateToProps)(Home);