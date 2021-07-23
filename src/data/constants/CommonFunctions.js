/**
 * @author Zhicheng Wang
 * @create date 2021-07-23 20:34:05
 * @modify date 2021-07-23 20:34:05
 */

export const searchToObj = (search) => {
    var qs = require('qs')
    if (search[0] === '?') {
        return qs.parse(search.substring(1, search.length))
    }
    else {
        return qs.parse(search)
    }
}