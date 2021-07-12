import React, { Component } from 'react';
import { connect } from "react-redux";
import { Switch, Route } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";

import { setState } from '../../redux/actions/creators/HeaderStateAction';
import './header-second-layer.scss'

const mapDispatchToProps = dispatch => ({
    setState: (headerState) => dispatch(setState(headerState))
})

const mapStateToProps = state => {
    return {
        localization: state.localization,
    }
}

const sectionMarks = ['fanmade', 'real_world', 'traditional']


class HeaderSecondLayer extends Component {

    componentDidMount() {

    }

    render() {
        // console.log(this.props.location.pathname)
        const SubsectionButtons = ({ subsection }) => {
            // console.log(match.params)
            console.log(subsection)
            return (
                <Row id='header-second-line-section'>
                    <Col className='my-auto text-center'>
                        <div className = 'header-subsection-underline'>
                         12345
                        </div>
                    </Col>
                </Row>
            )
        }
        return (
            <Row>
                <Switch>
                    <Route exact path='/' component={() => <SubsectionButtons subsection='main' />} />
                    <Route exact path='/page_id=:id' component={<SubsectionButtons subsection='main' />} />
                    {() => (
                        sectionMarks.map(sectionMark => <Route path={'/' + sectionMark} component={() => <SubsectionButtons subsection={sectionMark} />} />
                        ))}
                </Switch>
            </Row>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderSecondLayer);