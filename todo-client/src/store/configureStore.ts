import {createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import sagas from "./sagas";
import { reducer } from "./reducer";

export default function configureStore(initialState: any, history: any) {
    const composeEnhancers = composeWithDevTools({});
    const reduxSagaMiddleware = createSagaMiddleware();

    const middleware = [reduxSagaMiddleware, thunk ];
    const applyMiddlewareFunc = applyMiddleware(...middleware);

    let store: any;
    if(process.env.NODE_ENV === 'production') {
        store = createStore(reducer, applyMiddlewareFunc);
    }else{
        store = createStore(reducer,initialState, composeEnhancers(applyMiddlewareFunc));
    }

    reduxSagaMiddleware.run(sagas);

    return store;
}