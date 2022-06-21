import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './store/store'
import ReduxHOC from './router/reduxHOC';
import 'core-js/actual';
import "./base.scss";




const jsx = (
    <Provider store={store}>
        <ReduxHOC />
    </Provider>
);


ReactDOM.render(jsx, document.getElementById('app'));
module.hot.accept();

