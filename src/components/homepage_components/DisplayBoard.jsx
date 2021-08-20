/**
 * @author Zhicheng Wang
 * @create date 2021-07-23 20:33:26
 * @modify date 2021-07-24 21:15:44
 */

import React from 'react'
import { Flex, Box } from '@rebass/grid'
import { useHistory } from 'react-router-dom';
import { ForLoop } from '../helper_components/Helper.jsx'
import { homepageSpacing } from '../../data/constants/Spacing'
import './DisplayBoard.scss'

const DisplayBoard = (props) => {
    const { ContentWords, words } = props;

    const history = useHistory();

    const TopHalfSmallContent = ({ index }) => {
        return <ForLoop index={index} loopNum={2}

            LoopContent={() =>
                <Box width={0.5} px={homepageSpacing.responsive_content_padding}>
                    <img className='Home-Content-img' src='fake_data/work_cover.jpg' />
                </Box>}

            PackingContent={({ Output }) =>
                <Flex pt={index === 0 ? '' : homepageSpacing.up_content_padding} flexWrap='wrap'>
                    {Output}
                </Flex>} />
    }

    const RankContent = () => {
        return <ForLoop loopNum={5}

            LoopContent={({ index }) => {
                const first_top_margin = index === 0 ? homepageSpacing.top_margin : homepageSpacing.up_content_padding
                return (<Flex key={index} pt={[first_top_margin, first_top_margin, index === 0 ? '0px' : homepageSpacing.up_content_padding]} pl={homepageSpacing.up_left_padding} >
                    <Box width={0.5} >
                        <img className='Home-Rank-img' src='fake_data/work_cover.jpg' />
                    </Box>
                    <ContentWords styles={{ width: 0.5, pl: homepageSpacing.responsive_rank_words_padding, fontSize: "12px !important" }} words={words} />
                </Flex>)
            }}

            PackingContent={({ Output }) =>
                <div id='rank-content'>
                    {Output}
                </div>} />
    }

    const Buttons = () => {
        const Buttons = [<button id='' className='rank-time-btn'>
            Daily
        </button>,
        <button id='' className='rank-time-btn'>
            Weekly
        </button>,
        <button id='' className='rank-time-btn'>
            Monthly
        </button>]
        return Buttons.map(button =>
            <Box width={1 / 3} px={3}>
                {button}
            </Box>)
    }


    const enterGame = () => {
        history.push('/play')
    }

    return (
        <>



            <Flex mx={[homepageSpacing.main_margin_mobile, homepageSpacing.main_margin]}>
                <Box width={0.8}>
                    <Flex mt={homepageSpacing.top_margin} className='section-heading'>
                        Daily Pick
                    </Flex>
                    <Flex mt={homepageSpacing.top_margin} className='text-center' flexWrap='wrap'>
                        <Box width={[1, 0.5, 0.4]} >
                            <Flex>
                                <Box width={1} px={homepageSpacing.responsive_show_padding}>
                                    <img className='Home-Show-img' src='fake_data/advertise.png' onClick={enterGame} />
                                </Box>
                            </Flex>
                            <TopHalfSmallContent />
                        </Box>
                        <Box width={[1, 0.5, 0.4]} pt={[homepageSpacing.up_content_padding, '0px', '0px', '0px']} >
                            <ForLoop loopNum={3} LoopContent={TopHalfSmallContent} />
                        </Box >

                    </Flex>
                </Box>
                <Box width={0.2}>
                    {/* <Flex mt={homepageSpacing.top_margin}>
                             Ranking
                         </Flex> */}
                    <Flex mt={homepageSpacing.top_margin} id='rank-btns-left' >
                        <Box width={0.2} className='section-heading'>
                            Ranking
                        </Box>
                        <Box width={0.7} className='text-center'>
                            <Flex>
                                <Buttons />
                            </Flex>
                        </Box>
                    </Flex>
                    <Box width={[1, 1, 0.2]} className='text-start' flex='1 1 auto'>
                        <RankContent />
                    </Box>
                    <Flex id='more-btn' >
                        更多
                    </Flex>
                </Box>
            </Flex>


        </>
    )


}

export default DisplayBoard