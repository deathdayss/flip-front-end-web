import React, { useState, useEffect } from 'react'
import { Avatar } from 'antd';
import { Flex, Box } from '@rebass/grid'
import { connect } from "react-redux";
import { homepageSpacing } from '../../data/constants/Spacing'
import Header from '../header_components/Header'
import { ForLoop } from '../helper_components/Helper.jsx'
import { API_IMG } from '../../Config.js';
import { getRankList, getAuthorList } from '../../service/Rank'
import RankWrapper from './component/RankWrapper/RankWrapper';
import RankUploader from './component/RankUploader/RankUploader';
import RankBlock from './component/RankBlock/RankBlock';
import './Rank.scss'
import { mapLocalizationToProps } from '../../redux/helper/mapProps'

const rankLabels = ["Daily", "Weekly", "Monthly"];

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
        <div key={index} className='time-btn-wrapper'>
            {button}
        </div>)
}

const RankContent = () => {
    const [rankList, setRankList] = useState([])
    const [authorList, setAuthorList] = useState([])

    useEffect(() => {
        const getRank = async () => {
            const result = await getRankList({
                zone: "test",
                num: 5,
            });
            setRankList(result.List);
        }
        getRank();
        const getAuthor = async () => {
            const result = await getAuthorList({
                zone: "test",
                num: 1,
            });
            console.log(result.List);
            setAuthorList(result.List);
        }
        getAuthor();

    }, [])

    return <div className='rank-content-container'>
        <div className='rank-block-container'>
            {rankList.map((dataObj, index) => <RankWrapper
                key={dataObj.GID}
                rankNumber={index + 1}
                rankColor={getColorByIndex(index)}
                rankBody={<RankBlock imgUrl={`${API_IMG}?img_name=${dataObj.img}`}
                    title={dataObj.game_name}
                    playCount={dataObj.DownloadNum}
                    likeCount={dataObj.like_num}
                    uploaderName={dataObj.AuthorName}
                />}
            />)}
        </div>
        <div className='break-line' />
        {/* TODO: need uploader interface from the backend */}
        <div className='rank-uploader-container'>
            <div className='rank-uploader-content'>
                {rankList.map((dataObj, index) => <RankWrapper
                    key={dataObj.GID}
                    rankNumber={index + 1}
                    rankColor={getColorByIndex(index)}
                    rankBody={<UploaderItem
                    />}

                />)}
            </div>
        </div>
    </div>
}

const UploaderItem = () => {
    return <div className='uploader-item-wrapper'>
        <div>
            <a href="">
                <Avatar size={36} src="images/header/header_avatar_btn.svg"></Avatar>
            </a>
        </div>
        <div>Creator</div>
        <div>451 follow</div>
        <div><button className='follow-btn'>subscribe</button></div>
    </div>
}

const Rank = (props) => {

    return (<>
        <Header />
        <div className="rank-container">
            <div className='time-btns'>
                <RankButtons />
            </div>
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

export default connect(mapLocalizationToProps)(Rank)