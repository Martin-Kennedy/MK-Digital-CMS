import React, { Component } from "react";
import { Row, Col } from 'react-bootstrap';
import { connect } from "react-redux";
import { LineAnimationL2R, LineAnimationR2L } from "../designElementComponents/lineSvg";
import { TextTranslation } from "../../helpers/textTranslation";
import styled from 'styled-components';
import { VerySmallText } from '../../helpers/commonStyledComponents';

const StyledProjectPageHero = styled(Row)`
    height: 100vh;
    background-color: var(--white);
    z-index: 2;
    position: relative;
`

const FirstLine = styled.div`
    height: calc(25vh - 40px);
    position: relative;
    margin: 120px 0 0;
    width: 100%;
    top: 0%;
    svg {
    position: relative; 
    left: 0;
    line {
        stroke: var(--black);
    }
    }
    
    `;

const SecondLine = styled.div`
    height: 0;
    position: relative;
    z-index: 0;
    padding: 0 0 calc(25vh - 40px) 0;
    width: 100%;
    top: 0%;

    svg  {
    position: relative; 
    left: 0;
    line {
        stroke: var(--black);
    }
    }
    `;

const ThirdLine = styled.div`
    height: 0;
    position: relative;
    z-index: 0;
    padding: 0 0 calc(25vh - 40px) 0;
    
    width: 100%;
    top: 0%;

    svg  {
    position: relative; 
    left: 0;
    line {
        stroke: var(--black);
    }
    }
    `;

const FourthLine = styled.div`
    height: 0;
    position: relative;
    z-index: 0;
    padding: 0 0 calc(25vh - 40px) 0;
    width: 100%;
    top: 0%;

    svg  {
    position: relative; 
    left: 0;
    line {
        stroke: var(--black);
    }
    }
    `;

const StaticHeroText = styled.div`
        font-family: mr-eaves-modern, sans-serif;
        font-weight: 200;
        font-size: 100px;
        color: var(--black);
        text-transform: uppercase;
        white-space: nowrap;
        letter-spacing: 1.5rem;
        position: relative;
        left: 3%;
`
const ProjectHeroVerySmallText = styled(VerySmallText)`
padding-left: 20px;

`



const mapStateToProps = state => {
    return {
        carouselText: state.homepage.carouselText,
        currentSlide: state.homepage.currentSlide,
        previousSlide: state.homepage.previousSlide,
        bkgColor: state.homepage.bkgColor,
        imgWidth: state.homepage.imgWidth
    }
}



class ProjectPageHero extends Component {

    render() {
        return (
            <StyledProjectPageHero>
                <Col xs={2}></Col>
                <Col xs={8}>
                    <FirstLine>
                        <LineAnimationL2R />
                        <ProjectHeroVerySmallText>Project</ProjectHeroVerySmallText>
                        <TextTranslation 
                        duration={15} 
                        delay={.5}
                        reverse
                        black
                        text={'herp a derp derp'} />
                        </FirstLine>
                        <SecondLine>
                        <LineAnimationR2L />
                        
                        <ProjectHeroVerySmallText>Client</ProjectHeroVerySmallText>
                        <TextTranslation 
                        duration={20}
                         delay={.75} 
                         black 
                         text={'herp a derp derp'} />
                    </SecondLine>
                        <ThirdLine>
                        <LineAnimationL2R />
                        <ProjectHeroVerySmallText>Launch Date</ProjectHeroVerySmallText>
                        <StaticHeroText >
                        March 31, 2020
                            </StaticHeroText>
                    </ThirdLine>

                    <FourthLine>
                        <LineAnimationR2L />
                    </FourthLine>
                </Col>
                <Col xs={2}></Col>
            </StyledProjectPageHero>

        );
    }

}

export default connect(mapStateToProps)(ProjectPageHero)