/**
 * @author Huiying Hu
 * @create date 2021-07-23 20:35:00
 * @modify date 2022-05-09 23:42:59
 */


const DOMAIN = "https://175.178.159.131" //http://175.178.159.131:8084
const API_WT = "http://rinato.ticp.vip"

//Homepage
export const API_RANK = `${DOMAIN}/v1/rank/zone`
export const API_MULTI_ZONE = `${DOMAIN}/v1/rank/multi_zone`
export const API_IMG = `${DOMAIN}/v1/download/img`
export const API_RANK_DOWNLOAD = `${DOMAIN}/v1/rank/download`
export const DOWNLOAD_GAME = `${DOMAIN}/v1/download/game`

//Header
export const API_SEARCH_GAME_NOTOKEN = `${DOMAIN}/v1/search/notoken/item/game`
export const API_SEARCH_GAME = `${DOMAIN}/v1/search/item/game`
export const API_SEARCH_HISTORY = `${DOMAIN}/v1/search/history`
export const API_SEARCH_HOTTOPIC = `${DOMAIN}/v1/search/notoken/rank/game`

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

//Sign in
export const API_LOGIN = `${DOMAIN}/v1/notoken/login`;
export const API_VERIFY_USER_EMAIL = `${DOMAIN}/v1/notoken/change/vertify`;
export const API_VERIFYQUESTION = `${DOMAIN}/v1/notoken/change/answer`;
export const API_CHANGEPASSWORD = `${DOMAIN}/v1/notoken/change/password`;
export const API_USER_REQUESTQUESTION = `${DOMAIN}/v1/security/user/question`;
//Sign up
export const API_SIGNUP = `${DOMAIN}/v1/notoken/register`;
export const API_VERIFYEMAIL = `${DOMAIN}/v1/notoken/verify`;
export const API_REQUESTQUESTION = `${DOMAIN}/v1/security/question`;
//CAPTCHA
export const API_VERIFICATION_CODE = `${DOMAIN}/v1/verification/code`;
