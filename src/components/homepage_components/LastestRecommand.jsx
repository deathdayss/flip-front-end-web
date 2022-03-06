/* eslint-disable */

/**
 * @author Zhicheng Wang
 * @create date 2021-07-23 20:33:45
 * @modify date 2021-07-24 21:15:48
 */

import React, { Component, useState, useEffect } from 'react'
import { Flex, Box } from '@rebass/grid'

import { ForLoop } from '../helper_components/Helper.jsx'
import { homepageSpacing } from '../../data/constants/Spacing'
import './LastestRecommand.scss'
import request from 'umi-request'
import { useForm } from 'antd/es/form/Form'
import { API_RANK, API_IMG } from '../../Config'

const API_RECOMM = API_RANK   //TODO: = `${DOMAIN}/v1/recommendation/zone`
const API_LATEST = API_RANK   //TODO: = `${DOMAIN}/v1/latest/zone`
const getRecommService = (params) => { return request(`${API_RECOMM}`, { params }); }
const getLatestService = (params) => { return request(`${API_LATEST}`, { params }); }

const LastestRecommand = () => {
    // Note that each item in the reocmmendatiaon list should have the following attributes: GID, game_name, like_num, DownloadNum, CommentNum, img, AuthorName
    const [val_listContent, set_listContent] = useState([]);
    const [val_showOption, set_showOption] = useState(true); //"recommend" if true else "latest"
    useEffect(
        () => {
            if (val_showOption) {
                set_listContent(() => {
                    // TODO: Use fake data here, change to use of actual data later instead 
                    // [ACTUAL] =================================================================
                    // const result_promise = await getRecommService({ zone: "test", num: 5 });
                    // const result_data = result_promise.List;
                    // console.log("GET: "); console.log(result_data);
                    // return result_data
                    // [ FAKE ] =================================================================
                    const fake_data = [
                        {
                            "GID": 1,
                            "game_name": "FIFA",
                            "like_num": 22,
                            "DownloadNum": 10,
                            "CommentNum": 12,
                            "img": "1.jpg",
                            "AuthorName": "anonymity"
                        },
                        {
                            "GID": 6,
                            "game_name": "Witcher3",
                            "like_num": 20,
                            "DownloadNum": 10,
                            "CommentNum": 10,
                            "img": "2.jpg",
                            "AuthorName": "\"123\""
                        },
                        {
                            "GID": 4,
                            "game_name": "ANU",
                            "like_num": 18,
                            "DownloadNum": 13,
                            "CommentNum": 16,
                            "img": "3.jpg",
                            "AuthorName": "123"
                        },
                        {
                            "GID": 5,
                            "game_name": "FF14",
                            "like_num": 16,
                            "DownloadNum": 8,
                            "CommentNum": 15,
                            "img": "4.jpg",
                            "AuthorName": "123"
                        },
                        {
                            "GID": 7,
                            "game_name": "Monster Hunter",
                            "like_num": 15,
                            "DownloadNum": 15,
                            "CommentNum": 12,
                            "img": "5.png",
                            "AuthorName": "\"123\""
                        },
                        {
                            "GID": 7,
                            "game_name": "Monster Hunter",
                            "like_num": 15,
                            "DownloadNum": 15,
                            "CommentNum": 12,
                            "img": "7.jpeg",
                            "AuthorName": "\"123\""
                        },
                        {
                            "GID": 7,
                            "game_name": "Monster Hunter",
                            "like_num": 15,
                            "DownloadNum": 15,
                            "CommentNum": 12,
                            "img": "7.jpeg",
                            "AuthorName": "\"123\""
                        },
                        {
                            "GID": 7,
                            "game_name": "Monster Hunter",
                            "like_num": 15,
                            "DownloadNum": 15,
                            "CommentNum": 12,
                            "img": "7.jpeg",
                            "AuthorName": "\"123\""
                        },
                        {
                            "GID": 7,
                            "game_name": "Monster Hunter",
                            "like_num": 15,
                            "DownloadNum": 15,
                            "CommentNum": 12,
                            "img": "7.jpeg",
                            "AuthorName": "\"123\""
                        },
                        {
                            "GID": 7,
                            "game_name": "Monster Hunter",
                            "like_num": 15,
                            "DownloadNum": 15,
                            "CommentNum": 12,
                            "img": "7.jpeg",
                            "AuthorName": "\"123\""
                        },
                        {
                            "GID": 7,
                            "game_name": "Monster Hunter",
                            "like_num": 15,
                            "DownloadNum": 15,
                            "CommentNum": 12,
                            "img": "7.jpeg",
                            "AuthorName": "\"123\""
                        }
                    ];
                    return fake_data;
                });
            }
            else {
                set_listContent(() => getLatestService({ zone: "test", num: 5 }));
            }
        }, [val_showOption]);

    // ===========================================================================
    // ===========================================================================

    // Example: 
    // - From {"GID": 1, "game_name": "Apex", "like_num": 123, "DownloadNum": 456, "CommentNum": 10, "img": "https://tva1.sinaimg.cn/large/008i3skNly1guco1lvt96j61h90u0qbq02.jpg", "AuthorName": "Origin Corp."},
    // - To   ["作品名","二行","1000游玩 - 1000点赞", "UP主名字"]
    const FormatData = (packed_data) => {
        const { game_name, like_num, DownloadNum, AuthorName } = packed_data
        return [
            game_name,
            "   ",
            DownloadNum + "Plays - " + like_num + "Likes",
            AuthorName
        ]
    }
    // Example 
    // - From ["作品名","二行","1000游玩 - 1000点赞", "UP主名字"]
    // - To   https://tva1.sinaimg.cn/large/008i3skNly1gucob20wzpj60gg0dcjrw02.jpg
    const DataToHtml = ({ styles, data }) => {
        const [pri_title, sec_title, numPlays_likes, author] = data
        const Content = [
            <Flex> <Box width={1}>     <b>{pri_title}</b>    </Box></Flex>,
            <Flex> <Box width={1}>     <b>{sec_title}</b>    </Box></Flex>,
            <Flex> <Box width={1}>     {numPlays_likes}      </Box></Flex>,
            <Flex> <Box width={1}>     {author}              </Box></Flex>,
        ]
        return (<Box {...styles}> {Content} </Box>);
    }

    // ===========================================================================
    // ===========================================================================
    const Board_Row = ({ index, ele_perRow }) => {
        const data = val_listContent;
        const indexStart = index * ele_perRow;
        const indexEnd = indexStart + ele_perRow;
        const rowData = data.slice(indexStart, indexEnd);

        const rowHtml = rowData.map(
            (game_data) => {
                return (
                    <Box
                        width={1 / ele_perRow}
                        px={homepageSpacing.responsive_content_padding}
                    >
                        <img
                            className='Home-Content-img'
                            // TODO: When image is done, change this image link back to the normal ones read from data
                            src={`${API_IMG}?img_name=${game_data.img}`}
                        // src={"https://tva1.sinaimg.cn/large/008i3skNly1guco1lvt96j61h90u0qbq02.jpg"}
                        />
                        <Flex className='text-start' >
                            <DataToHtml
                                styles={{ pl: '2px', fontSize: "11px !important" }}
                                data={FormatData(game_data)} />
                        </Flex>
                    </Box>
                )
            }
        );

        // console.log("========================");
        // console.log(rowData);
        // console.log(rowHtml);

        return (
            <div id={"display-element-contrainer"}>
                <Flex
                    pt={index === 0 ? '' : homepageSpacing.bottom_content_padding}
                    flexWrap='wrap'
                    className={"bottom-row-" + ele_perRow} >
                    {rowHtml}
                </Flex>
            </div>
        )
    }
    const Board_Grid = ({ ele_perRow }) => {
        let row_sHtml = []
        for (let i = 0; i < val_listContent.length / ele_perRow; i++) {
            row_sHtml.push(
                <Board_Row index={i} ele_perRow={ele_perRow}></Board_Row>
            )
        }
        return (
            <>
                {row_sHtml}
            </>
        )
    }

    // ===========================================================================
    // ===========================================================================

    const LastestRecommandContentRow = ({ index, colNum }) => {
        const fake_game_data =
            { "GID": 1, "game_name": "Apex", "like_num": 123, "DownloadNum": 456, "CommentNum": 10, "img": "https://tva1.sinaimg.cn/large/008i3skNly1guco1lvt96j61h90u0qbq02.jpg", "AuthorName": "Origin Corp. Electronic Arts" };

        return (
            <ForLoop
                loopNum={colNum}
                LoopContent={
                    ({ Input }) =>
                        <Box
                            width={1 / colNum}
                            px={homepageSpacing.responsive_content_padding}
                        >
                            <img className='Home-Content-img' src={fake_game_data.img} />
                            <Flex className='text-start' >
                                <DataToHtml
                                    styles={{ pl: '2px', fontSize: "11px !important" }}
                                    data={FormatData(fake_game_data)}
                                />
                            </Flex>
                        </Box>
                }
                PackingContent={
                    ({ Output }) =>
                        <Flex
                            pt={index === 0 ? '' : homepageSpacing.bottom_content_padding}
                            flexWrap='wrap'
                            className={"bottom-row-" + colNum} >
                            {Output}
                        </Flex>
                }
            />
        )
    }
    const LastestRecommandContentGrid = ({ rowNum, colNums }) => {
        return colNums.map(
            colNum =>
                <ForLoop
                    loopNum={rowNum}
                    LoopContent={
                        ({ index }) =>
                            // < LastestRecommandContentRow index={index} colNum={colNum} />
                            <Board_Row index={0} ele_perRow={5} />
                    }
                />)
    }

    // ===========================================================================
    // ===========================================================================

    return (
        <>
            <Flex mt={homepageSpacing.top_margin} mx={[homepageSpacing.main_margin_mobile, homepageSpacing.main_margin]}>
                Recommendation | Latest
            </Flex>
            <Flex mt={homepageSpacing.top_margin} mx={[homepageSpacing.main_margin_mobile, homepageSpacing.main_margin]} className='text-center'>
                <Box width={1}>
                    {/* <LastestRecommandContentGrid rowNum={5} colNums={[5, 4, 2]} /> */}
                    {/* <Board_Row index={0} ele_perRow={3} /> */}
                    <Board_Grid ele_perRow={5} />
                </Box>
            </Flex>
        </>
    )
}
export default LastestRecommand