import React, { Component } from "react";
import { Row, Col } from 'react-bootstrap';
import { connect } from "react-redux";
import { LineAnimationL2R, LineAnimationR2L } from "./lineSvg";
import {TextScrollTranslation} from "./textTranslation";
import styled from 'styled-components';

const StyledAboutPageHero = styled(Row)`
    height: 100vh;
    background-color: #1d1e22;
    z-index: 2;
    position: relative;
`

const FirstLine = styled.div`
    height: 0;
    position: relative;
    padding: 120px 0 calc(25vh - 40px) 0;
    width: 100%;
    top: 0%;
    svg {
    position: relative; 
    left: 0;
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
    }
    `;

const AnimatedTextContainer = styled.div`
        position: absolute;
        top: 44%;
        right: 0;
`
const TextTop = styled.div`
        font-family: mr-eaves-modern, sans-serif;
        font-weight: 200;
        font-size: 100px;
        color: #fff;
        text-transform: uppercase;
        white-space: nowrap;
        letter-spacing: 1.5rem;
        position: relative;
        top: -50px;
        left: 3%;
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



class AboutPageHero extends Component {

    render() {
        return (
            <StyledAboutPageHero>
                <Col xs={2}></Col>
                <Col xs={8}>
                    <FirstLine>
                        <LineAnimationL2R />
                        <TextTop>Time To Derp</TextTop>
                    </FirstLine>
                    <SecondLine>
                        <LineAnimationR2L />
                    </SecondLine>
                    <AnimatedTextContainer>
                        <TextScrollTranslation text={'herp a derp derp'}  />
                    </AnimatedTextContainer>
                    <ThirdLine>
                        <LineAnimationL2R />
                        <TextTop>Time To Derp</TextTop>
                    </ThirdLine>
                    
                    <FourthLine>
                        <LineAnimationR2L />
                    </FourthLine>
                </Col>
                <Col xs={2}></Col>
            </StyledAboutPageHero>

        );
    }

}

export default connect(mapStateToProps)(AboutPageHero)