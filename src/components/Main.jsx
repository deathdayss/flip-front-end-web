/**
 * @author Zhicheng Wang, Suowei Hu
 * @create date 2021-07-23 20:33:55
 * @modify date 2021-08-13 11:58:17
 */

import React, { Component } from 'react';
import { Redirect, Switch, Route, withRouter, Link } from 'react-router-dom';
import { connect } from "react-redux";
import { Layout, Menu, Breadcrumb } from 'antd';

import { useLangToChangeWords } from '../redux/actions/creators/LocalizationAction'
import Header from './header_components/Header.jsx'
import Homepage from './homepage_components/Homepage.jsx'
import DragUpload from './upload_components/DragUpload'

// import UserFrame from './user/index.js'
// import Null_Component from './user/Null_Component.js'
// import UserHome from './user/home/UserHome.js'
// import UserWork from './user/work/UserWork'
// import UserNotification from './user/notification/UserNotification'
// import UserSubscription from './user/subscription/UserSubscription'
// import UserSetting from './user/setting/UserSetting'
import Play from './Test_Components/PlayComponent';
import UserContent from './user/UserContent';
import UserHeader from './user/UserHeader';
import Test_Suowei from './Test_Suowei';
import Test_Zhicheng from './Test_Zhicheng'
import GameDisplay from './game/GameDisplay';
import SignUpForm from './signup_components/SignUpForm.jsx'
import LoginForm  from './login_components/LoginForm.jsx'


const mapStateToProps = state => {return {localization: state.localization}}
const mapDispatchToProps = dispatch => ({useLangToChangeWords: (lang) => dispatch(useLangToChangeWords(lang))})
class Main extends Component {
    componentDidMount() {
        // TODO: Check user login state
        this.props.useLangToChangeWords(this.props.localization.lang)
        console.log(this.props.location)
    }

    render() {
        return (
            <Layout className="layout_root">
                {/* INDEX/HOME */}
                <Switch>
                    <Route path='/devs'>
                        <Route path='/devs/suowei'><Test_Suowei/></Route>
                        <Route path='/devs/zhichent'><Test_Zhicheng/></Route>
                    </Route>
                    <Route path='/login' component={LoginForm}/>
                    <Route path='/singup' component={SignUpForm}/>
                    <Route path='/'> 
                        {/* <Route exact path="/"> <Redirect to="/home" /> </Route>          */} {/* TODO: Perform login check (SEE NEXT LINE)*/}
                        {/* {loggedIn ? <Redirect to="/dashboard" /> : <PublicHomePage />} */}
                        {/* HEADERS */}
                        <Route exact path='/' component={Header} />             {/* TODO: Make a header for the main page */}
                        <Route path='/user' component={UserHeader} />
                        <Route path='/upload' component={UserHeader} />         {/* TODO: Make a header for the  page */}
                        <Route path='/play' component={Play} />
                        {/* CONTENT */}
                        <Route exact path='/' component={Homepage} />
                        <Route path='/user' component={UserContent} />
                        <Route path='/upload/file' component={DragUpload} />   {/* TODO: Fix the formatting of the upload box */}
                        {/* <Route path='/upload/form' component={UploadForm}/>  TODO: Make a content for the upload form page*/}
                    </Route>
                </Switch>
            </Layout>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main))