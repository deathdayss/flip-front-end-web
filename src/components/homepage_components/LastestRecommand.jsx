/**
 * @author Zhicheng Wang
 * @create date 2021-07-23 20:33:45
 * @modify date 2021-07-24 21:15:48
 */

import React, { Component, useState } from 'react'
import { Flex, Box } from '@rebass/grid'

import { ForLoop } from '../helper_components/Helper.jsx'
import { homepageSpacing } from '../../data/constants/Spacing'
import './LastestRecommand.scss'
import request from 'umi-request'

const DOMAIN = "http://106.52.167.166:8084"
const API_RECOM = `${DOMAIN}/v1/rank/zone`   //TODO: = `${DOMAIN}/v1/recommendation/zone`
const API_IMG = `${DOMAIN}/v1/download/img`
const getRankService = (params) => { return request(`${API_RECOM}`, { params }); }
const getImgService = (params) => { return request(`${API_IMG}`, { params }); }


const LastestRecommand = () => {

    // Note that each item in the reocmmendatiaon list should have the following attributes: GID, game_name, like_num, DownloadNum, CommentNum, img, AuthorName
    const [val_recommContent, set_recommContent] = useState([]);

    // Example: 
    // - From {"GID": 1, "game_name": "Apex", "like_num": 123, "DownloadNum": 456, "CommentNum": 10, "img": "https://tva1.sinaimg.cn/large/008i3skNly1guco1lvt96j61h90u0qbq02.jpg", "AuthorName": "Origin Corp."},
    // - To   ["作品名","二行","1000游玩 - 1000点赞", "UP主名字"]
    const FormatData = (packed_data) => {
        const { game_name, like_num, DownloadNum, AuthorName } = packed_data
        return [
            game_name,
            "二行",
            DownloadNum + "游玩 - " + like_num + "点赞",
            AuthorName
        ]
    }
    // Example 
    // - From ["作品名","二行","1000游玩 - 1000点赞", "UP主名字"]
    // - To   https://tva1.sinaimg.cn/large/008i3skNly1gucob20wzpj60gg0dcjrw02.jpg
    const DataToHtml = ({ styles, data }) => {
        const [pri_title, sec_title, numPlays_likes, author] = data
        const Content = [
            <Flex> <Box width={1}>     <b>{pri_title}</b>      </Box></Flex>,
            <Flex> <Box width={1}>     <b>{sec_title}</b>      </Box></Flex>,
            <Flex> <Box width={1}>     {numPlays_likes}        </Box></Flex>,
            <Flex> <Box width={1}>     {author}                </Box></Flex>,
        ]
        return (<Box {...styles}> {Content} </Box>);
    }

    // ===========================================================================
    // ===========================================================================

    const LastestRecommandContentRow = ({ index, colNum }) => {
        const fake_game_data = { "GID": 1, "game_name": "Apex", "like_num": 123, "DownloadNum": 456, "CommentNum": 10, "img": "https://tva1.sinaimg.cn/large/008i3skNly1guco1lvt96j61h90u0qbq02.jpg", "AuthorName": "Origin Corp. Electronic Arts" };

        return <ForLoop
            loopNum={colNum}
            LoopContent={() => <Box
                width={1 / colNum}
                px={homepageSpacing.responsive_content_padding}
            >
                <img className='Home-Content-img' src={fake_game_data.img} />
                <Flex className='text-start' >
                    <DataToHtml
                        styles={{ pl: '2px', fontSize: "11px !important" }}
                        data={FormatData(fake_game_data)} />
                </Flex>
            </Box>}
            PackingContent={({ Output }) => <Flex
                pt={index === 0 ? '' : homepageSpacing.bottom_content_padding}
                flexWrap='wrap'
                className={"bottom-row-" + colNum} >
                {Output}
            </Flex>} />
    }

    const LastestRecommandContentGrid = ({ rowNum, colNums }) => {
        return colNums.map(colNum => <ForLoop loopNum={rowNum}
            LoopContent={({ index }) => < LastestRecommandContentRow index={index} colNum={colNum} />} />)
    }

    return (
        <>
            <Flex mt={homepageSpacing.top_margin} mx={[homepageSpacing.main_margin_mobile, homepageSpacing.main_margin]}>
                Recommendation | Latest
            </Flex>
            <Flex mt={homepageSpacing.top_margin} mx={[homepageSpacing.main_margin_mobile, homepageSpacing.main_margin]} className='text-center'>
                <Box width={1}>
                    <LastestRecommandContentGrid rowNum={5} colNums={[5, 4, 2]} />
                </Box>
            </Flex>
        </>
    )
}
export default LastestRecommand