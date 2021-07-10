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
        localization: state.localization,
    }
}

const mapDispatchToProps = dispatch => ({
    useLangToChangeWords: (lang) => dispatch(useLangToChangeWords(lang))
})


class Main extends Component {
    componentDidMount() {
        this.props.useLangToChangeWords(this.props.localization.lang)
        console.log('componentDidMount');
        
    }

    pressButton = () => {
        console.log('pressButton')
        // history.push('/')
        console.log(this.props.localization.lang)

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