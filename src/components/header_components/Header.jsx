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

import { fetchHeaderSearch } from '../../redux/actions/creators/SearchAction'
import { toggleLanguage } from '../../redux/actions/creators/LocalizationAction'
import { headerRightBtnInfos } from '../../data/public_related/HeaderRightContentPath'
import { headerState } from '../../data/constants/HeaderState'
import './Header.scss'
import LoginForm from '../login_components/LoginForm';
import SignUpForm from '../signup_components/SignUpForm';

const { Search } = Input;

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
const Header = function (props) {

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

  const PersonalSocialInfo = (props) =>{
    return (
      <div style={{width: '80px', height:'80px', display:'flex',flexDirection:'column',justifyContent: 'center'}}>
        <p>{props.name}</p>
        <p style={{fontWeight: 'bold'}}>{props.value}</p>
      </div>
    );
  }

  const HeaderRightContent = ({ btnsInfo }) => {



    return btnsInfo.map((btnInfo, index) => {
      if (index != 0) {
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
              <div>
                {!isLoggedIn ?
                  (
                    <div className='main-menu-popup-login'>
                      
                      <div className='main-menu-popup-item-login' onClick={openLogin} style={{backgroundColor:'#F6EAFF', cursor:'pointer', lineHeight:'60px'}}>Log in</div>
                      <div className='main-menu-popup-item-login'>
                        <div>First time using this?<br /> Click to <span style={{ color: '#DC06FF', textDecoration: 'underline', cursor: 'pointer' }} onClick={openSignup}>Sign up</span></div>
                      </div>
                    </div>
                  ) :
                  (<div className="main-menu-popup">
                    <div className='main-menu-popup-item' style={{fontSize: '20px'}}> game point: 9000 </div>
                    <div className="personal-social-info-groups main-menu-popup-item">
                      <PersonalSocialInfo name='Following' value='33' />
                      <PersonalSocialInfo name='Followed' value='5' />
                      <PersonalSocialInfo name='XXX' value='2' />
                    </div>
                    <div className='main-menu-popup-item' style={{backgroundColor: '#EEE'}}>
                    <img src="images/header/personal_center.svg" height="30px" width="30px" style={{marginRight:"10px"}}></img>
                    <span>Personal Center</span>
                    </div>
                    <div className='main-menu-popup-item' style={{backgroundColor: '#F6EAFF', fontWeight:'bold', cursor: 'pointer'}} onClick={handle_logoutRequest}>Log out</div>
                  </div>
                  )}
              </div>
            }
            key={btnInfo[0]}
            className={'my-link me-lg-4 me-xl-5'}
            trigger='hover'
            placement="bottom"
          >
            <div style={{ display: 'inline-block', position: 'relative' }}>
              <img className="personal-icon" src={btnInfo[0]} height={btnInfo[1]} width={btnInfo[1]} />
            </div>
          </Popover>

        )
      }
    })
  }


  const onSearch = (value) => console.log(props.localization)

  return (
    <div className="header-border">
      <div className='logo-container'>
        <Link to='/' className='my-link' onClick={handleRankBtn}>
          <img src='images/header/logo.svg' />
        </Link>
      </div>
      <div className='search-bar-container'>
        <Link to='/TobeChanged3' id='rank-btn-hide' className='my-link' onClick={handleRankBtn}>
          <img src='images/header/header_rank_btn.svg' height='28' width='28' />
        </Link>
        <div className='search-outer-div'>
          <Search placeholder={props.localization.words.header.headerSearchbarHolder} onSearch={onSearch} style={{ width: '400px' }} />
        </div>
      </div>
      <div className='user-buttons-container'>
        <HeaderRightContent btnsInfo={headerRightBtnInfos} />
      </div>
      {shouldLoginDisplay && (<LoginForm set_IsLoggedIn={set_IsLoggedIn} closeLogin={closeLogin} switchToSignup={openSignup} />)}
      {shouldSignupDisplay && (<SignUpForm set_IsLoggedIn={set_IsLoggedIn} closeSignup={closeSignup} switchToLogin={openLogin} />)}
    </div>
  );

}

export default connect(mapStateToProps, mapDispatchToProps)(Header);