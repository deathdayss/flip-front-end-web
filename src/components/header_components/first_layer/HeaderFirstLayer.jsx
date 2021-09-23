/**
 * @author Zhicheng Wang
 * @create date 2021-07-23 20:32:41
 * @modify date 2021-07-24 21:14:19
 */

import { Popover, Button, Input, message } from 'antd';
import React, { Component } from 'react';
import { connect } from "react-redux";
import { Row, Col } from 'reactstrap';
import { Control, Form } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { renderToString } from 'react-dom/server'

import { fetchHeaderSearch } from '../../../redux/actions/creators/SearchAction'
import { toggleLanguage } from '../../../redux/actions/creators/LocalizationAction'
import { headerRightBtnInfos } from '../../../data/public_related/HeaderRightContentPath'
import { headerState } from '../../../data/constants/HeaderState'
import './HeaderFirstLayer.scss'
import LoginForm from '../../login_components/LoginForm';
import request from 'umi-request';

const mapDispatchToProps = dispatch => ({
    toggleLanguage: (lang) => dispatch(toggleLanguage(lang)),
    fetchHeaderSearch: (values) => dispatch(fetchHeaderSearch(values))
})

const mapStateToProps = state => {
    return {
        localization: state.localization,
        authentication: state.authentication,
        headerState: state.headerState
    }
}

// TODO: Check Login State
// const loginBeforeAfter = (userInfo) => {
//     if (userInfo === null) {
//         return (
//             <div>Not Login</div>
//         )
//     }
//     else {
//         <div>Logined</div>
//     }
// }

// ==========================================================================================
// Login service
const DOMAIN = "http://106.52.167.166:8084"
const API_LOGIN = `${DOMAIN}/v1/user/login`
const API_SINGUP = `${DOMAIN}/v1/user/register`

const handle_loginRequest = (act, pwd) => {
    // console.log("Attempting to login via: " + val_email + " " + val_passw);
    const loginPormise = getLoginService({ email: act, password: pwd });
    loginPormise.then(
        function (value) {
            // console.log('Login success');
            message.info('Login Successful', 2.0);
            // setTimeout(function(){history.push('/');message.info('Welcome '+val_email + ' !', 2.0);}, 2000);
        },
        function (value) {
            // console.log('Login failture');
            message.warn('Either your <email> or <password> is incorrect', 2.0);
        }
    )
}
const getLoginService = (params) => {
    return request(`${API_LOGIN}`, {
        method: "post",
        data: params,
        requestType: "form"
    });
}
const handle_signupRequest = (mail, name, pwd) => {
    // console.log("Attempting to signup via: " + email + " " + nickname + " " + password);
    const signupPormise = getSignupSerive({ email: mail, nickname: name, password: pwd });
    signupPormise.then(
        function (value) {
            console.log('Singup success');
            message.info('Signup Successful', 2.0);
            // setTimeout(function () { history.push('/'); message.info('Welcome ' + val_email + ' !', 2.0); }, 2000);
        },
        function (value) {
            console.log('Signup failture');
            message.warn('The email you used is already registered', 2.0);
        }
    )
}
const getSignupSerive = (params) => {
    return request(`${API_SINGUP}`, {
        method: "post",
        data: params,
        requestType: "form"
    });
}

// ==========================================================================================
// Main component
class HeaderFirstLayer extends Component {

    handleRankBtn = () => { }
    // TODO: press the search button
    headerSearch = value => { this.props.toggleLanguage(this.props.localization.lang) }
    componentDidMount() { }

