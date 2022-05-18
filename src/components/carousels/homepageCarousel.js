import React, {Component} from 'react';
import styled from 'styled-components';
import {
    getCurrentSlide,
    getHomepage,
    getHomepageCarouselItems,
    getCurrentCarouselAnimatedText,
    getCurrentCarouselBkgColor,
    getImgWidth,
    getTotalSlides
} from '../../actions/homepage.actions';
import {establishSession, getToken} from '../../actions/initialUtility.actions';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {Autoplay} from 'swiper';

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
  @media(max-width: 690px){
                width: 100vw;
                height: 100vh;
                margin: 20px auto 5vh;
        }
`;

const SlideImage = styled.img `
    display: block;
    width: 33vw;
    height: 60vh;
    object-fit: contain;
    position: relative;
    top: 5vh;
    @media(max-width: 690px){
                width: 50vw;
                left: 25vw;
                top: 0;
        }
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
            keystoneToken: state.initialUtility.keystoneToken
        },
        homepage: {
            homepageCarouselItems: state.homepage.homepageCarouselItems,
            pageData: state.homepage.pageData
        },
        totalSlides: state.homepage.totalSlides,
        currentSlide: state.homepage.currentSlide,
        hoverState: state.homepage.hoverState,
        intervalID: state.homepage.intervalID,
        imageElement: React.createRef(),
        imgWidth: state.homepage.imgWidth
    }
}

const mapDispatchToProps = dispatch => ({
    getToken: token => dispatch(getToken(token)),
    establishSession: active => dispatch(establishSession(active)),
    getHomepage: homepageData => dispatch(getHomepage(homepageData)),
    getHomepageCarouselItems: carouselData => dispatch(getHomepageCarouselItems(carouselData)),
    getCarouselHoverState: isHovered => dispatch(getCarouselHoverState(isHovered)),
    getCurrentCarouselAnimatedText: carouselText => dispatch(getCurrentCarouselAnimatedText(carouselText)),
    getCurrentSlide: slides => dispatch(getCurrentSlide(slides)),
    getCurrentCarouselBkgColor: color => dispatch(getCurrentCarouselBkgColor(color)),
    getImgWidth: width => dispatch(getImgWidth(width)),
    getTotalSlides: totalSlides => dispatch(getTotalSlides(totalSlides)),
})

class HomepageCarouselComponent extends Component {

    constructor() {
        super();
        this.swiperRef = React.createRef();
        SwiperCore.use([Autoplay]);
        this.state = {
            orderedSlides: null
        }
        
    }

    componentDidUpdate(prevProps) {
        const {getHomepage} = this.props;
        const { getToken } = this.props;
        const { establishSession } = this.props;
        const { getHomepageCarouselItems } = this.props;
        
        
        if (this.props.initialUtility.session === true) {
            if (!this.props.homepage.pageData) {
                getHomepage(this.props.initialUtility.keystoneToken);
            }
            if (prevProps.homepage.pageData !== this.props.homepage.pageData) {
                getHomepageCarouselItems(this.props.initialUtility.keystoneToken);
            }
            if (prevProps.homepage.homepageCarouselItems !== this.props.homepage.homepageCarouselItems) {
                
                const orderedArray = this.props.homepage.homepageCarouselItems.sort((a,b) => {
                    return a.order - b.order;
                })
                this.setState({orderedSlides: orderedArray})
            }
        } else {
            if (this.props.initialUtility.keystoneToken === null) {
                getToken();
            } else {
                establishSession(this.props.initialUtility.keystoneToken);
            }
        }
    }

    dispatchNextSlide(previousSlide, currentSlide) {
        const { getCurrentSlide } = this.props;
        getCurrentSlide({previousSlide: previousSlide, currentSlide: currentSlide});
    }

    dispatchTotalSlideCount(props) {
        const { getTotalSlides } = this.props;
        getTotalSlides(props.homepage.homepageCarouselItems.length);
    }
    getLink(data){
        let title = data.blogTitle !== null ? {type: 'blog', title: data.blogTitle.title} : {type: 'project', title: data.clientName.client};
        let titleSlug = title.title.replace(/\s+/g, '-');
        return `${title.type}/${titleSlug}`
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
                pauseOnMouseEnter: true
            },
            onUpdate: (swiper) => {
                this.dispatchNextSlide(swiper.previousIndex, swiper.activeIndex);
                this.dispatchTotalSlideCount(this.props);
            },
            onSlideChange: (swiper) => {
                this.dispatchNextSlide(swiper.previousIndex, swiper.activeIndex);
                this.dispatchTotalSlideCount(this.props);
            }
        };

        return (

            <StyledCarouselProvider {...params}>
                {Array.isArray(this.state.orderedSlides) ? this.state.orderedSlides.map((carousel, index) => {

                return <SwiperSlide
                    key={index}
                    index={index}
                    onLoad={() => {
                        const { getCurrentCarouselAnimatedText } = this.props;
                        const { getCurrentCarouselBkgColor } = this.props;
                        getCurrentCarouselAnimatedText(carousel.textTranslation);
                        getCurrentCarouselBkgColor(carousel.cardColorHexValue);
                    }}>
                    <StyledLink to={this.getLink(carousel)}>
                    <SlideImage
                        ref={this.props.imageElement}
                        src={carousel.cardImage.publicUrl}
                        onLoad={() => {
                            const { getImgWidth } = this.props;
                            getImgWidth(this.props.imageElement.current);
                        }}
                        dynamicWidth={this.props.imgWidth / 2}
                    />
                    </StyledLink>
                </SwiperSlide >

                }) : null
            }
            </StyledCarouselProvider>

        )
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomepageCarouselComponent);