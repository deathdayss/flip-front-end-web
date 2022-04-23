import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from '../../hooks/routeHooks';
import Header from '../header_components/Header';
import { connect } from "react-redux";
import { Pagination } from 'antd';
import { mapLocalizationToProps } from '../../redux/helper/mapProps'
import { getRecommendationList } from '../../service/lastestRecommand';
import CoverBlock from '../commonComponent/CoverBlock/CoverBlock';
import BlockGrid from '../commonComponent/BlockGrid/BlockGrid';
import { gameCategories } from './initData';
import './Category.scss';
import RadioButtons from "../commonComponent/RadioButtons/RadioButtons";

const Category = ({ localization }) => {
    const [categoryContentList, setCategoryContentList] = useState([]);
    const [selectedCateogry, setSelectedCateogry] = useState('');
    const history = useHistory();

    const onCheck = (key) => {
        setSelectedCateogry(key);
        history.push(`/category?category=${key}`);
    }

    useParams((routeParams) => {
        setSelectedCateogry(routeParams.category);
    });
    useEffect(() => {
        getRecommendationList().then((res) => setCategoryContentList(res));
    }, [])

    return <>
        <Header />
        <div className="category-container">
            <div className="category-radio-buttons-container">
                <RadioButtons keys={gameCategories}
                    keyLabelMap={localization.words.gameCategory}
                    checkedValue={selectedCateogry}
                    onCheck={onCheck}
                    uncheckedClass={'unchecked-category-radio-button'}
                />
                <div className="category-bottom-line" />
            </div>
            <div className="category-cover-content">
                <BlockGrid colNum={5} data={categoryContentList} dataToItem={(data) => <CoverBlock playCount={data.playCount}
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
            <div className="category-pagination-container">
                <Pagination className="category-pagination" total={500} />
            </div>
        </div>
    </>
}
export default connect(mapLocalizationToProps)(Category)
