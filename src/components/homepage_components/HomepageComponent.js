/**
 * @author Zhicheng Wang
 * @create date 2021-07-23 20:33:35
 * @modify date 2021-07-23 20:33:35
 */

import React, { Component } from 'react'
import { Flex, Box } from '@rebass/grid'
import { ThemeProvider } from 'styled-components'
import { connect } from "react-redux";

import DisplayBoard from './DisplayBoardComponent'
import LastestRecommand from './LastestRecommandComponent'
import { HomepageTheme } from '../../data/constants/Theme'
import './HomepageComponent.scss'

var qs = require('qs')

const mapStateToProps = state => {
    return {
        localization: state.localization,
    }
}

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
                    <DisplayBoard ContentWords={ContentWords} words = {this.props.localization.words.homepage.contentWords}/>
                    <LastestRecommand ContentWords={ContentWords} words = {this.props.localization.words.homepage.contentWords}/>
                </ThemeProvider>
            </>
        )
    }
}

export default connect(mapStateToProps)(Homepage)