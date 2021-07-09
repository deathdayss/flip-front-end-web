import { AuthenticationTypes } from '../types/AuthenticationTypes';

export const signup = () => ({
    type: AuthenticationTypes.SIGNUP
})

export const login = () => ({
    type: AuthenticationTypes.LOGIN
})