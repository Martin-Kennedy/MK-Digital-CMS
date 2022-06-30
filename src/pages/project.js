import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Row, Col} from 'react-bootstrap';
import styled from "styled-components";
import {Line, MediumText, H2, Main} from '../helpers/commonStyledComponents';
import HeaderComponent from '../components/navigation/header';
import Footer from '../components/footer';
import ProjectPageHero from '../components/heros/projectPageHero';
import {FadeInWhenVisibleOpacity, FadeInWhenVisibleScale} from '../helpers/fadeInOnViewport';
import {LineAnimationL2R, LineAnimationR2L} from '../components/designElementComponents/lineSvg';
import {TextTranslation} from "../helpers/textTranslation";
import {connect} from 'react-redux';
import {getProjectItem, getNextProjectItem, getProjects} from '../actions/projects.actions';
import Sticky from 'react-stickynode';
import {Waypoint} from 'react-waypoint';
import {getIntersectingState} from '../actions/pages.actions';
import variables from '../variables.module.scss';
import MediaQuery from 'react-responsive';

const smallNum = Number(variables.smallNum);
const mediumNum = Number(variables.mediumNum)

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
    @media (max-width: ${variables.medium}) {
    margin-top: 70vw;
    padding:0;
}
`;

const IntroBlurb1 = styled.div `
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: none;
    font-weight: 200;
    margin-bottom: 1.5rem;
    padding: 0;
    margin-left: 0;
    margin-top: 20vh;
    @media(max-width: ${variables.medium}){
         margin-top: 10vh;
    }
`

const ProjectH2 = styled(H2)`
font-size: 1.5vw;
line-height: 1.75vw;
font-weight: 500;
margin-left: 0;
margin-top: 0;
margin-bottom: 3vw;
padding-left: 0;
letter-spacing: .5vw;
@media(max-width: ${variables.medium}){
    font-size: 5vw;
    line-height: 6vw;
    margin-bottom: 5vw;
}
@media(max-width: ${variables.small}){
    font-size: 7vw;
    line-height: 8vw;
    margin-bottom: 7vw;
}
`

const ProjectMain = styled(Main)`
p {
    font-size: 1.25vw;
    line-height: 1.5vw;
    padding-right: calc(var(--bs-gutter-x) * .5);
    padding-left: calc(var(--bs-gutter-x) * .5);
    letter-spacing: .125vw;
    padding-right: 5vw;
     @media(max-width: ${variables.medium}){
    font-size: 3vw;
    line-height: 4vw;
    letter-spacing: .35vw;

}
    @media(max-width: ${variables.small}){
    font-size: 5vw;
    line-height: 6vw;
    letter-spacing: .5vw;

}
}

`
const IntroBlurb2 = styled.div `
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: none;
    font-weight: 200;
    margin-bottom: 1.5rem;
    padding: 0;
    margin-left: 0;
    margin-top: 20vh;
     @media(max-width: ${variables.medium}){
         margin-top: 10vh;
    }
`
const ImgContainerTop = styled.div `
width: 100%;
height: 80vh;
@media(max-width: ${variables.medium}){
    width: 100vw;
    right: 0;
    margin: 0;
    padding: 0;
}
`
const Img = styled.img `
    width: 100%;
    height: 100%;
    margin: 50px 0;
    object-fit: contain;


`

const ImgSection = styled(Row)`
    width: 100vw;
    background-image: url(${props => props.img});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    margin: 0;
    right: 0;
    z-index: 0;
    position: absolute;
    height: 100vh;
    @media(max-width: ${variables.medium}){
            height: 60vh;
    }
`
const Section = styled(Row)`
min-height: 100vh;
height: 100%;
background-color: var(--white);
@media(max-width: ${variables.medium}){
min-height: 50vh;
}
`
const SectionFullWidthImage = styled(Section)`
@media(max-width: ${variables.medium}){
min-height: 100vh;
}
`;
const Section100VW = styled(Row)`
min-height: 100vh;
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
    padding: 50vh 25%;
    @media(max-width: ${variables.medium}){
        height: 90vh;
        padding: 10vh 10%;
    }
`

const AssetSection1 = styled.div `
padding-bottom: 35vh;
background-color: var(--white);
`

const ProjectFooter = styled(Row)`
    height: 100px;
    background-color: #1d1e22;
    .row {
        color: #fff;
        padding: 20px 10px;
            left: 3%;
        margin: 0;
        display: flex;
        align-items: center;
    }
