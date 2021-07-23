import React, { Component } from 'react'
import { Flex, Box } from '@rebass/grid'

import { ForLoop } from '../helper_components/HelperComponents'
import './LastestRecommandComponent.scss'

class LastestRecommand extends Component {


    render() {
        const spacing_params = this.props.spacing_params

        const LastestRecommandContentRow = ({ index, colNum }) => {
            return <ForLoop loopNum={colNum}
                LoopContent={() => <Box width={1 / colNum} px={spacing_params.responsive_content_padding}>
                    <img className='Home-Content-img' src='fake_data/work_cover.jpg' />
                    <Flex className='text-start'>
                        <this.props.ContentWords styles={{ pl: '2px' }} words={["作品名", "作品名二行", "10000游玩·1000赞", "UP主名字"]} />
                    </Flex>
                </Box>}

                PackingContent={({Output}) => <Flex pt={index === 0 ? '' : spacing_params.bottom_content_padding} flexWrap='wrap' className={"bottom-row-" + colNum} >
                    {Output}
                </Flex>} />
        }

        const LastestRecommandContentGrid = ({rowNum, colNums}) => {
            return colNums.map(colNum => <ForLoop loopNum = {rowNum}
            LoopContent = {({index}) => < LastestRecommandContentRow index = {index} colNum = {colNum} /> } />)
        }

        return (
            <>
                <Flex mt={spacing_params.top_margin} mx={[spacing_params.main_margin_mobile,  spacing_params.main_margin]}>
                    推荐 | 最新
                </Flex>
                <Flex mt={spacing_params.top_margin} mx={[spacing_params.main_margin_mobile,  spacing_params.main_margin]} className='text-center'>
                    <Box width={1}>
                        <LastestRecommandContentGrid rowNum ={5} colNums = {[5, 4, 2]} />
                    </Box>
                </Flex>
            </>
        )
    }
}

export default LastestRecommand