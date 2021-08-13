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

import UserFrame                from './user/index.js'
import Null_Component           from './user/Null_Component.js'
import UserHome                 from './user/home/UserHome.js'
import UserWork                 from './user/work/UserWork'
import UserNotification         from './user/notification/UserNotification'
import UserSubscription         from './user/subscription/UserSubscription'
import UserSetting              from './user/setting/UserSetting'


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

    // render() {
    //     return (
    //         <div>
    //             <Header />
    //             <Switch>

    //                 <Route exact path='/upload/file' component={DragUpload}/>       {/* Router for the "game drag and drop" uploading page */}
    //                 {/* <Route exact path='/upload/form/:id'/> */}                   {/* Router for the "fill in game info"  uploading page*/}
    //                 {/* Notice that the id placehodler here is for after retrieving the unique generated id from backend, two-step-request */}

    //                 <Route exact path='/' component= {Homepage} />
    //                 {/* <Route exact path='/test' component={() => <div>Hi</div>} /> */}
    //                 {/* <Route path='/test' component={() => <Header />} /> */}
    //                 {/* <Redirect to="/EN" /> */}
    //             </Switch>
    //         </div>
    //     );
    // }

    // Replace the original layout with the AND pre-specified layout
    render() {
        return (
            // {/* <Route path="/user" component={UserFrame} /> */}
            // {/* <Route path="/index" component={Temp_Welcome} /> */}
            // {/* <Route path="/" component={Temp_Welcome} /> */}
            <UserFrame>
                <Switch>
                    <Route exact path='/' component= {Homepage} />
                    <Route exact path="/user/work" component={UserWork} />
                    <Route exact path="/user/home" component={UserHome} />
                    <Route exact path="/user/notification" component={UserNotification} />
                    <Route exact path="/user/subscription" component={UserSubscription} />
                    <Route exact path="/user/setting" component={UserSetting} />
                </Switch>
            </UserFrame>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main))