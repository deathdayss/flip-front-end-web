import React from 'react';
import { useState, useEffect } from 'react';
import Play from '../Test_Components/PlayComponent.jsx';
import $ from 'jquery'
import request from 'umi-request';
import { DOWNLOAD_GAME } from "../../Config.js";

const GameTest = () => {
    var JSZip = require("jszip");
    const [fileUrl, setFileUrl] = useState("")

    useEffect(() => {
        const getGame = async () => {
            try {
                const result = await getGameService({
                    game_id: 1
                })
                console.log(result)
                // var blob = result;
                // var new_zip = new JSZip();
                // new_zip.loadAsync(blob)
                //     .then(function (file) {
                //         var files = file.files;
                //         for (let f in files) {
                //             // console.log("\nf: \n", f)
                //             var zipobj = files[f];
                //             if (!zipobj.dir && f.indexOf("png") !== -1) {
                //                 new_zip.file(f).async("base64")
                //                     .then(function (res) {
                //                         //获取blob对象地址，并把值赋给容器
                //                         // var mp3url = URL.createObjectURL(blob);
                //                         // $("#MP3Play").attr("src", mp3url);
                //                         // //setTimeout("revokeUrl('" + mp3url + "')", "2000");
                //                         console.log("\nf: \n", f)
                //                         var fileUrl = `data:image/png;base64,${res}`
                //                         console.log(fileUrl)
                //                         // $("#jszip_utils").append("<image src")
                //                         setFileUrl(fileUrl)
                //                     });
                //             }
                //         }
                //     });
            } catch (error) {
                console.log(error);
            }
        }
        getGame()
    }, [])

    const getGameService = (params) => {
        return request(`${DOWNLOAD_GAME}`, {
            responseType: 'blob',
            params
        });
    }

    const initializeGameZip = ""

    return (<div>
        <img id="game-file" src={fileUrl}></img>

    </div>)
}

export default GameTest
