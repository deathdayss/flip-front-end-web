import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createForms } from 'react-redux-form';
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import { AuthenticationReducer } from './reducers/AuthenticationReducer';
import { persistedLocalizationReducer, LocalizationReducer } from './reducers/LocalizationReducer';
import { SearchReducer } from './reducers/SearchReducer';
import { persistStore } from 'redux-persist'


// TODO: Add states to the store when needed
export const store = createStore(
    combineReducers({
        authentication: AuthenticationReducer,
        localization: persistedLocalizationReducer,
        // localization: LocalizationReducer,
        search: SearchReducer,
        ...createForms({
            searchBar: {
                searchBar: ''
            }
        })
    }),
    applyMiddleware(thunk, logger)
);

export const persistor = persistStore(store)
