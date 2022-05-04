import React from 'react';
import { Progress } from 'antd';
import { useState, useEffect } from 'react';
import Play from '../Test_Components/PlayComponent.jsx';
import $ from 'jquery'
import request from 'umi-request';
import { DOWNLOAD_GAME } from "../../Config.js";
import InnerHTML from 'dangerously-set-html-content'
import './GameTest.scss'


const GameTest = () => {
    var JSZip = require("jszip");
    const [percent, setPercent] = useState(0)
    const [gameHtml, setGameHtml] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getGame = async () => {
            try {
                // const result = await getGameService({
                //     game_id: 1
                // })
                // console.log(result)

                fetch("http://175.178.159.131:8084/v1/download/game?game_id=1", {
                    method: 'get',
                    responseType: 'blob'
                }).then(res => res.blob())
                    .then(blob => {
                        var new_zip = new JSZip();
                        new_zip.loadAsync(blob)
                            .then(function (file) {
                                var files = file.files;
                                for (let f in files) {
                                    // console.log("\nf: \n", f)
                                    var zipobj = files[f];
                                    // if (!zipobj.dir && f.indexOf("png") !== -1) {
                                    //     new_zip.file(f).async("base64")
                                    //         .then(function (res) {
                                    //             //获取blob对象地址，并把值赋给容器
                                    //             // var mp3url = URL.createObjectURL(blob);
                                    //             // $("#MP3Play").attr("src", mp3url);
                                    //             // //setTimeout("revokeUrl('" + mp3url + "')", "2000");
                                    //             console.log("\nf: \n", f)
                                    //             var fileUrl = `data:image/png;base64,${res}`
                                    //             console.log(fileUrl)
                                    //             // $("#jszip_utils").append("<image src")
                                    //             setFileUrl(fileUrl)
                                    //         });
                                    // }
                                    if (f.indexOf("index.html") !== -1) {
                                        new_zip.file(f).async("string").then(function (text) {
                                            // console.log(text)
                                            setGameHtml(text)
                                            setPercent(100)
                                            setLoading(false)
                                        })

                                    }
                                }
                            });
                    })
            } catch (error) {
                console.log(error);
            }
        }
        getGame()
    }, [])

    useEffect(() => {
        var i = 0;
        const updatePercent = () => {
            i++;
            setPercent(percent => percent + 15)
            if (i == 6) {
                clearInterval(progressId);
            }
        }
        var progressId = setInterval(updatePercent, 5 * 1000)
    }, [])

    const getGameService = (params) => {
        return request(`${DOWNLOAD_GAME}`, {
            responseType: 'blob',
            params
        });
    }

    return (<div>
        {/* <img id="game-file" src={fileUrl}></img> */}
        {/* <div dangerouslySetInnerHTML={{ __html: gameHtml }}></div> */}
        <div style={{ display: loading ? 'flex' : 'none' }} className='progress-container'>
            <img className='arthor-gif' src='images/game/Arthor.gif' alt='loading' />
            <Progress percent={percent} strokeColor={'#5B28FF'} className='progress' />
        </div>
        <InnerHTML html={gameHtml} />
    </div>)
}

export default GameTest
