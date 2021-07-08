import { AuthenticationTypes } from './ActionTypes';

const signup = () => ({
    type: AuthenticationTypes.SIGNUP
})

const login = () => ({
    type: AuthenticationTypes.LOGIN
})