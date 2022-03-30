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
import SignUpForm from '../../signup_components/SignUpForm';


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


// const openSignup = (mail, name, pwd, veri) => {
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
const HeaderFirstLayer = function (props) {

    const [isLoggedIn, set_IsLoggedIn] = useState(JSON.parse(localStorage.getItem('user')) ? true : false);
    const [shouldLoginDisplay, set_LoginDisplay] = useState(false);
    const [shouldSignupDisplay, set_SignupDisplay] = useState(false);

    const openLogin = () => {
        set_SignupDisplay(false);
        set_LoginDisplay(true);
    }
    const openSignup = () => {
        set_LoginDisplay(false);
        set_SignupDisplay(true);
    }
    const closeLogin = () => {
        set_LoginDisplay(false);
    }
    const closeSignup = () => {
        set_SignupDisplay(false);
    }
    const handle_logoutRequest = () => {
        localStorage.removeItem('user');
        set_IsLoggedIn(false);
    }


    const handleRankBtn = () => { }
    // TODO: press the search button
    const headerSearch = value => { props.toggleLanguage(props.localization.lang) }


    const HeaderRightContent = ({ btnsInfo }) => {




        return btnsInfo.map((btnInfo, index) => {
            if (index != btnsInfo.length - 1) {
                return (
                    <Link to='/upload_work' key={btnInfo[0]} className={'my-link me-' + btnInfo[2]}>
                        <img src={btnInfo[0]} height={btnInfo[1]} width={btnInfo[1]} />
                    </Link>
                )
            }
            else {
                return (
                    <Popover
                        title={
                            ""
                        }
                        content={
                            <div id="mainMenuPopup" >
                                {!isLoggedIn ?
                                    (
                                        <div style={{ position: 'relative', textAlign: 'center', padding: '10px', margin: 0 }}>
                                            <h3> Welcome </h3>
                                            <Button onClick={openLogin}>Log in</Button>
                                            <div style={{}}>
                                                <p>Don't have an account?</p>
                                                <div style={{ color: 'red', cursor: 'pointer' }} onClick={openSignup}>Sign up</div>
                                            </div>
                                        </div>
                                    ) :
                                    (<div style={{ textAlign: 'center', padding: '10px', margin: 0 }}>
                                        <h3> Welcome </h3>
                                        <p>{JSON.parse(localStorage.getItem("user")).email}</p>
                                        <Button onClick={handle_logoutRequest}>Log out</Button>
                                    </div>
                                    )}
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

    return (
        <div className="first-layer-general">
            <Row id={props.headerState.headerState === headerState.NORMAL ? 'header-first-line' : 'header-first-line-have-second'} >
                <Col xs='3' md='2' lg='1' id='logo' className='my-auto'>
                    <Link to='/' className='my-link' onClick={handleRankBtn}>
                        <img src='images/header/logo.svg' />
                    </Link>
                    {/* TODO: change Link */}
                    <Link to='/TobeChanged3' id='rank-btn-hide' className='my-link ms-3' onClick={handleRankBtn}>
                        <img src='images/header/header_rank_btn.svg' height='28' width='28' />
                    </Link>
                </Col>
                <Col xs='auto' md='5' lg='7' xl={{ size: '6', offset: '1' }} className='my-auto text-end'>
                    <Link to='/rank' id='rank-btn' className='my-link' onClick={handleRankBtn}>
                        <img src='images/header/header_rank_btn.svg' height='28' width='28' />
                    </Link>
                    <Form model='headerSearchBar' onSubmit={headerSearch}
                        className='my-auto' id='header-search-bar-form'>
                        <Control.text id='header-search-bar' model=".searchWord"
                            placeholder={props.localization.words.header.headerSearchbarHolder}
                        />
                        <button className='my-btn'>
                            <img id='header-search-submit-btn-image' src='images/header/header_search_btn.svg' />
                        </button>
                    </Form>
                </Col>
                <Col xs='8' md='5' lg='4' xl='4' className='header-user-btn my-auto text-end'>
                    <HeaderRightContent btnsInfo={headerRightBtnInfos} />
                </Col>
            </Row>
            {shouldLoginDisplay && (<LoginForm set_IsLoggedIn={set_IsLoggedIn} closeLogin={closeLogin} switchToSignup={openSignup} />)}
            {shouldSignupDisplay && (<SignUpForm set_IsLoggedIn={set_IsLoggedIn} closeSignup={closeSignup} switchToLogin={openLogin} />)}
        </div>
    );

}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderFirstLayer);