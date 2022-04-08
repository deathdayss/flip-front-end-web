import React, { useState, useEffect } from 'react'
import { Avatar, } from 'antd'
import "./PersonalPage.scss"
import Header from '../header_components/Header.jsx'
import RankWrapper from '../rank/component/RankWrapper/RankWrapper';
import RankBlock from '../rank/component/RankBlock/RankBlock';
import { getRankList } from '../../service/Rank'
import { API_IMG } from '../../Config.js';


const gameDetail = {
    creator: "Creator",
    title: "Title title title title title",
    play: "1000 plays",
    date: "2021-08-20 11:46:28",
    subscribers: "4513 subscribers",
    subscribe: "SUBSCRIBE",
    description: "A doc-style video to summarize early design and gameplay elements that were much more impressive compared to the final product. Infinite went through many revisions over the course of its development, Irrational Games had to scale back a lot of ideas, which was disappointing for a lot of people after the E3 showcases. Everything shown here has been removed or downgraded to the point where it's just not comparable. Self-explanatory quote from Ken Levine: \"we cut enough content to make 5-6 full games\". There's more in the official artbook if you're interrested.",
    comments: "2342 comments"
}

const menuLabels = ["HOME", "GAMES", "POSTS", "FOLLOWING", "SETTINGS"]

const CoverBlock = ({ game_name, like_num, playCount, AuthorName, img }) => {
    return <div className='cover-block'>
        <img src={`${API_IMG}?img_name=${img}`} />
        <div>{game_name}</div>
        <div>{`${playCount} played · ${like_num} liked`}</div>
        <div>{AuthorName}</div>
    </div>
}

const PersonalPage = (props) => {
    const [rankList, setRankList] = useState([])
    useEffect(() => {
        const getRank = async () => {
            const result = await getRankList({
                zone: "test",
                num: 5,
            });
            setRankList(result.List);
        }
        getRank();
    }, [])

    return (
        <>
            <Header></Header>
            <div className="personal-page-container">
                <div className="header">
                    <div className="creator">
                        <div>
                            <a href="">
                                <Avatar size={48} src="images/header/header_avatar_btn.svg"></Avatar>
                            </a>
                        </div>
                        <div className="creator-right">
                            <span style={{ fontSize: '18px', display: "block" }}>{gameDetail.creator}</span>
                            <span>{gameDetail.subscribers}</span>
                        </div>
                    </div>
                    <div className="menu">
                        {menuLabels.map(label => (<div className='menu-tab'>{label}</div>))}
                    </div>
                </div>
                <div className='content'>
                    <div className='pinned-game'>
                        {rankList.slice(0, 1).map((data, index) =>
                            <div className='pinned-game-wrapper'>
                                <CoverBlock playCount={data.playCount}
                                    AuthorName={data.AuthorName}
                                    img={data.img}
                                    like_num={data.like_num}
                                    game_name={data.game_name} />
                            </div>
                        )}
                    </div>

                    <div className='works'>
                        <div>
                            <span className='works-header'>Games</span>
                            <a>View All</a>
                        </div>
                        <div className='cover-block-row'>
                            {rankList.map((data, index) =>
                                <div className='cover-block-item'>
                                    <CoverBlock playCount={data.playCount}
                                        AuthorName={data.AuthorName}
                                        img={data.img}
                                        like_num={data.like_num}
                                        game_name={data.game_name} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PersonalPage