import React, { Component } from 'react';
import styled from 'styled-components';
import { getCurrentSlide, getHomepage, getHomepageCarousel, getHomepageCarouselArray, getCurrentCarouselAnimatedText, getCurrentCarouselBkgColor, getImgWidth, getTotalSlides } from '../../actions/homepage.actions';
import { establishSession, getToken } from '../../actions/initialUtility.actions';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore ,{ Autoplay } from 'swiper'; 

const StyledCarouselProvider = styled(Swiper)`
    margin: 30px auto 60px;
    width: 100%;
    height: 100%;
    text-align: center;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: url('https://uploads.codesandbox.io/uploads/user/b3e56831-8b98-4fee-b941-0e27f39883ab/Ad1_-cursor.png') 39 39, auto;
`;

const SlideImage = styled.img`
    display: block;
    width: 33vw;
    max-width: ;
    height: 620px;
    object-fit: contain;
    position: relative;
    top: -4.5vw;
`;

const StyledLink = styled(Link)`
cursor: pointer;
width: 100%;
height: 100%;
`

const mapStateToProps = state => {
    return {
        initialUtility: {
            session: state.initialUtility.session,
            keystoneToken: state.initialUtility.keystoneToken,
        },
        homepageData: {
           homepageCarousel: state.homepage.homepageData.homepageCarousel,
            homepageCarouselArray: state.homepage.homepageData.homepageCarouselArrayl,

        },
        totalSlides: state.homepage.totalSlides,
        currentSlide: state.homepage.currentSlide,
        hoverState: state.homepage.hoverState,
        intervalID: state.homepage.intervalID,
        imageElement: React.createRef(),
        imgWidth: state.homepage.imgWidth

    }
}


class HomepageCarouselComponent extends Component{

    constructor(){
        super();
        this.swiperRef = React.createRef();
        SwiperCore.use([Autoplay]);
    }

    componentDidUpdate(prevProps) {

        if (prevProps.initialUtility.session !== this.props.initialUtility.session) {
            console.log((prevProps.initialUtility.session !== this.props.initialUtility.session))
                this
                    .props
                    .dispatch(getHomepage(this.props.initialUtility.keystoneToken));
                this.props.dispatch(getHomepageCarousel(this.props.initialUtility.keystoneToken));
            
        } 
        // else {
        //     if (this.props.initialUtility.keystoneToken === null) {
        //         this
        //             .props
        //             .dispatch(getToken())
        //     } else {
        //         this
        //             .props
        //             .dispatch(establishSession(this.props.initialUtility.keystoneToken))
        //     }
        // }

        // if (prevProps.homepageData.homepageCarousel !== this.props.homepageData.homepageCarousel) {
        //         this
        //             .props
        //             .dispatch(getHomepageCarouselArray(this.props.homepage.homepageData.homepageCarousel, this.props.initialUtility.keystoneToken));
            
           

        // }

    }
     
    

    dispatchNextSlide(previousSlide, currentSlide) {
        this.props.dispatch(getCurrentSlide(previousSlide, currentSlide));
    }

    dispatchTotalSlideCount(props){
        props.dispatch(getTotalSlides(props.homepageData.homepageCarousel.homepageCarouselArray.length));
    }



    
    
    render() { 
        
        const params = {
            
            direction: 'vertical',
            rewind: true,
            speed: 1000,
            updateOnImagesReady: true,
            autoplay: {
                delay: 7000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            onUpdate: (swiper) => {
                this.dispatchNextSlide(swiper.previousIndex, swiper.activeIndex);
                this.dispatchTotalSlideCount(this.props);
            },
            onSlideChange: (swiper) => {
                this.dispatchNextSlide(swiper.previousIndex, swiper.activeIndex);
                this.dispatchTotalSlideCount(this.props);
            },
            
        };



        
    return (
        
        <StyledCarouselProvider {...params}  >
            {this.props.homepageCarouselArray.map((carousel, index) => {
                return <SwiperSlide
                    key={index}
                    index={index}
                    onLoad={() => {
                        this.props.dispatch(getCurrentCarouselAnimatedText(carousel.title));
                        this.props.dispatch(getCurrentCarouselBkgColor(carousel.bkgColor));
                    }}>
                    <StyledLink to={`${carousel.homePageCarousellink}`}>
                    <SlideImage
                        ref={this.props.imageElement}
                        src={carousel.homepageHeroCardImage}
                        onLoad={() => this.props.dispatch(getImgWidth(this.props.imageElement.current))}
                        dynamicWidth={this.props.imgWidth / 2}
                    />
                    </StyledLink>
                </SwiperSlide >
                    
                })
            }
        </StyledCarouselProvider> 
        
    )
    }
};

export default connect(mapStateToProps)(HomepageCarouselComponent);