import React, {Component} from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import { getCurrentSlide, getCurrentCarouselAnimatedText } from '../actions/homepage.actions';
import {connect} from 'react-redux';

const StyledCarouselProvider = styled(Slider)`
height: calc(80vh - 120px);
overflow: hidden;
cursor: url('https://uploads.codesandbox.io/uploads/user/b3e56831-8b98-4fee-b941-0e27f39883ab/Ad1_-cursor.png')
      39 39,
    auto;
}

`;
const Slide = styled.div`
    padding: 35px 0;
`
const SlideImage = styled.img`
position: relative;
top: 10%;
left: 38.5%;
width: 25%;
z-index: 2;

`;


const mapStateToProps = state => {
    return {
        homepageData: state.homepage.homepageData,
        totalSlides: state.homepage.homepageData.homepageCarousel.homepageCarouselArray.length,
        currentSlide: state.homepage.currentSlide,
        hoverState: state.homepage.hoverState,
        intervalID: state.homepage.intervalID
    }
}

const createHeroCarouselItem = (props) => (props.homepageData.homepageCarousel.homepageCarouselArray.map((carousel, index) => {
    return <Slide 
                key={index} 
                index={index} 
                onLoad={() => props.dispatch(getCurrentCarouselAnimatedText(carousel.title))}>
                <SlideImage src={carousel.homepageHeroCardImage}/>
            </Slide >;
}));

class CarouselComponent extends Component {

    constructor() {
        super();
    }

    dispatchNextSlide(previousSlide, currentSlide){
        this.props.dispatch(getCurrentSlide(previousSlide, currentSlide));
    }



    render() {

            const settings = {
                dots: true,
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                vertical: true,
                verticalSwiping: true,
                adaptiveHeight: true,
                beforeChange: (previousSlide, currentSlide) => this.dispatchNextSlide(previousSlide, currentSlide),

            };
        return (
            <StyledCarouselProvider {...settings}>
                    {createHeroCarouselItem(this.props)}
            </StyledCarouselProvider>
        )
    }
};

export default connect(mapStateToProps)(CarouselComponent);