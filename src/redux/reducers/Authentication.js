import { AuthenticationTypes } from '../actions/ActionTypes';

export const Authentication = (state = { isLoading: true,
    errMess: null,
    user_info: null}, action) => {
    switch (action.type) {
        case AuthenticationTypes.SIGN_UP:
            return {...state, isLoading: false, errMess: null, dishes: action.payload};

        case AuthenticationTypes.LOG_IN:
            return {...state, isLoading: true, errMess: null, dishes: []}
        default:
            return state;
    }
};