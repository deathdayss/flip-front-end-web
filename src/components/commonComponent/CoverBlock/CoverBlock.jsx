import React from "react";
import { API_IMG } from '../../../Config'
import { connect } from "react-redux";
import { mapLocalizationToProps } from '../../../redux/helper/mapProps'

const CoverBlock = ({ localization, gameName, likeCount, playCount, AuthorName, img, publishDate }) => {
    const commonWords = localization.words.common;
    return <div className='cover-block'>
        <img src={`${API_IMG}?img_name=${img}`} />
        <div>{gameName}</div>
        <div>{`${playCount} ${commonWords.play} · ${likeCount} ${commonWords.like}`}</div>
        <div>{AuthorName ? AuthorName : publishDate}</div>
    </div>
}

export default connect(mapLocalizationToProps)(CoverBlock);