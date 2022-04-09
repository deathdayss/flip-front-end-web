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
import { API_IMG } from '../../Config.js'
import { getRankService, getDownloadService, getMultiZoneService } from '../../service/displayBoard'

const categoryLabels = [
    {
        key: "rpg",
        label: "Rpg"
    }
    , {
        key: "action",
        label: "Action"
    },
    {
        key: "3D",
        label: "3D"
    }]
const aspectRatio = `${(9 * 100 / 16)}%` //"62.5%"

const DisplayBoard = () => {
    const [carouselList, setCarouselList] = useState([])
    const [category, setCategory] = useState(categoryLabels[0]["key"])
    const [downloadList, setDownloadList] = useState([])
    const history = useHistory()

    useEffect(() => {
        const getCarousel = async () => {
            const result = await getMultiZoneService({
                zone: category,
                num: 5,
            });
            // console.log(result.List)
            setCarouselList(result.List);
        }
        getCarousel();


        const getDownload = async () => {
            const result = await getMultiZoneService({
                zone: category,
                num: 5,
            });
            // console.log(result.List)
            setDownloadList(result.List);
        }
        getDownload();

    }, [])

    const TopHalfSmallContent = ({ index = 1 }) => {
        return <ForLoop index={index} loopNum={1}

            LoopContent={() =>
                <div className="carousel-below-content">
                    <div style={{ backgroundColor: "#000", height: 0, paddingBottom: aspectRatio, overflow: "hidden" }}>
                        <img className='Home-Content-img' src={`${API_IMG}?img_name=${downloadList?.[index]?.img}`} onClick={() => { enterGame(downloadList?.[index]?.GID) }} />
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
                <img key={`carousel${i}`} className='Home-Show-img' src={`${API_IMG}?img_name=${carouselList?.[i]?.img}`} />
            )}
        </Carousel>
    }

    const CategoryButtons = () => {
        const Buttons = categoryLabels.map(({ key, label }) => <button key={key} id='' className='category-btn'
            onClick={() => changeCategory(key)} style={{ backgroundColor: (category == key) ? '#DACEFF' : 'rgba(0, 0, 0, 0.05)' }}>
            {label}
        </button>)
        return (<div className="category-wrapper">
            {Buttons.map((button, index) =>
                <div key={index} className="category-btn-wrapper">
                    {button}
                </div>)}
        </div>)
    }
    const getMultiZone = async (key) => {
        const result = await getMultiZoneService({
            zone: key,
            num: 5,
        });
        console.log(result.List)
        setCarouselList(result.List)
        setDownloadList(result.List)
    }
    const changeCategory = (key) => {
        setCategory(key)
        getMultiZone(key)
    }

    const contentStyle = {
        height: '300px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
    };

    const onChange = (a, b, c) => {
        // console.log(a, b, c);
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