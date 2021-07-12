import { authenticationTypes } from '../types/AuthenticationTypes';

export const signup = () => ({
    type: authenticationTypes.SIGNUP
})

export const login = () => ({
    type: authenticationTypes.LOGIN
})