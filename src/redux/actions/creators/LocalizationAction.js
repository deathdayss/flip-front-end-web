import { LocalizationTypes } from '../types/LocalizationTypes';
import {Chinese} from '../../../data/words/Chinese'
import {English} from '../../../data/words/English'

export const changeLanguage = (lang, words) => ({
    type: LocalizationTypes.CHANGE_LANGUAGE,
    payload: {
        lang: lang,
        words: words
    }
})

export const toggleLanguage = (lang) => (dispatch) => {
    if (lang === 'zh') {
        dispatch(changeLanguage('en', English))
    }
    else if (lang === 'en') {
        dispatch(changeLanguage('zh', Chinese))
    }
}