import React, { Component } from 'react';
import styled from 'styled-components';
import { getCurrentSlide, getCurrentCarouselAnimatedText, getCurrentCarouselBkgColor, getImgWidth, getTotalSlides } from '../../actions/homepage.actions';
import {connect} from 'react-redux';
import Swiper from 'react-id-swiper';

const StyledCarouselProvider = styled(Swiper)`
    margin: 30px auto 50px;
    width: 100%;
    height: 500px;
    

`;
const Slide = styled.div`
  text-align: center;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: url('https://uploads.codesandbox.io/uploads/user/b3e56831-8b98-4fee-b941-0e27f39883ab/Ad1_-cursor.png') 39 39, auto;
`

const SlideImage = styled.img`
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const mapStateToProps = state => {
    return {
        homepageData: state.homepage.homepageData,
        totalSlides: state.homepage.totalSlides,
        currentSlide: state.homepage.currentSlide,
        hoverState: state.homepage.hoverState,
        intervalID: state.homepage.intervalID,
        imageElement: React.createRef(),
        imgWidth: state.homepage.imgWidth

    }
}

const createHeroCarouselItem = (props) => props.homepageData.homepageCarousel.homepageCarouselArray.map((carousel, index) => {
    return <Slide
        key={index}
        index={index}
        onLoad={() => {
            props.dispatch(getCurrentCarouselAnimatedText(carousel.title));
            props.dispatch(getCurrentCarouselBkgColor(carousel.bkgColor));
        }}>
        <SlideImage ref={props.imageElement} src={carousel.homepageHeroCardImage} onLoad={() => props.dispatch(getImgWidth(props.imageElement.current))} dynamicWidth={props.imgWidth / 2} />
    </Slide >;
});

class HomepageCarouselComponent extends Component{

    dispatchNextSlide(previousSlide, currentSlide) {
        this.props.dispatch(getCurrentSlide(previousSlide, currentSlide));
    }

    dispatchTotalSlideCount(props){
        props.dispatch(getTotalSlides(props.homepageData.homepageCarousel.homepageCarouselArray.length));
    }

    
    
    render() { 
        const settings = {
            
            direction: 'vertical',
            pagination: {
            el: '.swiper-pagination',
            clickable: true,
                loop: true,
            },
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            on: { 
                slideChange: index => { 
                    this.dispatchNextSlide(index.previousIndex, index.activeIndex);
                    this.dispatchTotalSlideCount(this.props);
                }
                }
            };



        
    return (
        <StyledCarouselProvider {...settings}>
            {createHeroCarouselItem(this.props) }
        </StyledCarouselProvider> 
    )
    }
};

export default connect(mapStateToProps)(HomepageCarouselComponent);

// SwiperCore.use([Pagination]);








// const createHeroCarouselItem = (props) => (props.homepageData.homepageCarousel.homepageCarouselArray.map((carousel, index) => {

//     return <Slide key={index}>
//             <img ref={props.imageElement} src={carousel.homepageHeroCardImage} onLoad={() => props.dispatch(getImgWidth(props.imageElement.current))} dynamicWidth={props.imgWidth / 2}/>
//             </Slide >;
// }));

// class CarouselComponent extends Component {

//     constructor(props) {
//         super(props);
        
//     }

//     dispatchNextSlide(previousSlide, currentSlide){
//         this.props.dispatch(getCurrentSlide(previousSlide, currentSlide));
//     }



//     render() {
           
//                 //  (previousSlide, currentSlide) => this.dispatchNextSlide(previousSlide, currentSlide),
//         return (
//             <Swiper direction={'vertical'} pagination={{
//                 "clickable": true}} className="mySwiper">
//                 {createHeroCarouselItem(this.props)}
//             </Swiper>
//         )
        
//     }
// };