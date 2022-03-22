/* eslint-disable */

/**
 * @author Zhicheng Wang
 * @create date 2021-07-23 20:32:41
 * @modify date 2021-07-24 21:14:19
 */

import { Popover, Button, Input, message } from 'antd';
import React, { Component, useState, useEffect } from 'react';
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
const DOMAIN = "http://175.178.159.131:8084";
const API_LOGIN = `${DOMAIN}/v1/user/login`;
// const API_SIGNUP = `${DOMAIN}/v1/user/register`;
const API_VERIFICATION_CODE = `${DOMAIN}/v1/verification/code`;//"http://175.178.159.131:8084/v1/verification/code";


// const handle_signupRequest = (mail, name, pwd, veri) => {
//     // if (veri === verificationCode) {
//     //     verificationFailureWarning = "";
//     // console.log("Attempting to signup via: " + email + " " + nickname + " " + password);
//     const signupPormise = getSignupSerive({ email: mail, nickname: name, password: pwd });
//     signupPormise.then(
//         function (value) {
//             console.log('Signup success');
//             message.info('Signup Successful', 2.0);
//             // setTimeout(function () { history.push('/'); message.info('Welcome ' + val_email + ' !', 2.0); }, 2000);
//         },
//         function (value) {
//             console.log('Signup failture');
//             message.warn('The email you used is already registered', 2.0);
//         }
//     )
//     // }
//     // else{
//     //     verificationFailureWarning = "Verification Failed";
//     // }

