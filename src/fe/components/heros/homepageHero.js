import React, {Component} from "react";
import {Row, Col} from 'react-bootstrap';
import {connect} from "react-redux";
import HomepageCarouselComponent from '../carousels/homepageCarousel';
import { LineAnimationL2R, LineAnimationR2L } from "../designElementComponents/lineSvg";
import { TextTranslation } from "../../helpers/textTranslation";
import styled from 'styled-components';
import SvgBlob from "../designElementComponents/blobSvg";
import SlideCounterComponent from "../carousels/slideCounter";

const StyledHomepageHero = styled(Row)`
    height: 100vh;
    background-color: #1d1e22;
`

const CarouselContainer = styled.div `
    position: absolute;
    top: 0;
    left: calc(50% - 190px);
    overflow: hidden;
    display: flex;
    height: 100vh;
`

const TopLine = styled.div `
    
    position: absolute;
    padding: 0 40px;
    width: 83.33333%;
    top: 29vh;
    
    svg {
    position: relative; 
    top: 25%;
    left: 0;
    line {
        stroke: #fff;
    }
    }
    `;

const BottomLine = styled.div `
    position: absolute;
    z-index: 0;
    padding: 0 40px;
    width: 83.33333%;
    top: 58vh;

    svg  {
    position: relative; 
    top: 60%;
    left: 0;
    line {
        stroke: #fff;
    }
    }
    `;

const AnimatedTextContainer = styled.div`
        position: absolute;
        top: 44vh;
        right: 0;
        height: 100px;
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

const getCarouselText = (text, currentSlide) => {
    const currentText = text[currentSlide];
    return currentText;
}

const getCarouselBkgColor = (bkgColor, currentSlide) => {
    const currentBkgColor = bkgColor[currentSlide];
    return currentBkgColor;
}

const getSlides = (currentSlide, previousSlide) => {
    return {currentSlide: currentSlide, previousSlide: previousSlide}
}

class HomepageHero extends Component {

    render() {
        return (
            <StyledHomepageHero>
                <Col xs={1}></Col>
                <Col xs={10}>
                    <TopLine>
                        <LineAnimationL2R/>
                    </TopLine>
                    <AnimatedTextContainer>
                        <TextTranslation duration={20} text={getCarouselText(this.props.carouselText, this.props.currentSlide)}/>
                    </AnimatedTextContainer>
                    <BottomLine>
                        <LineAnimationR2L/>
                    </BottomLine>
                    <SvgBlob
                        slides={getSlides(this.props.currentSlide, this.props.previousSlide)}
                        bkgcolor={getCarouselBkgColor(this.props.bkgColor, this.props.currentSlide)}/>
                    <CarouselContainer imgWidth={this.props.imgWidth}>
                    <HomepageCarouselComponent/>
                    </CarouselContainer>
                    <SlideCounterComponent />
                </Col>
                <Col xs={1}></Col>
            </StyledHomepageHero>

        );
    }

}

export default connect(mapStateToProps)(HomepageHero)