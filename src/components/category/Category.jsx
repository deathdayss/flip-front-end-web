import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import './Category.scss';
import CategoryButtons from "./components/CategoryButtons/CategoryButtons";
import BlockGrid from '../commonComponent/BlockGrid/BlockGrid';
import CoverBlock from '../commonComponent/CoverBlock/CoverBlock';

const Category = () => {
    const { search } = useLocation();
    useEffect(() => {

    }, [])
    return (<>
        <CategoryButtons />
        <div className="search-cover-container">
            {/* <BlockGrid colNum={5} data={searchResults} dataToItem={(data) => <CoverBlock playCount={data.playCount}
                    AuthorName={data.AuthorName}
                    img={data.img}
                    like_num={data.like_num}
                    game_name={data.game_name} />}
                    idProperty='GID'
                    gridClass='cover-block-grid'
                    rowClass='cover-block-row'
                    itemClass='cover-block-item'
                /> */}
        </div>
    </>)
}

export default Category;