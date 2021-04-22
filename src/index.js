import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Provider } from 'react-redux';
import store from './store/store';
// react-toastify
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

ReactDOM.render(
  <Provider store={store}>
    <App />
    <ToastContainer autoClose={4000} />
  </Provider>,
  document.getElementById('root')
);
