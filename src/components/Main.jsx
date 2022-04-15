/* eslint-disable */

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
import DragUpload from './upload_components/DragUpload.jsx'
import UploadForm from './upload_components/UploadForm1.jsx'


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
import LoginForm from './login_components/LoginForm.jsx'
import Rank from './rank/Rank'
import UpdateForm from './personal_centre_components/UpdateForm.jsx'
import CreationManagement from './personal_centre_components/CreationManagement.jsx'
import DragUpload1 from './personal_centre_components/DragUpload1.jsx'
import './Main.scss'
import { useHistory } from 'react-router-dom'
import PersonalPage from './personal_page/PersonalPage.jsx'

const mapStateToProps = state => { return { localization: state.localization } }
const mapDispatchToProps = dispatch => ({ useLangToChangeWords: (lang) => dispatch(useLangToChangeWords(lang)) })
class Main extends Component {
	componentDidMount() {
		// TODO: Check user login state
		// this.props.useLangToChangeWords('en')
		// console.log(this.props.localization.lang) //zh
	}

	render() {
		return (
			<Switch>
				<Route path='/devs'>
					<Route path='/devs/suowei'><Test_Suowei /></Route>
					<Route path='/devs/zhichent'><Test_Zhicheng /></Route>
				</Route>

				<Route path='/login' component={LoginForm} />
				<Route path='/signup' component={SignUpForm} />
				<Route path='/register' component={SignUpForm} />

				<Route path='/'>
					{/* <Route exact path="/"> <Redirect to="/home" /> </Route>          */} {/* TODO: Perform login check (SEE NEXT LINE)*/}
					{/* {loggedIn ? <Redirect to="/dashboard" /> : <PublicHomePage />} */}
					{/* HEADERS */}
					<Switch>
						<Route exact path='/' component={Header} />             {/* TODO: Make a header for the main page */}
						<Route path='/user' component={UserHeader} />
						<Route path='/upload' component={Header} />         {/* TODO: Make a header for the  page */}
						<Route path='/play' component={Play} />
					</Switch>
					{/* CONTENT */}
					<Route exact path='/' component={Homepage} />
					<Route path='/user' component={UserContent} />
					<Route path='/upload_work' component={DragUpload} />   {/* TODO: Fix the formatting of the upload box */}
					<Route path='/upload_form' component={UploadForm} /> {/* TODO: Make a content for the upload form page*/}
					<Route path='/gameDisplay' component={GameDisplay} />
					<Route path='/rank' component={Rank} />
					<Route path='/personal_centre' component={UpdateForm} />
					<Route path='/my_game' component={CreationManagement} />
					<Route path='/update_game' component={DragUpload1} />
					<Route path='/personal_page' component={PersonalPage} />
				</Route>
			</Switch>
		);
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main))