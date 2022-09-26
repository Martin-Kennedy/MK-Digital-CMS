import React, {Component} from "react";
import {Row, Col} from 'react-bootstrap';
import {connect} from "react-redux";
import HomepageCarouselComponent from '../carousels/homepageCarousel';
import styled from 'styled-components';
import SlideCounterComponent from "../carousels/slideCounter";
import MediaQuery from 'react-responsive';
import variables from '../../variables.module.scss';
import AnimatedText from 'react-animated-text-content';

const StyledHomepageHero = styled(Row)`
    height: 100vh;
    background-color: #1d1e22;
`

const CarouselContainer = styled.div `
    position: absolute;
    overflow: hidden;
    display: flex;
    width: 100vw;
    top: 0;
    left: 0;
    height: 100vh;
    margin: 0 auto 0 auto;

`



const AnimatedTextContainer = styled.div`
position: absolute;
top: 20vh;
height: 10vw;
width: 20vw;
z-index: 999;
`

const AnimatedDescriptionContainer = styled.div`
position: absolute;
top: 85vh;
height: 10vw;
width: 100vw;
z-index: 999;
left: 0;

`

const StyledAnimatedText = styled(AnimatedText)`
height: 100%;
width: 100%;
font-weight: 200;
font-size: 2rem;
color: #fff;
text-transform: uppercase;
letter-spacing: 1.5rem;
postion: absolute;
text-align: left;
`


const StyledAnimatedDescription = styled(AnimatedText)`
    font-weight: 200;
    font-size: .7rem;
    text-align: center;
    color: #fff;
    display: block;
    text-transform: uppercase;
    letter-spacing: .1rem;
    margin: 0 auto;
    width: 15vw;
    height: 100%;
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

const getCarouselDescription = (orderedSlides, currentSlide) => {
    if (orderedSlides.length) {
        const currentText = orderedSlides[currentSlide].description ? orderedSlides[currentSlide].description : "";
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
                    <AnimatedTextContainer>
                        <StyledAnimatedText
                            type="words" // animate words or chars
                            animation={{
                                x: '200px',
                                y: '-20px',
                                scale: 1.1,
                                ease: 'ease-in-out',
                            }}
                            animationType="float"
                            interval={0.06}
                            duration={1.5}
                            tag="p"
                            className="animated-paragraph"
                            threshold={0.1}
                            rootMargin="10%"
                        >
                            {getCarouselText(this.props.orderedSlides, this.props.currentSlide)}
                            
                        </StyledAnimatedText>
                    </AnimatedTextContainer>
                    
                    <AnimatedDescriptionContainer>
                        <StyledAnimatedDescription 
                        type="words" 
                            animation={{
                                ease: 'ease-in-out',
                            }}
                            
                            interval={0.0}
                            duration={2}
                            tag="p"
                            threshold={0.1}
                            rootMargin="20%">
                            {getCarouselDescription(this.props.orderedSlides, this.props.currentSlide)}
                        </StyledAnimatedDescription>
                    </AnimatedDescriptionContainer>
                    
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