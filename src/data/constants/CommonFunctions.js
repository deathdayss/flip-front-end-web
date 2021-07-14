export const searchToObj = (search) => {
    var qs = require('qs')
    if (search[0] === '?') {
        return qs.parse(search.substring(1, search.length))
    }
    else {
        return qs.parse(search)
    }
}