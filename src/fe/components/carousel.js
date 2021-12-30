import React, {Component} from 'react';
import styled from 'styled-components';
import {CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, DotGroup} from 'pure-react-carousel';
import { getCurrentCarouselSlide, getCarouselHoverState, getCurrentCarouselIntervalID, getCurrentCarouselAnimatedText } from '../actions/homepage.actions';
import {connect} from 'react-redux';

const StyledCarouselProvider = styled(CarouselProvider)`
height: calc(80vh - 120px);
overflow: hidden;
cursor: url('https://uploads.codesandbox.io/uploads/user/b3e56831-8b98-4fee-b941-0e27f39883ab/Ad1_-cursor.png')
      39 39,
    auto;
}

`;

const SlideImage = styled.img`
position: relative;
top: 10%;
left: 38.5%;
width: 25%;
z-index: 2;

`;

const StyleDotGroup = styled(DotGroup)`
    position: absolute;
    top: 55vh;
    left: 50vw;
    z-index: 9;
    color: white;
    background-color: antiquewhite;
`

const slideShowInterval = 8000;



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
                onMouseEnter={() => { props.dispatch(getCarouselHoverState(true))}}
                onMouseLeave={() => { props.dispatch(getCarouselHoverState(false))}}
                onLoad={() => props.dispatch(getCurrentCarouselAnimatedText(carousel.subject))}>
                <SlideImage src={carousel.homepageHeroCardImage}/>
             </Slide>;
}));

class CarouselComponent extends Component {

    constructor() {
        super();
        this.myRef = React.createRef();
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

        const node = this.myRef.current;
        console.log(node.props)

        // use ref to access current slide for drag events and updating events for slides !!!!!
       
        
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
                ref={this.myRef}
            >
                <Slider >
                    {createHeroCarouselItem(this.props)}
                </Slider>
                <StyleDotGroup dotNumbers={true} ></StyleDotGroup>
            </StyledCarouselProvider>
        )
    }
};

export default connect(mapStateToProps)(CarouselComponent);