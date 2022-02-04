import React from 'react';
import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import ProjectCardContainer from '../components/cards/projectCardsContainer';
import HeaderComponent from '../components/navigation/header';
import { Main } from '../helpers/commonStyledComponents';

const TopRow = styled(Row)`
padding-top: 120px;
`

const Hero = styled(Col)`
min-height: calc(60vh - 120px);
padding: 60px 0 25px 0;
`

const H2 = styled.h2`
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

const ProjectsLanding = (props) => (
    

    <div>
        <HeaderComponent location={props.location.pathname} />
        <TopRow>
            <Col sm={2}></Col>
            <Hero xs={8}>
                <ProjectsLandingMain>
                    
                        <h2 >My Work</h2>
                    
                        <span>MK Digital develops, designs and delivers</span>
                        <p>
                            websites and creative campaigns that drive results,
                            build awareness and win awards. Our work never brags,
                            but it sure loves to speak for itself.</p>
                   
                </ProjectsLandingMain>
                <Row>
                </Row>
            </Hero>
            <Col sm={2}></Col>
        </TopRow>
        {/* Above the Fold Text and CTA */}
        <Row>
            <Col sm={2}></Col>
            <Col sm={8}>
                <ProjectCardContainer />
            </Col>
            <Col sm={2}></Col>

        </Row>
        <Row>
            <Col>

                {/* Blog Menu */}
            </Col>
        </Row>
        <Row>
            <Col>
                {/* Blog Grid */}
            </Col>
        </Row>
    </div>

)

export default ProjectsLanding;
