import './style/index.scss';

import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {
    Provider
}
from 'react-redux';
import {
    Router, hashHistory, browserHistory
}
from 'react-router';
import {
    syncHistoryWithStore
}
from 'react-router-redux';
import configureStore from './store/configureStore';
import ReduxToastr from 'react-redux-toastr';

import routes from './routes';

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render(<Provider store = {store}>
    <div>
        <Router history = {history} routes = {routes} > </Router>
        <ReduxToastr timeOut = {3500} newestOnTop = {true} preventDuplicates = {true} position = "top-right" transitionIn = "fadeIn"  transitionOut = "fadeOut"  progressBar />
    </div>
    </Provider>,
    document.getElementById('content'))
