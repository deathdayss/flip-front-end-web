/**
 * @author Huiying Hu
 * @create date 2021-08-20 11:46:28
 * @modify date 2021-08-20 11:46:28
 */

import React, { Component } from 'react'
import { Avatar } from 'antd';
import { Flex, Box } from '@rebass/grid'
import { useHistory } from 'react-router-dom';
import { ForLoop } from '../helper_components/Helper.jsx'
import { homepageSpacing, gameDisplaySpacing } from '../../data/constants/Spacing'
import Play from '../Test_Components/PlayComponent.jsx';
import './GameDisplay.scss'

const gameDetail = {
    name: "Uploader's name",
    title: "Title title title title title",
    play: "1000 plays",
    date: "2021-08-20 11:46:28",
    subscribers: "4513 subscribers",
    subscribe: "SUBSCRIBE",
    description: "A doc-style video to summarize early design and gameplay elements that were much more impressive compared to the final product. Infinite went through many revisions over the course of its development, Irrational Games had to scale back a lot of ideas, which was disappointing for a lot of people after the E3 showcases. Everything shown here has been removed or downgraded to the point where it's just not comparable. Self-explanatory quote from Ken Levine: \"we cut enough content to make 5-6 full games\". There's more in the official artbook if you're interrested."



}

const GameDisplay = (props) => {

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
            <Flex mx={[gameDisplaySpacing.main_margin_mobile, gameDisplaySpacing.main_margin]} mt={gameDisplaySpacing.top_margin}>
                <Box width={0.2}>
                    <Flex className="header-left">
                        <Box>
                            <a>
                                <Avatar src="images/header/header_avatar_btn.svg"></Avatar>
                            </a>
                        </Box>
                        <Box ml={gameDisplaySpacing.span_margin_left} width="95px">
                            {gameDetail.name}
                            <button className="follow-btn">{gameDetail.subscribe}</button>
                        </Box>
                        <Box ml={gameDisplaySpacing.span_margin_left} minWidth="100px">
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
                <Play></Play>
                {/* <img className="Home-Content-img" src="fake_data/work_cover.jpg" /> */}
            </Flex>
            <Flex mx={[gameDisplaySpacing.main_margin_mobile, gameDisplaySpacing.main_margin]} mt={gameDisplaySpacing.recommendation_margin_top}>
                <Box width={1}>
                    <ForLoop loopNum={1} LoopContent={RecommendContent} />
                </Box>
            </Flex>
            <Flex className='description' mx={[gameDisplaySpacing.main_margin_mobile, gameDisplaySpacing.main_margin]} my={gameDisplaySpacing.recommendation_margin_top}>
                {gameDetail.description}
            </Flex>

        </>)
}

export default GameDisplay