/**
 * @author Zhicheng Wang
 * @create date 2021-07-23 20:33:55
 * @modify date 2021-07-24 21:16:49
 */

import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from "react-redux";

import Header from './header_components/HeaderComponent.jsx'
import { useLangToChangeWords } from '../redux/actions/creators/LocalizationAction'
import Homepage from './homepage_components/HomepageComponent.jsx'

const mapStateToProps = state => {
    return {
        localization: state.localization
    }
}

const mapDispatchToProps = dispatch => ({
    useLangToChangeWords: (lang) => dispatch(useLangToChangeWords(lang))
})

class Main extends Component {
    componentDidMount() {
        // TODO: Check user login state
        this.props.useLangToChangeWords(this.props.localization.lang)
        console.log(this.props.location)
    }

    pressButton = () => {

    }

    render() {
        return (
            <div>
                <Header />
                <Switch>
                    <Route exact path='/' component= {Homepage} />
                    {/* <Route exact path='/test' component={() => <div>Hi</div>} /> */}
                    {/* <Route path='/test' component={() => <Header />} /> */}
                    {/* <Redirect to="/EN" /> */}
                </Switch>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main))