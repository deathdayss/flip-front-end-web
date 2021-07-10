import { SearchTypes } from "../types/SearchTypes";

export const fetchHeaderSearch = (value) => (dispatch) => {
    dispatch(headerSearchLoading())

    // TODO: Fetch Result from the server
} 

export const headerSearchResult = (searchResult) => ({
    type: SearchTypes.HEADER_SEARCH,
    payload: searchResult
})

export const headerSearchLoading = () => ({
    type: SearchTypes.HEADER_SEARCH_LOADING,
})

export const headerSearchFailed = (err) => ({
    type: SearchTypes.HEADER_SEARCH_FAILED,
    payload: err
})