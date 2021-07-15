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
                '576px',
                '768px',
                '992px',
                '1200px'
            ]
        }

        const main_margin = '50px'
        const top_margin = '10px'
        const up_left_padding = '10px'

        const up_content_padding = '20px'
        const bottom_content_padding = '30px'

        const small_width = 330
        const small_ratio = 9 / 16

        const large_width = 678
        const large_ratio = 9.255 / 16

        const rank_width = 366.5 / 2
        const rank_ratio = 9 / 16
        // const rank_up_padding = '13px'

        const RowSmallContent = ({ index }) => {
            const TwoBoxes = []
            for (let i = 0; i < 2; i++) {
                TwoBoxes.push(
                    <Box key={i} width={0.5} >
                        <img src='fake_data/work_cover.jpg' width={small_width} height={small_width * small_ratio} />
                    </Box>
                )
            }
            return (
                <Flex pt={index === 0 ? '' : up_content_padding}>
                    {TwoBoxes}
                </Flex>
            )
        }

        const RankContent = () => {
            const BoxesRows = []
            for (let i = 0; i < 5; i++) {
                BoxesRows.push(
                    <Flex key={i} pt={i === 0 ? '' : up_content_padding} pl={up_left_padding} >
                        <Box width={0.5} >
                            <img src='fake_data/work_cover.jpg' width={rank_width} height={rank_width * rank_ratio} />
                        </Box>
                        <Box width={0.475} pl={'20px'}>
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
                    <Box width={1 / 5} >
                        <img src='fake_data/work_cover.jpg' width={small_width} height={small_width * small_ratio} />
                        <Flex className='text-start'>
                            <Box pl={'10px'}>
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

                        </Flex>

                    </Box>)
            }
            return (
                <Flex pt={index === 0 ? '' : bottom_content_padding}>
                    {BoxesColumns}
                </Flex>
            )
        }

        return (
            <>
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
                <Flex mt={top_margin} mx={main_margin} className='text-center'>
                    <Box width={0.4} >
                        <Flex>
                            <Box width={1}>
                                <img src='fake_data/work_cover.jpg' width={large_width} height={large_width * large_ratio} />
                            </Box>
                        </Flex>
                        <RowSmallContent />
                    </Box>
                    <Box width={0.4} >
                        <RowSmallContent index={0} />
                        <RowSmallContent />
                        <RowSmallContent />
                    </Box >
                    <Box width={0.2} className='text-start'>
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
            </>
        )
    }
}

export default Homepage