import React, { Component } from 'react';
import { connect } from "react-redux";
import { Row, Col } from 'reactstrap';

import { setHeaderState } from '../../../redux/actions/creators/HeaderStateAction';
import { headerState } from '../../../data/constants/HeaderState';
import {sectionRouteMarks} from '../../../data/constants/SectionRouteMarks'
import './SubsectionButtons.scss'

const mapDispatchToProps = dispatch => ({
    setHeaderState: (headerState) => dispatch(setHeaderState(headerState))
})

const mapStateToProps = state => {
    return {
        localization: state.localization
    }
}

const routeSectionParamsToIndex = params => {
    if (params === 'Main') {
        return -1
    }
    else {
        for (let i = 0; i < sectionRouteMarks.length; ++i) {
            if (params === sectionRouteMarks[i]) {
                return i;
            }
        }
    }
}

class SubsectionButtons extends Component {

    componentDidMount() {
        this.props.setHeaderState(headerState.SUBSECTION)
    }

    render() {

        // const chosenSectionIndex = routeSectionParamsToIndex(this.props.subsection)

        // const subsectionWordsObject = this.props.localization.words.header.subsection
        // const sectionButtons = Object.keys.(subsectionWordsObject)
        // const sectionButtons = Object.keys.(subsectionWordsObject).map((key, index) => {
        //     const hasUnderline = chosenSectionIndex === index
        //     return (
        //         <div Key = {key}>
        //             {word}
        //         </div>
        //     )
        // })

        // for (let key in this.props.localization.words.header.subsection) {
        //     console.log(key)
        // }

        return (
            <Row id='header-second-line-section'>
                <Col className='my-auto text-center'>
                    {/* {sectionButtons} */}1234
                </Col>
            </Row>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(SubsectionButtons);