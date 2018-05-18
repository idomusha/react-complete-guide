import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

// axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
axios.defaults.headers.common['Authorization'] = 'AUTH_TOKEN';
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

var requestInterceptor = axios.interceptors.request.use((request) => {
    console.log('request', request);
    return request;
}, (error) => {
    console.log('error', error);
    return Promise.reject(error);
});
// axios.interceptors.request.eject(requestInterceptor);

axios.interceptors.response.use((response) => {
    console.log('response', response);
    return response;
}, (error) => {
    console.log('error', error);
    return Promise.reject(error);
});

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
