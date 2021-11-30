import React, {Component} from 'react';
import {BrowserRouter, Switch, Link, Route} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import Header from '../components/navigation/header';
import Footer from '../components/footer';
import Home from '../pages/home';
import BlogLanding from '../pages/blogLanding';
import styled from 'styled-components';

const Page = styled(Container)`
        height: 100vh,
        width: 100vw,
        margin: 0,
        padding: 0
        `;
    

        

class WebAppRouter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
        }
        
    }

    componentDidUpdate() {
        if(window.location.pathname == "/blog") {
            this.setState({
                color: "red"
            });
        }
    }

   

    render() {
        return (
            <BrowserRouter>
                <Page fluid>
                    <Header style={this.state.color}/>
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