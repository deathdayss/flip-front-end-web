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
            ],
            space: '12'
        }
        return (
            <>
            <Flex>
                <Box width={0.5} mx = {'30px'}>
                    Box 1
                </Box>
                <Box width={0.5} mx = {'30px'}>
                    Box 2
                </Box>
            </Flex>
                {/* <Flex mt={10} className='text-center'>
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
                <Flex mx={20} className = 'text-center'>
                    <Box width={0.4} mx={'16px'}>
                        <Flex py ={'23px'}>
                            <Box width={1}>
                                <img src='fake_data/work_cover.jpg' width='664' height='360' />
                            </Box>
                        </Flex>
                        <Flex py = {'23px'} className='text-start'>
                            <Box width={0.5} mx = {'10px'}>
                                <img src='fake_data/work_cover.jpg' width='320' height='180' />
                            </Box>
                            <Box width={0.5} mx = {'10px'}>
                                <img src='fake_data/work_cover.jpg' width='320' height='180' />
                            </Box>
                        </Flex>
                    </Box>
                    <Box width={0.4} px={'16px'}>
                        123
                    </Box>
                    <Box width={0.2} px={'16px'}>
                        123
                    </Box>
                </Flex> */}

                {/* <ThemeProvider theme={theme}>
                    <Flex>
                        <Box width={0.5}>
                            123
                        </Box>
                        <Box width={0.5} px='auto'>
                            123
                        </Box>
                    </Flex>
                </ThemeProvider> */}
            </>
        )
    }
}

export default Homepage