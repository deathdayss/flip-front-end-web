import {createStore, combineReducers, applyMiddleware} from 'redux';
import { createForms } from 'react-redux-form';
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import { AuthenticationReducer } from './reducers/AuthenticationReducer';
import { LocalizationReducer } from './reducers/LocalizationReducer';

// TODO: Add states to the store when needed
export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            authentication: AuthenticationReducer,
            localization: LocalizationReducer
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}