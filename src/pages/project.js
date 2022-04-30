import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Row, Col} from 'react-bootstrap';
import styled from "styled-components";
import {Line, MediumText} from '../helpers/commonStyledComponents';
import HeaderComponent from '../components/navigation/header';
import Footer from '../components/footer';
import ProjectPageHero from '../components/heros/projectPageHero';
import {FadeInWhenVisibleOpacity, FadeInWhenVisibleScale} from '../helpers/fadeInOnViewport';
import {LineAnimationL2R, LineAnimationR2L} from '../components/designElementComponents/lineSvg';
import {TextTranslation} from "../helpers/textTranslation";
import {connect} from 'react-redux';
import {getProjectItem, getNextProjectItem} from '../actions/projects.actions';
import Sticky from 'react-stickynode';
import {Waypoint} from 'react-waypoint';
import {getIntersectingState} from '../actions/pages.actions';

const BaseLayer = styled.div `
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

const IntroBlurb1 = styled.h2 `
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
const IntroBlurb2 = styled.h2 `
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
const ImgContainerTop = styled.div `
width: 100%;
height: 80vh;
`
const Img = styled.img `
    width: 100%;
    height: 100%;
    margin: 50px 0;
    @media (max-width: 980px){
        margin: 9vw 0;
    }
object-fit: contain;
`

const ImgSection = styled(Row)`
    width: 100vw;
    background-image: url(${props => props.img});
    background-position: center;
    background-size: cover;
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

const FiftyVWImg = styled.div `
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: center;
    justify-content: center;
    -ms-flex-align: center;
    align-items: center;
    height: 50vh;
    padding: 50vh 33%;
`

const AssetSection1 = styled.div `
padding-bottom: 35vh;
background-color: var(--white);
`

const ProjectFooter = styled.div `
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

const FirstLine = styled.div `
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

const SecondLine = styled.div `
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

const ThirdLine = styled.div `
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

const StaticHeroText = styled.div `
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

const VideoContainer = styled.div`
    position: absolute; 
    padding-bottom: 49.25%; 
    height: 0; 
    overflow: hidden;
    top: 11.5%;
    left: 3%;
    width: 94%;
    height: 53%;
    z-index: 2;
    @media (max-width: 980px){
            top: 11.5vw;
            left: 2vw;
            width: 61vw;
            height: 35vw;
        }
    iframe, object, embed, img {
        position: absolute; 
        top: 0; 
        left: 0; 
        width: 100%; 
        height: 100%;
    }
`

const IMacVideoContainer = styled.div`
position: relative;
width: 100%;
margin-top: 20vh;
`

const ImgContainer = styled.div`
margin-top: 10vh;
width:100%;
@media (max-width: 980px){
    width: 50vw;
}

