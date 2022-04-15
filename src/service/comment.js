import request from 'umi-request';
import { API_COMMENT } from '../Config'

export const getCommentList = (params) => {
    return request(`${API_COMMENT}`, { params });
}