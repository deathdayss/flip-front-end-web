import request from 'umi-request'

const fake_data = () => {
    const res = []
    for (let i = 0; i < 10; ++i) {
        res.push({
            "GID": i,
            "game_name": "FIFA",
            "like_num": 22,
            "DownloadNum": 10,
            "CommentNum": 12,
            "playCount": 10,
            "img": "1.jpg",
            "AuthorName": "Author Name"
        })
    }
    return res
}

export const getRecommendationList = () => {
    return request('v1/v2/v3').then(res => fake_data()).catch(error => fake_data())
}

export const getLatestList = () => {
    return request('v1/v2/v3').then(res => fake_data()).catch(error => fake_data())
}