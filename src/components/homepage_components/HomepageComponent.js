import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'
import { Flex, Box } from '@rebass/grid'
import { ThemeProvider } from 'styled-components'

import { ForLoop } from '../helper_components/HelperComponents'
import DisplayBoard from './DisplayBoardComponent'
import LastestRecommand from './LastestRecommandComponent'
import { HomepageTheme } from '../../data/constants/Theme'
import './HomepageComponent.scss'

var qs = require('qs')

class Homepage extends Component {
    componentDidMount() {

    }
    render() {

        const spacing_params = {
            main_margin: '50px',
            main_margin_mobile: '10px',
            top_margin: '10px',
            up_left_padding: '5px',

            up_content_padding: '16px',
            bottom_content_padding: '30px',

            responsive_content_padding: '5px',
            responsive_show_padding: '5px',
            responsive_rank_words_padding: '4px'
        }

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
                    <DisplayBoard ContentWords={ContentWords} spacing_params = {spacing_params}/>
                    <LastestRecommand ContentWords={ContentWords} spacing_params = {spacing_params}/>
                </ThemeProvider>
            </>
        )
    }
}

export default Homepage