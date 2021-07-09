import { LocalizationTypes } from '../actions/types/LocalizationTypes';
import { English } from '../../data/words/English';

export const LocalizationReducer = (state = { isLoading: true,
    errMess: null,
    lang: 'en',
    words: English}, action) => {
    switch (action.type) {
        case LocalizationTypes.CHANGE_LANGUAGE:
            return {...state, isLoading: false, errMess: null, lang: action.payload.lang, words: action.payload.words};
        case LocalizationTypes.CHANGE_LANGUAGE_LOADING:
            return {...state, isLoading: true, errMess: action.payload};
        case LocalizationTypes.CHANGE_LANGUAGE_LOADING:
            return {...state, isLoading: true}
        default:
            return state;
    }
};