import { localizationTypes } from '../actions/types/LocalizationTypes';
import { english } from '../../data/words/English';
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

export const localizationReducer = (state = { isLoading: true,
    errMess: null,
    lang: 'en',
    words: english}, action) => {
    switch (action.type) {
        case localizationTypes.CHANGE_LANGUAGE:
            return {...state, isLoading: false, errMess: null, lang: action.payload.lang, words: action.payload.words};
        case localizationTypes.CHANGE_LANGUAGE_LOADING:
            return {...state, isLoading: true, errMess: action.payload};
        case localizationTypes.CHANGE_LANGUAGE_LOADING:
            return {...state, isLoading: true}
        default:
            return state;
    }
};

const persistLocalizationConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['lang']
  };

export const persistedLocalizationReducer = persistReducer(persistLocalizationConfig, localizationReducer)