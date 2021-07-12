import { headerStateTypes } from "../types/HeaderStateTypes";

export const setState = (headerState) => ({
    type: headerStateTypes.SET_STATE,
    payload: headerState
})