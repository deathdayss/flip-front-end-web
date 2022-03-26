/**
 * @author Zhicheng Wang
 * @create date 2021-07-23 20:33:03
 * @modify date 2021-07-24 21:14:25
 */

import React, { Component } from 'react';
import { connect } from "react-redux";
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

import { setHeaderState } from '../../../redux/actions/creators/HeaderStateAction';
import { headerState } from '../../../data/constants/HeaderState';
import { searchToObj } from '../../../data/constants/CommonFunctions';
import './SectionButtons.scss'

const mapDispatchToProps = dispatch => ({
    setHeaderState: (headerState) => dispatch(setHeaderState(headerState))
})

const mapStateToProps = state => {
    return {
        localization: state.localization
    }
}

class SectionButtons extends Component {

    componentDidMount() {
        this.props.setHeaderState(headerState.SECTION)
    }

    render() {

        const SectionButtons = ({ sectionKeyWords, search }) => {
            return Object.keys(sectionKeyWords).map((key) => {
                return (
                    <Link key={key} to={'/?section=' + key} className={'my-link me-2 ms-2'}>
                        <span className={'section-link ' + (key === searchToObj(search).section ? 'header-section-underline' : '')} >
                            {sectionKeyWords[key]}
                        </span>
                    </Link>
                )
            })
        }

        return (
            <Row id='header-second-line-section'>
                {/* <Col className='my-auto text-center'>
                    <SectionButtons sectionKeyWords = {this.props.localization.words.header.section} search = {this.props.location.search}/>
                </Col> */}
            </Row>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(SectionButtons);