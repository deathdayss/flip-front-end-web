import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'
import { Flex, Box } from '@rebass/grid'
import { ThemeProvider } from 'styled-components'

import { ForLoop } from '../helper_components/HelperComponents'
import DisplayBoard from './DisplayBoardComponent'
import LastestRecommand from './LastestRecommandComponent'
import { HomepageTheme } from '../../data/constants/Theme'
import { homepageSpacing } from '../../data/constants/Spacing'
import './HomepageComponent.scss'

var qs = require('qs')

class Homepage extends Component {
    componentDidMount() {

    }
    render() {

        const ContentWords = ({ styles, words }) => {
            const Content = []
            words.map(word => {
                Content.push(<Flex>
                    <Box width={1}>
                        {word}
                    </Box>
                </Flex>)
            });
            return (
                <Box {...styles}>
                    {Content}
                </Box>
            )
        }

        return (
            <>
                <ThemeProvider theme={HomepageTheme}>
                    <DisplayBoard ContentWords={ContentWords} />
                    <LastestRecommand ContentWords={ContentWords} />
                </ThemeProvider>
            </>
        )
    }
}

export default Homepage