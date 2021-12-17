import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {Container} from 'react-bootstrap';
import Header from '../components/navigation/header';
import Footer from '../components/footer';
import Home from '../pages/home';
import BlogLanding from '../pages/blogLanding';
import styled from 'styled-components';
import { createBrowserHistory } from 'history'
import { connect } from 'react-redux';
import { getBlogs } from '../actions/blogs.actions';
let history = createBrowserHistory();

const Page = styled(Container)`
        height: 100vh;
        width: 100vw;
        margin: 0;
        padding: 0;
        `;
        
const blogData = [];
const filteredData = [];
const sortBy = [];

const mapDispatchToProps = dispatch => ({
    getBlogs: blogs => dispatch(getBlogs(blogData)),
    sortByBlogSubject: subject => dispatch(sortByBlogSubject(subject))
});

        

class WebAppRouter extends Component {

    componentDidMount() {
        const {getBlogs} = this.props;
        getBlogs();
    }

   

    render() {
        return (
            <BrowserRouter>
                <Page fluid> 
                    <Header location={history.location} />
                    <Switch>
                        <Route path="/" component={Home} exact={true}/>
                        <Route path="/blog" component={BlogLanding}/>
                    </Switch>
                    <Footer/>
                </Page>
            </BrowserRouter >
        )
    };
}

export default connect(null, mapDispatchToProps)(WebAppRouter);