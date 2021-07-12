import { authenticationTypes } from '../actions/types/AuthenticationTypes';

export const authenticationReducer = (state = { isLoading: false,
    errMess: null,
    userInfo: null}, action) => {
    switch (action.type) {
        case authenticationTypes.SIGN_UP:
            return {...state, isLoading: false, errMess: null, userInfo: action.payload};

        case authenticationTypes.LOG_IN:
            return {...state, isLoading: false, errMess: null, userInfo: null}
        default:
            return state;
    }
};