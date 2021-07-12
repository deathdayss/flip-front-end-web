import { searchTypes } from "../types/SearchTypes";

export const fetchHeaderSearch = (value) => (dispatch) => {
    dispatch(headerSearchLoading())

    // TODO: Fetch Result from the server
} 

export const headerSearchResult = (searchResult) => ({
    type: searchTypes.HEADER_SEARCH,
    payload: searchResult
})

export const headerSearchLoading = () => ({
    type: searchTypes.HEADER_SEARCH_LOADING,
})

export const headerSearchFailed = (err) => ({
    type: searchTypes.HEADER_SEARCH_FAILED,
    payload: err
})