import React, { useState, useEffect } from "react";
import './Search.scss'
import BlockGrid from '../commonComponent/BlockGrid/BlockGrid';
import Header from '../header_components/Header';
import CoverBlock from '../commonComponent/CoverBlock/CoverBlock';
import { getRecommendationList } from '../../service/lastestRecommand';

const Search = () => {
    const [filterConditions, setFilterConditions] = useState({
        rankMethod: 'all',
        category: 'all'
    });
    const [searchResults, setSearchResults] = useState([]);
    // TODO: change the fake service to the real one
    useEffect(() => {
        getRecommendationList().then((res) => setSearchResults(res));
    }, []);
    return <>
    {/* TODO: pass filter conditions to the header */}
        <Header rankMethod={filterConditions.rankMethod} category={filterConditions.rankMethod} /> 
        <div className="search-container">
            <div className="search-filter-container">

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
        </div>
    </>
}

export default Search;