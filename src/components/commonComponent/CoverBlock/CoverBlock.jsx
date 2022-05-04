import React from "react";
import { API_IMG } from '../../../Config'
import { connect } from "react-redux";
import { mapLocalizationToProps } from '../../../redux/helper/mapProps'
import { Link } from 'react-router-dom';
import './CoverBlock.scss'

const CoverBlock = ({ localization, gameName, likeCount, playCount, AuthorName, img, publishDate, linkPath, onClick }) => {
    const commonWords = localization.words.common;
    const coverBlockContent =
        <div onClick = {onClick} className='cover-block'>
            <img src={`${API_IMG}?img_name=${img}`} />
            <div>{gameName}</div>
            <div>{`${playCount} ${commonWords.play} · ${likeCount} ${commonWords.like}`}</div>
            <div>{AuthorName ? AuthorName : publishDate}</div>
        </div>
    return linkPath ? <Link>{coverBlockContent}</Link> : coverBlockContent
}

export default connect(mapLocalizationToProps)(CoverBlock);