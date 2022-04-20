/* eslint-disable */

/**
 * @author Zhicheng Wang
 * @create date 2021-07-23 20:33:45
 * @modify date 2021-07-24 21:15:48
 */

import React, { useState, useEffect } from 'react'
import { Pagination } from 'antd'
import './LastestRecommand.scss'
import { API_RANK } from '../../Config'
import { getRecommendationList, getLatestList } from '../../service/lastestRecommand';
import CoverBlock from '../commonComponent/CoverBlock/CoverBlock';
import BlockGrid from '../commonComponent/BlockGrid/BlockGrid';

const API_RECOMM = API_RANK   //TODO: = `${DOMAIN}/v1/recommendation/zone`
const API_LATEST = API_RANK   //TODO: = `${DOMAIN}/v1/latest/zone`

function itemRender(current, type, originalElement) {
    if (type === 'prev') {
        return <a>Previous</a>;
    }
    if (type === 'next') {
        return <a>Next</a>;
    }
    return originalElement;
}

const LastestRecommand = () => {
    const [val_listContent, set_listContent] = useState([]);
    const [val_showOption, set_showOption] = useState(true);
    useEffect(
        () => {
            // TODO: change the fake service to the real one
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
            <div className="page-wrapper">
                <Pagination total={500} itemRender={itemRender} className="page" />
            </div>
        </div>
    )
}
export default LastestRecommand