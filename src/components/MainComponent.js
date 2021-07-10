import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { Button } from 'reactstrap';
import { connect } from "react-redux";
import { actions } from 'react-redux-form'

import Test from './TestComponent.js'
import Header from './HeaderComponent'
import { useLangToChangeWords } from '../redux/actions/creators/LocalizationAction'

const mapStateToProps = state => {
    return {
        formInfo: state.searchBar,
        localization: state.localization,
    }
}

const mapDispatchToProps = dispatch => ({
    useLangToChangeWords: (lang) => dispatch(useLangToChangeWords(lang))
})


class Main extends Component {
    componentDidMount() {
        // TODO: Check user state
        this.props.useLangToChangeWords(this.props.localization.lang)
        console.log('componentDidMount');
        
    }

    pressButton = () => {
        console.log('pressButton')
        // history.push('/')
        console.log(this.props.formInfo)

    }

    render() {
        return (
            <div>

                <Header />
                Hello World!
                <Button outline onClick={this.pressButton}>Submit Comment</Button>
                <Switch>
                    {/* <Route exact path */}
                    {/* <Route exact path='/test' component={() => <div>Hi</div>} /> */}
                    <Route path='/test' component={() => <Test />} />
                    {/* <Redirect to="/EN" /> */}
                </Switch>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main))