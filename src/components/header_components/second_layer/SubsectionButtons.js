import React, { Component } from 'react';
import { connect } from "react-redux";
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

import { setHeaderState } from '../../../redux/actions/creators/HeaderStateAction';
import { headerState } from '../../../data/constants/HeaderState';
import { sectionRouteMarks } from '../../../data/constants/SectionRouteMarks'
import './SubsectionButtons.scss'

const mapDispatchToProps = dispatch => ({
    setHeaderState: (headerState) => dispatch(setHeaderState(headerState))
})

const mapStateToProps = state => {
    return {
        localization: state.localization
    }
}

class SubsectionButtons extends Component {

    componentDidMount() {
        this.props.setHeaderState(headerState.SUBSECTION)
    }

    routeSectionParamsToIndex = (params) => {
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

    render() {

        const chosenSectionIndex = this.routeSectionParamsToIndex(this.props.subsection)
        const subsectionWordsObject = this.props.localization.words.header.subsection
        const SectionButtons = Object.keys(subsectionWordsObject).map((key, index) => {
            const hasUnderline = chosenSectionIndex === index
            return (
                <Link Key={key} to={'/' + sectionRouteMarks[index]} className={'my-link me-2 ms-2'}>
                    <span className={'subsection-link ' + (hasUnderline ? 'header-subsection-underline' : '')} >
                        {subsectionWordsObject[key]}
                    </span>
                </Link>
            )
        })

        return (
            <Row id='header-second-line-section'>
                <Col className='my-auto text-center'>
                    {SectionButtons}
                </Col>
            </Row>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(SubsectionButtons);