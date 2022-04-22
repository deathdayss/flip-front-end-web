import request from 'umi-request';
import { API_GET_COMMENT, API_ADD_COMMENT } from '../Config'

export const getCommentList = (params) => {
    return request(`${API_GET_COMMENT}`, { params });
}

export const addCommentService = (params) => {
    return request(`${API_ADD_COMMENT}`, {
        method: "post",
        data: params
    });
}