/**
 * @author Zhicheng Wang
 * @create date 2021-07-23 20:33:55
 * @modify date 2021-07-24 21:16:49
 */

import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from "react-redux";

import Header from './header_components/Header.jsx'
import Homepage from './homepage_components/Homepage.jsx'
import { useLangToChangeWords } from '../redux/actions/creators/LocalizationAction'
import DragUpload from './upload_components/DragUpload'

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
                    
                    <Route exact path='/upload/file' component={DragUpload}/>       {/* Router for the "game drag and drop" uploading page */}
                    {/* <Route exact path='/upload/form/:id'/> */}                   {/* Router for the "fill in game info"  uploading page*/}
                    {/* Notice that the id placehodler here is for after retrieving the unique generated id from backend, two-step-request */}

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