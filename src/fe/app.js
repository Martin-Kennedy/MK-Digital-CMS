import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './store/store'
import WebAppRouter from './router/webAppRouter';
import "./base.scss";



const jsx = (
    <Provider store={store}>
        <WebAppRouter />
    </Provider>
);





ReactDOM.render(jsx, document.getElementById('app'));
