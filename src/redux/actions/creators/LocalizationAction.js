import { localizationTypes } from '../types/LocalizationTypes';
import {chinese} from '../../../data/words/Chinese'
import {english} from '../../../data/words/English'

export const langToWords = (lang) => {
    switch (lang) {
        case 'zh':
            return chinese
        case 'en':
            return english
        default:
            return null
    }
}

export const changeLanguage = (lang, words) => ({
    type: localizationTypes.CHANGE_LANGUAGE,
    payload: {
        lang: lang,
        words: words
    }
})

export const changeLanguageFailed = (err) => ({
    type: localizationTypes.CHANGE_LANGUAGE_FAILED,
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
        dispatch(changeLanguage('en', english))
    }
    else if (lang === 'en') {
        dispatch(changeLanguage('zh', chinese))
    }
}