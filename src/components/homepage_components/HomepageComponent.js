import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'
import { Flex, Box } from '@rebass/grid'

import { ThemeProvider } from 'styled-components'

import './HomepageComponent.scss'

var qs = require('qs')

class Homepage extends Component {
    componentDidMount() {

    }
    render() {
        const theme = {
            breakpoints: [
                // '576px',
                '768px',
                '992px',
                '1200px',
                '1704px'
            ]
        }

        const main_margin = '50px'
        const top_margin = '10px'
        const up_left_padding = '10px'

        const up_content_padding = '20px'
        const bottom_content_padding = '30px'

        const responsive_content_padding = '5px'
        const responsive_show_padding = '4px'
        const responsive_rank_words_padding = '4px'

        const small_width = 330
        const small_ratio = 9 / 16

        const large_width = 678
        const large_ratio = 9.255 / 16

        const rank_width = 366.5 / 2
        const rank_ratio = 9 / 16

        const RowSmallContent = ({ index }) => {
            const TwoBoxes = []
            for (let i = 0; i < 2; i++) {
                TwoBoxes.push(
                    <Box key={i} width={[1, 0.5,0.5,0.5, 0.5]} px={responsive_content_padding}>
                        <img className='Home-Content-img' src='fake_data/work_cover.jpg' />
                    </Box>
                )
            }
            return (
                <Flex pt={index === 0 ? '' : up_content_padding} flexWrap='wrap'>
                    {TwoBoxes}
                </Flex>
            )
        }

        const ContentWords = (props) =>
            <Box {...props}>
                <Flex>
                    <Box width={1}>
                        作品名
                    </Box>
                </Flex>
                <Flex>
                    <Box width={1}>
                        作品名二行
                    </Box>
                </Flex>
                <Flex>
                    <Box width={1}>
                        1000游玩 · 1000赞
                    </Box>
                </Flex>
                <Flex>
                    <Box width={1}>
                        UP主名字
                    </Box>
                </Flex>
            </Box>

        const RankContent = () => {
            const BoxesRows = []
            for (let i = 0; i < 5; i++) {
                BoxesRows.push(
                    <Flex key={i} pt={i === 0 ? '' : up_content_padding} pl={up_left_padding} >
                        <Box width={0.55} >
                            <img className='Home-Rank-img' src='fake_data/work_cover.jpg' />
                        </Box>
                        <ContentWords width={0.45} pl={responsive_rank_words_padding} />
                    </Flex>
                )
            }
            return (
                <>
                    {BoxesRows}
                </>
            )
        }

        const BottomRowContent = ({ index }) => {
            const BoxesColumns = []
            for (let j = 0; j < 5; j++) {
                BoxesColumns.push(
                    <Box width={[1, 1/2, 1/4, 1/5, 1/5]} px={responsive_content_padding}>
                        <img className='Home-Content-img' src='fake_data/work_cover.jpg' />
                        <Flex className='text-start'>
                            <ContentWords pl={'10px'} />
                        </Flex>

                    </Box>)
            }
            return (
                <Flex pt={index === 0 ? '' : bottom_content_padding} flexWrap='wrap'>
                    {BoxesColumns}
                </Flex>
            )
        }

        return (
            <>
            <ThemeProvider theme={theme}>
                <Flex mt={top_margin} mx={main_margin} className='text-center'>
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
                <Flex mt={top_margin} mx={main_margin} className='text-center' flexWrap = 'wrap'>
                    <Box width={[1, 1,1,0.5, 0.4]} >
                        <Flex>
                            <Box width={1} px={responsive_show_padding}>
                                <img className='Home-Show-img' src='fake_data/advertise.png' />
                            </Box>
                        </Flex>
                        <RowSmallContent />
                    </Box>
                    <Box width={[1, 1,1,0.5, 0.4]} >
                        <RowSmallContent index={0} />
                        <RowSmallContent />
                        <RowSmallContent />
                    </Box >
                    <Box width={[1, 1,1,0.2, 0.2]} className='text-start' flex='1 1 auto'>
                        <RankContent />
                    </Box>
                </Flex>
                <Flex mt={top_margin}>
                    更多
                </Flex>
                <Flex mt={top_margin} mx={main_margin}>
                    推荐 | 最新
                </Flex>
                <Flex mt={top_margin} mx={main_margin} className='text-center'>
                    <Box width={1}>
                        <BottomRowContent index={0} />
                        <BottomRowContent />
                        <BottomRowContent />
                        <BottomRowContent />
                        <BottomRowContent />
                    </Box>
                </Flex>
            </ThemeProvider>
            </>
        )
    }
}

export default Homepage