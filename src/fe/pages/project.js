import React, {Component} from 'react';
import { Row, Col } from 'react-bootstrap';
import styled from "styled-components";
import { Line } from '../helpers/commonStyledComponents';
import HeaderComponent from '../components/navigation/header';
import ProjectPageHero from '../components/heros/projectPageHero';
import { FadeInWhenVisibleOpacity, FadeInWhenVisibleScale } from '../helpers/fadeInOnViewport';
import { LineAnimationL2R, LineAnimationR2L } from '../components/designElementComponents/lineSvg';
import { connect } from 'react-redux';
import { getProjectItem } from '../actions/projects.actions';
import Sticky from 'react-stickynode';

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
height: 100%;
width: 50vw;
max-height: 1000px;
background-color: ${props => props.color ? props.color : 'var(--white)'};
`

const FiftyVWImg = styled.div`
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: center;
    justify-content: center;
    -ms-flex-align: center;
    align-items: center;
    padding: 10rem 33%;
`

const AssetSection1 = styled.div`
padding-bottom: 35vh;
background-color: var(--white);
`

const mapStateToProps = state => {
    return {
        projects: {
            projectData: state.projects.projectData,
            projectItem: state.projects.projectItem
        }
    }
};




class ProjectPage extends Component {
    

    componentDidUpdate(prevProps) {
        
        if (prevProps.projects.projectData !== this.props.projects.projectData ){
            let path = this.props.location.pathname;
            let slug = path.substring(path.lastIndexOf('/') + 1)
            const revertedTitle = slug.replace(/-/g, ' ').replace(/_/g, ' ');
            this.props.dispatch(getProjectItem(revertedTitle))
        }
    }
    
    getFirstPathSegmennt(props) {
        return props.split('/')[1];

    }

    render(){
        let item = this.props.projects.projectItem[0];
        return (<div>
            {this.props.projects.projectItem.length
                ? <div>
                    <HeaderComponent location={this.getFirstPathSegmennt(this.props.location.pathname)} />
                    <Sticky >
                    <FadeInWhenVisibleOpacity duration={2}>
                    <ProjectPageHero item={item} />
                    </FadeInWhenVisibleOpacity>
                    
                    <IntroSection >
                    <Col xs={2}></Col>
                        <Col xs={8}>
                        <Row>
                        <Col sm={6}>
                                    <FadeInWhenVisibleScale duration={.5}>
                                        <IntroBlurb1 >
                                            <Row>About {item.client}</Row>
                                            <Row> {item.aboutClient}</Row>
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
                                    <div style={{width: '100%', height: '800px'}}>
                                    <Img src={item.projectImages[0]}></Img>
                                        </div>
                                </FadeInWhenVisibleScale>
                        </Row>
                        </Col>
                        <Col xs={2}></Col>
                    </IntroSection>
                    </Sticky>
                    <Sticky >
                    <Section>
                    <ImgSection img={item.projectImages[1]} ></ImgSection>
                    </Section>
                    </Sticky>
                    <Sticky >
                    <AssetSection1>
                        <Section >
                            <Col xs={2}></Col>
                            <Col >
                        <FadeInWhenVisibleScale duration={1}>
                                    <div style={{ width: '100%', height: '800px' }}>
                                        <Img src={item.projectImages[2]}></Img>
                                    </div>
                        </FadeInWhenVisibleScale>
                            </Col>
                            <Col xs={2}></Col>
                        </Section>
                        <Section>
                            <Col xs={2}></Col>
                            <Col >
                                <FadeInWhenVisibleScale duration={1}>
                                    <div style={{ width: '100%', height: '800px' }}>
                                        <Img src={item.projectImages[3]}></Img>
                                    </div>
                                </FadeInWhenVisibleScale>
                            </Col>
                            <Col xs={2}></Col>
                        </Section>
                        </AssetSection1>
                    </Sticky>
                    
                    <Sticky >
                        <Section100VW>
                            <FiftyVW color={'var(--black)'}>
                                
                                    <FiftyVWImg>
                                    <FadeInWhenVisibleScale duration={1}>
                                        <Img src={item.projectImages[5]}></Img>
                                </FadeInWhenVisibleScale>
                                    </FiftyVWImg>
                                
                            </FiftyVW>
                            <FiftyVW color={item.bkgColorArray[1]}>
                                
                                <FiftyVWImg >
                                    <FadeInWhenVisibleScale duration={1}>
                                        <Img src={item.projectImages[4]}></Img>
                                    </FadeInWhenVisibleScale>
                                    </FiftyVWImg>
                                
                            </FiftyVW>
                        </Section100VW>
                       
                    </Sticky>

                    
                </div>
                : 'loading'
            }
        </div>)
    
    
}
}

export default connect(mapStateToProps)(ProjectPage);