`

const ResultsSection = styled(Row)`
    background-color: var(--white);
    color: var(--black);
    z-index: 1;
    position: relative;
    min-height: max-content;
    font-weight: 200;
    font-size: .8rem;

`

const ResultsMetricType = styled(Row)`
    margin-top: 10vh;
    margin-bottom: 2rem;
    font-size: 2vw;
    p {
    margin-left: 0px;
   
 }

 .col:first-child p {
     margin-left: 5px;
 }
  @media(max-width: ${variables.medium}){
    font-size: 5vw;
      .col{
          padding: 0;
      }
      p{
         margin-left:0;
      }
     
  }
    `

const ResultsMetricData = styled(Row)`
margin-bottom: 2rem;
 p {
    font-size: 14vw;
    font-weight: 400;
    line-height: 15vw;
    @media(max-width: ${variables.medium}){
        font-size: 35vw;
        line-height: 35vw;
    }
    @media(max-width: ${variables.small}){
        font-size: 43vw;
        line-height: 35vw;
    }
 }

`

const ResultsBlurb = styled(Row)`

 p {
    margin-left: 20px;
 }
 
 .col:first-child p {
     margin-left: 5px;
 }

 font-size: 1.5vw;
line-height: 1.75vw;
 padding-bottom: 10vh;
 @media(max-width: ${variables.medium}){
     .col{
         padding-left: 0;
     }
     p {
        margin-left: 0;
     }
     padding-bottom: 20vh;
     font-size: 3.5vw;
    line-height: 4.5vw;
 }
 
`

const NextProject = styled(Row)`
background-color: var(--black);
min-height: 100vh;
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
    >div {
        >div {
            >div {
                    font-size: 6vw;
    line-height: 6vw;
            }
        }
    }
    @media(max-width: ${variables.medium}){
        font-size: 12vw;
        line-height: 12vw;
    }

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

const VideoContainer = styled.div `
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
            height: 52%;

        }
    video, object, embed, img {
        position: absolute; 
        top: 0; 
        left: 0; 
        width: 100%; 
        height: 100%;
    }
`

const IMacVideoContainer = styled.div `
position: relative;
width: 100%;
margin-top: 20vh;
`

const ImgContainer = styled.div `
margin-top: 10vh;
width:100%;
@media (max-width: 980px){
    width: 100vw;
    margin-top: 30vh;
}
`

const ImgFullWidth = styled.div `
    width: 66vw;
    height: 100%;
    margin: 50px auto;
    background-position: center;
    background-size: contain;
    background-image: url('${props => props.background
    ? props.background
    : null}');
    background-repeat: no-repeat;
 @media(max-width: ${variables.large}){
    width: 100vw;
    left: 0;
    margin: 0;
    padding: 0;
    position: relative;
    transform: translate3d(0px, 0px, 0px);
    background-size: contain;
}
`
const ResultsDescription = styled.div `
margin-left: 1vw;
`

