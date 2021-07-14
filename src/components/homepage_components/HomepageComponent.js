import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'

import './HomepageComponent.scss'

var qs = require('qs')

class Homepage extends Component {
    componentDidMount() {

    }
    render() {
        return (
            <Container fluid  id='main-page-container'>
                <Row className=''>
                    <Col>
                    1
                    </Col>
                    <Col>
                    2
                    </Col>
                    <Col>
                    3
                    </Col>
                    <Col>
                    4
                    </Col>
                    <Col>
                    5
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Homepage