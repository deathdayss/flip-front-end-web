import React, { Component } from 'react'
import { Flex, Box } from '@rebass/grid'

import { ForLoop } from '../helper_components/HelperComponents'
import { homepageSpacing } from '../../data/constants/Spacing'
import './DisplayBoardComponent.scss'

class DisplayBoard extends Component {

    render() {

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

        const RankContent = () =>{
            return <ForLoop loopNum={5}

            LoopContent={({index}) => {
                const first_top_margin = index === 0 ? homepageSpacing.top_margin : homepageSpacing.up_content_padding
                return (<Flex key={index} pt={[first_top_margin, first_top_margin, index === 0 ? '0px' : homepageSpacing.up_content_padding]} pl={homepageSpacing.up_left_padding} >
                    <Box width={0.558} >
                        <img className='Home-Rank-img' src='fake_data/work_cover.jpg' />
                    </Box>
                    <this.props.ContentWords styles={{ width: 0.442, pl: homepageSpacing.responsive_rank_words_padding }} words={this.props.words} />
                </Flex>)
            }}

            PackingContent = {({Output}) => 
            <div id = 'rank-content'>
                {Output}
            </div>} />}


        return (
            <>
                <Flex mt={homepageSpacing.top_margin} mx={[homepageSpacing.main_margin_mobile, homepageSpacing.main_margin]} id='rank-btns-left' className='text-center'>
                    <Box width={0.7}>
                    </Box>
                    <Box width={0.2}>
                        <Flex>
                            <Box width={1 / 3} px={3}>
                                <button id='' className='rank-time-btn'>
                                    1234
                                </button>
                            </Box>
                            <Box width={1 / 3} px={3}>
                                <button id='' className='rank-time-btn'>
                                    1234
                                </button>
                            </Box>
                            <Box width={1 / 3} px={3}>
                                <button id='' className='rank-time-btn'>
                                    1234
                                </button>
                            </Box>

                        </Flex>
                    </Box>
                </Flex>
                <Flex mt={homepageSpacing.top_margin} mx={[homepageSpacing.main_margin_mobile, homepageSpacing.main_margin]} className='text-center' flexWrap='wrap'>
                    <Box width={[1, 0.5, 0.4]} >
                        <Flex>
                            <Box width={1} px={homepageSpacing.responsive_show_padding}>
                                <img className='Home-Show-img' src='fake_data/advertise.png' />
                            </Box>
                        </Flex>
                        <TopHalfSmallContent />
                    </Box>
                    <Box width={[1, 0.5, 0.4]} pt={[homepageSpacing.up_content_padding, '0px', '0px', '0px']} >
                        <ForLoop loopNum={3} LoopContent={TopHalfSmallContent} />
                    </Box >
                    <Box width={[1, 1, 0.2]} className='text-start' flex='1 1 auto'>
                        <RankContent />
                    </Box>
                </Flex>
                <Flex id='more-btn' mt={homepageSpacing.top_margin}>
                    更多
                </Flex>
            </>
        )

    }
}

export default DisplayBoard