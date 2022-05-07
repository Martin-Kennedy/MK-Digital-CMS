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
`;

const SlideImage = styled.img `
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
            keystoneToken: state.initialUtility.keystoneToken
        },
        homepage: {
            homepageCarouselItems: state.homepage.homepageCarouselItems,
            homepageCarouselProjects: state.homepage.homepageCarouselProjects,
            homepageCarouselBlogs: state.homepage.homepageCarouselBlogs,
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
    getCurrentSlide: currentSlide => dispatch(getCurrentSlide(currentSlide)),
    getCurrentCarouselBkgColor: color => dispatch(getCurrentCarouselBkgColor(color)),
    getImgWidth: width => dispatch(getImgWidth(width)),
    getTotalSlides: totalSlides => dispatch(getTotalSlides(totalSlides)),
})

class HomepageCarouselComponent extends Component {

    constructor() {
        super();
        this.swiperRef = React.createRef();
        SwiperCore.use([Autoplay]);
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
            if (prevProps.homepage.homepageCarouselBlogs !== this.props.homepage.homepageCarouselBlogs) {
                let arr = [this.props.homepage.homepageCarouselProjects, this.props.homepage.homepageCarouselBlogs];
                this.props.homepage.homepageCarouselItems.map(item => {
                    console.log(item)
                })
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
        this
            .props
            .dispatch(getCurrentSlide(previousSlide, currentSlide));
    }

    dispatchTotalSlideCount(props) {
        props.dispatch(getTotalSlides(props.homepage.homepageCarouselArrayBlogs.length));
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
                {console.log(this.props)}
                {/* {this.props.homepage.homepageCarouselArrayBlogs.map((carousel, index) => {

                return <SwiperSlide
                    key={index}
                    index={index}
                    onLoad={() => {
                        this.props.dispatch(getCurrentCarouselAnimatedText(carousel.data.title));
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
            } */}
            </StyledCarouselProvider>

        )
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomepageCarouselComponent);