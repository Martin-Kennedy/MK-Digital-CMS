import React, {Component} from 'react';
import WebAppRouter from './webAppRouter';
import { connect } from 'react-redux';
import { getIntersectingState } from '../actions/pages.actions';
import { getBlogs, getBlogItem, getNextBlogItem } from '../actions/blogs.actions';
import { getProjects, getProjectItem, getNextProjectItem } from '../actions/projects.actions';
import { getLocationObject, getGeoLocation } from '../actions/surfApp.actions';
import { getHomepage, getCurrentCarouselAnimatedText, getCurrentSlide, getCurrentCarouselBkgColor, getImgWidth, getTotalSlides } from '../actions/homepage.actions';

const mapDispatchToProps = dispatch => ({
    getBlogs: blogData => dispatch(getBlogs(blogData)),
    getProjects: projectData => dispatch(getProjects(projectData)),
    getProjectItem: projectItem => dispatch(getProjectItem(projectItem)),
    getNextProjectItem: nextProjectItem => dispatch(getNextProjectItem(nextProjectItem)),
    sortByBlogSubject: subject => dispatch(sortByBlogSubject(subject)),
    sortByProjectSubject: subject => dispatch(sortByBlogSubject(subject)),
    getHomepage: homepageData => dispatch(getHomepage(homepageData)),
    getCarouselHoverState: isHovered => dispatch(getCarouselHoverState(isHovered)),
    getCurrentCarouselAnimatedText: carouselText => dispatch(getCurrentCarouselAnimatedText(carouselText)),
    getCurrentSlide: currentSlide => dispatch(getCurrentSlide(currentSlide)),
    getCurrentCarouselBkgColor: color => dispatch(getCurrentCarouselBkgColor(color)),
    getImgWidth: width => dispatch(getImgWidth(width)),
    getTotalSlides: totalSlides => dispatch(getTotalSlides(totalSlides)),
    getIntersectingState: isIntersecting => dispatch(getIntersectingState(isIntersecting)),
    getBlogItem: item => dispatch(getBlogItem(item)),
    getNextBlogItem: nextBlogItem => dispatch(getNextBlogItem(nextBlogItem)),
    getLocationObject: locations => dispatch(getLocationObject(locations)),
    getGeoLocation: geoLocation => dispatch(getGeoLocation(geoLocation))


});

class ReduxHOC extends Component {

    componentDidMount() {
        const { getBlogs } = this.props;
        const { getProjects } = this.props;
        const { getHomepage } = this.props;
        const { getCurrentCarouselAnimatedText } = this.props;
        const { getCurrentSlide } = this.props;
        const { getCurrentCarouselBkgColor } = this.props;
        const { getImgWidth } = this.props;
        const { getTotalSlides } = this.props;
        const { getIntersectingState } = this.props;
        const { getBlogItem } = this.props;
        const { getNextBlogItem } = this.props;
        const { getProjectItem } = this.props; 
        const { getNextProjectItem } = this.props;
        const { getLocationObject } = this.props;
        const { getGeoLocation } = this.props;
        getProjects();
        getProjectItem();
        getNextProjectItem();
        getBlogs();
        getBlogItem();
        getNextBlogItem();
        getHomepage();
        getCurrentCarouselAnimatedText();
        getCurrentSlide();
        getCurrentCarouselBkgColor();
        getImgWidth();
        getTotalSlides();
        getIntersectingState();
        getLocationObject();
        getGeoLocation();
    }

    render() {
        return(<WebAppRouter />)
    }
}

export default connect(null, mapDispatchToProps)(ReduxHOC);