const mapStateToProps = state => {
    return {
        initialUtility: {
            session: state.initialUtility.session,
            keystoneToken: state.initialUtility.keystoneToken
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
            titleSlug: null,
            width: 100,
            height: 100
        }
    }

    updateDimensions = () => {
        this.setState({width: window.innerWidth, height: window.innerHeight});
    };
    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
    }
    componentDidMount() {
        this._isMounted = true;
        window.onpopstate = () => {
            if (this._isMounted) {
                const {hash} = location;
                if (hash.indexOf('home') > -1 && this.state.value !== 0) 
                    this.setState({value: 0})
                if (hash.indexOf('users') > -1 && this.state.value !== 1) 
                    this.setState({value: 1})
                if (hash.indexOf('data') > -1 && this.state.value !== 2) 
                    this.setState({value: 2})
            }
        }
        if (this.props.projects.projectItem.length) {
            const result = this
                .props
                .projects
                .projectData
                .filter(project => {
                    return project.client === this.props.projects.projectItem[0].client;
                });
            const nextClient = this
                .props
                .projects
                .projectData
                .filter(project => {
                    return result[0].orderNum + 1 === project.orderNum;
                });

            if (this.props.projects.projectData.length !== result[0].orderNum) {
                this
                    .props
                    .dispatch(getNextProjectItem(nextClient[0].client))
            }
            if (this.props.projects.projectData.length === result[0].orderNum) {
                this
                    .props
                    .dispatch(getNextProjectItem(this.props.projects.projectData[0].client))
            }

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
                .dispatch(getProjects(this.props.initialUtility.keystoneToken));
            this
                .props
                .dispatch(getProjectItem(revertedTitle, this.props.initialUtility.keystoneToken));
        }
        if (prevProps.projects.projectData !== this.props.projects.projectData) {
            if (this.props.projects.projectItem.length) {
                const result = this
                    .props
                    .projects
                    .projectData
                    .filter(project => {
                        return project.client === this.props.projects.projectItem[0].client;
                    });
                const nextClient = this
                    .props
                    .projects
                    .projectData
                    .filter(project => {
                        return result[0].orderNum + 1 === project.orderNum;
                    });
                if (this.props.projects.projectData.length !== result[0].orderNum) {
                    this
                        .props
                        .dispatch(getNextProjectItem(nextClient[0].client))
                }
                if (this.props.projects.projectData.length === result[0].orderNum) {
                    this
                        .props
                        .dispatch(getNextProjectItem(this.props.projects.projectData[0].client))
                }
            }
        }
        if (prevProps.projects.projectItem !== this.props.projects.projectItem) {
            if (this.props.projects.projectItem.length) {
                const resolvedResults = () => new Promise((res) => {
                    const result = this
                        .props
                        .projects
                        .projectData
                        .filter(project => {
                            return project.client === this.props.projects.projectItem[0].client;
                        });
                    res(result)
                })
                resolvedResults().then((result) => {
                    const nextClient = this
                        .props
                        .projects
                        .projectData
                        .filter(project => {
                            return result[0].orderNum + 1 === project.orderNum;
                        });
                    if (this.props.projects.projectData.length !== result[0].orderNum) {
                        this
                            .props
                            .dispatch(getNextProjectItem(nextClient[0].client))
                    }
                    if (this.props.projects.projectData.length === result[0].orderNum) {
                        this
                            .props
                            .dispatch(getNextProjectItem(this.props.projects.projectData[0].client))
                    }
                })

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
                                    <Col xs={1} sm={2}></Col>
                                    <Col xs={10} sm={8}>
                                        <Row>
                                            <Col sm={12} md={6}>
                                                <FadeInWhenVisibleScale duration={.5}>
                                                    <IntroBlurb1 >
                                                        <ProjectH2>About {item.client}</ProjectH2>
                                                        <ProjectMain>
                                                            <p>
                                                                {item.aboutClient}
                                                            </p>
                                                        </ProjectMain>
                                                    </IntroBlurb1>
                                                </FadeInWhenVisibleScale>
                                            </Col>
                                            <Col sm={12} md={6}>
                                                <FadeInWhenVisibleScale duration={1}>
                                                    <IntroBlurb2 >
                                                        <ProjectH2>The Work</ProjectH2>
                                                        <ProjectMain>
                                                            <p>{item.whatWeDid}
                                                            </p>
                                                        </ProjectMain>
                                                    </IntroBlurb2>
                                                </FadeInWhenVisibleScale>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs={1} sm={2}></Col>
                                    <FadeInWhenVisibleScale duration={1}>
                                        <Section100VW>
                                            <Col xs={0} sm={2}></Col>
                                            <Col xs={12} sm={8}></Col>
                                            <ImgContainerTop>
                                                <ImgFullWidth background={item.image1.publicUrl}></ImgFullWidth>
                                            </ImgContainerTop>
                                            <Col xs={0} sm={2}></Col>
                                        </Section100VW>
                                    </FadeInWhenVisibleScale>
                                </IntroSection>
                            </Sticky>
                            <Sticky >
                                <SectionFullWidthImage>
                                    <ImgSection img={item.image2FullWidth.publicUrl}></ImgSection>
                                </SectionFullWidthImage>
                            </Sticky>
                            <Sticky>
                                <AssetSection1>
                                {item.videoHolderImage ?
                                    <Section>
                                        <Col xs={1} sm={2}>\</Col>
                                        <Col>
                                            <FadeInWhenVisibleScale duration={1}>
                                                <IMacVideoContainer>
                                                    <Img src={item.videoHolderImage.publicUrl}></Img>
                                                    <VideoContainer>
                                                        <video
                                                            height="auto"
                                                            width="100%"
                                                            autoPlay={true}
                                                            loop={true}
                                                            muted={true}
                                                            controls={false}>
                                                            <source src={item.videoEmbedUrl}/>
                                                            <p className="warning">Your browser does not support HTML5 video.</p>
                                                        </video>
                                                    </VideoContainer>
                                                </IMacVideoContainer>
                                            </FadeInWhenVisibleScale>
                                        </Col>
                                        <Col xs={1} sm={2}></Col>
                                    </Section> : null}
                                    <Section>
                                        <Col xs={1} sm={2}></Col>
                                        <Col >
                                            <FadeInWhenVisibleScale duration={1}>
                                                <ImgContainer>
                                                    <Img src={item.image4.publicUrl}></Img>
                                                </ImgContainer>
                                            </FadeInWhenVisibleScale>
                                        </Col>
                                        <Col xs={1} sm={2}></Col>
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
                                {item.resultMetric1Description ?
                                    <FadeInWhenVisibleScale>
                                        
                                        <ResultsMetricType>
                                            <MediaQuery maxWidth={smallNum}>
                                                <Col xs={1}></Col>
                                            </MediaQuery>
                                            <Col xs={10} sm={6}>
                                                <p>{item.resultMetric1Description}</p>
                                            </Col>
                                            <MediaQuery maxWidth={smallNum}>
                                                <Col xs={1}></Col>
                                            </MediaQuery>
                                            <MediaQuery minWidth={mediumNum}>
                                                <Col sm={6}>
                                                    <p>{item.resultMetric2Description}</p>
                                                </Col>
                                            </MediaQuery>
                                        </ResultsMetricType>
                                    </FadeInWhenVisibleScale>
                                    : null}
                                {item.resultMetric1Description ?
                                    <Row>
                                        <MediaQuery minWidth={mediumNum}>
                                            <Col sm={5}>
                                                <Line></Line>
                                            </Col>
                                            <Col></Col>
                                            <Col sm={6}>
                                                <Line></Line>
                                            </Col>
                                        </MediaQuery>
                                        <MediaQuery maxWidth={mediumNum}>
                                            <MediaQuery maxWidth={smallNum}>
                                                <Col xs={1}></Col>
                                            </MediaQuery>
                                            <Col xs={10}>
                                                <Line></Line>
                                            </Col>
                                            <MediaQuery maxWidth={smallNum}>
                                                <Col xs={1}></Col>
                                            </MediaQuery>
                                        </MediaQuery>
                                    </Row>
                                    : null}
                                {item.resultMetric1Description ?
                                    <FadeInWhenVisibleScale>
                                        <ResultsMetricData>
                                            <MediaQuery maxWidth={smallNum}>
                                                <Col xs={1}></Col>
                                            </MediaQuery>
                                            <Col xs={10} sm={6}>
                                                <p>{item.resultMetric1Value}</p>
                                            </Col>
                                            <MediaQuery maxWidth={smallNum}>
                                                <Col xs={1}></Col>
                                            </MediaQuery>
                                            <MediaQuery minWidth={mediumNum}>
                                                <Col sm={6}>
                                                    <p>{item.resultMetric2Value}</p>
                                                </Col>
                                            </MediaQuery>
                                        </ResultsMetricData>
                                    </FadeInWhenVisibleScale>
                                    : null}
                                {item.resultMetric1Description ?
                                    <FadeInWhenVisibleScale>
                                        <ResultsMetricType>
                                            <MediaQuery maxWidth={mediumNum}>
                                                <MediaQuery maxWidth={smallNum}>
                                                    <Col xs={1}></Col>
                                                </MediaQuery>
                                                <Col xs={10} sm={6}>
                                                    <p>{item.resultMetric2Description}</p>
                                                </Col>
                                                <MediaQuery maxWidth={smallNum}>
                                                    <Col xs={1}></Col>
                                                </MediaQuery>
                                            </MediaQuery>
                                        </ResultsMetricType>
                                    </FadeInWhenVisibleScale>
                                    : null}
                                {item.resultMetric1Description ?
                                    <Row>
                                        <MediaQuery minWidth={mediumNum}>
                                            <Col sm={5}>
                                                <Line></Line>
                                            </Col>
                                            <Col></Col>
                                            <Col sm={6}>
                                                <Line></Line>
                                            </Col>
                                        </MediaQuery>
                                        <MediaQuery maxWidth={mediumNum}>
                                            <MediaQuery maxWidth={smallNum}>
                                                <Col xs={1}></Col>
                                            </MediaQuery>
                                            <Col xs={10}>
                                                <Line></Line>
                                            </Col>
                                            <MediaQuery maxWidth={smallNum}>
                                                <Col xs={1}></Col>
                                            </MediaQuery>
                                        </MediaQuery>
                                    </Row>
                                    : null}
                                {item.resultMetric1Description ?
                                    <MediaQuery maxWidth={mediumNum}>
                                        <FadeInWhenVisibleScale>
                                            <ResultsMetricData>
                                                <MediaQuery maxWidth={smallNum}>
                                                    <Col xs={1}></Col>
                                                </MediaQuery>
                                                <Col xs={10} sm={6}>
                                                    <p>{item.resultMetric2Value}</p>
                                                </Col>
                                                <MediaQuery maxWidth={smallNum}>
                                                    <Col xs={1}></Col>
                                                </MediaQuery>
                                            </ResultsMetricData>
                                        </FadeInWhenVisibleScale>
                                    </MediaQuery>
                                    : null}
                                {item.resultFullText ?
                                    <FadeInWhenVisibleScale>
                                        <ResultsBlurb>

                                            <MediaQuery minWidth={mediumNum}>
                                                <Row>
                                                    <Col sm={5}>
                                                        <ProjectH2>The Results</ProjectH2>
                                                    </Col>
                                                    <Col></Col>
                                                    <Col sm={6}>
                                                        <ResultsDescription>{item.resultFullText}</ResultsDescription>
                                                    </Col>
                                                </Row>
                                            </MediaQuery>
                                            <MediaQuery maxWidth={mediumNum}>
                                                <Row>
                                                    <MediaQuery maxWidth={smallNum}>
                                                        <Col xs={1}></Col>
                                                    </MediaQuery>
                                                    <Col xs={10}>
                                                        <Line></Line>
                                                    </Col>
                                                    <MediaQuery maxWidth={smallNum}>
                                                        <Col xs={1}></Col>
                                                    </MediaQuery>
                                                </Row>
                                                <Row>
                                                    <MediaQuery maxWidth={smallNum}>
                                                        <Col xs={1}></Col>
                                                    </MediaQuery>
                                                    <Col xs={10}>
                                                        <ProjectH2>The Results</ProjectH2>
                                                    </Col>
                                                    <MediaQuery maxWidth={smallNum}>
                                                        <Col xs={1}></Col>
                                                    </MediaQuery>
                                                </Row>
                                            </MediaQuery>

                                            <MediaQuery maxWidth={mediumNum}>
                                                <Row>
                                                    <MediaQuery maxWidth={smallNum}>
                                                        <Col xs={1}></Col>
                                                    </MediaQuery>
                                                    <Col xs={10}>
                                                        <ResultsDescription>{item.resultFullText}</ResultsDescription>
                                                    </Col>
                                                    <MediaQuery maxWidth={smallNum}>
                                                        <Col xs={1}></Col>
                                                    </MediaQuery>
                                                </Row>
                                            </MediaQuery>
                                        </ResultsBlurb>
                                    </FadeInWhenVisibleScale>
                                    : null}
                                </Col>
                                <Col sm={2}></Col>
                            </ResultsSection>
                            
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
                                <NextProject>
                                    <Link to={this.props.projects.nextProjectItemPathname}>
                                        <Wrapper >
                                            <Col xs={1} sm={2}>\</Col>
                                            <Col xs={10} sm={8}>
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
                                                        screenWidth={this.state.width}
                                                        text={this.props.projects.nextProjectItem}/>
                                                </SecondLine>
                                                <ThirdLine>
                                                    <LineAnimationL2R/>
                                                </ThirdLine>
                                            </Col>
                                            <Col xs={1} sm={2}></Col>
                                        </Wrapper>
                                    </Link>
                                    <ProjectFooter>
                                        <Col xs={1} sm={2}></Col>
                                        <Col xs={10} sm={8}>
                                            <Footer location={this.props.location.pathname}/>
                                        </Col>
                                        <Col xs={1} sm={2}></Col>
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