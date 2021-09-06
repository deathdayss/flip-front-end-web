/**
 * @author Huiying Hu
 * @create date 2021-08-20 11:46:28
 * @modify date 2021-08-20 11:46:28
 */

import React, { Component, useEffect } from 'react'
import { Avatar } from 'antd';
import { Flex, Box } from '@rebass/grid'
import { useHistory } from 'react-router-dom';
import { ForLoop } from '../helper_components/Helper.jsx'
import { homepageSpacing, gameDisplaySpacing } from '../../data/constants/Spacing'
import Play from '../Test_Components/PlayComponent.jsx';
import './GameDisplay.scss'
import Header from '../header_components/Header.jsx'
import request from 'umi-request';

const API_RANK = "http://106.52.167.166:8084/v1/rank/zone"

const gameDetail = {
    creator: "Creator",
    title: "Title title title title title",
    play: "1000 plays",
    date: "2021-08-20 11:46:28",
    subscribers: "4513 subscribers",
    subscribe: "SUBSCRIBE",
    description: "A doc-style video to summarize early design and gameplay elements that were much more impressive compared to the final product. Infinite went through many revisions over the course of its development, Irrational Games had to scale back a lot of ideas, which was disappointing for a lot of people after the E3 showcases. Everything shown here has been removed or downgraded to the point where it's just not comparable. Self-explanatory quote from Ken Levine: \"we cut enough content to make 5-6 full games\". There's more in the official artbook if you're interrested.",
    comments: "2342 comments"
}

const btnInfos =
    [['images/header/like.svg', 25, '4']
        , ['images/header/header_collection_btn.svg', 25, '4']
        , ['images/header/forward.svg', 25, '4']
    ]

const Buttons = () => (btnInfos.map((btnInfo, index) =>
    <Box width={80}>
        <img src={btnInfo[0]} height={btnInfo[1]} width={btnInfo[1]} />
        <span>123</span>
    </Box>
))

const GameDisplay = (props) => {

    // useEffect(() => {
    //     const getRanking = async () => {
    //         const result = await getRankingService({
    //             zone: "test",
    //             num: 2,
    //         });
    //         console.log(result);
    //     }
    //     getRanking();
    // })

    const getRankingService = (params) => {
        return request(`${API_RANK}`, { params });
    }

    const RecommendContent = ({ index }) => {
        return <ForLoop index={index} loopNum={7}

            LoopContent={() =>
                <Box width={0.14} px={homepageSpacing.responsive_content_padding}>
                    <img className='Home-Content-img' src='fake_data/work_cover.jpg' />
                </Box>}

            PackingContent={({ Output }) =>
                <Flex pt={index === 0 ? '' : homepageSpacing.up_content_padding} flexWrap='wrap'>
                    {Output}
                </Flex>} />
    }

    return (
        <>
            <Header></Header>
            <Flex mx={[gameDisplaySpacing.main_margin_mobile, gameDisplaySpacing.main_margin]} mt={gameDisplaySpacing.top_margin}>
                <Box width={0.2}>
                    <Flex className="header-left">
                        <Box>
                            <a href="">

                                <Avatar src="images/header/header_avatar_btn.svg"></Avatar>

                            </a>
                        </Box>
                        <Box ml={gameDisplaySpacing.span_margin_left} className='creator'>
                            <span style={{ fontSize: '14px' }}>{gameDetail.creator}</span>
                            <button className="follow-btn">{gameDetail.subscribe}</button>
                        </Box>
                        <Box ml={gameDisplaySpacing.span_margin_left} className='subscribers'>
                            <span>{gameDetail.subscribers}</span>
                        </Box>
                    </Flex>
                </Box>
                <Box width={0.6} className="title">{gameDetail.title}</Box>
                <Box width={0.2} className="header-right">
                    <span>{gameDetail.play}</span>
                    <span style={{ marginLeft: gameDisplaySpacing.span_margin_left }}>{gameDetail.date}</span>
                </Box>
            </Flex>
            <Flex mx={[gameDisplaySpacing.main_margin_mobile, gameDisplaySpacing.main_margin]}>
                <Box width={1} className="game-frame">
                    <Play></Play>
                    {/* <img className="Home-Content-img" src="fake_data/work_cover.jpg" /> */}
                </Box>
            </Flex>
            <Flex mx={[gameDisplaySpacing.main_margin_mobile, gameDisplaySpacing.main_margin]} mt={gameDisplaySpacing.recommendation_margin_top}>
                <Box width={1}>
                    <ForLoop loopNum={1} LoopContent={RecommendContent} />
                </Box>
            </Flex>

            <Flex className="buttons" mx={[gameDisplaySpacing.main_margin_mobile, gameDisplaySpacing.main_margin]}>
                <Buttons></Buttons>
            </Flex>
            <Flex className='description' mx={[gameDisplaySpacing.main_margin_mobile, gameDisplaySpacing.main_margin]}>
                {gameDetail.description}
            </Flex>
            <Flex mx={[gameDisplaySpacing.main_margin_mobile, gameDisplaySpacing.main_margin]}>
                <Box width={1}>
                    {gameDetail.comments}
                </Box>
            </Flex>


        </>)
}

export default GameDisplay