import React from "react";
import { API_IMG } from '../../../Config'
import { connect } from "react-redux";

const mapStateToProps = state => {
    return {
        localization: state.localization
    }
}

const CoverBlock = ({ localization, game_name, like_num, playCount, AuthorName, img }) => {
    const commonWords = localization.words.common;
    return <div className='cover-block'>
        <img src={`${API_IMG}?img_name=${img}`} />
        <div>{game_name}</div>
        <div>{`${playCount} ${commonWords.play} · ${like_num} ${commonWords.like}`}</div>
        <div>{AuthorName}</div>
    </div>
}

export default connect(mapStateToProps)(CoverBlock);