import React from 'react';
import { connect } from "react-redux";
import './RankBlock.scss';
import { mapLocalizationToProps } from '../../../../redux/helper/mapProps' 

const RankBlock = ({ localization, imgUrl, clickUrl, title, playCount, likeCount, uploaderName }) => {
    const commonWords = localization.words.common;
    return <div className='rank-block-body' onClick={() => console.log('jump to the rank block', clickUrl)}>
        <img className='rank-block-cover-img' src={imgUrl} alt='broken img' />
        <div className='rank-block-introduction'>
            <div>{title}</div>
            <div>{`${playCount} ${commonWords.play} · ${likeCount} ${commonWords.like}`}</div>
            <div>{uploaderName}</div>
        </div>
    </div>
}

export default connect(mapLocalizationToProps)(RankBlock)