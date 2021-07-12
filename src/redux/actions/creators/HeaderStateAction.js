import { headerStateTypes } from "../types/HeaderStateTypes";

export const setHeaderState = (headerState) => ({
    type: headerStateTypes.SET_STATE,
    payload: headerState
})