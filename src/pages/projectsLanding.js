import React, {useState, useEffect}from 'react';
import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import ProjectCardContainer from '../components/cards/projectCardsContainer';
import HeaderComponent from '../components/navigation/header';
import { Main } from '../helpers/commonStyledComponents';
import { connect } from 'react-redux';
import { getToken, establishSession } from '../actions/initialUtility.actions';
import { getProjectLanding } from '../actions/projects.actions';

const TopRow = styled(Row)`
padding-top: 120px;
`

const Hero = styled(Col)`
min-height: calc(60vh - 120px);
padding: 60px 0 25px 0;
`

const H1 = styled.h1`
text-align: left;
font-size: 1rem;
font-weight: 100;
`

const H2Line = styled(Col)`
alignItems: "center",
height: 50%;
border-top: 1px solid #1d1e22;
`

const ProjectsLandingMain = styled(Main)`

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
    useEffect(()=>{
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
            <HeaderComponent location={props.location.pathname} />
            <TopRow>
                <Col xs={1} sm={2}></Col>
                {console.log(props)}
                <Hero xs={10} sm={8}>
                    {props.projects.projectLandingData.length &&
                    <ProjectsLandingMain>

                        <H1>{props.projects.projectLandingData[0].h1}</H1>

                        <span>{props.projects.projectLandingData[0].paragraphLineOne}</span>
                        <p>{props.projects.projectLandingData[0].paragraph}</p>

                    </ProjectsLandingMain>}
                    <Row>
                    </Row>
                </Hero>
                <Col xs={1} sm={2}></Col>
            </TopRow>
            <Row>
                <Col xs={1} sm={2}></Col>
                <Col xs={10} sm={8}>
                    <ProjectCardContainer />
                </Col>
                <Col xs={1} sm={2}></Col>

            </Row>
        </div>

    )
}

export default connect(mapStateToProps)(ProjectsLanding);
