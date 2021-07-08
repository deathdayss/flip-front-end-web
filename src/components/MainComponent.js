import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { actions } from 'react-redux-form'
import { TransitionGroup, CSSTransition } from 'react-transition-group';

class Main extends Component {
    componentDidMount() {

    }

    render() {
        return (
            <div>
                
                {/* <Header /> */}
                Hello World!

                <Switch>
                </Switch>
                {/* <Footer /> */}
            </div>
        );
    }
}

export default Main