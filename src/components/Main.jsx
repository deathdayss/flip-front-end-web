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

import UserFrame                from './user/index.js'
import Null_Component           from './user/Null_Component.js'
import UserHome                 from './user/home/UserHome.js'
import UserWork                 from './user/work/UserWork'
import UserNotification         from './user/notification/UserNotification'
import UserSubscription         from './user/subscription/UserSubscription'
import UserSetting              from './user/setting/UserSetting'
import UserContent from './user/UserContent';
import UserHeader from './user/UserHeader';


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

    // render() {
    //     return (
    //         <div>
    //             <Header/>
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
            <Layout className="layout_root">
                {/* INDEX/HOME */}
                    {/* <Route exact path="/"> <Redirect to="/home" /> </Route>          */} {/* TODO: Perform login check (SEE NEXT LINE)*/} 
                    {/* {loggedIn ? <Redirect to="/dashboard" /> : <PublicHomePage />} */}
                {/* HEADERS */}
                    <Route exact path='/'        component= {Header}/>                {/* TODO: Make a header for the main page */}       
                    <Route path='/user'        component= {UserHeader}/>
                    <Route path='/upload'      component= {UserHeader}/>            {/* TODO: Make a header for the  page */}
                {/* CONTENT */}
                    <Route exact path='/'  component= {Homepage}/>
                    <Route path='/user'        component= {UserContent}/>
                    <Route path='/upload/file' component= {DragUpload}/>            {/* TODO: Fix the formatting of the upload box */}
                    {/* <Route path='/upload/form' component={UploadForm}/>  TODO: Make a content for the upload form page*/}
            </Layout>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main))