import React, { useState, useEffect } from 'react'
import { Flex, Box } from '@rebass/grid'
import { connect } from "react-redux";
import { homepageSpacing } from '../../data/constants/Spacing'
import Header from '../header_components/Header'
import { ForLoop } from '../helper_components/Helper.jsx'
import { API_IMG } from '../../Config.js';
import { getRankList } from '../../service/Rank'
import RankWrapper from './component/RankWrapper/RankWrapper';
import RankUploader from './component/RankUploader/RankUploader';
import RankBlock from './component/RankBlock/RankBlock';
import './Rank.scss'

const rankLabels = ["Daily", "Weekly", "Monthly"];

const mapStateToProps = state => {
    return {
        localization: state.localization,
    }
}

const getColorByIndex = (index) => {
    switch (index) {
        case 0:
            return '#FF3C3C';
        case 1:
            return '#FF6D3A';
        case 2:
            return '#FF973A';
        default:
            return '#626262';
    }
}

const RankButtons = () => {
    const [rank, setRank] = useState(rankLabels[0])
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
    const [rankList, setRankList] = useState([])

    useEffect(() => {
        const getRank = async () => {
            const result = await getRankList({
                zone: "test",
                num: 5,
            });
            setRankList(result.List);
        }
        getRank();
    }, [])

    return <div className='rank-content-container'>
        <div className='rank-block-container'>
            {rankList.map((dataObj, index) => <RankWrapper
                key={dataObj.GID}
                rankNumber={index + 1}
                rankColor={getColorByIndex(index)}
                rankBody={<RankBlock imgUrl={`${API_IMG}?img_name=${dataObj.img}`}
                    title={dataObj.game_name}
                    // TODO: playCount={}
                    likeCount={dataObj.like_num}
                    uploaderName={dataObj.AuthorName}
                />}
            />)}
        </div>
        <div className='break-line' />
        {/* TODO: need uploader interface from the backend */}
        <div className='rank-uploader-container'>
            <div className='align-right-float'>
            </div>
        </div>
    </div>
}

const Rank = (props) => {

    return (<>
        <Header />
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
            <div >
                <RankContent />
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