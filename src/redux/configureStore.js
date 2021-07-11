import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createForms, modelReducer, formReducer } from 'react-redux-form';
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { SearchReducer } from './reducers/SearchReducer';
import { persistStore } from 'redux-persist'


import { AuthenticationReducer } from './reducers/AuthenticationReducer';
import { persistedLocalizationReducer, LocalizationReducer } from './reducers/LocalizationReducer';
import { headerSearchbar } from './forms/HeaderSearchBar';

// TODO: Add states to the store when needed
export const store = createStore(
    combineReducers({
        authentication: AuthenticationReducer,
        localization: persistedLocalizationReducer,
        search: SearchReducer,
        ...createForms({
            headerSearchBar: headerSearchbar
        })
    }),
    applyMiddleware(thunk, logger)
);

export const persistor = persistStore(store)
