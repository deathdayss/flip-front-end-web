import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'

var qs = require('qs')

class Homepage extends Component {
    componentDidMount() {
        console.log(qs.stringify(qs.parse(this.props.location.search.substring(1, this.props.location.search.length))))
    }
    render() {
        return (
            <div>Homepage</div>
        )
    }
}

export default Homepage