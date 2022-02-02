import React, {Component} from 'react';
import WebAppRouter from './webAppRouter';
import { connect } from 'react-redux';
import { getIntersectingState } from '../actions/pages.actions';
import { getBlogs, getBlogItem } from '../actions/blogs.actions';
import { getHomepage, getCurrentCarouselAnimatedText, getCurrentSlide, getCurrentCarouselBkgColor, getImgWidth, getTotalSlides } from '../actions/homepage.actions';

const mapDispatchToProps = dispatch => ({
    getBlogs: blogData => dispatch(getBlogs(blogData)),
    sortByBlogSubject: subject => dispatch(sortByBlogSubject(subject)),
    getHomepage: homepageData => dispatch(getHomepage(homepageData)),
    getCarouselHoverState: isHovered => dispatch(getCarouselHoverState(isHovered)),
    getCurrentCarouselAnimatedText: carouselText => dispatch(getCurrentCarouselAnimatedText(carouselText)),
    getCurrentSlide: currentSlide => dispatch(getCurrentSlide(currentSlide)),
    getCurrentCarouselBkgColor: color => dispatch(getCurrentCarouselBkgColor(color)),
    getImgWidth: width => dispatch(getImgWidth(width)),
    getTotalSlides: totalSlides => dispatch(getTotalSlides(totalSlides)),
    getIntersectingState: isIntersecting => dispatch(getIntersectingState(isIntersecting)),
    getBlogItem: item => dispatch(getBlogItem(item))

});

class ReduxHOC extends Component {

    componentDidMount() {
        const { getBlogs } = this.props;
        const { getHomepage } = this.props;
        const { getCurrentCarouselAnimatedText } = this.props;
        const { getCurrentSlide } = this.props;
        const { getCurrentCarouselBkgColor } = this.props;
        const { getImgWidth } = this.props;
        const { getTotalSlides } = this.props;
        const { getIntersectingState } = this.props;
        const { getBlogItem } = this.props;
        getBlogs();
        getBlogItem();
        getHomepage();
        getCurrentCarouselAnimatedText();
        getCurrentSlide();
        getCurrentCarouselBkgColor();
        getImgWidth();
        getTotalSlides();
        getIntersectingState();
    }

    render() {
        return(<WebAppRouter />)
    }
}

export default connect(null, mapDispatchToProps)(ReduxHOC);