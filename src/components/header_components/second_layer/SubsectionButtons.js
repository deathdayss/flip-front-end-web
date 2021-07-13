import React, { Component } from 'react';
import { connect } from "react-redux";
import { Row, Col } from 'reactstrap';

import { setHeaderState } from '../../../redux/actions/creators/HeaderStateAction';
import { headerState } from '../../../data/constants/HeaderState';
import { sectionRouteMarks } from '../../../data/constants/SectionRouteMarks'
import './SubsectionButtons.scss'
import { Link } from 'react-router-dom';

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

const keyToRoute = key => {
    switch(key) {
        case 'realWorld':
            return 'real_world'
        default:
            return key
    }
}

class SubsectionButtons extends Component {

    componentDidMount() {
        this.props.setHeaderState(headerState.SUBSECTION)
    }

    render() {

        const chosenSectionIndex = routeSectionParamsToIndex(this.props.subsection)
        const subsectionWordsObject = this.props.localization.words.header.subsection
        const SectionButtons = Object.keys(subsectionWordsObject).map((key, index) => {
            const hasUnderline = chosenSectionIndex === index

            return (
                <Link to={'/' + keyToRoute(key)} className={'my-link me-2 ms-2'}>
                    <span className = {'subsection-link ' + (hasUnderline ? 'header-subsection-underline' : '')} >
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