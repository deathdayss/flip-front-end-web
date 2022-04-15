import request from 'umi-request';
import { API_RANK, API_RANK_AUTHOR } from '../Config.js';

export const getRankList = (params) => {
    return request(`${API_RANK}`, { params });
}

export const getAuthorList = (params) => {
    return request(`${API_RANK_AUTHOR}`, { params });
}