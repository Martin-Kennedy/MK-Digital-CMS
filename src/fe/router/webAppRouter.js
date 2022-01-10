import React, {Component} from 'react';
import {BrowserRouter, Switch, Route } from 'react-router-dom';
import {Container} from 'react-bootstrap';
import HeaderComponent from '../components/navigation/header';
import Footer from '../components/footer';
import Home from '../pages/home';
import About from '../pages/about';
import BlogLanding from '../pages/blogLanding';
import styled from 'styled-components';
import { createBrowserHistory } from 'history'
import { connect } from 'react-redux';
import { getBlogs } from '../actions/blogs.actions';
import { getHomepage, getCurrentCarouselAnimatedText, getCurrentSlide, getCurrentCarouselBkgColor, getImgWidth, getTotalSlides} from '../actions/homepage.actions';

let history = createBrowserHistory();
let currentLocation = history.location



const Page = styled(Container)`
        height: 100vh;
        width: 100vw;
        margin: 0;
        padding: 0;
        `;
        


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
    
});

        

class WebAppRouter extends Component {

    componentDidMount() {
        const {getBlogs} = this.props;
        const {getHomepage} = this.props;
        const { getCurrentCarouselAnimatedText } = this.props;
        const { getCurrentSlide } = this.props;
        const { getCurrentCarouselBkgColor } = this.props;
        const { getImgWidth } = this.props;
        const { getTotalSlides } = this.props;
        getBlogs();
        getHomepage();
        getCurrentCarouselAnimatedText();
        getCurrentSlide();
        getCurrentCarouselBkgColor();
        getImgWidth();
        getTotalSlides();
    }

    

   

    render() {
        
        return (
            <BrowserRouter forceRefresh={true}>
                
                <Page fluid> 
                    <Switch>
                        <Route path="/"  component={Home} exact={true} />
                        <Route component={BlogLanding}  path="/blog" />
                        <Route path="/about"  component={About} />
                    </Switch>
                </Page>
                
            </BrowserRouter >
        )
    };
}

export default connect(null, mapDispatchToProps)(WebAppRouter);