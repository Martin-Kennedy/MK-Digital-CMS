import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import styled from "styled-components";
import { Line, MediumText } from '../helpers/commonStyledComponents';
import HeaderComponent from '../components/navigation/header';
import Footer from '../components/footer';
import ProjectPageHero from '../components/heros/projectPageHero';
import { FadeInWhenVisibleOpacity, FadeInWhenVisibleScale } from '../helpers/fadeInOnViewport';
import { LineAnimationL2R, LineAnimationR2L } from '../components/designElementComponents/lineSvg';
import { TextTranslation } from "../helpers/textTranslation";
import { connect } from 'react-redux';
import { getProjectItem, getNextProjectItem } from '../actions/projects.actions';
import Sticky from 'react-stickynode';
import { Waypoint } from 'react-waypoint';
import { getIntersectingState } from '../actions/pages.actions';

const BaseLayer = styled.div`
    background-color: var(--white);
`

const IntroSection = styled(Row)`
    background-color: var(--white);
    min-height: 500px;
    color: var(--black);
    z-index: 1;
    position: relative;
    padding-bottom: 35vh;
`;

const IntroBlurb1 = styled.h2`
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: none;
    font-weight: 200;
    font-size: 17px;
    padding-left: 40px;
    margin-right: 30px;
    div:first-child {
        margin-bottom: 1.5rem;
    }
`
const IntroBlurb2 = styled.h2`
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: none;
    font-weight: 200;
    font-size: 17px;
    margin-left: 30px;
    div:first-child {
        margin-bottom: 1.5rem;
    }
`

const Img = styled.img`
    width: 100%;
    height: 100%;
margin: 100px 0;
`

const ImgSection = styled(Row)`
    width: 100vw;
    background-image: url(${props => props.img});
    background-position: center;
    background-size: 100vw auto;
    background-repeat: no-repeat;
    margin: 0;
    z-index: 0;
    position: absolute;
    height: 1000px;
`
const Section = styled(Row)`
min-height: 1000px;
height: 100%;
background-color: var(--white);
`

const ServicesSection = styled(Row)`
    margin-bottom: 9rem;
    span {
        top: 0;
    }
    p {
        font-weight: 200;
    }
`

const Section100VW = styled(Row)`
min-height: 1000px;
height: 100%;
width: 100vw;
padding: 0 !important;
margin: 0 !important;
`

const FiftyVW = styled(Row)`
padding: 0 !important;
margin: 0 !important;
width: 50vw;
height: 100vh;
background-color: ${props => props.color
        ? props.color
        : 'var(--white)'};
`

const FiftyVWImg = styled.div`
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: center;
    justify-content: center;
    -ms-flex-align: center;
    align-items: center;
    height: 50vh;
    padding: 50vh 33%;
`

const AssetSection1 = styled.div`
padding-bottom: 35vh;
background-color: var(--white);
`

const ProjectFooter = styled.div`
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

const ResultsSection = styled(Row)`
    background-color: var(--white);
    min-height: 500px;
    color: var(--black);
    z-index: 1;
    position: relative;
    height: 100vh ;
    font-weight: 200;
    font-size: .8rem;
    .row {
        flex-wrap: nowrap;
    }
`

const ResultsMetricType = styled(Row)`
    margin-top: 10vh;
    margin-bottom: 2rem;
    flex-wrap: nowrap;
    p {
    margin-left: 20px;
 }
 .col:first-child p {
     margin-left: 5px;
 }
    `

const ResultsMetricData = styled(Row)`
margin-bottom: 2rem;
flex-wrap: nowrap;
 p {
    font-size: 10rem;
    font-weight: 400;
    line-height: 150px;
 }

`

const ResultsBlurb = styled(Row)`
flex-wrap: nowrap;
 p {
    margin-left: 20px;
 }
 .col:first-child p {
     margin-left: 5px;
 }
