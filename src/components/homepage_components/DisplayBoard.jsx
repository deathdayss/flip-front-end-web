/**
 * @author Zhicheng Wang
 * @create date 2021-07-23 20:33:26
 * @modify date 2021-07-24 21:15:44
 */

import React, { useState, useEffect } from 'react'
import { Image, Carousel } from 'antd'
import { Flex, Box } from '@rebass/grid'
import { useHistory } from 'react-router-dom';
import { ForLoop } from '../helper_components/Helper.jsx'
import { homepageSpacing } from '../../data/constants/Spacing'
import './DisplayBoard.scss'
import request from 'umi-request';

const DOMAIN = "http://106.52.167.166:8084"
const API_RANK = `${DOMAIN}/v1/rank/zone`
const API_IMG = `${DOMAIN}/v1/download/img`
// const RANK_PICTURE = `https://${DOMAIN}/static/public/rank_picture/`;
// const IMG_URL = "https://flip.com/static/public/rank_picture/35b8314884294aacb76bcad057c7c4e7.jpeg"

const rankLabels = ["Daily", "Weekly", "Monthly"];

const DisplayBoard = (props) => {
    const { ContentWords, } = props
    const defaultWords = props.words
    const [rank, setRank] = useState("Daily")
    const [rankList, setRankList] = useState([])
    const [imgUrl, setImgUrl] = useState("")
    const history = useHistory()

    useEffect(() => {
        const getRank = async () => {
            const result = await getRankService({
                zone: "test",
                num: 5,
            });
            console.log(result.List);
            setRankList(result.List);
        }

        getRank();
        setImgUrl(`${API_IMG}?img_name=1.jpg`);
    }, [])

    const getRankService = (params) => {
        return request(`${API_RANK}`, { params });
    }

    const getImgService = (params) => {
        return request(`${API_IMG}`, { params });
    }

    const TopHalfSmallContent = ({ index }) => {
        return <ForLoop index={index} loopNum={2}

            LoopContent={() =>
                <Box width={0.5} px={homepageSpacing.responsive_content_padding}>
                    <img className='Home-Content-img' src='fake_data/work_cover.jpg' onClick={enterGame} />
                </Box>}

            PackingContent={({ Output }) =>
                <Flex pt={index === 0 ? '' : homepageSpacing.up_content_padding} flexWrap='wrap'>
                    {Output}
                </Flex>} />
    }

    const RankWords = ({ styles, words = defaultWords }) => {
        const Content = []
        console.log(words)

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
                        <img className='Home-Rank-img' src={`${API_IMG}?img_name=${rankList[index]?.img}`} />
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


    const enterGame = () => {
        history.push('/gameDisplay')
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
                                    <Carousel afterChange={onChange}>
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
                                    </Carousel>
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
                        <Box width={0.2} className='section-heading'>
                            Ranking
                        </Box>
                        <Box width={0.7} className='text-center'>
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