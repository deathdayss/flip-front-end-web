/* eslint-disable */

/**
 * @author Huiying Hu
 * @create date 2021-08-20 11:46:28
 * @modify date 2021-08-20 11:46:28
 */

import React, { useState, useEffect, useMemo } from 'react'
import { connect } from "react-redux";
import { Avatar, Comment, Tooltip, List } from 'antd';
import moment from 'moment';
import { Flex, Box } from '@rebass/grid'
// import { ForLoop } from '../helper_components/Helper.jsx'
import { homepageSpacing, gameDisplaySpacing } from '../../data/constants/Spacing'
import { Popover, Button, Input } from 'antd';
import { message } from 'antd';
import Play from '../Test_Components/PlayComponent.jsx';
import './GameDisplay.scss'
import Header from '../header_components/Header.jsx'
import request from 'umi-request';
import Icon from '@ant-design/icons';
import "../../scss/Spacing.scss";
import { API_PRODUCT, API_LIKE_CLICK, API_LIKE_NUM, API_LIKE_CHECK, API_COLLECT_CLICK, API_COLLECT_NUM, API_COLLECT_CHECK, API_RANK_DOWNLOAD, API_IMG, DOWNLOAD_GAME } from "../../Config.js";

const colNum = 7
const LOOP_ARR = [1, 2, 3, 4, 5, 6, 7]
const data = [
    {
        actions: [<span key="comment-list-reply-to-0">Reply to</span>],
        author: 'Han Solo',
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        content: (
            <p>
                We supply a series of design principles, practical patterns and high quality design
                resources (Sketch and Axure), to help people create their product prototypes beautifully and
                efficiently.
            </p>
        ),
        datetime: (
            <Tooltip title={moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')}>
                <span>{moment().subtract(1, 'days').fromNow()}</span>
            </Tooltip>
        ),
    },
    {
        actions: [<span key="comment-list-reply-to-0">Reply to</span>],
        author: 'Han Solo',
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        content: (
            <p>
                We supply a series of design principles, practical patterns and high quality design
                resources (Sketch and Axure), to help people create their product prototypes beautifully and
                efficiently.
            </p>
        ),
        datetime: (
            <Tooltip title={moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss')}>
                <span>{moment().subtract(2, 'days').fromNow()}</span>
            </Tooltip>
        ),
    },
];

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

const btnInfos =
    [
        ['images/header/like.svg', 25, '4', 'button_like'],
        ['images/header/header_collection_btn.svg', 25, '4', 'button_fav'],
        ['images/header/forward.svg', 25, '4', 'button_share']
    ]

const LikeSvg = () =>
    <svg width="1em" height="1em" viewBox="0 0 29 23" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0)">
            <path d="M3.00404 10.0625C1.34822 10.0625 0 11.1378 0 12.4583V20.125C0 21.4456 1.34822 22.5208 3.00404 22.5208H6.60892C7.28545 22.5208 7.90786 22.3387 8.41136 22.0359V10.0625H3.00404Z" />
            <path d="M28.839 13.6563C28.839 13.0804 28.5531 12.5437 28.0568 12.1479C28.6179 11.6582 28.9039 11.0017 28.8258 10.3184C28.6852 9.10038 27.3093 8.14588 25.692 8.14588H18.2695C18.6372 7.25558 19.226 5.62357 19.226 4.31257C19.226 2.23394 17.0114 0.479248 15.6211 0.479248C14.3727 0.479248 13.481 1.03987 13.4426 1.06287C13.3008 1.15393 13.2179 1.29193 13.2179 1.43757V4.68726L9.75723 10.6663L9.61304 10.7248V20.9962C10.5911 21.3642 11.8288 21.5626 12.6171 21.5626H23.6468C24.9554 21.5626 26.1006 20.8591 26.3697 19.8884C26.5079 19.3891 26.4274 18.8859 26.1522 18.4489C27.0402 18.0924 27.6374 17.3631 27.6374 16.5313C27.6374 16.1921 27.5401 15.8672 27.3551 15.573C28.243 15.2165 28.839 14.4872 28.839 13.6563Z" />
        </g>
        <defs>
            <clipPath id="clip0">
                <rect width="28.839" height="23" fill="white" />
            </clipPath>
        </defs>
    </svg>

// const Buttons_NEW = () => (
//     btnInfos.map(
//         (btnInfo, index) => {
//             if (btnInfo[3] == 'button_share') {
//                 const pop_title = "Pass on the passion to your fiends!"
//                 const game_link = window.location.href;
//                 const handle_copyLink = (e) => {
//                     navigator.clipboard.writeText(game_link);
//                     // message.info("Game link [" + game_link + "] has been copied to your clipboard")
//                     message.info("Game link has been copied to your clipboard")
//                 }
//                 const content = (
//                     <div style={{ display: "flex" }}>
//                         <Input placeholder={game_link} />
//                         <Button onClick={handle_copyLink}> Copy-Link </Button>
//                     </div>
//                 )
//                 return (
//                     <Box width={80} type="primary">
//                         <Popover content={content} title={pop_title}>
//                             <img src={btnInfo[0]} height={btnInfo[1]} width={btnInfo[1]} />
//                         </Popover>
//                         <span>123</span>
//                     </Box>
//                 )

//             } else {
//                 return (
//                     <Box width={80} type="primary">
//                         <img src={btnInfo[0]} height={btnInfo[1]} width={btnInfo[1]} />
//                         <span>123</span>
//                     </Box>
//                 )
//             }
//         }

//     )
// )

const LikeIcon = props => <Icon component={LikeSvg} {...props} />;

const CollectSvg = () =>
    <svg width="1em" height="1em" viewBox="0 0 33 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.75" width="32" height="32" fill="#C4C4C4" fill-opacity="0.01" />
        <path d="M25.5525 19.284C25.1652 19.6935 24.9872 20.2857 25.0755 20.8665L26.4049 28.8933C26.5171 29.5737 26.2539 30.2621 25.732 30.6553C25.2205 31.0632 24.5401 31.1121 23.9823 30.7858L17.3591 27.0171C17.1288 26.8834 16.8731 26.8116 16.6114 26.8034H16.2061C16.0656 26.8263 15.928 26.8752 15.8024 26.9503L9.17764 30.7369C8.85014 30.9164 8.47928 30.98 8.11589 30.9164C7.2306 30.7336 6.63991 29.8135 6.78496 28.8428L8.11589 20.8159C8.20412 20.2302 8.02616 19.6347 7.63885 19.2187L2.23888 13.5086C1.78726 13.0306 1.63024 12.3127 1.83661 11.665C2.037 11.0189 2.54843 10.5475 3.16604 10.4414L10.5983 9.26512C11.1636 9.20149 11.66 8.82625 11.9143 8.27155L15.1892 0.946253C15.267 0.783106 15.3672 0.63301 15.4883 0.505756L15.6229 0.391553C15.6932 0.306716 15.7739 0.236563 15.8637 0.179462L16.0267 0.114203L16.2809 0H16.9105C17.4727 0.0636273 17.9677 0.430708 18.2264 0.978882L21.5448 8.27155C21.784 8.80504 22.2491 9.17539 22.786 9.26512L30.2182 10.4414C30.8463 10.5393 31.3712 11.0124 31.5791 11.665C31.775 12.3192 31.606 13.0371 31.1454 13.5086L25.5525 19.284Z" />
    </svg>


const CollectIcon = props => <Icon component={CollectSvg} {...props} />;

const ForwardSvg = () =>
    <svg width="1em" height="1em" viewBox="0 0 36 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M35.586 10.2057L23.1518 0.580698C22.8358 0.335698 22.3633 0.266865 21.961 0.402198C21.5558 0.539865 21.291 0.857198 21.291 1.20836V6.16903C9.9642 6.32537 0.811157 13.722 0.811157 22.7917C0.811157 23.1907 1.1637 23.5174 1.64791 23.6177C1.73421 23.6352 1.82052 23.6434 1.90683 23.6434C2.30765 23.6434 2.69823 23.4602 2.89864 23.172C6.18274 18.44 12.4349 15.5 19.2167 15.5H21.291V20.4584C21.291 20.8095 21.5558 21.1269 21.961 21.2645C22.3618 21.3999 22.8373 21.331 23.1518 21.086L35.586 11.461C35.7996 11.2965 35.9195 11.0702 35.9195 10.8334C35.9195 10.5965 35.7996 10.3702 35.586 10.2057Z" />
    </svg>

const ForwardIcon = props => <Icon component={ForwardSvg} {...props} />;

const mapStateToProps = state => {
    return {
        localization: state.localization,
    }
}

const GameDisplay = (props) => {
    const defaultWords = props.localization.words.homepage.contentWords
    const [like, setLike] = useState(false)
    const [likeNum, setLikeNum] = useState(0)
    const [collect, setCollect] = useState(false)
    const [collectNum, setCollectNum] = useState(0)
    const [forward, setForward] = useState(false)
    const [downloadList, setDownloadList] = useState([])
    var JSZip = require("jszip");

    useEffect(() => {
        const getGame = async () => {
            const result = await getGameService({
                game_id: 1
            })
            console.log(result)
            var blob = result;
            var new_zip = new JSZip();
            new_zip.loadAsync(blob)
                .then(function (file) {
                    var files = file.files;
                    for (let f in files) {
                        console.log("\nf: \n", f)
                        // var zipobj = files[f];
                        // if (!zipobj.dir) {
                        //     new_zip.file(f).async("blob")
                        //         .then(function (blob) {
                        //             //获取blob对象地址，并把值赋给容器
                        //             var mp3url = URL.createObjectURL(blob);
                        //             $("#MP3Play").attr("src", mp3url);
                        //             //setTimeout("revokeUrl('" + mp3url + "')", "2000");
                        //         });
                        // }
                    }
                });

        }
        getGame()
    }, [])

    useEffect(() => {
        // const getProductInfo = async () => {
        //     const result = await getProductInfoService({
        //         gid: 123456
        //     });
        //     // console.log(result);
        // }
        // getProductInfo();

        const getLikeCheck = async () => {
            const result = await getLikeCheckService({
                GID: 1,
                UID: 1,
            });
            setLike(result.msg);
        }
        getLikeCheck();
        const getCollectCheck = async () => {
            const result = await getCollectCheckService({
                GID: 1,
                UID: 1,
            });
            setCollect(result.msg);
        }
        getCollectCheck();


        getLikeNum();
        getCollectNum();

        const getDownload = async () => {
            const result = await getDownloadService({
                zone: "test",
                num: 10,
            });
            // console.log(result.List)
            setDownloadList(result.List);
        }
        getDownload();
        //initialize the unity game, reload script
        initializeGame();
    }, [])

    const initializeGame = () => {

        var buildUrl = "Build";
        var loaderUrl = buildUrl + "/Webgl-Eng.loader.js";
        var config = {
            dataUrl: buildUrl + "/Webgl-Eng.data.unityweb",
            frameworkUrl: buildUrl + "/Webgl-Eng.framework.js.unityweb",
            codeUrl: buildUrl + "/Webgl-Eng.wasm.unityweb",
            streamingAssetsUrl: "StreamingAssets",
            companyName: "DefaultCompany",
            productName: "XiaochuanJ_Bird_Project",
            productVersion: "1.0",
        };

        var container = document.querySelector("#unity-container");
        var canvas = document.querySelector("#unity-canvas");
        var loadingBar = document.querySelector("#unity-loading-bar");
        var progressBarFull = document.querySelector("#unity-progress-bar-full");
        var fullscreenButton = document.querySelector("#unity-fullscreen-button");
        var mobileWarning = document.querySelector("#unity-mobile-warning");

        if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
            container.className = "unity-mobile";
            config.devicePixelRatio = 1;
            mobileWarning.style.display = "block";
            setTimeout(() => {
                mobileWarning.style.display = "none";
            }, 5000);
        } else {
            canvas.style.width = "960px";
            canvas.style.height = "600px";
        }
        loadingBar.style.display = "block";

        var script = document.createElement("script");
        script.src = loaderUrl;
        script.onload = () => {
            createUnityInstance(canvas, config, (progress) => {
                progressBarFull.style.width = 100 * progress + "%";
            }).then((unityInstance) => {
                loadingBar.style.display = "none";
                fullscreenButton.onclick = () => {
                    unityInstance.SetFullscreen(1);
                };
            }).catch((message) => {
                alert(message);
            });
        };
        document.body.appendChild(script);

    }

    const getLikeNum = async () => {
        const result = await getLikeNumService({
            GID: 1,
            UID: 1,
        });
        setLikeNum(result.count);
        // console.log(likeNum)
    }

    const getCollectNum = async () => {
        const result = await getCollectNumService({
            GID: 1,
            UID: 1,
        });
        setCollectNum(result.count);
        // console.log(collectNum)
    }

    const getDownloadService = (params) => {
        return request(`${API_RANK_DOWNLOAD}`, { params });
    }

    const getLikeCheckService = (params) => {
        return request(`${API_LIKE_CHECK}`, { params });
    }

    const getLikeClickService = (params) => {
        return request(`${API_LIKE_CLICK}`, { params });
    }

    const getLikeNumService = (params) => {
        return request(`${API_LIKE_NUM}`, { params });
    }

    const getCollectNumService = (params) => {
        return request(`${API_COLLECT_NUM}`, { params });
    }

    const getCollectClickService = (params) => {
        return request(`${API_COLLECT_CLICK}`, { params });
    }

    const getCollectCheckService = (params) => {
        return request(`${API_COLLECT_CHECK}`, { params });
    }

    const getProductInfoService = (params) => {
        return request(`${API_PRODUCT}`, { params });
    }

    const getGameService = (params) => {
        return request(`${DOWNLOAD_GAME}`, {
            responseType: 'blob',
            params
        });
    }

    const likeClick = () => {
        setLike(!like);
        const getLikeClick = async () => {
            const result = await getLikeClickService({
                GID: 1,
                UID: 1,
            });
            getLikeNum();
        }
        getLikeClick();

    }

    const collectClick = () => {
        setCollect(!collect);
        const getCollectClick = async () => {
            const result = await getCollectClickService({
                GID: 1,
                UID: 1,
            });
            getCollectNum();
        }
        getCollectClick();
    }

    const ShareButton = () => {
        const pop_title = "Pass on the passion to your fiends!"
        const game_link = window.location.href;
        const handle_copyLink = (e) => {
            navigator.clipboard.writeText(game_link);
            // message.info("Game link [" + game_link + "] has been copied to your clipboard")
            message.info("Game link has been copied to your clipboard")
        }
        const content = (
            <div style={{ display: "flex" }}>
                <Input placeholder={game_link} />
                <Button onClick={handle_copyLink}> Copy-Link </Button>
            </div>
        )
        return (
            // <Box width={80} type="primary">
            //     <Popover content={content} title={pop_title}>
            //         <img src={btnInfos[2][0]} height={btnInfos[2][1]} width={btnInfos[2][1]} />
            //     </Popover>
            //     <span>123</span>
            // </Box>

            <Box width={80}>
                <Popover content={content} title={pop_title}>

                    <ForwardIcon className="like-icon" onClick={() => { setForward(!forward) }} style={{ color: forward ? "#5B28FF" : "#727272", }} />
                </Popover>
                <span className="btn-text">123</span>
            </Box>
        )
    }

    const RecommendWords = ({ styles, words = defaultWords }) => {
        const Content = []
        // console.log(words)

        Content.push(
            <>
                <Flex>
                    <Box width={1}>
                        {words.game_name}
                    </Box>
                </Flex>
                <Flex>
                    <Box width={1}>
                        {words.DownloadNum} play · {words.like_num} like
                    </Box>
                </Flex>
                <Flex>
                    <Box width={1}>
                        {words.AuthorName}
                    </Box>
                </Flex>
            </>);
        return (
            <Box {...styles}>
                {Content}
            </Box>
        )
    }

    return (
        <>
            <Header></Header>
            <Flex mx={[gameDisplaySpacing.main_margin_mobile, gameDisplaySpacing.main_margin]} mt={gameDisplaySpacing.top_margin}>
                <Box className="header-left-wrapper" width={0.2}>
                    <Flex className="header-left">
                        <Box>
                            <a href="">

                                <Avatar src="images/header/header_avatar_btn.svg"></Avatar>

                            </a>
                        </Box>
                        <Box ml={gameDisplaySpacing.span_margin_left} className='creator'>
                            <span style={{ fontSize: '14px', display: "block" }}>{gameDetail.creator}</span>
                            <button className="follow-btn">{gameDetail.subscribe}</button>
                        </Box>
                        <Box ml={gameDisplaySpacing.span_margin_left} className='subscribers'>
                            <span>{gameDetail.subscribers}</span>
                        </Box>
                    </Flex>
                    <div>This is the world of ELDEN RING. </div>
                </Box>
                <Box width={0.6} className="title">{gameDetail.title}</Box>
                <Box width={0.2} className="header-right">
                    <span>{gameDetail.play}</span>
                    <span style={{ marginLeft: gameDisplaySpacing.span_margin_left }}>{gameDetail.date}</span>
                </Box>
            </Flex>
            <Flex mx={[gameDisplaySpacing.main_margin_mobile, gameDisplaySpacing.main_margin]}>
                <Box width={1} className="game-frame">
                    <Play></Play>
                </Box>
            </Flex>

            <Flex className="buttons" mx={[gameDisplaySpacing.main_margin_mobile, gameDisplaySpacing.main_margin]}>
                <Box width={80}>
                    <LikeIcon className="like-icon" onClick={likeClick} style={{ color: like ? "#5B28FF" : "#727272", }} />
                    <span className="btn-text">{likeNum}</span>
                </Box>
                <Box width={80}>
                    <CollectIcon className="like-icon" onClick={collectClick} style={{ color: collect ? "#5B28FF" : "#727272", }} />
                    <span className="btn-text">{collectNum}</span>
                </Box>
                {/* <Box width={80}>
                    <ForwardIcon className="like-icon" onClick={() => { setForward(!forward) }} style={{ color: forward ? "#5B28FF" : "#727272", }} />
                    <span className="btn-text">123</span>
                </Box> */}
                <ShareButton />

                <Box style={{ flexGrow: 1 }}>
                    <div id="unity-fullscreen-button"></div>
                </Box>
                {/* <Buttons_NEW></Buttons_NEW> */}
            </Flex>
            <Flex className='description' mx={[gameDisplaySpacing.main_margin_mobile, gameDisplaySpacing.main_margin]}>
                {gameDetail.description}
            </Flex>

            <Flex mx={[gameDisplaySpacing.main_margin_mobile, gameDisplaySpacing.main_margin]} mt={gameDisplaySpacing.recommendation_margin_top}>

                {/* <RecommendContent /> */}
                {LOOP_ARR.map((i) =>
                    <Box key={i} index={i} width={1 / 7} px={homepageSpacing.responsive_content_padding}>
                        <img className='Home-Content-img' src={`${API_IMG}?img_name=${downloadList[i]?.img}`} />
                        <Flex className='text-start'>
                            <RecommendWords styles={{ pl: '2px' }} words={downloadList[i]} />
                        </Flex>
                    </Box>
                )}

            </Flex>
            {/* <Flex className='comments' mx={[gameDisplaySpacing.main_margin_mobile, gameDisplaySpacing.main_margin]}>
                <Box width={1}>
                    {gameDetail.comments}
                </Box>
            </Flex> */}
            <Flex className='comments' mx={[gameDisplaySpacing.main_margin_mobile, gameDisplaySpacing.main_margin]}>
                <List
                    className="comment-list"
                    header={`${data.length} comments`}
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={item => (
                        <li>
                            <Comment
                                actions={item.actions}
                                author={item.author}
                                avatar={item.avatar}
                                content={item.content}
                                datetime={item.datetime}
                            />
                        </li>
                    )}
                />
            </Flex>
        </>)
}

export default connect(mapStateToProps)(GameDisplay)