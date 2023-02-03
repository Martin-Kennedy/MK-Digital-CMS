import React, {Component, useState, useEffect} from 'react';
import {BrowserRouter, Switch, Route, useParams} from 'react-router-dom';
import {Container} from 'react-bootstrap';
import styled from 'styled-components';
import {createBrowserHistory} from 'history';
import {useHistory} from 'react-router-dom'
import Home from "../pages/home.js"
import BlogLanding from "../pages/blogLanding.js";
import BlogPage from "../pages/blogArticle.js";
import About from "../pages/about.js";
import ProjectsLanding from "../pages/projectsLanding.js";
import ProjectPage  from "../pages/project.js";

import ContactPage  from "../pages/contact.js";

import SurfGUILanding  from "../pages/surfGuiLanding.js";

let history = createBrowserHistory();
let currentLocation = history.location;


const Page = styled(Container)`
        height: 100%;
        width: 100vw;
        margin: 0;
        padding: 0;
        `;


const WebAppRouter = (props) => {
    const [locationKeys,
        setLocationKeys] = useState([])

    useEffect(() => {
        return history.listen(location => {
            if (history.action === 'PUSH') {
                setLocationKeys([location.key])
            }

            if (history.action === 'POP') {
                if (locationKeys[1] === location.key) {
                    setLocationKeys(([
                        _, ...keys
                    ]) => keys)

                    window
                        .location
                        .reload();

                } else {
                    setLocationKeys((keys) => [
                        location.key, ...keys
                    ])

                    window
                        .location
                        .reload();
                }
            }
        })
    }, [locationKeys])
    return (
        <BrowserRouter forceRefresh={true}>
            <Page fluid>
                
                <Switch>
                    <Route path="/" exact={true}>
                        <Home location={props}/>
                    </Route>
                    <Route path="/blogs">
                        <BlogLanding location={currentLocation}/>
                    </Route>
                    <Route path="/blog/:id">
                        <BlogPage location={currentLocation}/>
                    </Route>
                    <Route path="/about">
                        <About location={currentLocation}/>
                    </Route>
                    <Route path="/projects">
                        <ProjectsLanding location={currentLocation}/>
                    </Route>
                    <Route path="/project/:id">
                        <ProjectPage location={currentLocation}/>
                    </Route>
                    <Route path='/swell'>
                        <SurfGUILanding/>
                    </Route>
                    <Route path='/contact'>
                        <ContactPage location={currentLocation}/>
                    </Route>
                </Switch>
            </Page>
        </BrowserRouter >
    )
}

export default WebAppRouter;