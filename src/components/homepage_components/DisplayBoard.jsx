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
const aspectRatio = `${(9 * 100 / 16)}%` //"62.5%"

const DisplayBoard = (props) => {
    const { ContentWords, } = props
    const defaultWords = props.words
    const [rank, setRank] = useState("Daily")
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
        return <ForLoop index={index} loopNum={2}

            LoopContent={() =>
                <Box width={0.5} px={homepageSpacing.responsive_content_padding}>
                    <div style={{ backgroundColor: "#000", height: 0, paddingBottom: aspectRatio, overflow: "hidden" }}>
                        <img className='Home-Content-img' src={`${API_IMG}?img_name=${downloadList[index]?.img}`} onClick={() => { enterGame(downloadList[index]?.GID) }} />
                    </div>
                </Box>}

            PackingContent={({ Output }) =>
                <Flex pt={index === 0 ? '' : homepageSpacing.up_content_padding} flexWrap='wrap'>
                    {Output}
                </Flex>} />
    }

    const RankWords = ({ styles, words = defaultWords }) => {
        const Content = []
        // console.log(words)

        Content.push(
            <>
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
            </>);
        return (
            <Box {...styles}>
                {Content}
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
                    </div>
                </div>)}
        </Carousel>
    }

    const Buttons = () => {
        const Buttons = rankLabels.map(label => <button id='' className='rank-time-btn'
            onClick={() => setRank(label)} style={{ backgroundColor: (rank == label) ? '#DACEFF' : '#BDBBC5' }}>
            {label}
        </button>)
        return Buttons.map(button =>
            <Box width={1 / 3} px={3}>
                {button}
            </Box>)
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
            <Flex mx={[homepageSpacing.main_margin_mobile, homepageSpacing.main_margin]}>
                <Box width={0.8}>
                    <Flex mt={homepageSpacing.top_margin} className='section-heading'>
                        Daily Pick
                    </Flex>
                    <Flex mt={homepageSpacing.top_margin} className='text-center' flexWrap='wrap'>
                        <Box width={[1, 0.5, 0.4]} >
                            <Flex>
                                <Box width={1} px={homepageSpacing.responsive_show_padding}>
                                    {/* <Carousel afterChange={onChange}>
                                        <div>
                                            <img className='Home-Show-img' src={imgUrl} />
                                        </div>
                                        <div>
                                            <img className='Home-Show-img' src='fake_data/advertise.png' />
                                        </div>
                                        <div>
                                            <img className='Home-Show-img' src={imgUrl} />
                                        </div>
                                        <div>
                                            <img className='Home-Show-img' src={imgUrl} />
                                        </div>
                                    </Carousel> */}
                                    <CarouselContent />

                                </Box>
                            </Flex>
                            <TopHalfSmallContent />
                        </Box>
                        <Box width={[1, 0.5, 0.4]} pt={[homepageSpacing.up_content_padding, '0px', '0px', '0px']} >
                            <ForLoop loopNum={3} LoopContent={TopHalfSmallContent} />
                        </Box >

                    </Flex>
                </Box>
                <Box width={0.2}>
                    {/* <Flex mt={homepageSpacing.top_margin}>
                             Ranking
                         </Flex> */}
                    <Flex mt={homepageSpacing.top_margin} id='rank-btns-left' >
                        <Box width={0.3} className='section-heading'>
                            Ranking
                        </Box>
                        <Box width={0.5} className='text-center'>
                            <Flex>
                                <Buttons />
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
                </Box>
            </Flex>


        </>
    )


}

export default DisplayBoard