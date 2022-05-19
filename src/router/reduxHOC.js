import React, {Component} from 'react';
import WebAppRouter from './webAppRouter';
import { connect } from 'react-redux';
import { getToken, establishSession } from '../actions/initialUtility.actions';
import { getIntersectingState } from '../actions/pages.actions';
import {getAbout} from '../actions/about.actions';
import { getBlogs, getBlogItem, getNextBlogItem, getBlogLanding } from '../actions/blogs.actions';
import { getProjects, getProjectItem, getNextProjectItem, getProjectLanding } from '../actions/projects.actions';
import { getHomepage, getHomepageCarousel, getHomepageCarouselArrayProjects, getHomepageCarouselBlogsArrayandCombine, getCurrentCarouselAnimatedText, getCurrentSlide, getCurrentCarouselBkgColor, getImgWidth, getTotalSlides } from '../actions/homepage.actions';

const mapDispatchToProps = dispatch => ({
    getToken: token => dispatch(getToken(token)),
    establishSession: active => dispatch(establishSession(active)),
    getBlogs: blogData => dispatch(getBlogs(blogData)),
    getProjects: projectData => dispatch(getProjects(projectData)),
    getProjectItem: projectItem => dispatch(getProjectItem(projectItem)),
    getNextProjectItem: nextProjectItem => dispatch(getNextProjectItem(nextProjectItem)),
    getProjectLanding: projectLandingData => dispatch(getProjectLanding(projectLandingData)),
    sortByBlogSubject: subject => dispatch(sortByBlogSubject(subject)),
    sortByProjectSubject: subject => dispatch(sortByBlogSubject(subject)),
    getHomepage: homepageData => dispatch(getHomepage(homepageData)),
    getCarouselHoverState: isHovered => dispatch(getCarouselHoverState(isHovered)),
    getCurrentCarouselBkgColor: color => dispatch(getCurrentCarouselBkgColor(color)),
    getImgWidth: width => dispatch(getImgWidth(width)),
    getTotalSlides: totalSlides => dispatch(getTotalSlides(totalSlides)),
    getIntersectingState: isIntersecting => dispatch(getIntersectingState(isIntersecting)),
    getBlogItem: item => dispatch(getBlogItem(item)),
    getNextBlogItem: nextBlogItem => dispatch(getNextBlogItem(nextBlogItem)),
    getBlogLanding: blogLandingData => dispatch(getBlogLanding(blogLandingData)),
    getAbout: aboutData => dispatch(getAbout(aboutData))
})

const mapStateToProps = state => {
    return {
        initialUtility: {
            keystoneToken: state.initialUtility.keystoneToken,
            session: state.initialUtility.session
            
        }
        
    }
};

class ReduxHOC extends Component {

    componentDidMount() {
        const { getToken } = this.props;
        const { getAbout } = this.props;
        const { getProjects } = this.props;
        const { getBlogs } = this.props;
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
        const { getHomepageCarouselSlides } = this.props;
        const { getProjectLanding } = this.props;
        const { getBlogLanding } = this.props;
        getToken();
    }

    componentDidUpdate(prevProps) {
        
        if (prevProps.initialUtility.keystoneToken !== this.props.initialUtility.keystoneToken){
            const { establishSession } = this.props;
            establishSession(this.props.initialUtility.keystoneToken)
        }
        if (prevProps.initialUtility.session !== this.props.initialUtility.session) {
            
        }
            
       
    }

    render() {
        return(<WebAppRouter />)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReduxHOC);