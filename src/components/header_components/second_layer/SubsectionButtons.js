import React, { Component } from 'react';
import { connect } from "react-redux";
import { Row, Col } from 'reactstrap';

import { setState } from '../../../redux/actions/creators/HeaderStateAction';
import { headerState } from '../../../data/constants/HeaderState';
import './SubsectionButtons.scss'

const mapDispatchToProps = dispatch => ({
    setState: (headerState) => dispatch(setState(headerState))
})

const mapStateToProps = state => {
    return {
        localization: state.localization
    }
}

class SubsectionButtons extends Component {

    componentDidMount() {
        this.props.setState(headerState.SUBSECTION)
    }

    render() {
        return (
            <Row id='header-second-line-section'>
                <Col className='my-auto text-center'>
                    <div className='header-subsection-underline'>
                        12345
                    </div>
                </Col>
            </Row>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(SubsectionButtons);