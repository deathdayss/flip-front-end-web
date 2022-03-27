/* eslint-disable */

/**
 * @author Huiying Hu
 * @create date 2021-07-23 20:33:26
 * @modify date 2021-09-24 11:31:34
 */

import React, { useState, useEffect } from 'react'
import { Image, Carousel, } from 'antd'
import { Flex, Box } from '@rebass/grid'
import { useHistory } from 'react-router-dom'
import { ForLoop } from '../helper_components/Helper.jsx'
import { homepageSpacing } from '../../data/constants/Spacing'
import './DisplayBoard.scss'
import request from 'umi-request';
import { API_RANK, API_IMG, API_RANK_DOWNLOAD } from '../../Config.js'


const categoryLabels = ["Fanmade", "Real World", "Traditional"]
const aspectRatio = `${(9 * 100 / 16)}%` //"62.5%"

const DisplayBoard = () => {
    const [rankList, setRankList] = useState([])
    const [category, setCategory] = useState(categoryLabels[0])
    const [downloadList, setDownloadList] = useState([])
    const [imgUrl, setImgUrl] = useState("")
    const history = useHistory()

    useEffect(() => {
        const getRank = async () => {
            const result = await getRankService({
                zone: "test",
                num: 5,
            });
            setRankList(result.List);
        }
        getRank();


        const getDownload = async () => {
            const result = await getDownloadService({
                zone: "test",
                num: 10,
            });
            console.log(result.List)
            setDownloadList(result.List);
        }
        getDownload();
        setImgUrl(`${API_IMG}?img_name=1.jpg`);
    }, [])

    const getRankService = (params) => {
        return request(`${API_RANK}`, { params });
    }

    const getDownloadService = (params) => {
        return request(`${API_RANK_DOWNLOAD}`, { params });
    }

    const TopHalfSmallContent = ({ index = 1 }) => {
        return <ForLoop index={index} loopNum={1}

            LoopContent={() =>
                <div className="carousel-below-content">
                    <div style={{ backgroundColor: "#000", height: 0, paddingBottom: aspectRatio, overflow: "hidden" }}>
                        <img className='Home-Content-img' src={`${API_IMG}?img_name=${downloadList[index]?.img}`} onClick={() => { enterGame(downloadList[index]?.GID) }} />
                    </div>
                </div>}

            PackingContent={({ Output }) =>
                <div className={`carousel-below-packing ${index === 0 ? '' : 'has-top-padding'}`}>
                    {Output}
                </div>} />
    }




    const CarouselContent = () => {
        const CAROUSEL_NUM = 4
        const numbers = [...Array(CAROUSEL_NUM).keys()]
        return <Carousel afterChange={onChange}>
            {numbers.map(i =>
                <div key={`carousel${i}`}>
                    <div style={{ backgroundColor: "#000", height: 0, paddingBottom: aspectRatio, overflow: "hidden" }}>
                        <img className='Home-Show-img' src={`${API_IMG}?img_name=${rankList[i]?.img}`} />
                        {/* onClick={() => { enterGame(rankList[i]?.GID) }} */}
                    </div>
                </div>)}
        </Carousel>
    }

    const CategoryButtons = () => {
        const Buttons = categoryLabels.map(label => <button key={label} id='' className='category-btn'
            onClick={() => setCategory(label)} style={{ backgroundColor: (category == label) ? '#DACEFF' : 'rgba(0, 0, 0, 0.05)' }}>
            {label}
        </button>)
        return (<div className="category-wrapper">
            {Buttons.map((button, index) =>
                <div key={index} className="category-btn-wrapper">
                    {button}
                </div>)}
        </div>)
    }

    const contentStyle = {
        height: '300px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
    };

    const onChange = (a, b, c) => {
        console.log(a, b, c);
    }


    const enterGame = (pid) => {
        history.push(`/gameDisplay?pid=${pid}`)
    }

    const upload = () => {
        history.push('/upload_work')
    }

    return (
        <>
            <CategoryButtons />
            <div className="display-board">
                <div className="daily-pick-container">
                    <div className='top-content-left-container'>
                        <div className="daily-pick-wrapper">
                            <div className="caurousel-wrapper">
                                <CarouselContent />
                            </div>
                        </div>
                        <div className='top-small-content'>
                            <ForLoop loopNum={3} LoopContent={TopHalfSmallContent} />
                        </div>

                    </div>
                </div>

                <div className="join-container">
                    <div className="join-wrapper" >
                        <div className='join-wrapper-content-padding' >
                            <div className='join-wrapper-content'>
                                <img className="join-img" src="images/joinUs/background.png" />
                                <div className="join-btn-group">
                                    <img className="join-logo" src="images/joinUs/logo.png" />
                                    <button className="join-btn" onClick={() => upload()}>Upload a Game</button>
                                    <button className="join-btn">How to Video</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='ad'>
                        <div className='ad-padding-container'>
                            <img className="ad-img" src="images/joinUs/ad.png"></img>
                        </div>
                    </div>
                </div>

            </div>


        </>
    )


}

export default DisplayBoard