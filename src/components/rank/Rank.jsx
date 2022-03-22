import React, { useState, useEffect } from 'react'
import { Flex, Box } from '@rebass/grid'
import { connect } from "react-redux";
import { homepageSpacing } from '../../data/constants/Spacing'
import Header from '../header_components/Header'
import { ForLoop } from '../helper_components/Helper.jsx'
import { API_IMG, API_RANK } from '../../Config.js';
import request from 'umi-request';
import './Rank.scss'

const rankLabels = ["Daily", "Weekly", "Monthly"];

const mapStateToProps = state => {
    return {
        localization: state.localization,
    }
}

const Rank = (props) => {
    const [rank, setRank] = useState(rankLabels[0])
    const [rankList, setRankList] = useState([])
    const defaultWords = props.localization.words.homepage.contentWords;

    useEffect(() => {
        const getRank = async () => {
            const result = await getRankService({
                zone: "test",
                num: 5,
            });
            setRankList(result.List);
        }
        getRank();
    }, [])

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

    const getRankService = (params) => {
        return request(`${API_RANK}`, { params });
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



    return (<>
        <Header />
        {/* rank section */}
        <div class="rank-container">
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
            {/* <Box width={[1, 1, 0.2]} className='text-start' flex='1 1 auto'>
            <RankContent />
        </Box> */}
            <div >
                <RankContent></RankContent>
            </div>

            <Flex id='more-btn' mt={homepageSpacing.top_margin}>
                <Box style={{ margin: '10px auto' }}>
                    <button className='more-btn'>More</button>
                </Box>
            </Flex>
        </div>
    </>)
}

export default connect(mapStateToProps)(Rank)