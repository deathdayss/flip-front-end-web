import React from 'react';
import { connect } from "react-redux";
import './RankUploader.scss';
import { mapLocalizationToProps } from '../../../../redux/helper/mapProps'

const RankUploader = ({localization, avatarUrl, uploaderName, subscribeCount}) => {
    const commonWords = localization.words.common;
    return <div className='rank-uploader-body'>
        <div className='uploader-avatar'><img src={avatarUrl} alt='invalid uploader avatar' /></div>
        <div className='uploader-name'>{uploaderName}</div>
        <div className='subscribe-count'>{`${subscribeCount} ${commonWords.subscribe}`}</div>
        <div className='subsribe-button'>{commonWords.subscribe}</div>
    </div>
}

export default connect(mapLocalizationToProps)(RankUploader)