`

const mapStateToProps = state => {
    return {
        initialUtility: {
            session: state.initialUtility.session,
            keystoneToken: state.initialUtility.keystoneToken,
        },
        
        projects: {
            projectData: state.projects.projectData,
            nextProjectItem: state.projects.nextProjectItem,
            nextProjectItemPathname: state.projects.nextProjectItemPathname,
            projectItem: state.projects.projectItem,
            isIntersecting: state.pages.isIntersecting
        }
    }
};

class ProjectPage extends Component {

    constructor() {
        super();
        this.state = {
            titleSlug: null
        }
    }

    componentDidUpdate(prevProps) {
        
        if (prevProps.initialUtility.session !== this.props.initialUtility.session) {
            let path = this.props.location.pathname;
            let slug = path.substring(path.lastIndexOf('/') + 1)
            const revertedTitle = slug
                .replace(/-/g, ' ')
                .replace(/_/g, ' ');
            this
                .props
                .dispatch(getProjectItem(revertedTitle, this.props.initialUtility.keystoneToken));
        }
        if(prevProps.projects.projectItem !== this.props.projects.projectItem) {
            if(this.props.projects.projectItem.length){
                const result = this.props.projects.projectData.filter(project => {
                    return project.client === this.props.projects.projectItem[0].client;
                });
                const nextClient = this.props.projects.projectData.filter(project => {
                    return result[0].orderNum + 1 === project.orderNum;
                });

                // this.props.dispatch(getNextProjectItem(nextClient[0].client))
            }
           
        }

    }

    getFirstPathSegment(props) {
        return props.split('/')[1];

    }

    formatDate(date) {
        const d = new Date(date);
        return `${monthNames[d.getMonth()]} - ${d.getFullYear()}`;
    }



    render() {
        let item = this.props.projects.projectItem[0];

        return (
            <div>
                {this.props.projects.projectItem.length
                    ? <BaseLayer>
                        
                            <HeaderComponent
                                location={this.getFirstPathSegment(this.props.location.pathname)}/>
                            <Sticky >
                                <FadeInWhenVisibleOpacity duration={2}>
                                    <ProjectPageHero item={item}/>
                                </FadeInWhenVisibleOpacity>

                                <IntroSection >
                                    <Col xs={2}></Col>
                                    <Col xs={8}>
                                        <Row>
                                            <Col sm={6}>
                                                <FadeInWhenVisibleScale duration={.5}>
                                                    <IntroBlurb1 >
                                                        <Row>About {item.client}</Row>
                                                        <Row>
                                                            {item.aboutClient}</Row>
                                                    </IntroBlurb1>
                                                </FadeInWhenVisibleScale>
                                            </Col>
                                            <Col sm={6}>
                                                <FadeInWhenVisibleScale duration={1}>
                                                    <IntroBlurb2 >
                                                        <Row>The Work</Row>
                                                        <Row>{item.whatWeDid}</Row>
                                                    </IntroBlurb2>
                                                </FadeInWhenVisibleScale>

                                            </Col>
                                        </Row>
                                        <Row>
                                            <FadeInWhenVisibleScale duration={1}>
                                                <ImgContainerTop>
                                                <Img src={item.image1.publicUrl}></Img>
                                                </ImgContainerTop>
                                            </FadeInWhenVisibleScale>
                                        </Row>
                                    </Col>
                                    <Col xs={2}></Col>
                                </IntroSection>
                            </Sticky>
                            <Sticky >
                                <Section>
                                <ImgSection img={item.image2FullWidth.publicUrl}></ImgSection>
                                </Section>
                            </Sticky>
                            <Sticky >
                                <AssetSection1>
                                    <Section >
                                        <Col xs={2}></Col>
                                        <Col >
                                            <FadeInWhenVisibleScale duration={1}>
                                            <IMacVideoContainer>
                                                <Img src={item.videoHolderImage.publicUrl}></Img>
                                                <VideoContainer>
                                                    <iframe width="1280" height="662" src={`https://www.youtube.com/embed/${item.youtubeEmbedCode}?list=${item.youtubeListCode}&controls=0&showinfo=0&rel=0&autoplay=1&loop=1&mute=1`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                                </VideoContainer>
                                            </IMacVideoContainer>
                                                
                                            </FadeInWhenVisibleScale>
                                        </Col>
                                        <Col xs={2}></Col>
                                    </Section>
                                    <Section>
                                        <Col xs={2}></Col>
                                        <Col >
                                            <FadeInWhenVisibleScale duration={1}>
                                                <ImgContainer>
                                                <Img src={item.image4.publicUrl}></Img>
                                            </ImgContainer>
                                            </FadeInWhenVisibleScale>
                                        </Col>
                                        <Col xs={2}></Col>
                                    </Section>
                                </AssetSection1>
                            </Sticky>

                            <Sticky>
                                <Section100VW>
                                    <FiftyVW color={'var(--black)'}>

                                        <FiftyVWImg>
                                            <FadeInWhenVisibleScale duration={1}>
                                                <Img src={item.iphoneImageDarkBackground.publicUrl}></Img>
                                            </FadeInWhenVisibleScale>
                                        </FiftyVWImg>

                                    </FiftyVW>
                                {console.log(item)}
                                <FiftyVW color={item.fiftyVwBkgColor}>

                                        <FiftyVWImg >
                                            <FadeInWhenVisibleScale duration={1}>
                                            <Img src={item.iphoneImageColorBackground.publicUrl}></Img>
                                            </FadeInWhenVisibleScale>
                                        </FiftyVWImg>

                                    </FiftyVW>
                                </Section100VW>
                            </Sticky>

                            <ResultsSection>
                                <Col sm={2}></Col>
                                <Col sm={8}>
                                    <FadeInWhenVisibleScale>
                                        <ResultsMetricType>

                                            <Col>
                                            <p>{item.resultMetric1Description}</p>
                                            </Col>
                                            <Col>
                                            <p>{item.resultMetric2Description}</p>
                                            </Col>
                                        </ResultsMetricType>
                                    </FadeInWhenVisibleScale>

                                    <Row>
                                        <Col sm={6}>
                                            <Line></Line>
                                        </Col>
                                        <Col></Col>
                                        <Col sm={6}>
                                            <Line></Line>
                                        </Col>
                                    </Row>
                                    <FadeInWhenVisibleScale>
                                        <ResultsMetricData>
                                            <Col sm={6}>
                                            <p>{item.resultMetric1Value}</p>
                                            </Col>
                                            <Col></Col>
                                            <Col sm={6}>
                                            <p>{item.resultMetric2Value}</p>
                                            </Col>
                                        </ResultsMetricData>
                                    </FadeInWhenVisibleScale>
                                    <Row>
                                        <Col sm={6}>
                                            <Line></Line>
                                        </Col>
                                        <Col></Col>
                                        <Col sm={6}>
                                            <Line></Line>
                                        </Col>
                                    </Row>
                                    <FadeInWhenVisibleScale>
                                        <ResultsBlurb>
                                            <Row>
                                                <Col sm={6}>
                                                    <p>The Results</p>
                                                </Col>
                                                <Col></Col>
                                                <Col sm={6}>
                                                <p>{item.resultFullText}</p>
                                                </Col>
                                            </Row>

                                        </ResultsBlurb>
                                    </FadeInWhenVisibleScale>
                                </Col>
                                <Col sm={2}></Col>
                            </ResultsSection>
                            <Waypoint
                                onEnter={() => {
                                this.props.dispatch(getIntersectingState(true))
                            }}
                                bottomOffset={'100%'}
                                topOffset={100}
                                onLeave={() => {
                                this
                                    .props
                                    .dispatch(getIntersectingState(false))
                            }}>
                                <NextProject>
                                <Link to={this.props.projects.nextProjectItemPathname}>
                                        <Wrapper >
                                            <Col xs={2}></Col>
                                            <Col xs={8}>
                                                <FirstLine>
                                                    <LineAnimationL2R/>
                                                    <StaticHeroText >
                                                        Next
                                                    </StaticHeroText>
                                                </FirstLine>
                                                <SecondLine>
                                                    <LineAnimationR2L/>
                                                    <TextTranslation
                                                        duration={20}
                                                        delay={0}
                                                        reverse
                                                        ratio3rd
                                                text={this.props.projects.nextProjectItem}
                                                        />
                                                </SecondLine>
                                                <ThirdLine>
                                                    <LineAnimationL2R/>
                                                </ThirdLine>

                                            </Col>
                                            <Col xs={2}></Col>
                                        </Wrapper>
                                    </Link>
                                    <ProjectFooter>
                                        <Footer/>
                                    </ProjectFooter>
                                </NextProject>
                            </Waypoint>

                        </BaseLayer>
                    : 'loading'
}
            </div>
        )

    }
}

export default connect(mapStateToProps)(ProjectPage);