import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter  } from 'react-router-dom';
import { Button } from 'reactstrap';
import { connect } from "react-redux";
import { actions } from 'react-redux-form'

import Test from './TestComponent.js'

class Main extends Component {
    componentDidMount() {

    }

    pressButton() {
        console.log('pressButton')
        // history.push('/')
    }

    render() {
        return (
            <div>

                {/* <Header /> */}
                Hello World!
                <Button outline onClick={this.pressButton}>Submit Comment</Button>
                <Switch>
                    {/* <Route exact path */}
                    {/* <Route exact path='/test' component={() => <div>Hi</div>} /> */}
                    <Route path='/test/:id' component={() => <Test a = {'1234'}/>} />
                    {/* <Redirect to="/EN" /> */}
                </Switch>
            </div>
        );
    }
}

export default Main