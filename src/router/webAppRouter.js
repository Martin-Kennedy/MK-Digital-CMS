import React, {Component, useState, useEffect} from 'react';
import {BrowserRouter, Switch, Route, useParams} from 'react-router-dom';
import {Container} from 'react-bootstrap';
import styled from 'styled-components';
import {createBrowserHistory} from 'history';
import {useHistory} from 'react-router-dom'
import loadable from "@loadable/component";

let history = createBrowserHistory();
let currentLocation = history.location;


const Page = styled(Container)`
        height: 100%;
        width: 100vw;
        margin: 0;
        padding: 0;
        `;

const Home = loadable(() => import("../pages/home.js"), {
    fallback: "Loading"
});

const BlogLanding = loadable(() => import("../pages/blogLanding.js"), {
    fallback: "Loading"
});

const BlogPage = loadable(() => import("../pages/blogArticle.js"), {
    fallback: "Loading"
});

const About = loadable(() => import("../pages/about.js"), {
    fallback: "Loading"
});

const ProjectsLanding = loadable(() => import("../pages/projectsLanding.js"), {
    fallback: "Loading"
});

const ProjectPage = loadable(() => import("../pages/project.js"), {
    fallback: "Loading"
});

const ContactPage = loadable(() => import("../pages/contact.js"), {
    fallback: "Loading"
});

const SurfGUILanding = loadable(() => import("../pages/surfGuiLanding.js"), {
    fallback: "Loading"
});

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