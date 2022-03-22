/* eslint-disable */

/**
 * @author Huiying Hu
 * @create date 2021-07-23 20:33:26
 * @modify date 2021-09-24 11:31:34
 */

import React, { useState, useEffect } from 'react'
import { Image, Carousel, } from 'antd'
import { Flex, Box } from '@rebass/grid'
import { useHistory } from 'react-router-dom';
import { ForLoop } from '../helper_components/Helper.jsx'
import { homepageSpacing } from '../../data/constants/Spacing'
import './DisplayBoard.scss'
import request from 'umi-request';
import { API_RANK, API_IMG, API_RANK_DOWNLOAD } from '../../Config.js';


const rankLabels = ["Daily", "Weekly", "Monthly"];
const categoryLabels = ["Fanmade", "Real World", "Traditional"]
const aspectRatio = `${(9 * 100 / 16)}%` //"62.5%"

const DisplayBoard = (props) => {
    const { ContentWords, } = props
    const defaultWords = props.words
    const [rank, setRank] = useState(rankLabels[0])
    const [category, setCategory] = useState(categoryLabels[0])
    const [rankList, setRankList] = useState([])
    const [downloadList, setDownloadList] = useState([])
    const [imgUrl, setImgUrl] = useState("")
    const history = useHistory()

    useEffect(() => {
        const getRank = async () => {
            const result = await getRankService({
                zone: "test",
                num: 5,
            });
            setRankList(result.List);
        }
        getRank();

        const getDownload = async () => {
            const result = await getDownloadService({
                zone: "test",
                num: 10,
            });
            console.log(result.List)
            setDownloadList(result.List);
        }
        getDownload();
        setImgUrl(`${API_IMG}?img_name=1.jpg`);
    }, [])

    const getRankService = (params) => {
        return request(`${API_RANK}`, { params });
    }

    const getDownloadService = (params) => {
        return request(`${API_RANK_DOWNLOAD}`, { params });
    }

    const TopHalfSmallContent = ({ index = 1 }) => {
        return <ForLoop index={index} loopNum={1}

            LoopContent={() =>
                <div className="carousel-below-content">
                    <div style={{ backgroundColor: "#000", height: 0, paddingBottom: aspectRatio, overflow: "hidden" }}>
                        <img className='Home-Content-img' src={`${API_IMG}?img_name=${downloadList[index]?.img}`} onClick={() => { enterGame(downloadList[index]?.GID) }} />
                    </div>
                </div>}

            PackingContent={({ Output }) =>
                <div className={`carousel-below-packing ${index === 0 ? '' : 'has-top-padding'}`}>
                    {Output}
                </div>} />
    }

    const RankWords = ({ styles, words = defaultWords }) => {
        return (
            <Box {...styles}>
                <Flex>
                    <Box width={1}>
                        {words.game_name}
                    </Box>
                </Flex>
                <Flex>
                    <Box width={1}>
                        {words.DownloadNum} play · {words.like_num} like
                    </Box>
                </Flex>
                <Flex>
                    <Box width={1}>
                        {words.AuthorName}
                    </Box>
                </Flex>
            </Box>
        )
    }


    const RankContent = () => {
        return <ForLoop loopNum={5}

            LoopContent={({ index }) => {
                const first_top_margin = index === 0 ? homepageSpacing.top_margin : homepageSpacing.up_content_padding
                return (<Flex key={index} pt={[first_top_margin, first_top_margin, index === 0 ? '0px' : homepageSpacing.up_content_padding]} pl={homepageSpacing.up_left_padding} >
                    <Box width={0.5} >
                        <img className='Home-Rank-img' src={`${API_IMG}?img_name=${rankList[index]?.img}`} onClick={() => { enterGame(rankList[index]?.GID) }} />
                        {/* <Image className='Home-Rank-img' src={imgUrl} /> */}
                    </Box>
                    <RankWords styles={{ width: 0.5, pl: homepageSpacing.responsive_rank_words_padding, fontSize: "12px !important" }} words={rankList[index]} />
                </Flex>)
            }}

            PackingContent={({ Output }) =>
                <div id='rank-content'>
                    {Output}
                </div>} />
    }

    const CarouselContent = () => {
        const CAROUSEL_NUM = 4
        const numbers = [...Array(CAROUSEL_NUM).keys()]
        return <Carousel afterChange={onChange}>
            {numbers.map(i =>
                <div key={`carousel${i}`}>
                    <div style={{ backgroundColor: "#000", height: 0, paddingBottom: aspectRatio, overflow: "hidden" }}>
                        <img className='Home-Show-img' src={`${API_IMG}?img_name=${rankList[i]?.img}`} />
                        {/* onClick={() => { enterGame(rankList[i]?.GID) }} */}
                    </div>
                </div>)}
        </Carousel>
    }

    const RankButtons = () => {
        const Buttons = rankLabels.map(label => <button key={label} id='' className='rank-time-btn'
            onClick={() => setRank(label)} style={{ backgroundColor: (rank == label) ? '#DACEFF' : '#BDBBC5' }}>
            {label}
        </button>)
        return Buttons.map((button, index) =>
            <Box key={index} width={1 / 3} px={3}>
                {button}
            </Box>)
    }

    const CategoryButtons = () => {
        const Buttons = categoryLabels.map(label => <button key={label} id='' className='category-btn'
            onClick={() => setCategory(label)} style={{ backgroundColor: (category == label) ? '#DACEFF' : 'rgba(0, 0, 0, 0.05);' }}>
            {label}
        </button>)
        return (<div class="category-wrapper">
            {Buttons.map((button, index) =>
                <div key={index} class="category-btn-wrapper">
                    {button}
                </div>)}
        </div>)
    }

    const contentStyle = {
        height: '300px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
    };

    const onChange = (a, b, c) => {
        console.log(a, b, c);
    }


    const enterGame = (pid) => {
        history.push(`/gameDisplay?pid=${pid}`)
    }

    return (
        <>
            <CategoryButtons />
            <div class="display-board">
                <div class="daily-pick-container">
                    {/* <Flex className='section-heading'>
                        Daily Pick
                    </Flex> */}
                    <Flex className='text-center' flexWrap='wrap'>
                        <div className="daily-pick-wrapper">
                            <div className="caurousel-wrapper">
                                <CarouselContent />
                            </div>
                            {/* <TopHalfSmallContent /> */}
                        </div>
                        <Box className="small-content" width={[1, 0.25, 0.4]} pt={[homepageSpacing.up_content_padding, '0px', '0px', '0px']} >

                            <ForLoop loopNum={3} LoopContent={TopHalfSmallContent} />

                        </Box >

                    </Flex>
                </div>
                {/* rank section
                <Box width={0.2}>
                    <Flex mt={homepageSpacing.top_margin} id='rank-btns-left' >
                        <Box width={0.3} className='section-heading'>
                            Ranking
                        </Box>
                        <Box width={0.5} className='text-center'>
                            <Flex>
                                <RankButtons />
                            </Flex>
                        </Box>
                    </Flex>
                    <Box width={[1, 1, 0.2]} className='text-start' flex='1 1 auto'>
                        <RankContent />
                    </Box>
                    <Flex id='more-btn' mt={homepageSpacing.top_margin}>
                        <Box style={{ margin: '10px auto' }}>
                            <button className='more-btn'>More</button>
                        </Box>
                    </Flex>
                </Box> */}
                <div class="join-container">
                    <div class="join-wrapper" >
                        <img class="join-img" src="images/joinUs/background.png" />
                        <div class="join-btn-group">
                            <img class="join-logo" src="images/joinUs/logo.png" />
                            <button class="join-btn">Upload a Game</button>
                            <button class="join-btn">How to Video</button>
                        </div>
                    </div>
                    <img class="ad" src="images/joinUs/ad.png"></img>
                </div>

            </div>


        </>
    )


}

export default DisplayBoard