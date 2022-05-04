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
import request from 'umi-request';
import { useHistory } from 'react-router-dom';
import { API_SEARCH_GAME_NOTOKEN } from "../../Config";
import { API_SEARCH_GAME } from "../../Config";

const Search = ({ localization,location }) => {

    const history = useHistory();

    const [searchConditions, setSearchConditions] = useState({
        rankMethod: 'comprehensive',
        category: 'all'
    });
    const [searchResults, setSearchResults] = useState([]);
    
    useParams((routeParams) => {
        // delete routeParams.words;
        setSearchConditions(routeParams);
    });

    const get_params = () => {
        let currParams = {};
        currParams.words = new URLSearchParams(location.search).get("words");
        currParams.rankMethod = new URLSearchParams(location.search).get("rankMethod");
        currParams.category = new URLSearchParams(location.search).get("category");
        setSearchConditions(currParams);
    }

    const handle_search = () => {
        let response;
        if (localStorage.getItem('user')) {
            response = request(`${API_SEARCH_GAME}`, {
                method: "get",
                params: {
                    num: 1,
                    offset: 0,
                    keyword: new URLSearchParams(location.search).get("words"),
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
                    num: 1,
                    offset: 0,
                    keyword: new URLSearchParams(location.search).get("words"),
                    method: 'like',
                    //TODO: Adjust method to prototype add zone

                },
            });
        }
        response.then((res) => { setSearchResults(res.List) }).catch(err => console.log(err.message));
    }


    useEffect(()=>{handle_search()}, []); 

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
                <BlockGrid colNum={5} data={searchResults} dataToItem={(data) => <CoverBlock playCount={data.DownloadNum}
                    onClick={()=>{history.push('/gameDisplay?pid=1')}}
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
                <Pagination className="search-pagination" total={10} />
            </div>
        </div>
    </>
}

export default connect(mapLocalizationToProps)(Search);