`

const NextProject = styled(Row)`
background-color: var(--black);
height: 100vh;
z-index: 2;
position: relative;
`

const Wrapper = styled(Row)`
height: calc(100vh - 100px);
`

const FirstLine = styled.div`
    height: calc(33vh - 40px);
    position: relative;
    margin: 120px 0 0;
    width: 100%;
    top: 0%;
    svg {
    position: relative; 
    left: 0;
    line {
        stroke: var(--white);
    }
    }
    
    `;

const SecondLine = styled.div`
    height: 0;
    position: relative;
    z-index: 0;
    padding: 0 0 calc(33vh - 40px) 0;
    width: 100%;
    top: 0%;

    svg  {
    position: relative; 
    left: 0;
    line {
        stroke: var(--white);
    }
    `;

const ThirdLine = styled.div`
    height: 0;
    position: relative;
    z-index: 0;
    padding: 0 0 calc(33vh - 40px) 0;
    
    width: 100%;
    top: 0%;

    svg  {
    position: relative; 
    left: 0;
    line {
        stroke: var(--white);
    }
    }
    `;

const StaticHeroText = styled.div`
        font-family: mr-eaves-modern, sans-serif;
        font-weight: 200;
        font-size: 100px;
        color: var(--white);
        text-transform: uppercase;
        white-space: nowrap;
        letter-spacing: 1.5rem;
        position: relative;
        left: 3%;
        line-height: calc(33vh - 40px);
`

const mapStateToProps = state => {
    return {
        projects: {
            projectData: state.projects.projectData,
            nextProjectItem: state.projects.nextBlogItem,
            nextBlogItemPathname: state.projects.nextBlogItemPathname,
            projectItem: state.projects.BlogItem,
            isIntersecting: state.pages.isIntersecting
        }
    }
};

class BlogPage extends Component {

    constructor() {
        super();
        this.state = {
            titleSlug: null
        }
    }

    componentDidUpdate(prevProps) {

        if (prevProps.blogs.blogData !== this.props.blogs.blogData) {
            let path = this.props.location.pathname;
            let slug = path.substring(path.lastIndexOf('/') + 1)
            const revertedTitle = slug
                .replace(/-/g, ' ')
                .replace(/_/g, ' ');
            this
                .props
                .dispatch(getBlogItem(revertedTitle));

        }



    }

    getFirstPathSegmennt(props) {
        return props.split('/')[1];

    }

    




    render() {
        let item = this.props.blogs.blogItem[0];

        return (
            <div>
                {this.props.projects.blogItem.length
                    ? <BaseLayer>
                        <HeaderComponent
                            location={this.getFirstPathSegmennt(this.props.location.pathname)} />
                        <Sticky >
                            <FadeInWhenVisibleOpacity duration={2}>
                            </FadeInWhenVisibleOpacity>

                            <IntroSection >
                                <Col xs={2}></Col>
                                <Col xs={8}>
                                    <Row>
                                       
                                    </Row>
                                    <Row>
                                        <FadeInWhenVisibleScale duration={1}>
                                           
                                        </FadeInWhenVisibleScale>
                                    </Row>
                                </Col>
                                <Col xs={2}></Col>
                            </IntroSection>
                        </Sticky>
                        <Sticky >
                            <Section>
                            </Section>
                        </Sticky>
                        <Sticky >
                            <AssetSection1>
                                <Section >
                                    <Col xs={2}></Col>
                                    <Col >
                                        <FadeInWhenVisibleScale duration={1}>
                                           
                                        </FadeInWhenVisibleScale>
                                    </Col>
                                    <Col xs={2}></Col>
                                </Section>
                                <Section>
                                    <Col xs={2}></Col>
                                    <Col >
                                        <FadeInWhenVisibleScale duration={1}>
                                            
                                        </FadeInWhenVisibleScale>
                                    </Col>
                                    <Col xs={2}></Col>
                                </Section>
                            </AssetSection1>
                        </Sticky>

                      

                      
                        <Footer />

                    </BaseLayer>
                    : 'loading'
                }
            </div>
        )

    }
}



export default connect(mapStateToProps)(BlogPage);