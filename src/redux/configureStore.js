import {createStore, combineReducers, applyMiddleware} from 'redux';
import { createForms } from 'react-redux-form';
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import { Authentication } from './reducers/Authentication';

// TODO: Add states to the store when needed
export const ConfigureStore = () => {
    const store = createStore(
        // combineReducers({
        //     authentication: Authentication,
        //     ...createForms({
        //         feedback: InitialFeedback
        //     })
        // }),
        // applyMiddleware(thunk)
        applyMiddleware(thunk, logger)
    );

    return store;
}