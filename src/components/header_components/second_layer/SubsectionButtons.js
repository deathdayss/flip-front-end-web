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

        const SectionButtons = ({localization, sectionRouteMark}) => {
            const chosenSectionIndex = this.routeSectionParamsToIndex(sectionRouteMark)
            const subsectionWordsObject = localization.words.header.subsection
            return Object.keys(subsectionWordsObject).map((key, index) => {
                return (
                    <Link key ={key} to={'/' + sectionRouteMarks[index]} className={'my-link me-2 ms-2'}>
                        <span className={'subsection-link ' + (chosenSectionIndex === index ? 'header-subsection-underline' : '')} >
                            {subsectionWordsObject[key]}
                        </span>
                    </Link>
                )
            })
        }

        return (
            <Row id='header-second-line-section'>
                <Col className='my-auto text-center'>
                    <SectionButtons localization = {this.props.localization} sectionRouteMark = {this.props.sectionRouteMark} />
                </Col>
            </Row>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(SubsectionButtons);