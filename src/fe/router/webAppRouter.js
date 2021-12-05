import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import Header from '../components/navigation/header';
import Footer from '../components/footer';
import Home from '../pages/home';
import BlogLanding from '../pages/blogLanding';
import styled from 'styled-components';
import { createBrowserHistory } from 'history'
let history = createBrowserHistory();

const Page = styled(Container)`
        height: 100vh;
        width: 100vw;
        margin: 0;
        padding: 0;
        `;

    

        

class WebAppRouter extends Component {

    constructor(props) {
        super(props);
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

export default WebAppRouter;