    render() {


        //TODO: Change the link here
        const HeaderRightContent = ({ login, btnsInfo }) => {
            if (login) {
                return btnsInfo.map((btnInfo, index) => {
                    if (index != btnsInfo.length - 1) {
                        return (
                            <Link to='/TobeChanged1' key={btnInfo[0]} className={'my-link me-' + btnInfo[2]}>
                                <img src={btnInfo[0]} height={btnInfo[1]} width={btnInfo[1]} />
                            </Link>
                        )
                    }
                    else {
                        const SignupComponent_content = () => {
                            return (
                                <ul style={{ textAlign: 'left', padding: 0, margin: 0 }}>
                                    {/* <li><a href="/login">Login</a></li> */}
                                    {/* <li><a href="/signup">Sign-up</a></li> */}
                                    <h3> Signup </h3>
                                    Email:      <Input id="mainMenuSignup_mail" type="email"/> <br />
                                    Nickname:   <Input id="mainMenuSignup_nick" /> <br />
                                    Password:   <Input id="mainMenuSignup_pass" type="password"/>
                                    {/* <li><a
                                        href="/"
                                        // style={{
                                        //     textDecoration: 'underline',
                                        //     color: 'blue'
                                        // }}
                                        // onClick={
                                        //     () => {
                                        //         const temp = document.getElementById("mainMenuPopup");
                                        //         // temp.innerHTML = renderToString(<LoginComponent_content/>);
                                        //         History.replaceState('/');
                                        //     }
                                        // }
                                    >if you already have an account</a></li> <br /> */}
                                    <li>-</li>
                                    <Button onClick={
                                        () => {
                                            const account = document.getElementById("mainMenuSignup_mail");
                                            const nickname = document.getElementById("mainMenuSignup_nick");
                                            const password = document.getElementById("mainMenuSignup_pass");
                                            handle_signupRequest(account.value, nickname.value, password.value)
                                        }
                                    }> Continue </Button>
                                </ul>
                            )
                        }
                        const LoginComponent_content = () => {
                            return (
                                <ul style={{ textAlign: 'left', padding: 0, margin: 0 }}>
                                    {/* <li><a href="/login">Login</a></li> */}
                                    {/* <li><a href="/signup">Sign-up</a></li> */}
                                    <h3> Welcome </h3>
                                    Account:  <Input id="mainMenuLogin_name" type="email"/> <br />
                                    Password: <Input id="mainMenuLogin_pass" type="password"/>
                                    <li><a
                                        // href="/signup"
                                        style={{
                                            textDecoration: 'underline',
                                            color: 'blue'
                                        }}
                                        onClick={
                                            () => {
                                                const temp = document.getElementById("mainMenuPopup");
                                                temp.innerHTML = renderToString(<SignupComponent_content/>);
                                            }
                                        }
                                    >if you don't have an account</a></li> <br />
                                    <Button onClick={
                                        () => {
                                            const account = document.getElementById("mainMenuLogin_name");
                                            const passwrd = document.getElementById("mainMenuLogin_pass");
                                            handle_loginRequest(account.value, passwrd.value)
                                        }
                                    }> Login </Button>
                                </ul>
                            )
                        }
                        return (
                            // <Link to='/TobeChanged2' key={btnInfo[0]} className={'my-link me-lg-4 me-xl-5'}>
                            <Popover
                                title={
                                    ""
                                }
                                content={
                                    <div id="mainMenuPopup" >
                                        <LoginComponent_content />
                                    </div>
                                }
                                key={btnInfo[0]}
                                className={'my-link me-lg-4 me-xl-5'}
                                trigger='hover'
                                placement="leftTop"
                            >
                                {/* <Button type="primary"> 123</Button> */}
                                <img src={btnInfo[0]} height={btnInfo[1]} width={btnInfo[1]} />
                            </Popover>
                            // </Link>
                        )
                    }
                })
            }
            else {
                return (
                    <>
                        <button id='header-signup-btn' className='theme-color-0-btn me-md-3'>
                            {this.props.localization.words.header.signup}
                        </button>
                        <button id='header-login-btn' className='me-md-5'>
                            {this.props.localization.words.header.login}
                        </button>
                    </>
                )
            }
        }

        return (
            <Row id={this.props.headerState.headerState === headerState.NORMAL ? 'header-first-line' : 'header-first-line-have-second'} >
                <Col xs='3' md='2' lg='1' id='logo' className='my-auto'>
                    <Link to='/' className='my-link' onClick={this.handleRankBtn}>
                        <img src='images/header/logo.svg' />
                    </Link>
                    {/* TODO: change Link */}
                    <Link to='/TobeChanged3' id='rank-btn-hide' className='my-link ms-3' onClick={this.handleRankBtn}>
                        <img src='images/header/header_rank_btn.svg' height='28' width='28' />
                    </Link>
                </Col>
                <Col xs='auto' md='5' lg='7' xl={{ size: '6', offset: '1' }} className='my-auto text-end'>
                    <Link to='/' id='rank-btn' className='my-link' onClick={this.handleRankBtn}>
                        <img src='images/header/header_rank_btn.svg' height='28' width='28' />
                    </Link>
                    <Form model='headerSearchBar' onSubmit={this.headerSearch}
                        className='my-auto' id='header-search-bar-form'>
                        <Control.text id='header-search-bar' model=".searchWord"
                            placeholder={this.props.localization.words.header.headerSearchbarHolder}
                        />
                        <button className='my-btn'>
                            <img id='header-search-submit-btn-image' src='images/header/header_search_btn.svg' />
                        </button>
                    </Form>
                </Col>
                <Col xs='8' md='5' lg='4' xl='4' className='header-user-btn my-auto text-end'>
                    <HeaderRightContent login={true} btnsInfo={headerRightBtnInfos} />
                </Col>
            </Row>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderFirstLayer);