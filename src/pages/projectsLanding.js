import React, {useState, useEffect} from 'react';
import {Row, Col} from 'react-bootstrap';
import styled from 'styled-components';
import ProjectCardContainer from '../components/cards/projectCardsContainer';
import HeaderComponent from '../components/navigation/header';
import {Main} from '../helpers/commonStyledComponents';
import {connect} from 'react-redux';
import {getToken, establishSession} from '../actions/initialUtility.actions';
import {getProjectLanding} from '../actions/projects.actions';
import variables from '../variables.module.scss';
import Footer from '../components/footer';

const TopRow = styled(Row)`
padding-top: 120px;

`

const Paragraph = styled.div `
font-size: 2vw;
line-height: 2.5vw;
margin:0;
padding: 0;
word-wrap: none;
 @media(max-width:${variables.medium}){
        font-size: 8vw;
        line-height: 10vw;
    }
`

const Hero = styled(Col)`
min-height: calc(60vh - 120px);
padding-top: 60px;
padding-bottom: 60px;
`

const H1 = styled.h1 `
    font-size: 5vw;
    font-weight: 500;
    padding-left: 0;
     @media(max-width:${variables.medium}){
        font-size: 18vw;
    }
`

const ProjectsLandingMain = styled(Main)`
margin: 0 2vw;
padding: 0;

`

const ProjectLandingFooter = styled(Col)`
padding: 20vh 6vw 10vh 3vw;
`
const mapStateToProps = state => {
    return {
        initialUtility: {
            keystoneToken: state.initialUtility.keystoneToken,
            session: state.initialUtility.session
        },
        projects: {
            projectLandingData: state.projects.projectLandingData
        }
    }
}

const ProjectsLanding = (props) => {
    useEffect(() => {
        if (props.initialUtility.session === true) {
            if (!props.projects.projectLandingData.length) {
                props.dispatch(getProjectLanding(props.initialUtility.keystoneToken))
            }
        } else {
            if (props.initialUtility.keystoneToken === null) {
                props.dispatch(getToken())
            } else {
                props.dispatch(establishSession(props.initialUtility.keystoneToken))
            }
        }
    })

    return (

        <div>
            <HeaderComponent location={props.location.pathname}/>
            <TopRow>
                <Col xs={2} sm={1}></Col>
                <Hero xs={8} sm={10}>
                    {props.projects.projectLandingData.length && <ProjectsLandingMain>
                        <H1>{props.projects.projectLandingData[0].h1}</H1>
                        <Paragraph>{props.projects.projectLandingData[0].paragraph}</Paragraph>
                    </ProjectsLandingMain>}
                </Hero>
                <Col xs={2} sm={1}></Col>
            </TopRow>
            <Row>
                <Col xs={2} sm={1}></Col>
                <Col xs={8} sm={10}>
                    <ProjectCardContainer/>
                </Col>
                <Col xs={2} sm={2}></Col>

            </Row>
            <Row>
                <Col xs={2} sm={1}></Col>
                <ProjectLandingFooter xs={8} sm={10}>
                    <Footer location={props.location.pathname} />
                </ProjectLandingFooter>
                <Col xs={2} sm={1}></Col>
            </Row>
           
            
        </div>

    )
}

export default connect(mapStateToProps)(ProjectsLanding);
