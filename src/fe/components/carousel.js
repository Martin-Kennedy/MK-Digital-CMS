import React, {Component, useRef} from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import { getCurrentSlide, getCurrentCarouselAnimatedText, getCurrentCarouselBkgColor, getImgWidth } from '../actions/homepage.actions';
import {connect} from 'react-redux';

const StyledCarouselProvider = styled(Slider)`
cursor: url('https://uploads.codesandbox.io/uploads/user/b3e56831-8b98-4fee-b941-0e27f39883ab/Ad1_-cursor.png')
      39 39,
    auto;
}
overflow-y: hidden;
height: 500px;

`;
const Slide = styled.div`
`

const SlideImage = styled.img`
    margin: 0 calc(50% - ${props => props.dynamicWidth}px);
    width: auto;
    z-index: 2;
    height: 500px;
`;


const mapStateToProps = state => {
    console.log(state)
    return {
        homepageData: state.homepage.homepageData,
        totalSlides: state.homepage.homepageData.homepageCarousel.homepageCarouselArray.length,
        currentSlide: state.homepage.currentSlide,
        hoverState: state.homepage.hoverState,
        intervalID: state.homepage.intervalID,
        imageElement: React.createRef(),
        imgWidth: state.homepage.imgWidth

    }
}

const createHeroCarouselItem = (props) => (props.homepageData.homepageCarousel.homepageCarouselArray.map((carousel, index) => {
    console.log()
    return <Slide 
                key={index} 
                index={index} 
                onLoad={() => {
                    props.dispatch(getCurrentCarouselAnimatedText(carousel.title));
                    props.dispatch(getCurrentCarouselBkgColor(carousel.bkgColor))
                }}>
        <SlideImage ref={props.imageElement} src={carousel.homepageHeroCardImage} onLoad={() => props.dispatch(getImgWidth(props.imageElement.current))} dynamicWidth={props.imgWidth / 2}/>
            </Slide >;
}));

class CarouselComponent extends Component {

    constructor(props) {
        super(props);
        
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
                centerMode: true,
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