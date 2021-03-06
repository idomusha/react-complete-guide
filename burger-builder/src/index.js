import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import "./index.scss";
import App from "./App"; // Burger
// import registerServiceWorker from './registerServiceWorker';
import builderReducer from './store/reducers/builder';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';
import { watchAuth, watchBuilder, watchOrder } from './store/sagas';

const composeEnhancers = process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
    builderReducer: builderReducer,
    orderReducer: orderReducer,
    authReducer: authReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(thunk, sagaMiddleware)
    ),
);

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchBuilder);
sagaMiddleware.run(watchOrder);

const app = (
    <Provider store={ store }>
        <BrowserRouter basename="/">
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
// registerServiceWorker();
