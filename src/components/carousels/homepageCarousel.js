import React, {Component} from 'react';
import styled from 'styled-components';
import {
    getCurrentSlide,
    getHomepage,
    getHomepageCarouselItems,
    getCurrentCarouselAnimatedText,
    getCurrentCarouselBkgColor,
    getImgWidth,
    getTotalSlides,
    getOrderedSlides
} from '../../actions/homepage.actions';
import {establishSession, getToken} from '../../actions/initialUtility.actions';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {Autoplay} from 'swiper';
import  variables  from '../../variables.module.scss';

const StyledCarouselProvider = styled(Swiper)`
    text-align: center;
    font-size: 18px;
     @media(max-width: ${variables.small}){
                height: 100vh;
                margin: 0 auto;

        }
         @media(max-width: ${variables.medium}){
                height: 100vh;
                margin: 0 auto;

        }
    cursor: url('https://uploads.codesandbox.io/uploads/user/b3e56831-8b98-4fee-b941-0e27f39883ab/Ad1_-cursor.png') 39 39, auto;

    `;

const SlideImage = styled.img `
    display: block;
    width: 100%;
    height: 66vh;
    object-fit: contain;
    margin: 16.6vh auto;
      @media(max-width: ${variables.medium}){
                width: 100%;
                height: 66vh;
        }
        @media(max-width: ${variables.medium}){
                width: 100%;
                margin: 10vh auto;
        }
`;

const StyledLink = styled(Link)`
cursor: pointer;
width: 33vw;
margin: 0 auto;
   @media(max-width: ${variables.medium}){
                width: 50vw;
                left: 25vw;
        }
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
        imgWidth: state.homepage.imgWidth,
        orderedSlides: state.homepage.orderedSlides
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
    getOrderedSlides: orderedSlides => dispatch(getOrderedSlides(orderedSlides))
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

    componentDidMount(){
        const { getHomepage } = this.props;
        const { getToken } = this.props;
        const { establishSession } = this.props;
        const { getHomepageCarouselItems } = this.props;
        
        
        if (this.props.initialUtility.keystoneToken === null) {
            getToken();
        } else {
            establishSession(this.props.initialUtility.keystoneToken);
        }
        if (this.props.initialUtility.session === true) {
            if (!this.props.homepage.pageData) {
                getHomepage(this.props.initialUtility.keystoneToken);
            }
            getHomepageCarouselItems(this.props.initialUtility.keystoneToken);
        }
    }

    componentDidUpdate(prevProps) {
        
        if (prevProps.initialUtility.session !== this.props.initialUtility.session || this.props.initialUtility.session === true) {
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
                const { getOrderedSlides } = this.props;
                getOrderedSlides(orderedArray)
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
                {Array.isArray(this.props.orderedSlides) ? this.props.orderedSlides.map((carousel, index) => {

                return <SwiperSlide
                    key={index}
                    index={index}>
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