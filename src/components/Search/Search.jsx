import { Pagination } from 'antd';
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from '../../hooks/routeHooks';
import { mapLocalizationToProps } from '../../redux/helper/mapProps';
import { getRecommendationList } from '../../service/lastestRecommand';
import BlockGrid from '../commonComponent/BlockGrid/BlockGrid';
import CoverBlock from '../commonComponent/CoverBlock/CoverBlock';
import Header from '../header_components/Header';
import { gameCategories, rankMethods } from "./initData";
import RadioButtons from '../commonComponent/RadioButtons/RadioButtons';
import './Search.scss';

const Search = ({ localization }) => {
    const [searchConditions, setSearchConditions] = useState({
        rankMethod: 'comprehensive',
        category: 'all'
    });
    const [searchResults, setSearchResults] = useState([]);

    useParams((routeParams) => {
        delete routeParams.words;
        setSearchConditions(routeParams);
    }, []);

    // TODO: change the fake service to the real one
    useEffect(() => {
        getRecommendationList().then((res) => setSearchResults(res));
    }, []);

    const handleRankMethod = (key) => {
        setSearchConditions({
            ...searchConditions,
            rankMethod: key,
        });
    }
    const handleGameCategory = (key) => {
        setSearchConditions({
            ...searchConditions,
            category: key,
        });
    }
    return <>
        <Header rankMethod={searchConditions.rankMethod} category={searchConditions.category} />
        <div className="search-container">
            <div className="search-filter-container">
                <div className="search-filter-rank-method">
                    <RadioButtons keys={rankMethods}
                        keyLabelMap={localization.words.search.rankMethod}
                        checkedValue={searchConditions.rankMethod}
                        onCheck={handleRankMethod}
                    />
                </div>
                <div className="search-filter-game-category">
                    <RadioButtons keys={gameCategories}
                        keyLabelMap={localization.words.gameCategory}
                        checkedValue={searchConditions.category}
                        onCheck={handleGameCategory}
                    />
                </div>
                <div className="search-filter-bottom-line" />
            </div>
            <div className="search-cover-container">
                <BlockGrid colNum={5} data={searchResults} dataToItem={(data) => <CoverBlock playCount={data.playCount}
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
            <div className="search-pagination-container">
                <Pagination className="search-pagination" total={500} />
            </div>
        </div>
    </>
}

export default connect(mapLocalizationToProps)(Search);