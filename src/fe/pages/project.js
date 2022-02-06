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

const IntroSection = styled(Row)`
    background-color: var(--white);
    min-height: 500px;
    color: var(--black);
    z-index: 1;
    position: relative;
`;

const IntroBlurb1 = styled.h2`
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: none;
    font-weight: 300;
    font-size: 17px;
    padding-left: 20px;
    margin-right: 30px;
    span {
        font-size: 13px;
        font-weight: 200;
        margin-right: 1.5rem;
    }
`
const IntroBlurb2 = styled.h2`
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: none;
    font-weight: 300;
    font-size: 17px;
    margin-left: 30px;
    span {
        font-size: 13px;
        font-weight: 200;
        margin-right: 1.5rem;
    }
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
                    <FadeInWhenVisibleOpacity duration={2}>
                    
                    <HeaderComponent location={this.getFirstPathSegmennt(this.props.location.pathname)} />
                    <ProjectPageHero item={item} />

                    </FadeInWhenVisibleOpacity>
                    <IntroSection >
                    <Col xs={2}></Col>
                        <Col xs={8}>
                        <Row>
                        <Col sm={6}>
                                    <FadeInWhenVisibleScale duration={.5}>
                                        <IntroBlurb1 >
                                            <span>About {item.client}</span>
                                            {item.aboutClient}
                                        </IntroBlurb1>
                                    </FadeInWhenVisibleScale>
                        </Col>
                        <Col sm={6}>
                            <FadeInWhenVisibleScale duration={1}>
                                <IntroBlurb2 >
                                    <span>The Work</span>
                                    {item.whatWeDid}
                                </IntroBlurb2>
                            </FadeInWhenVisibleScale>
                            
                        </Col>
                        </Row>
                        </Col>
                        <Col xs={2}></Col>
                    </IntroSection>
                </div>
                : 'loading'
            }
        </div>)
    
    
}
}

export default connect(mapStateToProps)(ProjectPage);