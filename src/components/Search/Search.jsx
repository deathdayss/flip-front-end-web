import React, { useState, useEffect } from "react";
import { useParams } from '../../hooks/routeHooks';
import './Search.scss'
import BlockGrid from '../commonComponent/BlockGrid/BlockGrid';
import Header from '../header_components/Header';
import CoverBlock from '../commonComponent/CoverBlock/CoverBlock';
import { rankMethods, gameCategories } from "./initData";
import { connect } from "react-redux";
import { mapLocalizationToProps } from '../../redux/helper/mapProps'
import { getRecommendationList } from '../../service/lastestRecommand';
import { Pagination } from 'antd'
import request from 'umi-request';
import { API_SEARCH_GAME_NOTOKEN } from "../../Config";
import { API_SEARCH_GAME } from "../../Config";

const Search = (props) => {
    const filterLabels = props.localization.words.search.filter;
    const gameCategoryLabels = props.localization.words.gameCategory;
    const [searchConditions, setSearchConditions] = useState({
        rankMethod: 'comprehensive',
        category: 'all'
    });
    const [searchResults, setSearchResults] = useState([]);
    
    useParams((routeParams) => {
        // delete routeParams.words;
        setSearchConditions(routeParams);
        console.log(searchConditions);
    });

    const get_params = () => {
        let currParams = {};
        currParams.words = new URLSearchParams(props.location.search).get("words");
        currParams.rankMethod = new URLSearchParams(props.location.search).get("rankMethod");
        currParams.category = new URLSearchParams(props.location.search).get("category");
        setSearchConditions(currParams);
    }

    const handle_search = () => {
        let response;
        if (localStorage.getItem('user')) {
            response = request(`${API_SEARCH_GAME}`, {
                method: "get",
                params: {
                    num: 10,
                    offset: 0,
                    keyword: new URLSearchParams(props.location.search).get("words"),
                    method: 'like',
                    //TODO: Adjust method to prototype add zone

                },
                headers:{
                    token: JSON.parse(localStorage.getItem('user')).token
                }
            });
        } else {
            response = request(`${API_SEARCH_GAME_NOTOKEN}`, {
                method: "get",
                params: {
                    num: 10,
                    offset: 0,
                    keyword: new URLSearchParams(props.location.search).get("words"),
                    method: 'like',
                    zone: 'test'
                    //TODO: Adjust method to prototype add zone

                },
            });
        }
        response.then((res) => { setSearchResults(res.List) }).catch(err => console.log(err.message));
    }


    useEffect(()=>{handle_search()}, []); 

    const handleRankMethod = (value) => {
        setSearchConditions({
            ...searchConditions,
            rankMethod: value,
        });
    }
    const handleGameCategory = (value) => {
        setSearchConditions({
            ...searchConditions,
            category: value,
        });
    }
    return <>
        <Header rankMethod={searchConditions.rankMethod} category={searchConditions.category} />
        <div className="search-container">
            <div className="search-filter-container">
                <div className="search-filter-rank-method">
                    {rankMethods.map(filterKey => <div key={filterKey}
                        className={'rank-method ' + (filterKey === searchConditions.rankMethod ? 'checked-rank-method' : 'unchecked-rank-method')}
                        onClick={() => handleRankMethod(filterKey)}
                    >
                        {filterLabels[filterKey]}
                    </div>)}
                </div>
                <div className="search-filter-game-category">
                    {gameCategories.map(categoryKey => <div key={categoryKey}
                        className={'game-category ' + (categoryKey === searchConditions.category ? 'checked-game-category' : 'unchecked-game-category')}
                        onClick={() => handleGameCategory(categoryKey)}
                    >
                        {gameCategoryLabels[categoryKey]}
                    </div>)}
                </div>
                <div className="search-filter-bottom-line" />
            </div>
            <div className="search-cover-container">
                <BlockGrid colNum={5} data={searchResults} dataToItem={(data) => <CoverBlock playCount={data.DownloadNum}
                    AuthorName={data.AuthorName}
                    img={data.img}
                    likeCount={data.like_num}
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

export default connect(mapLocalizationToProps)(Search)