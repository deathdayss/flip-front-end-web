import { headerStateTypes } from "../actions/types/HeaderStateTypes";
import { headerState } from "../../data/constants/HeaderState";

export const headerStateReducer = (state = { isLoading: false,
    errMess: null,
    headerState: headerState.NORMAL}, action) => {
    switch (action.type) {
        case headerStateTypes.SET_STATE:
            return {...state, isLoading: false, headerState: null, userInfo: action.payload};

        // case headerStateTypes.LOG_IN:
        //     return {...state, isLoading: false, errMess: null, userInfo: null}
        default:
            return state;
    }
};