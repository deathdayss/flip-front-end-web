import { searchTypes } from "../actions/types/SearchTypes";

export const searchReducer = (state = { isLoading: true,
    errMess: null,
    searchResult: null}, action) => {
    switch (action.type) {
        case searchTypes.HEADER_SEARCH_RESULT:
            return {...state, isLoading: false, errMess: null, searchResult: action.payload};
        case searchTypes.HEADER_SEARCH_LOADING:
            return {...state, isLoading: true}
        case searchTypes.HEADER_SEARCH_FAILED:
            return {...state, isLoading: true, errMess: action.payload};
        default:
            return state;
    }
};