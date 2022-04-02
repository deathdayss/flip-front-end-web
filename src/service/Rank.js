import request from 'umi-request';
import { API_RANK } from '../Config.js';

export const getRankList = (params) => {
    return request(`${API_RANK}`, { params });
}