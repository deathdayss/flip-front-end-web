import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
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

const Category = (props) => {
    const gameCategoryLabels = props.localization.words.gameCategory;
    const [categoryContentList, setCategoryContentList] = useState([]);
    const [selectedCateogry, setSelectedCateogry] = useState('');
    const { search } = useLocation();

    useParams((routeParams) => {
        setSelectedCateogry(routeParams.category);
    }, [search]);
    useEffect(() => {
        getRecommendationList().then((res) => setCategoryContentList(res));
    }, [])

    return <>
        <Header />
        <div className="category-container">
            <div className="category-choices">
                {gameCategories.map(categoryKey =>
                    <Link key={categoryKey} to={`/category?category=${categoryKey}`}>
                        <div className={'game-category-choice ' + (categoryKey === selectedCateogry ? 'checked-game-category-choice' : 'unchecked-game-category-choice')}>
                            {gameCategoryLabels[categoryKey]}
                        </div>
                    </Link>)}
            </div>
            <div className="category-bottom-line-container">
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
