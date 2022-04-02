import React from "react";
import './RankWrapper.scss';

const RankWrapper = ({ rankNumber, rankBody, rankColor = '#626262' }) => {
    return <div className='rank-content-container'>
        <div className='rank-number' style={{
            color: rankColor
        }}>
            {rankNumber}
        </div>
        {rankBody}
    </div>
}

export default RankWrapper;