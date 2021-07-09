import { AuthenticationTypes } from '../actions/types/AuthenticationTypes';

export const AuthenticationReducer = (state = { isLoading: false,
    errMess: null,
    userInfo: null}, action) => {
    switch (action.type) {
        case AuthenticationTypes.SIGN_UP:
            return {...state, isLoading: false, errMess: null, userInfo: action.payload};

        case AuthenticationTypes.LOG_IN:
            return {...state, isLoading: false, errMess: null, userInfo: null}
        default:
            return state;
    }
};