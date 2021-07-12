import { LocalizationTypes } from '../types/LocalizationTypes';
import {Chinese} from '../../../data/words/Chinese'
import {English} from '../../../data/words/English'

export const langToWords = (lang) => {
    switch (lang) {
        case 'zh':
            return Chinese
        case 'en':
            return English
        default:
            return null
    }
}

export const changeLanguage = (lang, words) => ({
    type: LocalizationTypes.CHANGE_LANGUAGE,
    payload: {
        lang: lang,
        words: words
    }
})

export const changeLanguageFailed = (err) => ({
    type: LocalizationTypes.CHANGE_LANGUAGE_FAILED,
    payload: err
})

export const useLangToChangeWords = (lang) => (dispatch) => {
    const words = langToWords(lang)
    if (words == null) {
        dispatch(changeLanguageFailed(new Error('Wrong Lang')))
    } 
    else {
        dispatch(changeLanguage(lang, words))
        document.documentElement.lang = lang; // change the language of header of the html page
    }
}

export const toggleLanguage = (lang) => (dispatch) => {
    if (lang === 'zh') {
        dispatch(changeLanguage('en', English))
    }
    else if (lang === 'en') {
        dispatch(changeLanguage('zh', Chinese))
    }
}