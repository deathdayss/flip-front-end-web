import request from 'umi-request';
import { API_RANK, API_RANK_DOWNLOAD, API_MULTI_ZONE } from '../Config.js'

export const getRankService = (params) => {
    return request(`${API_RANK}`, { params });
}

export const getDownloadService = (params) => {
    return request(`${API_RANK_DOWNLOAD}`, { params });
}

export const getMultiZoneService = (params) => {
    return request(`${API_MULTI_ZONE}`, { params });
}