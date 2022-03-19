/* eslint-disable */

/**
 * @author Zhicheng Wang
 * @create date 2021-07-23 20:33:45
 * @modify date 2021-07-24 21:15:48
 */

import React, { useState, useEffect } from 'react'
import './LastestRecommand.scss'
import { API_RANK, API_IMG } from '../../Config'
import { getRecommendationList, getLatestList } from '../../service/lastestRecommand';

const API_RECOMM = API_RANK   //TODO: = `${DOMAIN}/v1/recommendation/zone`
const API_LATEST = API_RANK   //TODO: = `${DOMAIN}/v1/latest/zone`

const CoverBlock = ({ game_name, like_num, playCount, AuthorName, img }) => {
    return <div className='cover-block'>
        <img src={`${API_IMG}?img_name=${img}`} />
        <div>{game_name}</div>
        <div>{`${playCount} played · ${like_num} liked`}</div>
        <div>{AuthorName}</div>
    </div>
}

const BlockGrid = ({ colNum, data, dataToItem, itemClass, rowClass, gridClass, idProperty }) => {
    if (!data || data.length === 0) {
        return null;
    }
    let rowArray = []
    let gridArray = []
    let nextRowKey = idProperty ? data[0].GID : 0
    for (let i = 0; i < data.length; ++i) {
        rowArray.push(
            <div key={idProperty ? data[i][idProperty] : i} className={itemClass}>
                {dataToItem(data[i])}
            </div>)
        if (rowArray.length === colNum) {
            gridArray.push(
                <div key={nextRowKey} className={rowClass}>
                    {rowArray}
                </div>
            )
            rowArray = []
            if (i + 1 < data.length) {
                nextRowKey = idProperty ? data[i + 1][idProperty] : i + 1
            }
        }
    }
    if (rowArray.length > 0 && rowArray.length < colNum) {
        for (let i = rowArray.length; i < colNum; ++i) {
            rowArray.push(
                <div key={i} className={itemClass}></div>
            )
        }
        gridArray.push(
            <div key={nextRowKey} className={rowClass}>
                {rowArray}
            </div>
        )
    }
    return <div className={gridClass}>
        {gridArray}
    </div>
}

const LastestRecommand = () => {
    const [val_listContent, set_listContent] = useState([]);
    const [val_showOption, set_showOption] = useState(true);
    useEffect(
        () => {
            if (val_showOption) {
                getRecommendationList().then(res => {
                    set_listContent(res)
                })
            }
            else {
                getLatestList().then(res => set_listContent(res))
            }
        }, []);
        
    return (
        <div className='section-recommendation-latest'>
            <div className='recommendation-latest-title'>
                Recommendation | Latest
            </div>
            <BlockGrid colNum={5} data={val_listContent} dataToItem={(data) => <CoverBlock playCount={data.playCount}
                AuthorName={data.AuthorName}
                img={data.img}
                like_num={data.like_num}
                game_name={data.game_name} />}
                idProperty='GID'
                gridClass='cover-block-grid'
                rowClass='cover-block-row'
                itemClass='cover-block-item'
            />
        </div>
    )
}
export default LastestRecommand