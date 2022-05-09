import React, {Fragment, Component} from 'react';
import {Row, Col} from 'react-bootstrap';
import {connect} from 'react-redux';
import HomepageHero from '../components/heros/homepageHero'
import faker from 'faker';
import HeaderComponent from '../components/navigation/header';
import Footer from '../components/footer';
import styled from 'styled-components';
import {getHomepage} from './../actions/homepage.actions';
import {getToken, establishSession} from './../actions/initialUtility.actions';
import {Link} from 'react-router-dom';
import {Waypoint} from 'react-waypoint';
import {getIntersectingState} from '../actions/pages.actions';

const SectionOne = styled(Row)`
padding-top: 20vh;
`

const SectionTwo = styled(SectionOne)`
padding-top: 0;
margin-top: -7vh;
`
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
const H3 = styled.h3`
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

                <Waypoint onEnter={() => { this.props.dispatch(getIntersectingState(true)) }} bottomOffset={'100%'} topOffset={100} onLeave={() => { this.props.dispatch(getIntersectingState(false)) }}>
                                <Row >
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
                                </Row>

                            </Waypoint>
                            <Footer/>
                        </Fragment>
                    : null}
            </div>

        );
    }
}

export default connect(mapStateToProps)(Home);