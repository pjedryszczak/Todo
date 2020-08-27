import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import configureStore from './store/configureStore';
import {Provider as ReduxProvider } from 'react-redux';
import { Route, BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { logout } from './store/actions'

const initialState = window.INITIAL_REDUX_STATE;

const store = configureStore(initialState);

const render = (component) => {
  ReactDOM.render(
    <ReduxProvider store={store}>
      <BrowserRouter>
      <Route path="/" component={component} />
      </BrowserRouter>
    </ReduxProvider>,
    document.getElementById('root')  
  );
}
render(App);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