// }
// const getSignupSerive = (params) => {
//     return request(`${API_SIGNUP}`, {
//         method: "post",
//         data: params,
//         requestType: "form"
//     });
// }


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
                            <Link to='/upload_work' key={btnInfo[0]} className={'my-link me-' + btnInfo[2]}>
                                <img src={btnInfo[0]} height={btnInfo[1]} width={btnInfo[1]} />
                            </Link>
                        )
                    }
                    else {
                        // const SignupComponent_content = () => {
                        //     return (
                        //         <ul style={{ textAlign: 'left', padding: 0, margin: 0 }}>
                        //             {/* <li><a href="/login">Login</a></li> */}
                        //             {/* <li><a href="/signup">Sign-up</a></li> */}
                        //             <h3> Signup </h3>
                        //             Email:      <Input id="mainMenuSignup_mail" type="email" /> <br />
                        //             Nickname:   <Input id="mainMenuSignup_nick" /> <br />
                        //             Password:   <Input id="mainMenuSignup_pass" type="password" /> <br />
                        //             Verification Code: <Input id="mainMenuSignup_veri" type="text" />
                        //             <img src={verificationImageURL} height='50px' width='100px' />
                        //             {/* <p className="veri-failed-warning">{verificationFailureWarning}</p> */}
                        //             {/* <li><a
                        //                 href="/"
                        //                 // style={{
                        //                 //     textDecoration: 'underline',
                        //                 //     color: 'blue'
                        //                 // }}
                        //                 // onClick={
                        //                  //     () => {
                        //                 //         const temp = document.getElementById("mainMenuPopup");
                        //                 //         // temp.innerHTML = renderToString(<LoginComponent_content/>);
                        //                 //         History.replaceState('/');
                        //                 //     }
                        //                 // }
                        //             >if you already have an account</a></li> <br /> */}
                        //             <li>-</li>
                        //             <Button onClick={
                        //                 () => {
                        //                     const account = document.getElementById("mainMenuSignup_mail");
                        //                     const nickname = document.getElementById("mainMenuSignup_nick");
                        //                     const password = document.getElementById("mainMenuSignup_pass");
                        //                     const veriCode = document.getElementById("mainMenuSignup_veri");
                        //                     console.log(`veriCode: ${veriCode.value}`);
                        //                     handle_signupRequest(account.value, nickname.value, password.value, veriCode.value);
                        //                 }
                        //             }> Continue </Button>
                        //         </ul>
                        //     )
                        // }
                        const LoginComponent_content = () => {

                            const [val_veriCodeResponse, set_ValVeriCodeResponse] = useState("");
                            const [val_veriImageURL, set_ValVeriImageURL] = useState("");
                            const [val_veriFailWarning, set_ValVeriFailWarning] = useState("");
                            const [val_borderWidth, set_ValBorderWidth] = useState("0");
                            const [isLoggedIn, set_IsLoggedIn] = useState(JSON.parse(localStorage.getItem('user'))?true:false);

                            const handle_loginRequest = (act, pwd, veri) => {
                                set_ValVeriFailWarning("");
                                set_ValBorderWidth("0");
                                if (veri.toUpperCase() === val_veriCodeResponse.toUpperCase()) {
                                    console.log('Verification success!');
                                    // verificationFailureWarning = "";
                                    // console.log("Attempting to login via: " + val_email + " " + val_passw);
                                    // verificationFailureWarning = "Fuck you";
                                    const loginPromise = getLoginService({ email: act, password: pwd });
                                    loginPromise.then(
                                        function (value) {
                                            // console.log('Login success');
                                            message.info('Login Successful', 2.0);
                                            console.log();
                                            localStorage.setItem('user', JSON.stringify({
                                                email: act,
                                                password: pwd
                                            }));
                                            set_IsLoggedIn(true);
                                            // setTimeout(function(){history.push('/');message.info('Welcome '+val_email + ' !', 2.0);}, 2000);
                                        },
                                        function (value) {
                                            // console.log('Login failture');
                                            message.warn('Either your <email> or <password> is incorrect', 2.0);
                                        }
                                    )
                                }
                                else {
                                    message.warn('Verification Failed!', 2.0);
                                    set_ValVeriFailWarning("Verification Failed");
                                    set_ValBorderWidth("1");
                                }
                            }

                            const handle_logoutRequest = ()=>{
                                localStorage.removeItem('user');
                                set_IsLoggedIn(false);
                            }
                            const getLoginService = (params) => {
                                return request(`${API_LOGIN}`, {
                                    method: "post",
                                    data: params,
                                    requestType: "form"
                                });
                            }

                            const handle_getVerificationCode = () => {
                                const verificationPromise = requestVerificationCode({ getCode: 123 });
                                verificationPromise.then(
                                    function (value) {
                                        console.log('Request veri code success');
                                        // console.log(JSON.stringify(value));
                                        set_ValVeriCodeResponse(value.Content);
                                        set_ValVeriImageURL(value.URL);
                                    },
                                    function (value) {
                                        console.log('Request veri code failture');
                                        message.warn('No CAPTCHA response', 2.0);
                                    }
                                )

                            }
                            const requestVerificationCode = (params) => {
                                return request(`${API_VERIFICATION_CODE}`, {
                                    method: "get",
                                    params: params,
                                    requestType: "json"
                                });
                            }
                            useEffect(handle_getVerificationCode, []);
                            return (
                                <div>
                                    {!isLoggedIn ?
                                        (
                                            <ul style={{ textAlign: 'left', padding: 0, margin: 0 }}>
                                                {/* <li><a href="/login">Login</a></li> */}
                                                {/* <li><a href="/signup">Sign-up</a></li> */}
                                                <h3> Welcome </h3>
                                                Account:  <Input id="mainMenuLogin_name" type="email" /> <br />
                                                Password: <Input id="mainMenuLogin_pass" type="password" /> <br />
                                                Verification Code: <div style={{ border: `${val_borderWidth}px solid red` }}><Input id="mainMenuLogin_veri" type="text" /></div>
                                                <p className="veri-failed-warning">{val_veriFailWarning}</p>
                                                <img style={{ marginTop: "5px" }} src={val_veriImageURL} height='50px' width='100px' />
                                                <li><a
                                                    href="/signup"
                                                // style={{
                                                //     textDecoration: 'underline',
                                                //     color: 'blue'
                                                // }}
                                                // onClick={
                                                //     () => {
                                                //         const temp = document.getElementById("mainMenuPopup");
                                                //         temp.innerHTML = renderToString(<SignupComponent_content />);
                                                //     }
                                                // }
                                                >if you don't have an account</a></li> <br />
                                                <Button onClick={
                                                    () => {

                                                        const account = document.getElementById("mainMenuLogin_name");
                                                        const passwrd = document.getElementById("mainMenuLogin_pass");
                                                        const veriCode = document.getElementById("mainMenuLogin_veri");

                                                        handle_loginRequest(account.value, passwrd.value, veriCode.value);
                                                    }
                                                }> Login </Button>
                                            </ul>
                                        ) :
                                        (<ul>
                                            <h3> Welcome </h3>
                                            <p>{JSON.parse(localStorage.getItem("user")).email}</p>
                                            <Button onClick={handle_logoutRequest}>Log out</Button>
                                        </ul>
                                        )}
                                </div>
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