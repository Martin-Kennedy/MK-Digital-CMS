import React, {Component} from "react";
import {Row, Col} from 'react-bootstrap';
import {connect} from "react-redux";
import HomepageCarouselComponent from '../carousels/homepageCarousel';
import { LineAnimationL2R, LineAnimationR2L } from "../designElementComponents/lineSvg";
import { TextTranslation } from "../../helpers/textTranslation";
import styled from 'styled-components';
import SvgBlob from "../designElementComponents/blobSvg";
import SlideCounterComponent from "../carousels/slideCounter";
import MediaQuery from 'react-responsive';
import variables from '../../variables.module.scss';
import { getCurrentCarouselBkgColor } from '../../actions/homepage.actions';

const StyledHomepageHero = styled(Row)`
    height: 100vh;
    background-color: #1d1e22;
`

const CarouselContainer = styled.div `
    position: absolute;
    overflow: hidden;
    display: flex;
    width: 33%;
    top: 0;
    height: 100vh;
    left: 33%;
    margin: 0 auto 0 auto;
    @media(max-width: ${variables.medium}){
        width: 50%;
        left: 25%;
    }
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
    @media(max-width: ${variables.small}){
        top: 75vh;
        line {
        stroke: 2px solid #fff;
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
    @media(max-width: ${variables.small}){
        top: 90vh;
        line {
        stroke: 2px solid #fff;
    }
    }
    `;

const AnimatedTextContainer = styled.div`
        position: absolute;
        top: calc(33vh + 12.5vh - 40px);
        right: 0;
        height: calc(25vh - 45px);
        font-family: mr-eaves-modern, sans-serif;
        font-weight: 200;
        font-size: 7vw;
        color: #fff;
        text-transform: uppercase;
        white-space: nowrap;
        letter-spacing: 1.5rem;
        overflow: hidden;
        @media(max-width: ${variables.small}){
                font-size: 6vh;
                letter-spacing: .5vw;
                top: calc(78vh - 3vh + 10px);
                font-weight: 500;
        }
`

const mapStateToProps = state => {
    return {
            carouselText: state.homepage.carouselText,
            currentSlide: state.homepage.currentSlide,
            previousSlide: state.homepage.previousSlide,
            orderedSlides: state.homepage.orderedSlides,
            bkgColor: state.homepage.bkgColor,
            imgWidth: state.homepage.imgWidth
        }
}

const getCarouselText = (orderedSlides, currentSlide) => {
    if(orderedSlides.length){
        const currentText = orderedSlides[currentSlide].textTranslation;
        return currentText;
    }
    
}

const getSlides = (currentSlide, previousSlide) => {
    return {currentSlide: currentSlide, previousSlide: previousSlide}
}




class HomepageHero extends Component {

    constructor(){
        super()
        this.state = {
            width: window.innerWidth
        }
    } 

    updateDimensions = () => {
        this.setState({ width: window.innerWidth });
    };
    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
    }

    componentDidUpdate(prevProps){
        
    }
    render() {
        return (
            <StyledHomepageHero>
                <Col xs={1}></Col>
                <Col xs={10}>
                    <TopLine>
                        <LineAnimationL2R/>
                    </TopLine>
                    <AnimatedTextContainer>
                        <TextTranslation 
                        duration={window.innerWidth > 768 ? 20 : 10} 
                        text={getCarouselText(this.props.orderedSlides, this.props.currentSlide)}
                        screenWidth={this.state.width}
                        />
                    </AnimatedTextContainer>
                    <BottomLine>
                        <LineAnimationR2L/>
                    </BottomLine>
                    <SvgBlob
                        widthHeight={[this.state.width, this.state.height]}
                        slides={getSlides(this.props.currentSlide, this.props.previousSlide)}
                        bkgcolor={[this.props.orderedSlides, this.props.currentSlide]}/>
                    <CarouselContainer imgWidth={this.props.imgWidth}>
                    <HomepageCarouselComponent/>
                    </CarouselContainer>
                    <MediaQuery minWidth={690}><SlideCounterComponent /></MediaQuery>
                </Col>
                <Col xs={1}></Col>
            </StyledHomepageHero>

        );
    }

}

export default connect(mapStateToProps)(HomepageHero)