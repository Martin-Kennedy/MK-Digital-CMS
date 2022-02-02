import React, {Component} from 'react';
import {BrowserRouter, Switch, Route, useParams } from 'react-router-dom';
import {Container} from 'react-bootstrap';
import Home from '../pages/home';
import About from '../pages/about';
import BlogLanding from '../pages/blogLanding';
import ProjectsLanding from '../pages/projectsLanding';
import ProjectPage from '../pages/project';
import styled from 'styled-components';
import { createBrowserHistory } from 'history';


let history = createBrowserHistory();
let currentLocation = history.location



const Page = styled(Container)`
        height: 100vh;
        width: 100vw;
        margin: 0;
        padding: 0;
        `;
        




        

const WebAppRouter = (props) => {
        return (
            <BrowserRouter forceRefresh={true}>
                <Page fluid> 
                    <Switch>
                        <Route path="/" exact={true} >
                            <Home location={props} />
                        </Route>
                        <Route   path="/blog" >
                            <BlogLanding location={currentLocation} />
                        </Route>
                        <Route path="/about"  >
                            <About location={currentLocation} />
                        </Route>
                        <Route path="/projects" >
                            <ProjectsLanding location={currentLocation} />
                        </Route>
                        <Route path="/project/:id"  >
                            <ProjectPage location={currentLocation} />
                        </Route>
                        
                    </Switch>
                </Page>
            </BrowserRouter >
        )
}

export default WebAppRouter;