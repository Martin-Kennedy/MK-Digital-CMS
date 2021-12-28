import React, {Component} from 'react';
import TextTranslation from "./hero/textTranslation";
import styled from 'styled-components';
import {CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, WithStore} from 'pure-react-carousel';
import { getCurrentCarouselSlide, getCarouselHoverState, getCurrentCarouselIntervalID } from '../actions/homepage.actions';
import {connect} from 'react-redux';

const StyledCarouselProvider = styled(CarouselProvider)`
height: calc(80vh - 120px);
overflow: hidden;

`;

const SlideImage = styled.img`
position: relative;
top: 10%;
left: 38.5%;
width: 25%;
z-index: 2;
`;

const slideShowInterval = 5000;



const mapStateToProps = state => {
    console.log(state)
    
    return {
        homepageData: state.homepage.homepageData,
        totalSlides: state.homepage.homepageData.homepageCarousel.homepageCarouselArray.length,
        currentSlide: state.homepage.currentSlide,
        hoverState: state.homepage.hoverState,
        intervalID: state.homepage.intervalID,
    }
}

const createHeroCarouselItem = (props) => (props.homepageData.homepageCarousel.homepageCarouselArray.map((carousel, index) => {
    return <Slide 
                key={index} 
                index={index} 
                onMouseEnter={() => { props.dispatch(getCarouselHoverState(true))}}
                onMouseLeave={() => { props.dispatch(getCarouselHoverState(false))}}>
                <TextTranslation text={carousel.subject}/>
                <SlideImage src={carousel.homepageHeroCardImage}/>
             </Slide>;
}));

class CarouselComponent extends Component {

    constructor() {
        super();
    }

    slideShow(intervalMS){
        const intervalID = setInterval(() => {
            let slide = this.props.currentSlide;
            let currentSlide = slide + 1;
            let totalSlides = this.props.homepageData.homepageCarousel.homepageCarouselArray.length;
            (currentSlide === totalSlides) ? currentSlide = 0 : null;
            this.props.dispatch(getCurrentCarouselSlide(currentSlide, totalSlides));
        }, intervalMS)
        this.props.dispatch(getCurrentCarouselIntervalID(intervalID))
    }


    componentDidMount() {
        this.slideShow(slideShowInterval);
    }

    componentDidUpdate(prevState) {
        ((prevState.hoverState !== this.props.hoverState) && this.props.hoverState) ? clearInterval(this.props.intervalID) :
        ((prevState.hoverState !== this.props.hoverState) && !this.props.hoverState) ? this.slideShow(slideShowInterval) :
        null;
    }


    render() {
        return (
            <StyledCarouselProvider 
                orientation="vertical"
                naturalSlideWidth={200}
                naturalSlideHeight={100}
                totalSlides={this.props.totalSlides}
                playDirection={'forward'}
                currentSlide={this.props.currentSlide}
            >
                <Slider >
                    {createHeroCarouselItem(this.props)}
                </Slider>
            </StyledCarouselProvider>
        )
    }
};

export default connect(mapStateToProps)(CarouselComponent);