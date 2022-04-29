/**
 * @author Huiying Hu
 * @create date 2021-07-23 20:35:00
 * @modify date 2021-09-24 11:32:25
 */


const DOMAIN = "http://175.178.159.131:8084"
const API_WT = "http://rinato.ticp.vip"

//Homepage
export const API_RANK = `${DOMAIN}/v1/rank/zone`
export const API_MULTI_ZONE = `${DOMAIN}/v1/rank/multi_zone`
export const API_IMG = `${DOMAIN}/v1/download/img`
export const API_RANK_DOWNLOAD = `${DOMAIN}/v1/rank/download`
export const DOWNLOAD_GAME = `${DOMAIN}/v1/download/game`

//GameDisplay - interaction btn
export const API_PRODUCT = `${API_WT}/v1/get/product`
export const API_LIKE_CLICK = `${DOMAIN}/v1/like/click`
export const API_LIKE_NUM = `${DOMAIN}/v1/like/num`
export const API_LIKE_CHECK = `${DOMAIN}/v1/like/check`
export const API_COLLECT_CLICK = `${DOMAIN}/v1/collect/click`
export const API_COLLECT_CHECK = `${DOMAIN}/v1/collect/check`
export const API_COLLECT_NUM = `${DOMAIN}/v1/collect/num`

//GameDisplay - comment
export const API_GET_COMMENT = `${DOMAIN}/v1/rank/comment/time`
export const API_ADD_COMMENT = `${DOMAIN}/v1/change/comment/add`

//Rank
export const API_RANK_AUTHOR = `${DOMAIN}/v1/rank/author`

// Personal Centre
export const API_USER_DETAIL = `${DOMAIN}/v1/user/detail`
export const API_UPDATE_GAME = `${DOMAIN}/v1/update/game`
export const API_AVATAR = `${DOMAIN}/v1/download/personal`

//Login URLs, etc.