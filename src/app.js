import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './pages/home';
import { BrowserRouter, Route } from 'react-router-dom';
import "./base.scss";

const routes = (
    <BrowserRouter>
        <Route path='/'>
            <HomePage />
        </Route>
      
    </BrowserRouter>
);

ReactDOM.render(routes, document.getElementById('app'));
